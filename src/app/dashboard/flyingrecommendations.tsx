"use client";

import { trpc } from "@/trpc/client";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type FlyingImage = {
  image_url: string;
  title: string;
  agent_id: number;
  startSide: "left";
  width: number;
  height: number;
  views: number;
  top: string;
  animationDelay: string;
  left?: string;
  speed: number;
  id: number;
};

export default function FlyingRecommendations() {
  const randomNotesQuery = trpc.notes.findRandomNotes.useQuery();
  const [randomNotes, setRandomNotes] = useState<FlyingImage[]>([]);

  useEffect(() => {
    if (randomNotesQuery.data) {
      const updatedNotes = randomNotesQuery.data.map((note) => {
        const randomVal = Math.floor(Math.random() * 100) + 300;
        return {
          ...note,
          startSide: "left",
          width: randomVal,
          height: randomVal * (4 / 7),
          views: Math.floor(Math.random() * 10000),
        };
      });

      const updatedNotesWithPosition = updatedNotes.map((note, index) => {
        const offScreenPosition = `-500px`;
        return {
          ...note,
          top: `${Math.random() * (window.innerHeight - 600 - note.height)}px`,
          left: note.startSide === "left" ? offScreenPosition : undefined,
          animationDelay: `${index * 8}s`,
          speed: (window.innerWidth / 1000) * 40,
        };
      });

      setRandomNotes(updatedNotesWithPosition as FlyingImage[]);
    }
  }, [randomNotesQuery.data]);

  return (
    <div className="relative h-[35vh] w-screen overflow-hidden">
      {randomNotes.map((note, index) => {
        const animationName =
          note.startSide === "left" ? "slideInFromLeft" : "slideInFromRight";
        return (
          <Link
            href={`/notes/${note.id}`}
            key={index}
            style={{
              width: note.width,
              height: note.height,
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1)), url(${note.image_url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              animation: `${animationName} ${note.speed}s linear ${note.animationDelay}`,
              position: "absolute",
              top: note.top,
              left: note.left,
            }}
            className={`group z-10 flex-col items-stretch justify-between overflow-hidden rounded-lg border p-4 shadow-md transition-all`}
          >
            <div className="text-xl font-bold text-white group-hover:underline">
              {note.title}
            </div>
            <div className="gap-1text-xs flex items-center text-white">
              <EyeIcon className="h-3 w-3" /> {note.views} views
            </div>
          </Link>
        );
      })}
    </div>
  );
}
