import { Suspense } from "react";
import LoginForm from "../components/admin/ui/auth-forms/login-form";

export default function Login() {
    return (
        <main className="flex min-h-dvh items-center justify-center p-4">
            <div className="w-full max-w-[400px] rounded border p-6 sm:p-10">
                <Suspense>
                    <LoginForm/>
                </Suspense>
            </div>
        </main>
    );
}