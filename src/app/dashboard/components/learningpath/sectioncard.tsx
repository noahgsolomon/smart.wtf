"use client";

import Image from "next/image";
import Link from "next/link";

export default function SectionCard({
  name,
  imageUrl,
  link,
}: {
  name: string;
  imageUrl: string;
  link: string;
}) {
  return (
    <Link
      href={link}
      className="flex min-w-[250px] flex-row items-center gap-4 rounded-lg border bg-secondary/60 p-2 transition-all hover:-translate-y-0.5 active:scale-[99%]"
    >
      <Image
        src={imageUrl}
        alt="machine learning"
        width={80}
        height={80}
        className="h-[64px] w-[64px] rounded-lg border md:h-[80px] md:w-[80px]"
        /*className="h-[64px] w-[112px] rounded-lg border md:h-[80px] md:w-[140px]" */
      />
      <div>
        <p className="text-sm text-primary/90 md:text-base">{name}</p>
      </div>
    </Link>
  );
}
