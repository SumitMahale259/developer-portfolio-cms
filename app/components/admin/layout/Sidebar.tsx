import Link from "next/link";

export default function Sidebar() {
    return (
        <nav className="flex flex-col gap-4">
            <Link href="/admin">Dashboard</Link>
            <Link href="/admin/projects">Projects</Link>
            <Link href="/admin/blogs">Blogs</Link>
            <Link href="/admin/skills">Skills</Link>
            <Link href="/admin/about">About</Link>
        </nav>
    )
}
