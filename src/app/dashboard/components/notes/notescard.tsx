import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { type api } from "@/trpc/server";
import { Clock } from "lucide-react";

type NotesApiResponse = Awaited<
  ReturnType<typeof api.notes.getUserNotes.query>
>;

type SingleNoteType = NotesApiResponse["notes"][number];

const NotesCard = ({ note }: { note: SingleNoteType }) => {
  return (
    <div className=" relative">
      <Link href={`/notes/${note.id}`}>
        <div className=" group min-h-[450px] cursor-pointer overflow-hidden rounded-lg border border-border bg-card transition-all hover:scale-[101%] active:scale-[99%]">
          <div className="relative overflow-hidden border-b border-border">
            <Image
              width={50}
              height={50}
              src={note.agents.pfp}
              alt="agent"
              className="absolute bottom-2 left-2 z-10 rounded-full border border-border bg-secondary/90"
            />
            <div className="relative h-[325px] w-[325px] overflow-hidden transition-all duration-300 group-hover:scale-[105%]">
              <Image
                src={
                  note.imageUrl ??
                  `/generating${Math.floor(Math.random() * 4)}.gif`
                }
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
                alt=""
              />
            </div>
          </div>

          <div className="flex min-h-[100px] flex-col justify-between gap-2 p-4">
            <div className="flex flex-col justify-between gap-2">
              <div className="flex flex-row items-center gap-2">
                <h2 className="max-w-[15ch] text-2xl">{note.title}</h2>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  /*@ts-ignore */
                  variant={note.category
                    .toLowerCase()
                    .split(" ")
                    .map((word, index) =>
                      index === 0
                        ? word
                        : word.charAt(0).toUpperCase() + word.slice(1),
                    )
                    .join("")}
                >
                  <p>{note.category}</p>
                </Badge>
                <Badge variant={"time"}>
                  <div className="flex flex-row gap-1">
                    <Clock className="h-4 w-4" />
                    <p>{note.minutes} min read</p>
                  </div>
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NotesCard;
