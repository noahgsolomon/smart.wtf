"use client";

import { motion } from "framer-motion";
import ChapterButtons from "./chapterbuttons";

const fadeVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

export default function ChapterTitle({
  title,
  chapterNum,
  chapters,
}: {
  title: string;
  chapterNum: number;
  chapters: number;
}) {
  return (
    <motion.div
      variants={fadeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col gap-4 text-center text-3xl"
    >
      <p className="font-bold">Chapter {chapterNum}:</p>
      <h1 className="font-bold">{title}</h1>
      <ChapterButtons chapterNum={chapterNum} chapterCount={chapters} />
    </motion.div>
  );
}
