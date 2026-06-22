import * as z from "zod";

export const ResetPasswordSchema = z.object({
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .max(32, { message: "Password cannot exceed 32 characters." })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
        .regex(/[0-9]/, { message: "Password must contain at least one number." })
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character." }),
    confirmPassword: z.string(),
}).refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords must match",
      path: ["confirmPassword"],
    }
)

export type ResetPasswordData = z.infer<typeof ResetPasswordSchema>;