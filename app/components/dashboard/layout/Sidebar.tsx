// import { logout } from "@/app/lib/actions/auth-action";
// import { PowerIcon } from "@heroicons/react/24/outline";
// import Link from "next/link";
// import ThemeToggle from "../../layout/ThemeToggle";

// export default function Sidebar() {
//     return (
//         <nav className="flex flex-col gap-4">
//             <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
//                 <Link href="/dashboard">Dashboard</Link>
//                 <Link href="/dashboard/projects">Projects</Link>
//                 <Link href="/dashboard/blogs">Blogs</Link>
//                 <Link href="/dashboard/skills">Skills</Link>
//                 <Link href="/dashboard/about">About</Link>
//                 <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
//                 <ThemeToggle/>
//                 <form action={logout}>
//                     <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm cursor-pointer font-medium md:flex-none md:justify-start md:p-2 md:px-3">
//                         <PowerIcon className="w-6" />
//                         <div className="hidden md:block">Sign Out</div>
//                     </button>
//                 </form>
//             </div>
//         </nav>
//     )
// }



"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  FolderIcon,
  DocumentTextIcon,
  BoltIcon,
  UserIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import ThemeToggle from "../../layout/ThemeToggle";
import { logout } from "@/app/lib/actions/auth-action";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    name: "Projects",
    href: "/dashboard/projects",
    icon: FolderIcon,
  },
  {
    name: "Blogs",
    href: "/dashboard/blogs",
    icon: DocumentTextIcon,
  },
  {
    name: "Skills",
    href: "/dashboard/skills",
    icon: BoltIcon,
  },
  {
    name: "About",
    href: "/dashboard/about",
    icon: UserIcon,
  },
];

interface SidebarProps {
  onNavigate?: () => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <nav className="flex h-full flex-col">
      <div className="mb-8">
        <h1 className="text-xl font-bold">
          Dashboard
        </h1>
      </div>

      <div className="flex flex-1 flex-col gap-1">
        {links.map((link) => {
          const Icon = link.icon;

          const active =
            pathname === link.href ||
            (link.href !== "/dashboard" &&
              pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                active
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "hover:bg-gray-100 dark:hover:bg-slate-900"
              )}
            >
              <Icon className="h-5 w-5" />
              {link.name}
            </Link>
          );
        })}
      </div>

      <div className="border-t pt-4 space-y-4">
        <ThemeToggle />

        <form action={logout}>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950 transition-colors">
            <PowerIcon className="h-5 w-5" />
            Sign Out
          </button>
        </form>
      </div>
    </nav>
  );
}