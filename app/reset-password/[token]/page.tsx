import ResetPasswordForm from "@/app/components/admin/ui/auth-forms/reset-password-form";
import { Suspense } from "react";

export default async function Page(props: { params: Promise<{ token: string }> }) {
    const params = await props.params;
    const token = params.token;

    return (
        <main className="flex min-h-dvh items-center justify-center p-4">
            <div className="w-full max-w-[400px] rounded border p-6 sm:p-10">
                <Suspense>
                    <ResetPasswordForm token={token}/>
                </Suspense>
            </div>
        </main>
    )
}