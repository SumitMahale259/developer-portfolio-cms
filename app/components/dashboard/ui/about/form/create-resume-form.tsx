"use client";

import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import { Prisma } from "@/app/generated/prisma/client";
import { createAbout, updateAbout } from "@/app/lib/actions/about-actions";
import { ResumeClientFormInput, ResumeClientFormOutput, ResumeClientSchema } from "@/app/lib/client-side-validations/resume-client-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type AboutResume = Prisma.AboutGetPayload<{
    select: {
        resume: true,
    };
}>

interface CreateInfoFormProps {
    about: AboutResume | null,
    isEditing: boolean,
    setIsEditing: (value: boolean) => void,
}

export default function CreateResumeForm({isEditing, setIsEditing, about} : CreateInfoFormProps) {
    const router = useRouter();
    const {
        register,
        reset,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm
    <
        ResumeClientFormInput,
        any,
        ResumeClientFormOutput
    >({
        resolver: zodResolver(ResumeClientSchema),
        mode: "onSubmit",
        reValidateMode: "onChange",
    });

    const resume = watch("resume");

    const onSubmit = async (
        data: ResumeClientFormOutput
    ) => {
        const formData = new FormData();
        if (data.resume) {
            formData.append("resume", data.resume);
        }

        try {
            if (about) {
                await updateAbout(formData);
            } else {
                await createAbout(formData);
            }
            reset();
            setIsEditing(false);
            router.refresh();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex-col">
                    <label className="mb-2 block font-medium">
                        Resume
                    </label>
                    {about?.resume ?
                        <>
                            <label htmlFor="resume" className="block rounded-xl border p-2 max-w-sm w-full">
                                {resume?.[0]?.name ||
                                    about?.resume?.resumeName ||
                                    "Upload Image"
                                }
                            </label>
                            <Input
                                id="resume"
                                className="rounded-xl"
                                type="file"
                                accept="application/pdf"
                                placeholder={about?.resume?.resumeName && "Upload Resume"}
                                disabled={!isEditing}
                                {...register("resume")}
                                hidden
                            />
                            <div aria-live="polite" aria-atomic="true">
                                {errors.resume && (
                                    <p className="text-sm text-red-500">
                                        {errors.resume.message}
                                    </p>
                                )}
                            </div>
                        </>
                    :
                        isEditing && (
                            <>
                                <label htmlFor="resume" className="block rounded-xl border p-2 max-w-sm w-full">
                                    {resume?.[0]?.name ||
                                        about?.resume?.resumeName ||
                                        "Upload Image"
                                    }
                                </label>
                                <Input
                                    id="resume"
                                    className="rounded-xl"
                                    type="file"
                                    accept="application/pdf"
                                    placeholder={about?.resume?.resumeName && "Upload Resume"}
                                    disabled={!isEditing}
                                    {...register("resume")}
                                    hidden
                                />
                                <div aria-live="polite" aria-atomic="true">
                                    {errors.resume && (
                                        <p className="text-sm text-red-500">
                                            {errors.resume.message}
                                        </p>
                                    )}
                                </div>
                            </>
                        )
                    }
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