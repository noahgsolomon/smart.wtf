"use client";

import { Loader2, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./button";

export default function ThemeButton() {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <Button
        variant={"ghost"}
        disabled={true}
        className="opacity-80 transition-all"
      >
        <Loader2 className="h-4 w-4 animate-spin" />
      </Button>
    );

  return (
    <Button
      variant={"ghost"}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="transition-all"
    >
      {resolvedTheme === "light" ? (
        <SunIcon className="h-4 w-4" />
      ) : (
        <MoonIcon className="h-4 w-4" />
      )}
    </Button>
  );
}
