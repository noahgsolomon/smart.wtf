import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import Providers from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "@/components/navbar";
import { TRPCReactProvider } from "@/trpc/react";
import { headers } from "next/headers";
import ProgressBarProvider from "./progressbar";
import { Analytics } from "@vercel/analytics/react";
import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Learning platform",
    "Interactive learning",
    "System design",
    "AI and machine learning",
    "Computer science",
  ],
  authors: [
    {
      name: "noahgsolomon",
      url: "https://twitter.com/noahgsolomon",
    },
  ],
  creator: "noahgsolomon",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`https://images.codefoli.com/smartwtf.png`],
    creator: "@noahgsolomon",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
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
                <Analytics />
              </ProgressBarProvider>
            </Providers>
          </ClerkProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
