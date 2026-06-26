import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

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

                <h1 className="font-semibold">
                    Dashboard
                </h1>
            </header>

            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-40 bg-black/40 md:hidden"
                />
            )}

            <aside
                className={clsx(
                "fixed inset-y-0 left-0 z-50 w-64 border-r bg-white p-5 transition-transform dark:bg-black",
                open
                    ? "translate-x-0"
                    : "-translate-x-full",
                "md:translate-x-0"
                )}
            >
                <div className="mb-6 flex justify-end md:hidden">
                    <button onClick={() => setOpen(false)}>
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>
                <Sidebar onNavigate={() => setOpen(false)}/>
            </aside>
        </>
    )
}