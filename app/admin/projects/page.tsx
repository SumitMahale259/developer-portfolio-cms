import { DeleteButton, EditButton } from "@/app/components/admin/ui/buttons";
import Button from "@/app/components/ui/Button";
import { fetchProjects } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";

export default async function AdminProjects() {
    const projects = await fetchProjects();
    return (
        <div className="text-center">
            <p>Admin Projects Page</p>
            <div className="flex justify-center mt-5">
                <Link href="/admin/projects/new"><Button className="">Create Project</Button></Link>
            </div>
            <div className="mt-5 mb-5 flex gap-5 items-center justify-center flex-wrap">
                {projects.map((curProj) =>(
                    <div key={curProj.id} className="text-center rounded border p-2 flex-col gap-5">
                        {curProj.projectImg && (
                            <Image src={curProj.projectImg.imageUrl} width={200} height={100} alt={curProj.title}/>
                        )}
                        <p>{curProj.title}</p>
                        <p>{curProj.description}</p>
                        <div className="flex justify-between gap-2">
                            <EditButton id={curProj.id}/>
                            <DeleteButton id={curProj.id}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}