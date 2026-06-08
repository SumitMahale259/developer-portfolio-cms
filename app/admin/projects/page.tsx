import Button from "@/app/components/ui/Button";
import Link from "next/link";

export default function AdminProjectsPage() {
    return (
        <div>
            Admin Projects Page
            <Link href="/admin/projects/new"><Button className="mt-2">Create Project</Button></Link>
        </div>
    )
}