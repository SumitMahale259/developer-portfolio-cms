"use client";

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
            <button className="rounded border px-3 py-2">
                Loading...
            </button>
            // <div className="w-9 h-9 bg-gray-200 rounded-lg animate-pulse" />
        );
    }

    return(
        <button
            onClick={() =>
                setTheme(resolvedTheme  === "dark" ? "light" : "dark")
            }
            className="rounded border px-3 py-2"
        >
            {resolvedTheme  === "dark" ? "☼" : "☾"}
        </button>
    );
}