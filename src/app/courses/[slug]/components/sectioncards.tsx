"use client";

import ProgressSpinner from "@/components/progressspinner";
import { Lock } from "lucide-react";
import Image from "next/image";
import { type api } from "@/trpc/server";
import Link from "next/link";

import { motion } from "framer-motion";
import { useState } from "react";

export default function SectionCards({
  chapter,
  chapterProgress,
  courseData,
}: {
  chapter: number;
  chapterProgress: {
    status: string;
    data: {
      sectionId: number;
      percentageCompleted: number;
    }[];
  };
  courseData: Awaited<ReturnType<typeof api.course.getCourseBySlug.query>>;
}) {
  const course = courseData.course!;

  const cardVariants = {
    offscreen: {
      opacity: 0,
    },
    onscreen: (index: number) => ({
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        delay: index * 0.1,
      },
    }),
  };

  // const imageVariants = {
  //   normal: {
  //     position: "absolute" as const,
  //     top: 0,
  //     right: 0,
  //     width: "350px",
  //     height: "200px",
  //   },
  //   expanded: {
  //     width: "100%",
  //     height: "100%",
  //     position: "absolute" as const,
  //     top: 0,
  //     right: 0,
  //     zIndex: 10,
  //     transition: { duration: 0.3 },
  //   },
  // };

  return (
    <div className="flex flex-col gap-4">
      {course.courseChapters[chapter - 1]?.courseChapterSections
        .sort((a, b) => a.order - b.order)
        .map((section, index) => (
          <motion.div
            initial="offscreen"
            animate="onscreen"
            variants={cardVariants}
            custom={index}
            key={section.id}
            className={`group relative max-w-[350px] justify-center overflow-hidden rounded-lg border border-border bg-card transition-all hover:scale-[101%] active:scale-[99%] sm:max-w-none lg:w-[800px] ${
              section.implemented ? "cursor-pointer" : "cursor-not-allowed"
            }`}
          >
            {!section.implemented && (
              <div className="absolute bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center rounded-lg bg-black/30 dark:bg-black/50">
                <Lock className="h-4 w-4" />
              </div>
            )}
            {/* {clicked === index && (
              <div className="absolute inset-0 z-20 flex items-center justify-center rounded-lg">
                <motion.img
                  src={section.imageUrl}
                  alt={section.name}
                  variants={imageVariants}
                  initial="normal"
                  animate="expanded"
                  exit="normal"
                  className="rounded-lg object-cover"
                />
              </div>
            )} */}
            <div className="flex flex-col justify-between sm:flex-row">
              <div className="flex flex-col gap-2 px-4 py-2 sm:flex-row">
                <div>
                  <h3 className="max-w-[20ch] text-base font-bold lg:text-lg">
                    {section.name}
                  </h3>
                  <p className="max-w-[40ch] text-xs lg:text-sm">
                    {section.description}
                  </p>
                </div>
                <ProgressSpinner
                  progress={
                    chapterProgress.data.find((s) => s.sectionId === section.id)
                      ?.percentageCompleted ?? 0
                  }
                />
              </div>
              <div className="overflow-hidden">
                <Image
                  className="rounded-b-lg border-t border-t-border duration-300 group-hover:scale-[105%] sm:w-[250px] sm:rounded-r-lg sm:rounded-bl-none sm:border-l sm:border-t-0 sm:border-border lg:w-[350px]"
                  width={350}
                  priority={true}
                  height={200}
                  src={section.imageUrl}
                  alt={section.name}
                />
              </div>
            </div>
            {section.implemented && (
              <Link
                className="absolute inset-0 z-20"
                href={`/lesson/${course.slug}/${chapter}/${section.id}?l=1`}
              ></Link>
            )}
          </motion.div>
        ))}
    </div>
  );
}
