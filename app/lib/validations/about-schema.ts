import * as z from "zod";

export const AboutSchema = z.object({
    fullName: z.string().min(3, "Please enter a valid name"),
    summary: z.string().min(5, "Summary must be at least 5 characters"),
    roles: z.array(z.string().min(2, "Please enter a valid role")).min(1, "Add at least one role"),
    bio: z.string().min(10, "Bio must be at least 10 characters").optional(),

    // github: z.string().url().optional(),
    github: z.union([z.url("Please enter a valid github link"), z.literal("")]).optional(),
    linkedin: z.union([z.url("Please enter a valid linkedin link"), z.literal("")]).optional(),
    email: z.email("Please enter a valid email").optional(),

    experienceYears: z.coerce.number().min(0, "Experience cannot be negative").optional(),
    projectsCount: z.coerce.number().int().optional(),
});

export const BasicInfoSchema = AboutSchema.pick({
    fullName: true,
    summary: true,
    roles: true,
});

export const BioSchema = AboutSchema.pick({
    bio: true,
}).required();

export const SocialLinksSchema = AboutSchema.pick({
    github: true,
    linkedin: true,
    email: true,
}).required();

export const StatsSchema = AboutSchema.pick({
    experienceYears: true,
    projectsCount: true,
})

export type BioData = z.infer<typeof BioSchema>;
export type SocialLinksData = z.infer<typeof SocialLinksSchema>;
export type StatsFormInput = z.input<typeof StatsSchema>;
export type StatsFormOutput = z.output<typeof StatsSchema>;