"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const backgrounds = [
  { background: "/generating8.gif", mode: "light" },
  { background: "/generating7.gif", mode: "light" },
  { background: "/generating5.gif", mode: "light" },
  { background: "/generating11.gif", mode: "dark" },
  { background: "/arena.gif", mode: "light" },
  { background: "/woods.gif", mode: "light" },
];

export default function Page({
  searchParams,
}: {
  searchParams: { prev: string };
}) {
  const router = useRouter();

  const background = useMemo(() => {
    return backgrounds[Math.floor(Math.random() * backgrounds.length)];
  }, []);

  const [selectedNote, setSelectedNote] = useState("");

  const notes = trpc.notes.getUserNotes.useQuery().data?.notes;

  const containerVariants = {
    hidden: { x: "-10vw", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", delay: 0.1 } },
  };

  const textVariants = {
    hidden: { x: "-10vw" },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", delay: 0.2 },
    },
  };

  const buttonVariantsAnimation = {
    hidden: { x: "-10vw", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", delay: 0.4 },
    },
  };

  return (
    <div
      className={`relative flex h-screen w-full flex-row items-center justify-center `}
    >
      <Image
        alt="background"
        src={background?.background ?? "/arena.gif"}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="z-0"
      />
      <motion.div
        className="flex flex-col items-center justify-center gap-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className={`max-w-[75%] text-center text-5xl italic ${
            background?.mode === "light"
              ? "text-secondary dark:text-primary"
              : "text-primary dark:text-secondary"
          }`}
          variants={textVariants}
        >
          Select the note you want to be quizzed on
        </motion.h1>
        <Select onValueChange={(value) => setSelectedNote(value)}>
          <SelectTrigger
            className={`w-[280px] transition-all ${
              background?.mode === "dark"
                ? "bg-primary text-secondary hover:bg-primary/80 dark:bg-secondary dark:text-primary dark:hover:bg-secondary/80"
                : "bg-secondary text-primary hover:bg-secondary/80 dark:bg-primary dark:text-secondary dark:hover:bg-primary/80"
            }`}
          >
            <SelectValue
              className={`w-[280px] bg-primary`}
              placeholder="Select a note"
            />
          </SelectTrigger>
          <SelectContent className="flex flex-col gap-2 border-none bg-transparent shadow-none">
            {notes?.map((note) => (
              <SelectItem
                className={`my-1 w-[280px] cursor-pointer transition-all ${
                  background?.mode === "dark"
                    ? "bg-primary text-secondary hover:bg-primary/80 dark:bg-secondary dark:text-primary dark:hover:bg-secondary/80"
                    : "bg-secondary text-primary hover:bg-secondary/80 dark:bg-primary dark:text-secondary dark:hover:bg-primary/80"
                }`}
                value={note.id.toString()}
              >
                {note.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <motion.div
          className="flex flex-col gap-2"
          variants={buttonVariantsAnimation}
        >
          <Button
            disabled={!selectedNote}
            onClick={() => {
              router.push(`quiz/${selectedNote}?bg=${background?.background}`);
            }}
            variant={background?.mode === "light" ? "darkMode" : "lightMode"}
          >
            Create
          </Button>
          <Link
            href={searchParams.prev ?? "/dashboard"}
            className={buttonVariants({
              className: "flex flex-row gap-2",
              variant:
                background?.mode === "light" ? "darkModeLink" : "lightModeLink",
            })}
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
