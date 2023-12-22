"use client";

import AddNote from "@/app/dashboard/components/notes/addnote";
import { Input } from "@/components/ui/input";
import { trpc } from "@/trpc/client";
import { type Note, type NoteCategories } from "@/types";
import {
  ChevronDown,
  ChevronRight,
  Clock,
  Folder,
  FolderOpen,
  Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function NotesMenu() {
  const initialCategories = {
    ENGLISH: 0,
    MATH: 0,
    SCIENCE: 0,
    HISTORY: 0,
    ARTS: 0,
    MUSIC: 0,
    LITERATURE: 0,
    PHILOSOPHY: 0,
    GEOGRAPHY: 0,
    "SOCIAL STUDIES": 0,
    "PHYSICAL EDUCATION": 0,
    "COMPUTER SCIENCE": 0,
    ECONOMICS: 0,
    "BUSINESS STUDIES": 0,
    PSYCHOLOGY: 0,
    LAW: 0,
    "POLITICAL SCIENCE": 0,
    "ENVIRONMENTAL SCIENCE": 0,
    ENGINEERING: 0,
    MEDICINE: 0,
    AGRICULTURE: 0,
    ASTRONOMY: 0,
  };

  const [preloadImages, setPreloadImages] = useState(false);
  const [preloadImagesList, setPreloadImagesList] = useState<string[]>([]);

  const [categoryOpenState, setCategoryOpenState] = useState<{
    [key in NoteCategories]: boolean;
  }>(
    Object.keys(initialCategories).reduce(
      (acc, category) => {
        acc[category as NoteCategories] = false;
        return acc;
      },
      {} as { [key in NoteCategories]: boolean },
    ),
  );

  const toggleCategory = (category: NoteCategories) => {
    setCategoryOpenState((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const [loading, setLoading] = useState(true);

  const getUserNotesQuery = trpc.notes.getUserNotes.useQuery();

  const [notes, setNotes] = useState<Note[]>([]);

  const [topicInput, setTopicInput] = useState("");

  const [presentCategories, setPresentCategories] =
    useState<{ [key in NoteCategories]: number }>(initialCategories);

  useEffect(() => {
    setNotes(getUserNotesQuery.data?.notes ?? []);

    const categoryCounts = { ...presentCategories };
    for (const note of getUserNotesQuery.data?.notes ?? []) {
      if (note.category in categoryCounts) {
        categoryCounts[note.category as NoteCategories]++;
      }
    }

    setPresentCategories(categoryCounts);
    setLoading(false);
    setPreloadImages(true);
  }, [getUserNotesQuery.data?.notes]);

  useEffect(() => {
    console.log(preloadImagesList);
  }, [preloadImagesList]);

  return (
    <div className="min-h-[475px] rounded-lg border border-border bg-card p-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row  items-center gap-4 border-b border-border pb-2 md:gap-4 lg:gap-8">
          <h1>Notes</h1>
          <div>|</div>
          <AddNote visible={true} />
        </div>
        <div className="relative ">
          <Input
            className="shadow-none"
            placeholder="search here"
            onChange={(e) => {
              setTopicInput(e.target.value);
            }}
            value={topicInput}
          />
          <Search className="absolute right-2 top-2 h-4 w-4" />
        </div>
        <div className="flex max-h-[400px] flex-col gap-2 overflow-y-auto overflow-x-hidden">
          {loading ? (
            <div className="flex flex-col gap-2">
              <Skeleton className="flex h-10 w-full cursor-pointer flex-row items-center justify-between rounded-lg border border-border bg-secondary p-2 transition-all hover:bg-secondary/80"></Skeleton>
              <Skeleton className="flex h-10 w-full cursor-pointer flex-row items-center justify-between rounded-lg border border-border bg-secondary p-2 transition-all hover:bg-secondary/80"></Skeleton>
            </div>
          ) : (
            <>
              {Object.entries(presentCategories).map(([category, count]) => {
                if (count === 0) {
                  return null;
                }

                return (
                  <>
                    <div>
                      <div
                        onClick={() =>
                          toggleCategory(category as NoteCategories)
                        }
                        className="group flex cursor-pointer flex-row items-center justify-between rounded-lg border border-border bg-secondary p-2 transition-all hover:bg-secondary/80"
                      >
                        <div className={` flex flex-row items-center gap-2`}>
                          {categoryOpenState[category as NoteCategories] ? (
                            <>
                              <ChevronDown className="h-4 w-4" />
                              <FolderOpen
                                className={`h-6 w-6 ${
                                  category === "ENGLISH"
                                    ? "fill-english/50 text-english"
                                    : category === "MATH"
                                    ? "fill-math/50 text-math"
                                    : category === "SCIENCE"
                                    ? "fill-science/50 text-science"
                                    : category === "HISTORY"
                                    ? "fill-history/50 text-history"
                                    : category === "ARTS"
                                    ? "fill-arts/50 text-arts"
                                    : category === "MUSIC"
                                    ? "fill-music/50 text-music"
                                    : category === "LITERATURE"
                                    ? "fill-literature/50 text-literature"
                                    : category === "PHILOSOPHY"
                                    ? "fill-philosophy/50 text-philosophy"
                                    : category === "GEOGRAPHY"
                                    ? "fill-geography/50 text-geography"
                                    : category === "SOCIAL STUDIES"
                                    ? "fill-socialStudies/50 text-socialStudies"
                                    : category === "PHYSICAL EDUCATION"
                                    ? "fill-physicalEducation/50 text-physicalEducation"
                                    : category === "COMPUTER SCIENCE"
                                    ? "fill-computerScience/50 text-computerScience"
                                    : category === "ECONOMICS"
                                    ? "fill-economics/50 text-economics"
                                    : category === "BUSINESS STUDIES"
                                    ? "fill-businessStudies/50 text-businessStudies"
                                    : category === "PSYCHOLOGY"
                                    ? "fill-psychology/50 text-psychology"
                                    : category === "LAW"
                                    ? "fill-law/50 text-law"
                                    : category === "POLITICAL SCIENCE"
                                    ? "fill-politicalScience/50 text-politicalScience"
                                    : category === "ENVIRONMENTAL SCIENCE"
                                    ? "fill-environmentalScience/50 text-environmentalScience"
                                    : category === "ENGINEERING"
                                    ? "fill-engineering/50 text-engineering"
                                    : category === "MEDICINE"
                                    ? "fill-medicine/50 text-medicine"
                                    : category === "AGRICULTURE"
                                    ? "fill-agriculture/50 text-agriculture"
                                    : category === "ASTRONOMY"
                                    ? "fill-astronomy/50 text-astronomy"
                                    : ""
                                }`}
                              />
                            </>
                          ) : (
                            <>
                              <ChevronRight className="h-4 w-4" />
                              <Folder
                                className={`h-6 w-6 ${
                                  category === "ENGLISH"
                                    ? "fill-english/50 text-english"
                                    : category === "MATH"
                                    ? "fill-math/50 text-math"
                                    : category === "SCIENCE"
                                    ? "fill-science/50 text-science"
                                    : category === "HISTORY"
                                    ? "fill-history/50 text-history"
                                    : category === "ARTS"
                                    ? "fill-arts/50 text-arts"
                                    : category === "MUSIC"
                                    ? "fill-music/50 text-music"
                                    : category === "LITERATURE"
                                    ? "fill-literature/50 text-literature"
                                    : category === "PHILOSOPHY"
                                    ? "fill-philosophy/50 text-philosophy"
                                    : category === "GEOGRAPHY"
                                    ? "fill-geography/50 text-geography"
                                    : category === "SOCIAL STUDIES"
                                    ? "fill-socialStudies/50 text-socialStudies"
                                    : category === "PHYSICAL EDUCATION"
                                    ? "fill-physicalEducation/50 text-physicalEducation"
                                    : category === "COMPUTER SCIENCE"
                                    ? "fill-computerScience/50 text-computerScience"
                                    : category === "ECONOMICS"
                                    ? "fill-economics/50 text-economics"
                                    : category === "BUSINESS STUDIES"
                                    ? "fill-businessStudies/50 text-businessStudies"
                                    : category === "PSYCHOLOGY"
                                    ? "fill-psychology/50 text-psychology"
                                    : category === "LAW"
                                    ? "fill-law/50 text-law"
                                    : category === "POLITICAL SCIENCE"
                                    ? "fill-politicalScience/50 text-politicalScience"
                                    : category === "ENVIRONMENTAL SCIENCE"
                                    ? "fill-environmentalScience/50 text-environmentalScience"
                                    : category === "ENGINEERING"
                                    ? "fill-engineering/50 text-engineering"
                                    : category === "MEDICINE"
                                    ? "fill-medicine/50 text-medicine"
                                    : category === "AGRICULTURE"
                                    ? "fill-agriculture/50 text-agriculture"
                                    : category === "ASTRONOMY"
                                    ? "fill-astronomy/50 text-astronomy"
                                    : ""
                                }`}
                              />
                            </>
                          )}
                          {category
                            .toLowerCase()
                            .split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1),
                            )
                            .join(" ")}
                        </div>
                        <div className="flex flex-row items-center gap-2 ">
                          {count}
                        </div>
                      </div>
                      <div
                        className={`${
                          categoryOpenState[category as NoteCategories]
                            ? ""
                            : "hidden"
                        }`}
                      >
                        <div className="flex flex-col gap-2 py-2 pl-4">
                          {notes.map((note) => (
                            <>
                              {note.category === category && (
                                <HoverCard closeDelay={50} openDelay={100}>
                                  <HoverCardTrigger>
                                    <Link
                                      href={`/notes/${note.id}`}
                                      className="flex cursor-pointer flex-row items-center gap-1 rounded-lg border border-border p-2 transition-all hover:-translate-y-0.5"
                                    >
                                      <p>{note.emoji}</p>
                                      <p>
                                        {note.title.length > 30
                                          ? `${note.title.slice(0, 30)}...`
                                          : note.title}
                                      </p>
                                    </Link>
                                  </HoverCardTrigger>
                                  <HoverCardContent
                                    className={`${
                                      preloadImagesList.includes(note.imageUrl!)
                                        ? ""
                                        : "hidden"
                                    }`}
                                    align="start"
                                  >
                                    <Link
                                      href={`/notes/${note.id}`}
                                      className="flex flex-col justify-between gap-4 transition-all hover:-translate-y-0.5"
                                    >
                                      <div className="relative">
                                        <Image
                                          className="rounded-lg border border-border"
                                          src={
                                            note.imageUrl ?? "/generating1.gif"
                                          }
                                          alt="image"
                                          width={300}
                                          height={300}
                                        />
                                        <Image
                                          alt={note.agents.name}
                                          src={note.agents.pfp}
                                          width={40}
                                          height={40}
                                          className="absolute bottom-1 left-1 z-10 rounded-full border border-border bg-secondary"
                                        />
                                      </div>

                                      <div className="flex flex-col gap-1 ">
                                        <p className="text-lg">{note.title}</p>
                                        <Link
                                          className={buttonVariants()}
                                          href={`/quiz/${note.id}?prev=/dashboard`}
                                        >
                                          Create Quiz
                                        </Link>

                                        <div className="flex flex-row items-center gap-1 text-sm text-primary/80">
                                          <Clock className="h-4 w-4" />
                                          <span>
                                            {note.minutes} minute read.
                                          </span>
                                        </div>

                                        <div className="flex">
                                          <Badge
                                            /*@ts-ignore*/
                                            variant={note?.category
                                              .toLowerCase()
                                              .split(" ")
                                              .map((word, index) =>
                                                index === 0
                                                  ? word
                                                  : word
                                                      .charAt(0)
                                                      .toUpperCase() +
                                                    word.slice(1),
                                              )
                                              .join("")}
                                          >
                                            {note?.category}
                                          </Badge>
                                        </div>

                                        <p className="text-xs text-primary/60">
                                          {note.description}
                                        </p>
                                      </div>
                                    </Link>
                                  </HoverCardContent>
                                </HoverCard>
                              )}
                            </>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          )}

          {/* {notes.length === 0 && !loading && (
            <div className="flex flex-col items-center gap-2">
              <p className="text-xl">no notes.</p>
              <Image
                src={"/sadface.png"}
                width={48}
                height={48}
                alt="sad face"
              />
            </div>
          )} */}
        </div>
      </div>
      {preloadImages &&
        notes.map((note) => {
          return (
            <div key={note.id} className="h-0 w-0 opacity-0">
              <Image
                src={note.imageUrl ?? "/generating1.gif"}
                alt="Preload image"
                width={300}
                height={300}
                className=""
                onLoad={() => {
                  console.log("fired!");
                  setPreloadImagesList((prevState) => [
                    ...prevState,
                    note.imageUrl!,
                  ]);
                }}
              />
            </div>
          );
        })}
    </div>
  );
}
