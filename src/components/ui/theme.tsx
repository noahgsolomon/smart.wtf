"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./button";

export default function ThemeButton() {
	const { resolvedTheme, setTheme } = useTheme();

	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	return (
		<Button
			variant={"ghost"}
			className={`${!mounted ? "opacity-80" : ""}`}
			disabled={!mounted}
			onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
		>
			{resolvedTheme === "light" ? (
				<SunIcon className="w-4 h-4" />
			) : (
				<MoonIcon className="w-4 h-4" />
			)}
		</Button>
	);
}
