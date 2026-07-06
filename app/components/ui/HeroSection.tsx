import Link from "next/link";
import TypingText from "../TypingText";
import { fetchAbout } from "@/app/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function HeroSection() {
    const basicInfo = await fetchAbout({
        select: {
            fullName: true,
            summary: true,
            roles: true,
            profileImg: true,
        }
    });
    if (!basicInfo) {
        notFound();
    }
    const { fullName, summary, roles, profileImg } = basicInfo;
    const firstName = fullName?.trim().split(/\s+/)[0] ?? "";

    return (
        <section className="relative overflow-hidden">
            <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center px-6 py-20 md:flex-row">
                {/* Left */}
                <div className="flex-1 text-center md:text-left">
                    <span className="inline-flex rounded-full border px-4 py-2 text-sm">
                        Available for opportunities
                    </span>

                    <h1 className="mt-6 text-3xl font-black md:text-5xl">
                        Hi, I'm {firstName}
                    </h1>

                    <div className="min-h-[144px] md:min-w-[616px]">
                        <TypingText roles={roles}/>
                    </div>
                    {/* <h1 className="mt-6 text-5xl font-black tracking-tight md:text-7xl">
                        Full Stack
                        <br/>
                        Developer
                    </h1> */}

                    <p className="mt-6 max-w-xl text-lg text-gray-600 dark:text-gray-400">
                        {/* Building modern web applications with
                        Next.js, TypeScript, Prisma and PostgreSQL. */}
                        {summary}
                    </p>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                        <Link
                        href="/projects"
                        className="rounded-full bg-blue-600 px-6 py-3 font-medium text-white"
                        >
                        View Projects
                        </Link>

                        <Link
                        href="/contact"
                        className="rounded-full border px-6 py-3 font-medium"
                        >
                        Contact Me
                        </Link>
                    </div>

                    <div className="mt-10 flex flex-wrap justify-center gap-3 md:justify-start">
                        <span className="rounded-full border px-3 py-1 text-sm">
                        Next.js
                        </span>

                        <span className="rounded-full border px-3 py-1 text-sm">
                        React
                        </span>

                        <span className="rounded-full border px-3 py-1 text-sm">
                        TypeScript
                        </span>

                        <span className="rounded-full border px-3 py-1 text-sm">
                        Prisma
                        </span>
                    </div>
                </div>

                {/* Right */}
                {/* <div className="mt-16 flex-1 md:mt-0">
                    <div className="mx-auto flex h-80 w-80 items-center justify-center rounded-full border bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                        <span className="text-8xl">👨‍💻</span>
                        <span className="text-8xl">
                            {profileImg ?
                                <Image src={profileImg.imageUrl} width={200} height={100} alt={profileImg?.imageName}/>
                             :
                                <span className="text-8xl">👨‍💻</span>
                            }
                        </span>
                    </div>
                </div> */}
            </div>
        </section>
    )
}