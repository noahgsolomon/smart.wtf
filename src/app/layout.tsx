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

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "smart.wtf",
  description: "Learning re-imagined",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta name="title" content={"smart.wtf"} />
      <meta name="description" content={"Learning re-imagined"} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://smart.wtf" />
      <meta property="og:title" content={"smart.wtf"} />
      <meta property="og:description" content={"Learning re-imagined"} />
      <meta
        property="og:image"
        content="https://images.codefoli.com/smartwtf.png"
      />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://smart.wtf" />
      <meta property="twitter:title" content={"smart.wtf"} />
      <meta property="twitter:description" content={"Learning re-imagined"} />
      <meta
        property="twitter:image"
        content="https://images.codefoli.com/smartwtf.png"
      />
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
