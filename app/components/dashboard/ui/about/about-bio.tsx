"use client"

import { useState } from "react";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Prisma } from "@/app/generated/prisma/client";
import CreateBioForm from "./form/create-bio-form";

type BioInfo = Prisma.AboutGetPayload<{
    select: {
        bio: true;
    };
}>

interface BioInfoProps {
    about: BioInfo | null,
    editable?: boolean;
}

export default function AboutBio({editable = false, about}: BioInfoProps) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="space-y-8">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Bio</h2>
                {editable && (
                    <button
                        type="button"
                        onClick={() => setIsEditing((prev) => !prev)}
                    >
                        {isEditing ? <XMarkIcon className="w-5 cursor-pointer"/> : <PencilIcon className="w-5 cursor-pointer"/>}
                    </button>
                )}
            </div>
            <CreateBioForm isEditing={isEditing} setIsEditing={setIsEditing} about={about}/>
        </div>
    )
}