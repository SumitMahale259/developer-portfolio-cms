import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden">
            <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center px-6 py-20 md:flex-row">
                
                {/* Left */}
                <div className="flex-1 text-center md:text-left">
                <span className="inline-flex rounded-full border px-4 py-2 text-sm">
                    Available for opportunities
                </span>

                <h1 className="mt-6 text-5xl font-black tracking-tight md:text-7xl">
                    Full Stack
                    <br />
                    Developer
                </h1>

                <p className="mt-6 max-w-xl text-lg text-gray-600 dark:text-gray-400">
                    Building modern web applications with
                    Next.js, TypeScript, Prisma and PostgreSQL.
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
                    </div>
                </div> */}
            </div>
        </section>
    )
}