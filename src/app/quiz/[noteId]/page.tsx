"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { Note } from "@/types";

const backgrounds = [
  { background: "/generating8.gif", mode: "light" },
  { background: "/generating7.gif", mode: "light" },
  { background: "/generating5.gif", mode: "light" },
  { background: "/generating11.gif", mode: "dark" },
  { background: "/arena.gif", mode: "light" },
  { background: "/woods.gif", mode: "light" },
];

// generating9 dark
// generating8 light
// generating6 dark
// generating11 dark
// arena light
// woods light

export default function Page({
  params,
  searchParams,
}: {
  params: { noteId: string };
  searchParams: { prev: string; bg: string };
}) {
  const background = useMemo(() => {
    return backgrounds[Math.floor(Math.random() * backgrounds.length)];
  }, []);

  const router = useRouter();

  const getNoteQuery = trpc.notes.getNote.useQuery({
    id: parseInt(params.noteId),
  });

  const [note, setNote] = useState<Note | null>(null);
  const [isImageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (getNoteQuery.status === "success" && getNoteQuery.data) {
      setNote(getNoteQuery.data.note);
    } else if (getNoteQuery.status === "error") {
      router.push(searchParams.prev ?? "/dashboard");
    }
  }, [getNoteQuery.status, getNoteQuery.data, router, searchParams.prev]);

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

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  if (!isImageLoaded) {
    return (
      <Image
        alt="background"
        src={
          searchParams.bg &&
          backgrounds.map((bg) => bg.background).includes(searchParams.bg)
            ? searchParams.bg
            : background?.background ?? "/arena.gif"
        }
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="z-0 opacity-0"
        onLoad={handleImageLoaded}
      />
    );
  }

  return (
    <div
      className={`relative flex h-screen w-full flex-row items-center justify-center `}
    >
      <Image
        alt="background"
        src={
          searchParams.bg &&
          backgrounds.map((bg) => bg.background).includes(searchParams.bg)
            ? searchParams.bg
            : background?.background ?? "/arena.gif"
        }
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
        <motion.div
          className="mt-16 flex flex-col text-center"
          variants={textVariants}
        >
          <h1
            className={`text-4xl font-light ${
              background?.mode === "light"
                ? "text-secondary/60 dark:text-primary/60"
                : "text-primary/60 dark:text-secondary/60"
            }`}
          >
            Quiz
          </h1>
          <h3
            className={`text-4xl ${
              background?.mode === "light"
                ? "text-secondary dark:text-primary"
                : "text-primary dark:text-secondary"
            }`}
          >
            {note?.title}
          </h3>
        </motion.div>
        <motion.h1
          className={`text-center text-5xl italic ${
            background?.mode === "light"
              ? "text-secondary dark:text-primary"
              : "text-primary dark:text-secondary"
          }`}
          variants={textVariants}
        >
          ARE YOU READY?
        </motion.h1>
        <motion.div
          className="flex flex-col gap-2"
          variants={buttonVariantsAnimation}
        >
          <Button
            variant={background?.mode === "light" ? "darkMode" : "lightMode"}
            size={"lg"}
          >
            Let's do it!
          </Button>
          <Link
            href={searchParams.prev ?? "/dashboard"}
            className={buttonVariants({
              variant:
                background?.mode === "light" ? "darkModeLink" : "lightModeLink",
            })}
          >
            <ArrowLeft className="h-4 w-4" />
            No, take me back
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
