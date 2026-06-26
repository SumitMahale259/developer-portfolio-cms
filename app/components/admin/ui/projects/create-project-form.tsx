"use client";

import Button from "../../../ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProject } from "@/app/lib/actions/project-action";
import { ProjectClientFormInput, ProjectClientFormOutput, ProjectClientSchema } from "@/app/lib/client-side-validations/project-client-schema";
import { useRouter } from "next/navigation";
import Input from "@/app/components/ui/Input";

export default function CreateProjectForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm
        <
            ProjectClientFormInput,
            any,
            ProjectClientFormOutput
        >({
            resolver: zodResolver(ProjectClientSchema),
            // No validation until submit
            mode: "onSubmit",
            // After submit, validate while typing
            reValidateMode: "onChange",
        });

    const onSubmit = async (
        data: ProjectClientFormOutput
    ) => {        
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("slug", data.slug);
        formData.append("description", data.description);
        if (data.githubUrl) {
            formData.append("githubUrl", data.githubUrl);
        }

        if (data.liveUrl) {
            formData.append("liveUrl", data.liveUrl);
        }

        formData.append("featured", data.featured);

        // formData.append("image", data.image[0]);
        formData.append("image", data.image);

        await createProject(formData);

        reset();
    };

    return (
        <div className="w-sm">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <Input type="text" placeholder="Title" {...register("title")}/>
                <div id="customer-error" aria-live="polite" aria-atomic="true">
                    {errors.title && (
                        <p className="-mt-2 text-sm text-red-500">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                <Input type="text" placeholder="Slug" {...register("slug")}/>
                <div id="customer-error" aria-live="polite" aria-atomic="true">
                    {errors.slug && (
                        <p className="-mt-2 text-sm text-red-500">
                            {errors.slug.message}
                        </p>
                    )}
                </div>

                <textarea className="rounded-md border p-2" placeholder="Description" {...register("description")}/>
                <div id="customer-error" aria-live="polite" aria-atomic="true">
                    {errors.description && (
                        <p className="-mt-2 text-sm text-red-500">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                <Input type="url" placeholder="Github Url" {...register("githubUrl")}/>
                <div id="customer-error" aria-live="polite" aria-atomic="true">
                    {errors.githubUrl && (
                        <p className="-mt-2 text-sm text-red-500">
                            {errors.githubUrl.message}
                        </p>
                    )}
                </div>

                <Input type="url" placeholder="Live Url" {...register("liveUrl")}/>
                <div id="customer-error" aria-live="polite" aria-atomic="true">
                    {errors.liveUrl && (
                        <p className="-mt-2 text-sm text-red-500">
                            {errors.liveUrl.message}
                        </p>
                    )}
                </div>

                <Input type="file" accept="image/*" placeholder="Upload Image" {...register("image")}/>
                <div id="customer-error" aria-live="polite" aria-atomic="true">
                    {errors.image && (
                        <p className="-mt-2 text-sm text-red-500">
                            {errors.image.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="me-4">
                        <Input
                            className="me-2"
                            type="radio"
                            value="true"
                            {...register("featured")}
                        />
                        Featured
                    </label>

                    <label>
                        <Input
                            className="me-2"
                            type="radio"
                            value="false" 
                            {...register("featured")}
                        />
                        Not Featured
                    </label>
                </div>

                {errors.featured && (
                    <p className="-mt-2 text-sm text-red-500">
                        {errors.featured.message}
                    </p>
                )}

                <div className="flex justify-start gap-5">
                    <Button disabled={isSubmitting} className={`${isSubmitting ? "cursor-progress" : ""}`} aria-disabled={isSubmitting}>
                        {isSubmitting ? "Creating..." : "Create Project"}
                    </Button>
                    <Button disabled={isSubmitting} className={`${isSubmitting ? "cursor-progress" : ""}`} onClick={()=>router.back()}>
                        {isSubmitting ? "Canceling..." : "Cancel"}
                    </Button>
                </div>
            </form>
        </div>
    )
}