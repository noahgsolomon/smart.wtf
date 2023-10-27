import { siteConfig } from "@/config/site";
import { type ClassValue, clsx } from "clsx";
import { type Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  if (typeof window !== "undefined") return path;
  if (process.env.MODE === "PROD")
    return `https://${process.env.WEBSITE}${path}`;
  if (process.env.MODE === "DEV")
    return `https://${process.env.VERCEL_URL}${path}`;
  return `http://localhost:${process.env.PORT ?? 3000}${path}`;
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    // manifest: "/manifest.json",
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@noahgsolomon",
    },
    icons: { apple: "/smartwtf.png" },
    metadataBase: new URL("https://smart.wtf"),
    themeColor: "#030a1b",
    ...(noIndex && {
      robots: {
        index: true,
        follow: true,
      },
    }),
  };
}
