"use client"

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeButton() {
    const {resolvedTheme, setTheme} = useTheme();

    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <button className={`${!mounted ? 'opacity-80' : ''} transition-all`} disabled={!mounted} onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>{resolvedTheme === 'light' ? (<SunIcon className="w-5 h-5 hover:opacity-80 hover:transition-all" />) : (<MoonIcon className="w-5 h-5 hover:opacity-80 hover:transition-all"/>)}</button>
    )
}