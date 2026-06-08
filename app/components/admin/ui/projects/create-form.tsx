"use client";

// import { createProject, State } from "@/app/lib/actions/project-action";
import Button from "../../../ui/Button";
// import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectFormData, ProjectSchema } from "@/app/lib/validations/project-schema";
import { createProject } from "@/app/lib/actions/project-action";

export default function CreateForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ProjectFormData>({
        resolver: zodResolver(ProjectSchema),

        // No validation until submit
        mode: "onSubmit",

        // After submit, validate while typing
        reValidateMode: "onChange",
    });

    const onSubmit = async (
        data: ProjectFormData
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
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} >
                <input className="border p-2" type="text" placeholder="Title" {...register("title")}/>
                <div id="customer-error" aria-live="polite" aria-atomic="true">
                    {errors.title && (
                        <p className="text-red-500">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                <input className="border p-2" type="text" placeholder="Slug" {...register("slug")}/>
                <div id="customer-error" aria-live="polite" aria-atomic="true">
                    {errors.slug && (
                        <p className="text-red-500">
                            {errors.slug.message}
                        </p>
                    )}
                </div>

                <textarea className="border p-2" placeholder="Description" {...register("description")}/>
                <div id="customer-error" aria-live="polite" aria-atomic="true">
                    {errors.description && (
                        <p className="text-red-500">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                <input className="border p-2" type="url" placeholder="Github Url" {...register("githubUrl")}/>
                <div id="customer-error" aria-live="polite" aria-atomic="true">
                    {errors.githubUrl && (
                        <p className="text-red-500">
                            {errors.githubUrl.message}
                        </p>
                    )}
                </div>

                <input className="border p-2" type="url" placeholder="Live Url" {...register("liveUrl")}/>
                <div id="customer-error" aria-live="polite" aria-atomic="true">
                    {errors.liveUrl && (
                        <p className="-mt-2 text-sm text-red-500">
                            {errors.liveUrl.message}
                        </p>
                    )}
                </div>

                <input className="border p-2" type="file" accept="image/*" placeholder="Upload Image" {...register("image")}/>
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

                <Button disabled={isSubmitting} className={`${isSubmitting ? "cursor-progress" : ""}`}>
                    {isSubmitting ? "Creating..." : "Create Project"}
                </Button>
                {/* <Button disabled={isSubmitting}>
                    Create Project
                </Button> */}
            </form>
        </div>
    )
}



// "use client";

// import { createProject, State } from "@/app/lib/actions/project-action";
// import Button from "../../ui/Button";
// import { useActionState } from "react";

// export default function CreateForm() {
//     const initialState: State = { message: null , errors: {} };
//     const [state, formAction, pending] = useActionState(createProject, initialState);

//     return (
//         <div className="w-sm">
//             <form className="flex flex-col gap-4" action={formAction} >
//                 <input className="border p-2" type="text" name="title" placeholder="Title" defaultValue={state.values?.title}/>
//                 <div id="customer-error" aria-live="polite" aria-atomic="true">
//                     {state.errors?.title?.map((error: string) => (
//                         <p className="-mt-2 text-sm text-red-500" key={error}>{error}</p>
//                     ))}
//                 </div>

//                 <input className="border p-2" type="text" name="slug" placeholder="Slug" defaultValue={state.values?.slug}/>
//                 <div id="customer-error" aria-live="polite" aria-atomic="true">
//                     {state.errors?.slug?.map((error: string) => (
//                         <p className="-mt-2 text-sm text-red-500" key={error}>{error}</p>
//                     ))}
//                 </div>

//                 <textarea className="border p-2" name="description" placeholder="Description" defaultValue={state.values?.description}/>
//                 <div id="customer-error" aria-live="polite" aria-atomic="true">
//                     {state.errors?.description?.map((error: string) => (
//                         <p className="-mt-2 text-sm text-red-500" key={error}>{error}</p>
//                     ))}
//                 </div>

//                 <input className="border p-2" type="url" name="githubUrl" placeholder="Github Url" defaultValue={state.values?.githubUrl}/>
//                 <div id="customer-error" aria-live="polite" aria-atomic="true">
//                     {state.errors?.githubUrl?.map((error: string) => (
//                         <p className="-mt-2 text-sm text-red-500" key={error}>{error}</p>
//                     ))}
//                 </div>

//                 <input className="border p-2" type="url" name="liveUrl" placeholder="Live Url" defaultValue={state.values?.liveUrl}/>
//                 <div id="customer-error" aria-live="polite" aria-atomic="true">
//                     {state.errors?.liveUrl?.map((error: string) => (
//                         <p className="-mt-2 text-sm text-red-500" key={error}>{error}</p>
//                     ))}
//                 </div>

//                 <input className="border p-2" type="file" name="image" accept="image/*" placeholder="Image Url"/>
//                 <div id="customer-error" aria-live="polite" aria-atomic="true">
//                     {state.errors?.image?.map((error: string) => (
//                         <p className="-mt-2 text-sm text-red-500" key={error}>{error}</p>
//                     ))}
//                 </div>

//                 <div>
//                     <label className="me-4">
//                         <input
//                             className="me-2"
//                             type="radio"
//                             name="featured"
//                             value="true"
//                             defaultChecked={state.values?.featured === "true"}
//                         />
//                         Featured
//                     </label>

//                     <label>
//                         <input
//                             className="me-2"
//                             type="radio"
//                             name="featured"
//                             value="false" 
//                             defaultChecked={
//                                 state.values?.featured === "false" ||
//                                 state.values?.featured === undefined
//                             }
//                         />
//                         Not Featured
//                     </label>
//                 </div>

//                 <Button disabled={pending} className={`${pending ? "cursor-progress" : ""}`}>
//                     {pending ? "Creating..." : "Create Project"}
//                 </Button>

//                 {state.message && <p>{state.message}</p>}
//             </form>
//         </div>
//     )
// }