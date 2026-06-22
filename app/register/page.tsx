import { Suspense } from "react";
import RegisterForm from "../components/admin/ui/auth-forms/register-form";

export default function Page() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-auto rounded border">
                <Suspense>
                    <RegisterForm/>
                </Suspense>
            </div>
        </main>
    )
}