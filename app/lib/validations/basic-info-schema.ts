import * as z from "zod";

export const BasicInfoSchema = z.object({
    fullName: z.string().min(3, "Please enter a valid name"),
    summary: z.string().min(5, "Summary must be at least 5 characters"),
    roles: z
    .array(z.string().min(2, "Please enter a valid role"))
    .min(1, "Add at least one role"),
    // roles: z.array(
    //     z.object({
    //         value: z.string()
    //     })
    // )
})