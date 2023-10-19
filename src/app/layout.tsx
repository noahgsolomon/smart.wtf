import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import Providers from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "@/components/navbar";
import { TRPCReactProvider } from "@/trpc/react";
import { headers } from "next/headers";
import ProgressBar from "./progressbar";
import ProgressBarProvider from "./progressbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Noah's Next.js Starter",
  description: "TypeScript, Next.js, Tailwind CSS, Drizzle ORM, Shadcn ui",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={inter.className}>
        <TRPCReactProvider headers={headers()}>
          <ClerkProvider>
            <Providers>
              <ProgressBarProvider>
                <NavBar />
                {children}
              </ProgressBarProvider>
            </Providers>
          </ClerkProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
