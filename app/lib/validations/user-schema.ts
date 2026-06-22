import * as z from "zod";

export const UserSchema = z.object({
    secretKey: z.string().refine((e) => e === "SECRETKEY", "Incorrect secret key"),
    fullName: z.string().min(3, "Please enter a valid name"),
    email: z.email(),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .max(32, { message: "Password cannot exceed 32 characters." })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
        .regex(/[0-9]/, { message: "Password must contain at least one number." })
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character." })
})

export type UserFormData = z.infer<typeof UserSchema>;