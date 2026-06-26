"use client"

import { useState } from "react";
import CreateInfoForm from "./form/create-info-form";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Prisma } from "@/app/generated/prisma/client";

type BasicInfo = Prisma.AboutGetPayload<{
    select: {
        fullName: true;
        summary: true;
        roles: true;
        profileImg: true;
    };
}>

interface BasicInfoProps {
    basicInfo: BasicInfo | null,
    editable?: boolean;
}

export default function BasicInfo({editable = false, basicInfo}: BasicInfoProps) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="space-y-8">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Basic Information</h2>
                {editable && (
                    <button
                        type="button"
                        onClick={() => setIsEditing((prev) => !prev)}
                    >
                        {isEditing ? <XMarkIcon className="w-5 cursor-pointer"/> : <PencilIcon className="w-5 cursor-pointer"/>}
                    </button>
                )}
            </div>
            <CreateInfoForm isEditing={isEditing} setIsEditing={setIsEditing} basicInfo={basicInfo}/>
        </div>
    )
}