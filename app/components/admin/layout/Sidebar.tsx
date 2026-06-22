import { logout } from "@/app/lib/actions/auth-action";
import { signOut } from "@/auth";
import { PowerIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Sidebar() {
    return (
        <nav className="flex flex-col gap-4">
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <Link href="/admin">Dashboard</Link>
                <Link href="/admin/projects">Projects</Link>
                <Link href="/admin/blogs">Blogs</Link>
                <Link href="/admin/skills">Skills</Link>
                <Link href="/admin/about">About</Link>
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
                <form action={logout}>
                    <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm cursor-pointer font-medium md:flex-none md:justify-start md:p-2 md:px-3">
                        <PowerIcon className="w-6" />
                        <div className="hidden md:block">Sign Out</div>
                    </button>
                </form>
            </div>
        </nav>
    )
}
