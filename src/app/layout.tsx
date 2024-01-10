import "./globals.css";
import Providers from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "@/components/nav/navbar";
import { TRPCReactProvider } from "@/trpc/react";
import { headers } from "next/headers";
import { type Metadata } from "next";
import ProgressBarProvider from "./progressbar";
import { GeistSans } from "geist/font";
import { ChatProvider } from "./context/chat/ChatContext";
import { Background } from "@/components/ui/background";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  viewport: "width=device-width, initial-scale=1",
  appleWebApp: true,
  manifest: "/manifest.json",
  icons: { apple: "/icon.png" },
  openGraph: {
    url: "https://smart.wtf",
    title: "smart.wtf",
    description: "interactive learning",
    images: ["https://images.codefoli.com/alienplanet.png"],
  },
  title: "smart.wtf",
  description: "interactive learning",
  twitter: {
    card: "summary_large_image",
    site: "smart.wtf",
    creator: "@noahgsolomon",
    images: ["https://images.codefoli.com/alienplanet.png"],
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.className} antialiased`}>
        <TRPCReactProvider headers={headers()}>
          <ClerkProvider>
            <Providers>
              <ProgressBarProvider>
                <ChatProvider>
                  <NavBar />
                  <Background />
                  {children}
                  {modal}
                </ChatProvider>
              </ProgressBarProvider>
            </Providers>
          </ClerkProvider>
        </TRPCReactProvider>
        <Analytics />
      </body>
    </html>
  );
}
