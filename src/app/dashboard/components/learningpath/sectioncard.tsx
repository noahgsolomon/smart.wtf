"use client";

import Image from "next/image";

export default function SectionCard({
  name,
  imageUrl,
}: {
  name: string;
  imageUrl: string;
}) {
  return (
    <div className="flex min-w-[250px] flex-row items-center gap-4 rounded-lg border p-2">
      <Image
        src={imageUrl}
        alt="machine learning"
        width={80}
        height={80}
        className="h-[64px] w-[64px] rounded-lg border md:h-[80px] md:w-[80px]"
      />
      <div>
        <p className="text-sm font-bold md:text-base">{name}</p>
      </div>
    </div>
  );
}
