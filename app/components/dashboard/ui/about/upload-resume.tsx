"use client"

import { useState } from "react";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Prisma } from "@/app/generated/prisma/client";
import CreateResumeForm from "./form/create-resume-form";

type UploadResume = Prisma.AboutGetPayload<{
    select: {
        resume: true,
    };
}>

interface UploadResumeProps {
    about: UploadResume | null,
    editable?: boolean;
}

export default function UploadResume({editable = false, about}: UploadResumeProps) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="space-y-8">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Upload Resume</h2>
                {editable && (
                    <button
                        type="button"
                        onClick={() => setIsEditing((prev) => !prev)}
                    >
                        {isEditing ? <XMarkIcon className="w-5 cursor-pointer"/> : <PencilIcon className="w-5 cursor-pointer"/>}
                    </button>
                )}
            </div>
            <CreateResumeForm isEditing={isEditing} setIsEditing={setIsEditing} about={about}/>
        </div>
    )
}