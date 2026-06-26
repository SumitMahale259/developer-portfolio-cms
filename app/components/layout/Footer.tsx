import Link from "next/link";
import { ArrowUpRightIcon, EnvelopeIcon, GifIcon, LinkIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center text-center gap-10 md:flex-row md:items-center md:justify-between md:text-left">
          {/* Brand */}
          <Link href="/">
            <h2 className="text-2xl font-bold tracking-tight">
              Sumit
              <span className="text-blue-600">.</span>
            </h2>
          </Link>

          {/* Description */}
          <p className="mt-4 max-w-md text-sm leading-6 text-gray-600 dark:text-gray-400">
            {/* Full Stack Developer building modern web applications with Next.js, TypeScript, Prisma and PostgreSQL. */}
            Full Stack Developer crafting scalable, performant, and user-focused web applications.
          </p>

          {/* Resume */}
          {/* <Link
            href="/resume.pdf"
            target="_blank"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-all hover:scale-105 hover:bg-blue-700"
          >
            Resume
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link> */}

          {/* Socials */}
          <div className="mt-8 flex items-center gap-4">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="rounded-full p-3 transition hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              <GifIcon className="h-5 w-5" />
            </a>

            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-full p-3 transition hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              <LinkIcon className="h-5 w-5" />
            </a>

            <a
              href="mailto:your@email.com"
              aria-label="Email"
              className="rounded-full p-3 transition hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              <EnvelopeIcon className="h-5 w-5" />
            </a>
          </div>

          
        </div>

        {/* Copyright */}
        <div className="mt-8 w-full border-t border-gray-200 pt-6 dark:border-slate-800 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Sumit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}



// export default function Footer() {
//     return(
//         <footer className="border-t py-6">
//             <p className="text-center text-sm">
//                 © {new Date().getFullYear()} Sumit.
//                 All rights reserved.
//             </p>
//         </footer>
//     )
// }