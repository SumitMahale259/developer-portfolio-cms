"use client";

import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import { Prisma } from "@/app/generated/prisma/client";
import { createBasicInfo, updateBasicInfo } from "@/app/lib/actions/about-actions";
import { BasicInfoClientFormInput, BasicInfoClientFormOutput, BasicInfoClientSchema } from "@/app/lib/client-side-validations/basic-info-client-schema";
import { TrashIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type BasicInfo = Prisma.AboutGetPayload<{
    select: {
        fullName: true;
        summary: true;
        roles: true;
        profileImg: true;
    };
}>

interface CreateInfoFormProps {
    basicInfo: BasicInfo | null,
    isEditing: boolean,
    setIsEditing: (value: boolean) => void,
}

export default function CreateInfoForm({isEditing, setIsEditing, basicInfo} : CreateInfoFormProps) {
    const router = useRouter();
    const {
        register,
        reset,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm
    <
        BasicInfoClientFormInput,
        any,
        BasicInfoClientFormOutput
    >({
        resolver: zodResolver(BasicInfoClientSchema),
        defaultValues: {
            fullName: basicInfo?.fullName ?? "",
            summary: basicInfo?.summary ?? "",
            roles: basicInfo?.roles ?? [""],
        },
        mode: "onSubmit",
        reValidateMode: "onChange",
    });

    const roles = watch("roles");
    const addRole = () => {
        setValue("roles", [...roles, ""]);
    };
    const removeRole = (index: number) => {
        setValue(
            "roles",
            roles.filter((_, i) => i !== index)
        );
    };

    const profileImg = watch("profileImg");

    const onSubmit = async (
        data: BasicInfoClientFormOutput
    ) => {
        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("summary", data.summary);
        data.roles.forEach((role) => {
            formData.append("roles", role);
        });
        if (data.profileImg) {
            formData.append("profileImg", data.profileImg);
        }

        try {
            if (basicInfo) {
                await updateBasicInfo(formData);
            } else {
                await createBasicInfo(formData);
            }
            reset();
            reset({
                fullName: "",
                summary: "",
                roles: [""],
            });
            setIsEditing(false);
            router.refresh();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(()=>{
        if (basicInfo) {
            reset({
                fullName: basicInfo?.fullName ?? "",
                summary: basicInfo?.summary ?? "",
                roles: basicInfo?.roles ?? [""],
            })
        }
    }, [basicInfo, reset]);

    return (
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="h-24 w-24 rounded-xl border bg-gray-100">
                    {basicInfo?.profileImg && (
                        <Image
                            src={basicInfo.profileImg.imageUrl}
                            width={200}
                            height={100}
                            alt={`${basicInfo.fullName}'s image`}
                            loading="eager"
                        />
                    )}
                </div>
                <div className="flex-col">
                    <label className="mb-2 block font-medium">
                        Profile Image
                    </label>
                    {isEditing && (
                        <>
                            <label htmlFor="profileImg" className="block rounded-xl border p-2 max-w-sm w-full">
                                {profileImg?.[0]?.name ||
                                    basicInfo?.profileImg?.imageName ||
                                    "Upload Image"
                                }
                            </label>
                            <Input
                                id="profileImg"
                                className="rounded-xl"
                                type="file"
                                accept="image/*"
                                placeholder={basicInfo?.profileImg?.imageName && "Upload Image"}
                                disabled={!isEditing}
                                {...register("profileImg")}
                                hidden
                            />
                            <div aria-live="polite" aria-atomic="true">
                                {errors.profileImg && (
                                    <p className="text-sm text-red-500">
                                        {errors.profileImg.message}
                                    </p>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="flex flex-col space-y-2 w-full max-w-sm">
                <label htmlFor="fullName">Full Name</label>

                <Input
                    id="fullName"
                    placeholder="Enter full name"
                    disabled={!isEditing}
                    {...register("fullName")}
                />
                <div aria-live="polite" aria-atomic="true">
                    {errors.fullName && (
                        <p className="text-sm text-red-500">
                            {errors.fullName.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex flex-col space-y-2 w-full max-w-sm">
                <label htmlFor="summary">Summary</label>
                <textarea
                    className="rounded-md border p-2"
                    id="summary"
                    rows={4}
                    placeholder="Full Stack Developer building modern web applications..."
                    disabled={!isEditing}
                    {...register("summary")}
                />
                <div aria-live="polite" aria-atomic="true">
                    {errors.summary && (
                        <p className="text-sm text-red-500">
                            {errors.summary.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex flex-col space-y-6">
                {/* <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"> */}
                <div className="flex flex-wrap items-center gap-3">
                    <div>
                        <label>Roles</label>
                    </div>
                    {isEditing && (
                        <Button
                            type="button"
                            onClick={addRole}
                            className="ml-auto"
                        >
                            + Add Role
                        </Button>
                    )}
                </div>

                {roles.map((role, index) => (
                    <div key={index}>
                        {/* <div className="flex flex-col gap-3 sm:flex-row sm:items-start"> */}
                        <div className="flex gap-3 items-center">
                            <Input
                                className="max-w-sm w-full flex-1"
                                disabled={!isEditing}
                                // defaultValue={role}
                                {...register(`roles.${index}`)}
                            />

                            {isEditing && (
                                <TrashIcon className="w-5" onClick={() => removeRole(index)}/>
                            // <Button
                            //     type="button"
                            //     onClick={() => removeRole(index)}
                            //     className="self-end"
                            //     // className="w-full sm:w-auto"
                            // >
                            //     Delete
                            // </Button>
                            )}
                        </div>
                        <div aria-live="polite" aria-atomic="true">
                            {errors.roles?.[index] && (
                                <p className="-mt-2 mb-2 text-sm text-red-500">
                                    {errors.roles[index]?.message}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
                <div aria-live="polite" aria-atomic="true">
                    {errors.roles && (
                        <p className="-mt-2 text-sm text-red-500">
                            {errors.roles.message}
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