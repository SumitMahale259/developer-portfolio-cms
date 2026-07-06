import { Prisma } from "../generated/prisma/client";
import { prisma } from "./prisma";

export async function fetchProjects() {
    try {
        const projects = await prisma.project.findMany({
            include: {
                projectImg: true,
            },
        });
        return projects;
    } catch (error) {
        console.error("Database error: ", error);
        throw new Error("Failed to fetch projects.");
    }
}

export async function fetchProjectById(id: string) {
    try {
        const project = await prisma.project.findUnique({
            where: {
                id,
            },
            include: {
                projectImg: true,
            }
        })
        return project;
    } catch (error) {
        console.error("Database error: ", error);
        throw new Error("Failed to fetch project.");
    }
}

export async function fetchAbout<T extends Prisma.AboutFindFirstArgs>(
    args: Prisma.SelectSubset<T, Prisma.AboutFindFirstArgs>
) {
    return prisma.about.findFirst(args);
}

// export async function fetchBasicInfo() {
//     try {
//         const about = await prisma.about.findFirst({
//             include: {
//                 profileImg: true,
//             },
//         });
//         return about;
//     } catch (error) {
//         console.error("Database error: ", error);
//         throw new Error("Failed to fetch basic information.");
//     }
// }