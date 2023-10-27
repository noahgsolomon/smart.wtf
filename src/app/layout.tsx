import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "@/components/navbar";
import { TRPCReactProvider } from "@/trpc/react";
import { headers } from "next/headers";
import ProgressBarProvider from "./progressbar";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  appleWebApp: true,
  icons: ['https://images.codefoli.com/wtfcoin.png'],
  openGraph: {
    url: "https://smart.wtf",
    title: "smart.wtf",
    description: "interactive learning",
    images: ['https://images.codefoli.com/alienplanet.png']
  },
  title: "smart.wtf",
  description: "interactive learning",
  twitter: {
    card: "summary_large_image",
    site: "smart.wtf",
    creator: "@noahgsolomon",
    images: ['https://images.codefoli.com/alienplanet.png']

  },
}

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <TRPCReactProvider headers={headers()}>
          <ClerkProvider>
            <Providers>
              <ProgressBarProvider>
                <NavBar />
                {children}
                {modal}
              </ProgressBarProvider>
            </Providers>
          </ClerkProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
