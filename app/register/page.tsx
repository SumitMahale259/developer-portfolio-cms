import { Suspense } from "react";
import RegisterForm from "../components/admin/ui/auth-forms/register-form";

export default function Page() {
    return (
        <main className="flex min-h-dvh items-center justify-center p-4">
            <div className="w-full max-w-[400px] rounded border p-6 sm:p-10">
                <Suspense>
                    <RegisterForm/>
                </Suspense>
            </div>
        </main>
    )
}