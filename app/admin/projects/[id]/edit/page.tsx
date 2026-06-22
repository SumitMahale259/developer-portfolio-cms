import EditProjectForm from "@/app/components/admin/ui/projects/edit-project-form";
import { fetchProjectById } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function EditProject(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const project = await fetchProjectById(id);

    if (!project) {
        notFound();
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="mb-5">Edit Project</h1>
            <EditProjectForm project={project}/>
        </div>
    )
}