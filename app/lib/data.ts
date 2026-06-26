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
        throw new Error("Failed to fetch project.")
    }
}

export async function fetchBasicInfo() {
    try {
        const basicInfo = await prisma.about.findFirst({
            select: {
                fullName: true,
                summary: true,
                roles: true,
                profileImg: true,
            },
        })
        return basicInfo;
    } catch (error) {
        console.error("Database error: ", error);
        throw new Error("Failed to fetch basic information.");
    }
}