"use client";

import Button from "@/app/components/ui/Button";
import { Prisma } from "@/app/generated/prisma/client";
import { updateProject } from "@/app/lib/actions/project-action";
import { ProjectClientEditFormInput, ProjectClientEditFormOutput, ProjectEditClientSchema } from "@/app/lib/client-side-validations/project-client-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type ProjectWithImage = Prisma.ProjectGetPayload<{
  include: {
    projectImg: true;
  };
}>;

export default function EditProjectForm({ project }: { project: ProjectWithImage }) {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm
        <
            ProjectClientEditFormInput,
            any,
            ProjectClientEditFormOutput
        >({
            resolver: zodResolver(ProjectEditClientSchema),
            defaultValues: {
                title: project.title,
                slug: project.slug,
                description: project.description,
                githubUrl: project.githubUrl ?? "",
                liveUrl: project.liveUrl ?? "",
                featured: project.featured ? "true" : "false",
            },
            // No validation until submit
            mode: "onSubmit",
            // After submit, validate while typing
            reValidateMode: "onChange",
        });

    const onSubmit = async (
        data: ProjectClientEditFormOutput
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
        if (data.image) {
            formData.append("image", data.image);
        }
        await updateProject(project.id, formData);
        reset();
    };

    return (
        <div className="w-sm">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <input
                    className="border p-2"
                    type="text"
                    placeholder="Title"
                    {...register("title")}
                />
                <div id="customer-error" aria-live="polite" aria-atomic="true">
                    {errors.title && (
                        <p className="text-red-500">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                <input
                    className="border p-2"
                    type="text"
                    placeholder="Slug"
                    {...register("slug")}
                />
                <div id="customer-error" aria-live="polite" aria-atomic="true">
                    {errors.slug && (
                        <p className="text-red-500">
                            {errors.slug.message}
                        </p>
                    )}
                </div>

                <textarea
                    className="border p-2"
                    placeholder="Description"
                    {...register("description")}
                />
                <div id="customer-error" aria-live="polite" aria-atomic="true">
                    {errors.description && (
                        <p className="text-red-500">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                <input
                    className="border p-2"
                    type="url"
                    placeholder="Github Url"
                    {...register("githubUrl")}
                />
                <div id="customer-error" aria-live="polite" aria-atomic="true">
                    {errors.githubUrl && (
                        <p className="text-red-500">
                            {errors.githubUrl.message}
                        </p>
                    )}
                </div>

                <input
                    className="border p-2"
                    type="url"
                    placeholder="Live Url"
                    {...register("liveUrl")}
                />
                <div id="customer-error" aria-live="polite" aria-atomic="true">
                    {errors.liveUrl && (
                        <p className="-mt-2 text-sm text-red-500">
                            {errors.liveUrl.message}
                        </p>
                    )}
                </div>

                {project.projectImg && (
                    <Image src={project.projectImg.imageUrl} width={200} height={100} alt={project.title}/>
                )}
                <p>Current image: {project.projectImg?.imageName}</p>
                <input
                    className="border p-2"
                    type="file"
                    accept="image/*"
                    placeholder="Upload Image"
                    {...register("image")}
                />
                <div id="customer-error" aria-live="polite" aria-atomic="true">
                    {errors.image && (
                        <p className="-mt-2 text-sm text-red-500">
                            {errors.image.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="me-4">
                        <input
                            className="me-2"
                            type="radio"
                            value="true"
                            {...register("featured")}
                        />
                        Featured
                    </label>

                    <label>
                        <input
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
                        {isSubmitting ? "Creating..." : "Update Project"}
                    </Button>
                    <Button className={`${isSubmitting ? "cursor-progress" : ""}`} onClick={()=> router.back()}>
                        {isSubmitting ? "Canceling..." : "Cancel"}
                    </Button>
                </div>
            </form>
        </div>
    )
}