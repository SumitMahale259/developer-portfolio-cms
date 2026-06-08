import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({adapter});

async function main() {
    await prisma.project.create({
        data: {
            title: "Developer Portfolio CMS",
            slug: "developer-portfolio-cms",
            description: "My portfolio built with Next.js",
            featured: true,
        }
    })
}

main();