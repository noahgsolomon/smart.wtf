"use client";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { type NoteCategories } from "@/types";
import { ChevronRight, Clock, Folder, FolderOpen, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type useNotesMenu from "./useNotesMenu";

export default function AllNotes({
  presentCategories,
  toggleCategory,
  categoryOpenState,
  notes,
  setPresentCategories,
  preloadImagesList,
  initialCategories,
  deleteNoteMutation,
}: Pick<
  ReturnType<typeof useNotesMenu>,
  | "presentCategories"
  | "toggleCategory"
  | "categoryOpenState"
  | "notes"
  | "setPresentCategories"
  | "preloadImagesList"
  | "initialCategories"
  | "deleteNoteMutation"
>) {
  return (
    <>
      {Object.entries(presentCategories).map(([category, count]) => {
        if (count === 0) {
          return null;
        }

        return (
          <>
            <div>
              <div
                onClick={() => toggleCategory(category as NoteCategories)}
                className=" group flex cursor-pointer flex-row items-center justify-between rounded-lg border border-border bg-secondary/90 p-2 transition-all hover:bg-secondary/80"
              >
                <div className={`flex flex-row items-center gap-2 text-lg`}>
                  <ChevronRight
                    className={`h-4 w-4 ${
                      categoryOpenState[category as NoteCategories]
                        ? "rotate-90"
                        : ""
                    } transition-all`}
                  />
                  {categoryOpenState[category as NoteCategories] ? (
                    <>
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
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </div>
                <div className="flex flex-row items-center gap-2 ">{count}</div>
              </div>
              <div
                className={`${
                  categoryOpenState[category as NoteCategories] ? "" : "hidden"
                }`}
              >
                <div className="flex flex-col gap-2 py-2">
                  {notes.map((note) => (
                    <>
                      {note.category === category && (
                        <HoverCard closeDelay={50} openDelay={500}>
                          <HoverCardTrigger>
                            <div className="group flex cursor-pointer flex-row items-center justify-between gap-1 rounded-lg border border-border p-2 transition-all hover:-translate-y-0.5">
                              <Link
                                className="flex h-full w-full flex-row items-center gap-4 text-lg"
                                href={`/notes/${note.id}`}
                              >
                                <Image
                                  src={note.imageUrl ?? "/generating1.gif"}
                                  className="rounded-lg border fine:hidden"
                                  alt="note image"
                                  width={80}
                                  height={48}
                                />
                                <p className="text-lg coarse:hidden">
                                  {note.emoji}
                                </p>
                                <p className="text-lg">
                                  {note.title.length > 30
                                    ? `${note.title.slice(0, 30)}...`
                                    : note.title}
                                </p>
                              </Link>

                              <Dialog>
                                <DialogTrigger
                                  className="group z-10 block transition-all md:opacity-0 md:group-hover:opacity-100"
                                  asChild
                                >
                                  <Button variant={"ghost"} className="p-2">
                                    <Trash2 className="h-4 w-4 transition-all group-hover:text-destructive" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="rounded-lg sm:max-w-[425px]">
                                  <DialogHeader>
                                    <DialogTitle className="">
                                      <Image
                                        src={note.agents.pfp}
                                        alt={note.agents.name}
                                        width={48}
                                        height={48}
                                        className="rounded-full border border-border bg-secondary"
                                      />
                                      <h3>Delete Note</h3>
                                    </DialogTitle>
                                    <DialogDescription>
                                      {note.agents.name === "Rick Sanchez"
                                        ? "Morty, just get rid of it!"
                                        : note.agents.name === "Patrick Star"
                                        ? "Can we say goodbye first?"
                                        : note.agents.name === "Mr. Burns"
                                        ? "Release the hounds on this note."
                                        : note.agents.name === "Bender"
                                        ? `Let's go already, dump it!`
                                        : "Are you sure you want to delete this note?"}
                                    </DialogDescription>
                                  </DialogHeader>

                                  <DialogFooter className="flex gap-2">
                                    <DialogClose asChild>
                                      <Button variant={"outline"}>
                                        Cancel
                                      </Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                      <Button
                                        onClick={() => {
                                          setPresentCategories(
                                            initialCategories,
                                          );
                                          deleteNoteMutation.mutate({
                                            id: note.id,
                                          });
                                        }}
                                        className="flex flex-row gap-1"
                                        variant={"destructive"}
                                      >
                                        Delete
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    </DialogClose>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </HoverCardTrigger>
                          <HoverCardContent
                            className={`coarse:hidden ${
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
                                  src={note.imageUrl ?? "/generating1.gif"}
                                  alt="image"
                                  width={300}
                                  height={300}
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
                                  <span>{note.minutes} minute read.</span>
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
                                          : word.charAt(0).toUpperCase() +
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
  );
}
