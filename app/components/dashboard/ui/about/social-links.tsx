"use client"

import { useState } from "react";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Prisma } from "@/app/generated/prisma/client";
import CreateLinksForm from "./form/create-links-form";

type SocialLinks = Prisma.AboutGetPayload<{
    select: {
        github: true;
        linkedin: true;
        email: true;
    };
}>

interface SocialLinksProps {
    about: SocialLinks | null,
    editable?: boolean;
}

export default function SocialLinks({editable = false, about}: SocialLinksProps) {
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
            <CreateLinksForm isEditing={isEditing} setIsEditing={setIsEditing} about={about}/>
        </div>
    )
}