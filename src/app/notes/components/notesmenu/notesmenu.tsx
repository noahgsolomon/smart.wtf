"use client";

import { Input } from "@/components/ui/input";
import { Image as LucideImage, PlusIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useNotesMenu from "./useNotesMenu";
import AllNotes from "./allnotes";
import ActiveNotes from "./activenotes";
import PreloadImages from "./preloadimages";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

export default function NotesMenu() {
  const {
    presentCategories,
    toggleCategory,
    categoryOpenState,
    notes,
    setPresentCategories,
    initialCategories,
    deleteNoteMutation,
    preloadImagesList,
    loading,
    topicInput,
    setTopicInput,
    setIsOpen,
    activeCategories,
    filteredNotes,
    preloadImages,
    setPreloadImagesList,
  } = useNotesMenu();

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="h-full max-h-[700px] overflow-y-auto overflow-x-hidden rounded-lg border bg-card/70 p-4 shadow-md dark:bg-card/80 md:min-h-fit">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between border-b border-border pb-2">
          <h1>Notes</h1>
          <Button
            onClick={() => setIsOpen(true)}
            className="flex flex-row gap-2"
          >
            <PlusIcon className="h-4 w-4" />
            Generate
          </Button>
        </div>

        <div className="flex flex-row gap-2">
          <div className="relative w-full">
            <Input
              placeholder="search here"
              onChange={(e) => setTopicInput(e.target.value)}
              value={topicInput}
            />
            <Search className="absolute right-2 top-2 h-4 w-4" />
          </div>
          {notes.length > 0 && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"outline"} className={`flex flex-row gap-2`}>
                  <LucideImage className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="hide-scrollbar flex max-h-[60vh] flex-wrap justify-center overflow-y-auto rounded-lg bg-transparent">
                {notes.map((note) => (
                  <>
                    {note.imageUrl && (
                      <Image
                        className="rounded-lg"
                        src={note.imageUrl}
                        width={500}
                        height={200}
                        alt={note.title}
                      />
                    )}
                  </>
                ))}
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="flex h-[500px] flex-col gap-2 overflow-y-auto overflow-x-hidden border-b md:h-[350px] lg:h-[400px] 2xl:h-[420px]">
          {topicInput.length === 0 ? (
            <AllNotes
              presentCategories={presentCategories}
              toggleCategory={toggleCategory}
              categoryOpenState={categoryOpenState}
              notes={notes}
              setPresentCategories={setPresentCategories}
              preloadImagesList={preloadImagesList}
              initialCategories={initialCategories}
              deleteNoteMutation={deleteNoteMutation}
            />
          ) : (
            <ActiveNotes
              activeCategories={activeCategories}
              toggleCategory={toggleCategory}
              categoryOpenState={categoryOpenState}
              filteredNotes={filteredNotes}
              setPresentCategories={setPresentCategories}
              preloadImagesList={preloadImagesList}
              initialCategories={initialCategories}
              deleteNoteMutation={deleteNoteMutation}
            />
          )}
        </div>
      </div>
      <PreloadImages
        preloadImages={preloadImages}
        setPreloadImagesList={setPreloadImagesList}
        notes={notes}
      />
    </div>
  );
}

function Loader() {
  return (
    <div className="h-full max-h-[700px] overflow-y-auto rounded-lg border bg-card/70 p-4 shadow-md dark:bg-card/80 md:min-h-fit">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between border-b border-border pb-2">
          <h1>Notes</h1>
          <Button disabled className="flex flex-row gap-2">
            <PlusIcon className="h-4 w-4" />
            Generate
          </Button>
        </div>
        <div className="relative ">
          <Input placeholder="search here" disabled />
          <Search className="absolute right-2 top-2 h-4 w-4" />
        </div>
        <div className="flex max-h-[400px] flex-col gap-2 overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col gap-2">
            <Skeleton className="flex h-10 w-full cursor-pointer flex-row items-center justify-between rounded-lg border border-border bg-secondary/90 p-2 transition-all hover:bg-secondary/80"></Skeleton>
            <Skeleton className="flex h-10 w-full cursor-pointer flex-row items-center justify-between rounded-lg border border-border bg-secondary/90 p-2 transition-all hover:bg-secondary/80"></Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
}
