"use client";

import Button from "@/app/components/ui/Button";
import { Prisma } from "@/app/generated/prisma/client";
import { createAbout, updateAbout } from "@/app/lib/actions/about-actions";
import { BioData, BioSchema } from "@/app/lib/validations/about-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type AboutBio = Prisma.AboutGetPayload<{
    select: {
        bio: true,
    };
}>

interface CreateBioFormProps {
    about: AboutBio | null,
    isEditing: boolean,
    setIsEditing: (value: boolean) => void,
}

export default function CreateBioForm({isEditing, setIsEditing, about} : CreateBioFormProps) {
    const router = useRouter();
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<BioData>({
        resolver: zodResolver(BioSchema),
        defaultValues: {
            bio: about?.bio ?? "",
        },
        mode: "onSubmit",
        reValidateMode: "onChange",
    });

    const onSubmit = async (
        data: BioData
    ) => {
        const formData = new FormData();
        formData.append("bio", data.bio);
        try {
            if (about) {
                await updateAbout(formData);
            } else {
                await createAbout(formData);
            }
            reset({
                bio: "",
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
                bio: about?.bio ?? "",
            })
        }
    }, [about, reset]);

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-2 w-full max-w-sm">
                <label htmlFor="bio">Bio</label>
                <textarea
                    className="rounded-md border p-2"
                    id="bio"
                    rows={4}
                    placeholder="Full Stack Developer building modern web applications..."
                    disabled={!isEditing}
                    {...register("bio")}
                />
                <div aria-live="polite" aria-atomic="true">
                    {errors.bio && (
                        <p className="text-sm text-red-500">
                            {errors.bio.message}
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