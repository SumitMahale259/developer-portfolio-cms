"use client";

import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import { resetPassword } from "@/app/lib/actions/auth-action";
import { ResetPasswordData, ResetPasswordSchema } from "@/app/lib/validations/reset-password-schema";
import { ArrowRightIcon, KeyIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function ResetPasswordForm({token}: {token: string}) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(ResetPasswordSchema),
        mode: "onSubmit",
        reValidateMode: "onChange",
    });

    const onSubmit = async (
        data: ResetPasswordData
    ) => {
        const formData = new FormData();
        formData.append("password", data.password);
        formData.append("confirmPassword", data.confirmPassword);
        await resetPassword(token, formData);
        reset();
    }

    return (
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex-1 rounded-lg">
                <h1 className={`mb-3 text-2xl`}>
                    Reset Password
                </h1>
                <div className="w-full">
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium"
                            htmlFor="password"
                        >
                            New Password
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
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-600 dark:peer-focus:text-gray-200" />
                        </div>
                        <div className="mt-2" aria-live="polite" aria-atomic="true">
                            {errors.password && (
                                <p className="text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium"
                            htmlFor="confirmPassword"
                        >
                            Confirm Password
                        </label>
                        <div className="relative">
                            <Input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="confirmPassword"
                                type="password"
                                placeholder="Enter password again"
                                required
                                {...register("confirmPassword")}
                            />
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-600 dark:peer-focus:text-gray-200" />
                        </div>
                        <div className="mt-2" aria-live="polite" aria-atomic="true">
                            {errors.confirmPassword && (
                                <p className="text-sm text-red-500">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <Button className="mt-4 w-full" aria-disabled={isSubmitting}>
                    Send <ArrowRightIcon className="ml-auto h-5 w-5" />
                </Button>
            </div>
        </form>
    )
}