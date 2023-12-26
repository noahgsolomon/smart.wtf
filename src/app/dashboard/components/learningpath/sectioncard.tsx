"use client";

import Image from "next/image";

export default function SectionCard() {
  return (
    <div className="flex w-full flex-row gap-1 rounded-lg border p-2">
      <Image
        src={"/machinelearning.png"}
        alt="machine learning"
        width={100}
        height={100}
        className="h-full rounded-lg border"
      />
      <div>
        <p className="flex flex-nowrap overflow-x-auto text-sm font-bold">
          Introduction to Machine Learning Some Some Some
        </p>
        <p className="text-xs opacity-60">
          Learn the basics of machine learning
        </p>
      </div>
    </div>
  );
}