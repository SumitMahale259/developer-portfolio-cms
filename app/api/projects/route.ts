import { prisma } from "@/app/lib/prisma";

export async function GET() {
    const projects = await prisma.project.findMany();

    return Response.json(projects);
}

export async function POST(request: Request) {
    const res = await request.json();
    const project = await prisma.project.create({
        data: {
            title: res.title,
            slug: res.slug,
            description: res.description
        }
    });

    return Response.json(project);
}