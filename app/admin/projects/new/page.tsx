import CreateForm from "@/app/components/admin/ui/projects/create-form";

export default function CreateProject() {
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="mb-5">New Project</h1>
            <CreateForm/>
        </div>
    )
}