"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ChapterButtons({
  chapterCount,
  chapterNum,
}: {
  chapterCount: number;
  chapterNum: number;
}) {
  return (
    <div className="flex flex-row justify-center gap-2">
      {/* Previous Chapter Link */}
      {chapterNum > 1 && (
        <Link
          className={cn(
            buttonVariants(),
            "flex flex-row gap-1 transition-all hover:gap-2",
          )}
          href={`?chapter=${chapterNum - 1}`}
        >
          <ArrowLeft className="h-4 w-4" />
          Chapter {chapterNum - 1}
        </Link>
      )}
      {/* Next Chapter Link */}
      {chapterCount > chapterNum && (
        <Link
          className={cn(
            buttonVariants(),
            "flex flex-row gap-1 transition-all hover:gap-2",
          )}
          href={`?chapter=${chapterNum + 1}`}
        >
          Chapter {chapterNum + 1} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
