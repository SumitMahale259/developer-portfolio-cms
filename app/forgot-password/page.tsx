import { Suspense } from "react";
import ForgotPasswordForm from "../components/dashboard/ui/auth-forms/forgot-password-form";

export default function ForgotPassword() {
    return (
        <main className="flex min-h-dvh items-center justify-center p-4">
            <div className="w-full max-w-[400px] rounded border p-6 sm:p-10">
                <Suspense>
                    <ForgotPasswordForm/>
                </Suspense>
            </div>
        </main>
    )
}