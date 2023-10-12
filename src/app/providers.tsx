'use client'

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes"

interface ProvidersProps {
    children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
    return (
            <ThemeProvider attribute="class">
                {children}
            </ThemeProvider>
    );
}

export default Providers