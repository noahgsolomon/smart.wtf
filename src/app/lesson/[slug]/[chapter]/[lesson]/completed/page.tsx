"use client";

import {
  MotionValue,
  animate,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import bro from "public/bro.gif";
import message from "public/message.png";
import { useEffect, useRef, useState } from "react";
import fireball from "public/fireball.gif";

const broTalk = [
  "good shit",
  "fuck yeah",
  "hell yeah",
  "nailed it",
  "common w",
  "bro smart asf",
];

export default function Page() {
  const progress = useMotionValue(0);
  const controls = useAnimation();
  const [isCheckmarkComplete, setIsCheckmarkComplete] = useState(false);

  const rightToLeftVariant = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const exitVariant = {
    exit: { x: -100, opacity: 0, transition: { duration: 0.2 } },
  };

  useEffect(() => {
    if (isCheckmarkComplete) {
      setTimeout(() => {
        controls.start("exit");
      }, 2000);
    }
  }, [isCheckmarkComplete, controls]);

  function CircularProgress({ progress }: { progress: MotionValue<number> }) {
    const checkmarkPathLength = useTransform(progress, [0, 95, 100], [0, 0, 1]);

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        controls.start("visible").then(() => setIsCheckmarkComplete(true));
      }, 1500); // Adjust timing as needed

      return () => clearTimeout(timeoutId);
    }, [controls]);

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
      const controls = animate(count, 100);
      return controls.stop;
    }
  }, [isCheckmarkComplete]);

  return (
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
      <h1>Lesson completed!</h1>
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
        className="absolute bottom-0 left-0 right-0 flex h-[200px] flex-row items-center justify-center"
        initial="hidden"
        animate={controls}
        variants={rightToLeftVariant}
      >
        <div className="absolute bottom-0 left-0 right-0 flex h-[200px] flex-row items-center justify-center">
          <div className="relative">
            <Image width={200} height={80} src={message} alt={"message"} />
            <div className="absolute left-0 top-[1.1rem] w-[200px]">
              <p className="text-center font-bold">{text}</p>
            </div>
          </div>
          <div className="-ml-8 pt-2">
            <Image width={100} height={100} src={bro} alt="bro" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
