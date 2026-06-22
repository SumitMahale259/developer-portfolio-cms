import ResetPasswordForm from "@/app/components/admin/ui/auth-forms/reset-password-form";
import { Suspense } from "react";

export default async function Page(props: { params: Promise<{ token: string }> }) {
    const params = await props.params;
    const token = params.token;

    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32 rounded border">
                <Suspense>
                    <ResetPasswordForm token={token}/>
                </Suspense>
            </div>
        </main>
    )
}