"use client";

import { ArrowPathIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const {resolvedTheme , setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            // <button className="rounded border px-3 py-2">
            <button className="rounded-full p-2 transition hover:bg-gray-100 dark:hover:bg-slate-800 w-10">
                <ArrowPathIcon className={!mounted ? "animate-spin" : ""}/>
            </button>
            // <div className="w-9 h-9 bg-gray-200 rounded-lg animate-pulse" />
        );
    }

    return(
        <button
            onClick={() =>
                setTheme(resolvedTheme  === "dark" ? "light" : "dark")
            }
            // className="rounded border px-3 py-2"
            className="rounded-full p-2 transition hover:bg-gray-100 dark:hover:bg-slate-800 w-10"
        >
            {/* {resolvedTheme  === "dark" ? "☼" : "☾"} */}
            {resolvedTheme  === "dark" ? <SunIcon/> : <MoonIcon/>}
        </button>
    );
}