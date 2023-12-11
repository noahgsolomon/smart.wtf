"use client";

import AddNote from "@/app/dashboard/components/notes/addnote";
import { Input } from "@/components/ui/input";
import { trpc } from "@/trpc/client";
import { type Note, type NoteCategories } from "@/types";
import {
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  Hash,
  Search,
  StickyNote,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

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

  const getUserNotesQuery = trpc.notes.getUserNotes.useQuery();

  const [notes, setNotes] = useState<Note[]>([]);

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
  }, [getUserNotesQuery.data?.notes]);

  return (
    <div className="min-h-[475px] rounded-lg border border-border bg-card p-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row  items-center gap-4 border-b border-border pb-2 md:gap-4 lg:gap-8">
          <h1>Notes</h1>
          <div>|</div>
          <AddNote />
        </div>
        <div className="relative ">
          <Input placeholder="search here" value={""} />
          <Search className="absolute right-2 top-2 h-4 w-4" />
        </div>
        <div className="flex max-h-[400px] flex-col gap-2 overflow-y-auto overflow-x-hidden">
          {Object.entries(presentCategories).map(([category, count]) => {
            if (count === 0) {
              return null;
            }

            const categoryTailwindFormatted = category
              .toLowerCase()
              .split(" ")
              .map((word, index) =>
                index === 0
                  ? word
                  : word.charAt(0).toUpperCase() + word.slice(1),
              )
              .join("");

            console.log(categoryTailwindFormatted);

            return (
              <>
                <div>
                  <div
                    onClick={() => toggleCategory(category as NoteCategories)}
                    className="group flex cursor-pointer flex-row items-center justify-between rounded-lg border border-border bg-secondary p-2 transition-all hover:bg-secondary/80"
                  >
                    <div className={` flex flex-row items-center gap-2`}>
                      {categoryOpenState[category as NoteCategories] ? (
                        <>
                          <ChevronDown className="h-4 w-4" />
                          <FolderOpen
                            className={`h-6 w-6 fill-${categoryTailwindFormatted}/50 text-${categoryTailwindFormatted}`}
                          />
                        </>
                      ) : (
                        <>
                          <ChevronRight className="h-4 w-4" />
                          <Folder
                            className={`h-6 w-6 fill-${categoryTailwindFormatted}/50 text-${categoryTailwindFormatted}`}
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
                      <Hash className="h-4 w-4" />
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
                    <div className="flex flex-col gap-2 py-2 pl-8">
                      {notes.map((note) => (
                        <>
                          {note.category === category && (
                            <div className="flex cursor-pointer flex-row items-center gap-2 rounded-lg border border-border p-2 transition-all hover:-translate-y-0.5">
                              <StickyNote className="text-sticky/80 fill-sticky/40 h-4 w-4" />
                              <h5 className="font-bold">
                                {note.title.length > 20
                                  ? `${note.title.slice(0, 20)}...`
                                  : note.title}
                              </h5>{" "}
                            </div>
                          )}
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            );
          })}
          {notes.length === 0 && (
            <div className="flex flex-col items-center gap-2">
              <p className="text-xl">no notes.</p>
              <Image
                src={"/sadface.png"}
                width={48}
                height={48}
                alt="sad face"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
