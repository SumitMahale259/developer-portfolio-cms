"use client"

import { registerUser } from "@/app/lib/actions/auth-action";
import { ArrowRightIcon, AtSymbolIcon, ExclamationCircleIcon, KeyIcon, LockClosedIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Button from "../../../ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormData, UserSchema } from "@/app/lib/validations/user-schema";
import Link from "next/link";
import { useState } from "react";
import Input from "@/app/components/ui/Input";

export default function RegisterForm() {
    const [serverMessage, setServerMessage] = useState({
        success: false,
        message: ""
    });
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(UserSchema),
        mode: "onSubmit",
        reValidateMode: "onChange",
    });

    const onSubmit = async (
        data: UserFormData
    ) => {
        const formData = new FormData();
        formData.append("secretKey", data.secretKey);
        formData.append("fullName", data.fullName);
        formData.append("email", data.email);
        formData.append("password", data.password);
        const res = await registerUser(formData);
        setServerMessage({success: res.success, message: res.message});
        console.log(serverMessage);

        reset();
    }

    return (
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex-1 rounded-lg">
                <h1 className={`mb-3 text-2xl`}>
                    Dashboard Registration
                </h1>
                <div className="w-full">
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium"
                            htmlFor="email"
                        >
                            Secret Key
                        </label>
                        <div className="relative">
                            <Input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="secretKey"
                                type="password"
                                placeholder="Enter the secret key"
                                required
                                {...register("secretKey")}
                            />
                            <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-600 dark:peer-focus:text-gray-200" />
                        </div>
                        <div className="mt-2" aria-live="polite" aria-atomic="true">
                            {errors.secretKey && (
                                <p className="text-sm text-red-500">
                                    {errors.secretKey.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium"
                            htmlFor="email"
                        >
                            Full Name
                        </label>
                        <div className="relative">
                            <Input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="fullName"
                                type="text"
                                placeholder="Enter your full name"
                                required
                                {...register("fullName")}
                            />
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-600 dark:peer-focus:text-gray-200" />
                        </div>
                        <div className="mt-2" aria-live="polite" aria-atomic="true">
                            {errors.fullName && (
                                <p className="text-sm text-red-500">
                                    {errors.fullName.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <Input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="email"
                                type="email"
                                placeholder="Enter your email address"
                                required
                                {...register("email")}
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-600 dark:peer-focus:text-gray-200" />
                        </div>
                        <div className="mt-2" aria-live="polite" aria-atomic="true">
                            {errors.email && (
                                <p className="text-sm text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <Input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="password"
                                type="password"
                                placeholder="Enter password"
                                required
                                {...register("password")}
                            />
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:peer-focus:text-gray-200" />
                        </div>
                        <div className="mt-2" aria-live="polite" aria-atomic="true">
                            {errors.password && (
                                <p className="text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        <div
                            className="mt-2"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            {serverMessage?.message && (
                                <>
                                    <p className={`text-sm ${serverMessage.success ? "text-green-500" : "text-red-500"}`}>{serverMessage.message}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <Button disabled={isSubmitting} className={`mt-4 w-full ${isSubmitting && "cursor-progress"}`} aria-disabled={isSubmitting}>
                    Register <ArrowRightIcon className="ml-auto h-5 w-5" />
                </Button>
                <div className="mt-4 text-sm text-blue-400">
                    <Link href="/login">Already have an Account? Login</Link>
                </div>
            </div>
        </form>
    )
}