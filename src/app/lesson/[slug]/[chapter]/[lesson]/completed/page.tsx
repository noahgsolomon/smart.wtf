"use client";

import {
  type MotionValue,
  animate,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import bro from "public/bro.gif";
import message from "public/message.png";
import { useEffect, useState } from "react";
import fireball from "public/fireball.gif";
import { trpc } from "@/trpc/client";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import useSound from "use-sound";

const broTalk = [
  "good shit",
  "fuck yeah",
  "hell yeah",
  "nailed it",
  "common w",
  "bro smart asf",
];

export default function Page({
  params,
}: {
  params: { slug: string; chapter: string; lesson: string };
}) {
  const nextSectionQuery = trpc.course.getNextSection.useQuery({
    sectionId: parseInt(params.lesson),
  });
  const nextSection = nextSectionQuery.data;
  const upNextControls = useAnimation();

  const [play] = useSound("/click.mp3", { volume: 0.5 });

  const progress = useMotionValue(0);
  const streakQuery = trpc.user.currentStreak.useQuery();
  const controls = useAnimation();
  const [isCheckmarkComplete, setIsCheckmarkComplete] = useState(false);
  const [showUpNext, setShowUpNext] = useState(false);
  const [showCompleted, setShowCompleted] = useState(true);

  const rightToLeftVariant = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const h1Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const exitVariant = {
    exit: { x: -100, opacity: 0, transition: { duration: 0.2 } },
  };

  const upNextVariant = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, transition: { duration: 0.2 }, opacity: 1 },
  };

  useEffect(() => {
    if (isCheckmarkComplete) {
      setTimeout(() => {
        controls.start("exit").then(() => {
          setShowCompleted(false);
          setTimeout(() => {
            setShowUpNext(true);
            setTimeout(() => {
              upNextControls.start("visible");
            }, 250);
          }, 250);
        });
      }, 3500);
    }
  }, [isCheckmarkComplete, controls, upNextControls]);

  function CircularProgress({ progress }: { progress: MotionValue<number> }) {
    const checkmarkPathLength = useTransform(progress, [0, 95, 100], [0, 0, 1]);

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        controls.start("visible").then(() => setIsCheckmarkComplete(true));
      }, 1500);

      return () => clearTimeout(timeoutId);
    }, []);

    return (
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="258"
        height="258"
        viewBox="0 0 258 258"
      >
        <motion.path
          transform="translate(60 85)"
          d="M3 50L45 92L134 3"
          fill="transparent"
          stroke="#7BB86F"
          strokeWidth={16}
          style={{ pathLength: checkmarkPathLength }}
        />
      </motion.svg>
    );
  }

  const [text, setText] = useState("");
  useEffect(() => {
    if (isCheckmarkComplete) {
      const finalText = broTalk[Math.floor(Math.random() * broTalk.length)];
      for (let i = 0; i < finalText!.length; i++) {
        setTimeout(() => {
          setText((prev) => prev + finalText![i]);
        }, i * 150);
      }
    }
  }, [isCheckmarkComplete]);

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  useEffect(() => {
    if (isCheckmarkComplete) {
      const controls = animate(count, streakQuery.data?.streak ?? 1);
      return controls.stop;
    }
  }, [isCheckmarkComplete, count, streakQuery.data?.streak]);

  const completed = showCompleted && (
    <motion.div
      variants={exitVariant}
      initial="hidden"
      animate={controls}
      exit="exit"
      className=" flex h-[80vh] w-screen flex-col items-center justify-center"
    >
      <div className="flex items-center justify-center ">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: 100 }}
          style={{ x: progress }}
          transition={{ duration: 1 }}
        />
        <CircularProgress progress={progress} />
      </div>
      <motion.h1 variants={h1Variants} initial="hidden" animate="visible">
        Lesson completed!
      </motion.h1>{" "}
      <motion.div
        className="flex flex-row items-center gap-2 pt-8"
        initial="hidden"
        animate={controls}
        variants={rightToLeftVariant}
      >
        <div className="flex flex-row items-center gap-2 pt-8">
          <Image src={fireball} alt="fireball" width={50} height={50} />
          <p className="flex flex-row items-center gap-2">
            You are on a
            <motion.div className="text-2xl font-bold">{rounded}</motion.div>{" "}
            day streak!
          </p>
        </div>
      </motion.div>
      <motion.div
        className="flex h-[200px] flex-row items-center justify-center"
        initial="hidden"
        animate={controls}
        variants={rightToLeftVariant}
      >
        <div className="flex h-[200px] flex-row items-center justify-center">
          <div className="relative">
            <Image width={200} height={80} src={message} alt={"message"} />
            <div className="absolute left-0 top-[1.1rem] w-[200px]">
              <p className="text-center font-bold dark:text-secondary">
                {text}
              </p>
            </div>
          </div>
          <div className="-ml-8 pt-2">
            <Image width={100} height={100} src={bro} alt="bro" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const upNext = showUpNext && (
    <>
      {nextSection?.nextSection ? (
        <>
          <motion.div
            animate={upNextControls}
            variants={upNextVariant}
            initial="hidden"
            style={{
              backgroundImage: `url(${nextSection?.nextSection.imageUrl})`,
            }}
            className="absolute left-0 top-0 h-full w-full bg-cover bg-center opacity-80 blur-xl"
          ></motion.div>
          <motion.div
            animate={upNextControls}
            variants={upNextVariant}
            initial="hidden"
            className="z-10 flex h-[80vh] w-screen flex-col items-center justify-center"
          >
            <h1 className="z-20 pb-4 text-3xl ">Up Next</h1>
            <div
              className={`relative max-w-[350px] cursor-pointer justify-center rounded-lg border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:scale-[101%] hover:shadow-md active:scale-[99%] sm:max-w-none lg:w-[800px]`}
            >
              {!nextSection.nextSection.implemented ? (
                <div className="absolute bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center rounded-lg bg-black/30 dark:bg-black/50">
                  <Lock className="h-4 w-4" />
                </div>
              ) : (
                <a
                  className="absolute inset-0 z-20"
                  href={`/lesson/${params.slug}/${params.chapter}/${nextSection.nextSection.id}?l=1`}
                ></a>
              )}
              <div className="flex flex-col justify-between sm:flex-row">
                <div className="flex flex-col gap-2 px-4 py-2 sm:flex-row">
                  <div>
                    <h3 className="max-w-[20ch] text-base font-bold lg:text-lg">
                      {nextSection.nextSection.name}
                    </h3>
                    <p className="max-w-[40ch] text-xs lg:text-sm">
                      {nextSection.nextSection.description}
                    </p>
                  </div>
                </div>
                <div>
                  <Image
                    className="rounded-b-lg border-t border-t-border sm:w-[250px] sm:rounded-r-lg sm:rounded-bl-none sm:border-l sm:border-t-0 sm:border-border lg:w-[350px]"
                    width={350}
                    priority={true}
                    height={200}
                    src={nextSection.nextSection.imageUrl}
                    alt={nextSection.nextSection.name}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center gap-4 pt-8">
              <a
                href={`/courses/${params.slug}?chapter=${params.chapter}`}
                className={buttonVariants({ className: "z-10" })}
              >
                Exit
              </a>
              {nextSection.nextSection.implemented ? (
                <a
                  onClick={() => play()}
                  href={`/lesson/${params.slug}/${params.chapter}/${nextSection.nextSection.id}?l=1`}
                  className={buttonVariants({ className: "z-10" })}
                >
                  Continue
                </a>
              ) : (
                <Button
                  disabled={true}
                  className={buttonVariants({ className: "z-10" })}
                >
                  {"Next lesson not yet created"}
                </Button>
              )}
            </div>
          </motion.div>
        </>
      ) : (
        <></>
      )}
    </>
  );

  return (
    <>
      {completed}
      {upNext}
    </>
  );
}
