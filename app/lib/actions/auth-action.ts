"use server";

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { UserSchema } from '../validations/user-schema';
import { Prisma } from '@/app/generated/prisma/client';
import { redirect } from 'next/navigation';
import { prisma } from '../prisma';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { sendResetEmail } from '../mail';
import { ForgotPasswordState } from '../definitions';
import { ResetPasswordSchema } from '../validations/reset-password-schema';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
        return 'Invalid credentials.';
        default:
        return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut({
    redirectTo: "/",
  });
}

export async function registerUser(formData: FormData) {
  const validatedFields = UserSchema.safeParse({
    secretKey: formData.get("secretKey"),
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed.",
    };
  }
  const { fullName, email, password } = validatedFields.data;
  const encryptedPassword = await bcrypt.hash(password, 12);
  try {
    await prisma.user.create({
      data: {
        fullName,
        email,
        password: encryptedPassword
      }
    });
  } catch (error) {
    console.error(error);
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      // if (
      //   Array.isArray(error.meta?.target) &&
      //   error.meta.target.includes("email")
      // ) {
        return {
          success: false,
          message: "Email already exists.",
        };
      // }
    }
    return {
      success: false,
      message: "Database Error: Failed to register.",
    }
  }
  redirect("/login");
}

export async function forgotPassword(
  prevState: ForgotPasswordState | undefined,
  formData: FormData,
) {
  const email = formData.get("email") as string
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })
  if (!user) {
    return {
      success: true,
      message: "Password reset link has been sent to your registered email if the account exists. Please check your inbox (and spam folder)."
    }
  }

  const now = new Date();
  if (user.forgotPasswordAttempts && user.forgotPasswordFirstAttempt) {
    const hoursPassed = (now.getTime() - user.forgotPasswordFirstAttempt.getTime()) / (1000 * 60 * 60);
    const hoursLeft = (24 - hoursPassed).toFixed(1);

    if (now.getTime() - user.forgotPasswordFirstAttempt.getTime() > 24 * 60 * 60 * 1000) {
      try {
        await prisma.user.update({
          where: {
            id: user.id
          },
          data: {
            forgotPasswordAttempts: 1,
            forgotPasswordFirstAttempt: now
          }
        });
      } catch (error) {
        console.error(error)
        return {
          success: false,
          message: "Database Error: Failed to update attempt."
        }
      }
    } else {
      if (user.forgotPasswordAttempts >= 3) {
        return {
          success: false,
          message: `Too many password reset requests. Try again in ${hoursLeft} hours.`
        }
      }
      try {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            forgotPasswordAttempts: {
              increment: 1
            },
            forgotPasswordFirstAttempt: user.forgotPasswordFirstAttempt ?? now,
          }
        })
      } catch (error) {
        console.error(error);
        return {
          success: false,
          message: "Database Error: Failed to increment attempt."
        }
      }
    }
  } else {
    try {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          forgotPasswordAttempts: {
            increment: 1
          },
          forgotPasswordFirstAttempt: now,
        }
      })
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Database Error: Failed to intialize forgotPasswordAttempts and forgotPasswordFirstAttempt."
      }
    }
  }

  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  try {
    await prisma.user.update({
      where: {
        email
      },
      data: {
        resetToken: tokenHash,
        resetExpiry: new Date(Date.now() + 1000 * 60 * 15),
      }
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Database Error: Failed to store token."
    }
  }

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${token}`;
  try {
    await sendResetEmail(email, resetUrl);
    return {
      success: true,
      message: "Password reset link has been sent to your registered email if the account exists. Please check your inbox (and spam folder)."
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Database Error: Failed to send email."
    }
  }
}

export async function resetPassword(
  token: string,
  formData: FormData
) {
  const validatedFields = ResetPasswordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  })

  if (!validatedFields.success) {
     return {
      success: false,
      message: "Validation failed.",
    };
  }

  const tokenHash = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await prisma.user.findFirst({
    where: {
      resetToken: tokenHash,
      resetExpiry: {
        gt: new Date(),
      },
    },
  });
  if (!user) {
     return {
      success: false,
      message: "Invalid or expired token",
    };
  }

  const { password } = validatedFields.data;
  const encryptedPassword = await bcrypt.hash(password, 12);
  try {
    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        password: encryptedPassword,
        resetToken: null,
        resetExpiry: null,
      }
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Database Error: Failed to reset password.",
    }
  }
  redirect("/dashboard/login");
}