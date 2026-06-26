import CreateProjectForm from "@/app/components/dashboard/ui/projects/create-project-form";

export default function CreateProject() {
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="mb-5">New Project</h1>
            <CreateProjectForm/>
        </div>
    )
}