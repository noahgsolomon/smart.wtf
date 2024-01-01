"use client";

import Image from "next/image";
import type useNotesMenu from "./usenotesmenu";

export default function PreloadImages({
  preloadImages,
  setPreloadImagesList,
  notes,
}: Pick<
  ReturnType<typeof useNotesMenu>,
  "preloadImages" | "setPreloadImagesList" | "notes"
>) {
  if (!preloadImages) {
    return null;
  }

  return (
    <>
      {notes.map((note) => {
        return (
          <div key={note.id} className="h-0 w-0 opacity-0">
            <Image
              src={note.imageUrl ?? "/generating1.gif"}
              alt="Preload image"
              width={300}
              height={300}
              className=""
              onLoad={() => {
                setPreloadImagesList((prevState) => [
                  ...prevState,
                  note.imageUrl!,
                ]);
              }}
            />
          </div>
        );
      })}
    </>
  );
}
