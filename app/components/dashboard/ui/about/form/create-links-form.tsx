"use client";

import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import { Prisma } from "@/app/generated/prisma/client";
import { createAbout, updateAbout } from "@/app/lib/actions/about-actions";
import { SocialLinksData, SocialLinksSchema } from "@/app/lib/validations/about-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type AboutLinks = Prisma.AboutGetPayload<{
    select: {
        github: true,
        linkedin: true,
        email: true,
    };
}>

interface CreateLinksFormProps {
    about: AboutLinks | null,
    isEditing: boolean,
    setIsEditing: (value: boolean) => void,
}

export default function CreateLinksForm({isEditing, setIsEditing, about} : CreateLinksFormProps) {
    const router = useRouter();
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SocialLinksData>({
        resolver: zodResolver(SocialLinksSchema),
        defaultValues: {
            github: about?.github ?? "",
            linkedin: about?.linkedin ?? "",
            email: about?.email ?? "",
        },
        mode: "onSubmit",
        reValidateMode: "onChange",
    });

    const onSubmit = async (
        data: SocialLinksData
    ) => {
        const formData = new FormData();
        formData.append("github", data.github);
        formData.append("linkedin", data.linkedin);
        formData.append("email", data.email);

        try {
            if (about) {
                await updateAbout(formData);
            } else {
                await createAbout(formData);
            }
            reset({
                github: "",
                linkedin: "",
                email: "",
            });
            setIsEditing(false);
            router.refresh();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(()=>{
        if (about) {
            reset({
                github: about?.github ?? "",
                linkedin: about?.linkedin ?? "",
                email: about?.email ?? "",
            })
        }
    }, [about, reset]);

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-2 w-full max-w-sm">
                <label htmlFor="github">Github Link</label>

                <Input
                    id="github"
                    type="url"
                    placeholder="https://github.com/yourusername"
                    disabled={!isEditing}
                    {...register("github")}
                />
                <div aria-live="polite" aria-atomic="true">
                    {errors.github && (
                        <p className="text-sm text-red-500">
                            {errors.github.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex flex-col space-y-2 w-full max-w-sm">
                <label htmlFor="linkedin">Linkedin Link</label>

                <Input
                    id="linkedin"
                    type="url"
                    placeholder="https://linkedin.com/in/yourusername"
                    disabled={!isEditing}
                    {...register("linkedin")}
                />
                <div aria-live="polite" aria-atomic="true">
                    {errors.linkedin && (
                        <p className="text-sm text-red-500">
                            {errors.linkedin.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex flex-col space-y-2 w-full max-w-sm">
                <label htmlFor="email">Email</label>

                <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    disabled={!isEditing}
                    {...register("email")}
                />
                <div aria-live="polite" aria-atomic="true">
                    {errors.email && (
                        <p className="text-sm text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>
            </div>

            {isEditing && (
                <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting} className={`${isSubmitting ? "cursor-progress" : ""}`} aria-disabled={isSubmitting}>
                        Save Changes
                    </Button>
                </div>
            )}
        </form>
    )
}