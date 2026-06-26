import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Link from "next/link";

export default function MobileSidebar() {
    const [open, setOpen] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY <= 10) {
                setShowHeader(true);
            } else if (currentScrollY > lastScrollY) {
                // scrolling down
                setShowHeader(false);
            } else {
                // scrolling up
                setShowHeader(true);
            }
            setLastScrollY(currentScrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <>
            <header className={`fixed top-0 left-0 z-50 w-full bg-white/70 backdrop-blur-lg dark:bg-slate-950/70 flex items-center transition-transform duration-300 ease-in-out justify-between border-b p-4 md:hidden ${showHeader ? "translate-y-0" : "-translate-y-full"}`}>
                <button onClick={() => setOpen(true)}>
                <Bars3Icon className="h-7 w-7" />
                </button>

                <Link href="/dashboard" className="font-semibold">
                    Dashboard
                </Link>
            </header>

            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-40 bg-black/40 md:hidden"
                />
            )}

            <aside
                className={clsx(
                "fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col border-r bg-white dark:bg-black transition-transform",
                // "fixed inset-y-0 left-0 z-50 w-64 border-r bg-white p-5 transition-transform dark:bg-black",
                open
                    ? "translate-x-0"
                    : "-translate-x-full",
                "md:translate-x-0"
                )}
            >
                {/* <div className="flex justify-end px-4 pt-4 translate-y-11 md:hidden"> */}
                {/* <div className="mb-6 flex justify-end md:hidden"> */}
                    <button onClick={() => setOpen(false)} className="absolute right-4 top-4 md:hidden">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                {/* </div> */}
                <div className="flex-1 overflow-hidden p-4">
                    <Sidebar onNavigate={() => setOpen(false)}/>
                </div>
            </aside>
        </>
    )
}