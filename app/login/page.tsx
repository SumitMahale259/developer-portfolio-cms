import { Suspense } from "react";
import LoginForm from "../components/admin/ui/auth-forms/login-form";

export default function Login() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32 rounded border">
                <Suspense>
                    <LoginForm/>
                </Suspense>
            </div>
        </main>
    );
}
