import { Suspense } from "react";
import ForgotPasswordForm from "../components/admin/ui/auth-forms/forgot-password-form";

export default function ForgotPassword() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32 rounded border">
                <Suspense>
                    <ForgotPasswordForm/>
                </Suspense>
            </div>
        </main>
    )
}