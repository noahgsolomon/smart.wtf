import "./globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";
import Providers from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "@/components/navbar";
import { TRPCReactProvider } from "@/trpc/react";
import { headers } from "next/headers";
import ProgressBarProvider from "./progressbar";
import { Analytics } from "@vercel/analytics/react";
import { constructMetadata } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link
          rel="manifest"
          crossOrigin="use-credentials"
          href="manifest.json"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={inter.className}>
        <TRPCReactProvider headers={headers()}>
          <ClerkProvider>
            <Providers>
              <ProgressBarProvider>
                <NavBar />
                {children}
                {modal}
                <Analytics />
              </ProgressBarProvider>
            </Providers>
          </ClerkProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
