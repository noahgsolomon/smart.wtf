import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { NoteCategories } from "@/types";
import something from "public/something.png";
import { CalculatorIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotesCard = async ({
  note,
}: {
  note: {
    category: NoteCategories;
    id: number;
    name: string;
    description: string;
    time: number;
  };
}) => {
  return (
    <div className="relative">
      <Link href={"#"}>
        <div className="group cursor-pointer overflow-hidden rounded-lg border border-border bg-card transition-all hover:scale-[101%] active:scale-[99%]">
          <div className="relative overflow-hidden border-b border-border">
            <div className="relative h-[325px] w-[325px] overflow-hidden transition-all duration-300 group-hover:scale-[105%]">
              <Image
                src={something}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
                alt=""
              />
            </div>
            <Button
              variant={"ghost"}
              className="absolute bottom-2 left-2 text-2xl hover:bg-primary/80 dark:hover:bg-secondary/80"
            >
              <CalculatorIcon className="h-6 w-6 text-secondary dark:text-primary" />
            </Button>
          </div>

          <div className="flex min-h-[100px] flex-col justify-between gap-2 p-4">
            <div className="flex flex-col justify-between gap-2">
              <div className="flex flex-row gap-2">
                <h2 className="text-2xl">{note.name}</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {/*@ts-ignore*/}
                <Badge variant={note.category.toLocaleLowerCase()}>
                  <p>{note.category}</p>
                </Badge>
                <Badge variant={"time"}>
                  <div className="flex flex-row gap-1">
                    <Clock className="h-4 w-4" />
                    <p>{note.time} min read</p>
                  </div>
                </Badge>
              </div>
            </div>
            <div className="max-w-[35ch] text-xs opacity-60">
              {note.description}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NotesCard;
