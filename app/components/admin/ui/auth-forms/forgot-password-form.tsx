"use client";

import { forgotPassword } from "@/app/lib/actions/auth-action";
import { ArrowRightIcon, AtSymbolIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useActionState } from "react";
import Button from "../../../ui/Button";
import Link from "next/link";

export default function ForgotPasswordForm() {
    const [state, formAction, isPending] = useActionState(
        forgotPassword,
        undefined,
    );

    return (
        <form action={formAction} className="space-y-3">
            <div className="flex-1 rounded-lg px-6 pb-4 pt-8">
                <h1 className={`mb-3 text-2xl`}>
                    Forgot Password
                </h1>
                <div className="w-full">
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                required
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-600 dark:peer-focus:text-gray-200" />
                        </div>
                        <div
                            className="mt-2"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            {state?.message && (
                                <>
                                    <p className={`text-sm ${state.success ? "text-green-500" : "text-red-500"}`}>{state.message}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <Button className="mt-4 w-full" aria-disabled={isPending}>
                    Send <ArrowRightIcon className="ml-auto h-5 w-5" />
                </Button>
                <div className="mt-4 text-sm text-blue-400">
                    <Link href="/login">Remembered Password? Login</Link>
                </div>
            </div>
        </form>
    )
}