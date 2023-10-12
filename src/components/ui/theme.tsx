"use client"

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeButton() {
    const {resolvedTheme, setTheme} = useTheme();

    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <Button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>sup</Button>
    )
}