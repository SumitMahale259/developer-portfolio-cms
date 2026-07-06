"use client";

import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import { Prisma } from "@/app/generated/prisma/client";
import { createAbout, updateAbout } from "@/app/lib/actions/about-actions";
import { StatsFormInput, StatsFormOutput, StatsSchema } from "@/app/lib/validations/about-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type AboutStats = Prisma.AboutGetPayload<{
    select: {
        experienceYears: true,
        projectsCount: true,
    };
}>

interface CreateStatsFormProps {
    about: AboutStats | null,
    isEditing: boolean,
    setIsEditing: (value: boolean) => void,
}

export default function CreateStatsForm({isEditing, setIsEditing, about} : CreateStatsFormProps) {
    const router = useRouter();
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm
    <
        StatsFormInput,
        any,
        StatsFormOutput
    >({
        resolver: zodResolver(StatsSchema),
        defaultValues: {
            experienceYears: about?.experienceYears,
            projectsCount: about?.projectsCount,
        },
        mode: "onSubmit",
        reValidateMode: "onChange",
    });

    const onSubmit = async (
        data: StatsFormOutput
    ) => {
        const formData = new FormData();
        if (data.experienceYears !== undefined) {
            formData.append("experienceYears", data.experienceYears.toString());
        }
        if (data.projectsCount !== undefined) {
            formData.append("projectsCount", data.projectsCount.toString());
        }

        try {
            if (about) {
                await updateAbout(formData);
            } else {
                await createAbout(formData);
            }
            reset({
                experienceYears: undefined,
                projectsCount: undefined,
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
                experienceYears: about?.experienceYears,
                projectsCount: about?.projectsCount,
            })
        }
    }, [about, reset]);

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-2 w-full max-w-sm">
                <label htmlFor="experienceYears">Experience in Years</label>

                <Input
                    id="experienceYears"
                    type="number"
                    min={0}
                    step={0.1}
                    placeholder="eg. 3"
                    disabled={!isEditing}
                    {...register("experienceYears", {
                        valueAsNumber: true,
                    })}
                />
                <div aria-live="polite" aria-atomic="true">
                    {errors.experienceYears && (
                        <p className="text-sm text-red-500">
                            {errors.experienceYears.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex flex-col space-y-2 w-full max-w-sm">
                <label htmlFor="projectsCount">Projects Count</label>

                <Input
                    id="projectsCount"
                    type="number"
                    min={0}
                    placeholder="eg. 5"
                    disabled={!isEditing}
                    {...register("projectsCount",{
                        valueAsNumber: true,
                    })}
                />
                <div aria-live="polite" aria-atomic="true">
                    {errors.projectsCount && (
                        <p className="text-sm text-red-500">
                            {errors.projectsCount.message}
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