"use client"

import { useState } from "react";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Prisma } from "@/app/generated/prisma/client";
import CreateStatsForm from "./form/create-stats-form";

type Statistics = Prisma.AboutGetPayload<{
    select: {
        experienceYears: true;
        projectsCount: true;
    };
}>

interface StatisticsProps {
    about: Statistics | null,
    editable?: boolean;
}

export default function Statistics({editable = false, about}: StatisticsProps) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="space-y-8">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Statistics</h2>
                {editable && (
                    <button
                        type="button"
                        onClick={() => setIsEditing((prev) => !prev)}
                    >
                        {isEditing ? <XMarkIcon className="w-5 cursor-pointer"/> : <PencilIcon className="w-5 cursor-pointer"/>}
                    </button>
                )}
            </div>
            <CreateStatsForm isEditing={isEditing} setIsEditing={setIsEditing} about={about}/>
        </div>
    )
}