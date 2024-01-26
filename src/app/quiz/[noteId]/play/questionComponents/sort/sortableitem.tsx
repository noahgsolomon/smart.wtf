import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export function SortableItem({
  completed,
  className,
  option,
  order,
}: {
  className?: string;
  completed: boolean;
  option: string;
  order: number;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: option });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // Disable page scroll
    document.body.style.overflow = "hidden";
  };

  const handleDragEnd = () => {
    // Re-enable page scroll
    document.body.style.overflow = "";
  };

  return (
    <div className="flex max-w-[300px] flex-row items-center gap-2 md:max-w-full">
      <p className="opacity-50">{order}</p>
      <div
        ref={setNodeRef}
        style={style}
        className={cn(`w-full ${completed ? "opacity-50" : ""}`, className)}
        {...attributes}
        {...listeners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        // Prevent page scroll on touch devices
      >
        <div className="group rounded-lg border border-border bg-card p-4 transition-all active:scale-[101%] active:shadow-sm">
          <div className="flex items-center justify-between">
            <Markdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {option}
            </Markdown>
            {completed ? (
              <Check className="h-5 w-5 text-success" />
            ) : (
              <div className="flex flex-col gap-[2px] transition-all group-hover:opacity-50">
                <div className="flex flex-row gap-[2px]"></div>
                <div className="flex flex-row gap-[2px]">
                  <div className="h-[2px] w-[2px] rounded-lg bg-primary"></div>
                  <div className="h-[2px] w-[2px] rounded-lg bg-primary"></div>
                </div>
                <div className="flex flex-row gap-[2px]">
                  <div className="h-[2px] w-[2px] rounded-lg bg-primary"></div>
                  <div className="h-[2px] w-[2px] rounded-lg bg-primary"></div>
                </div>
                <div className="flex flex-row gap-[2px]">
                  <div className="h-[2px] w-[2px] rounded-lg bg-primary"></div>
                  <div className="h-[2px] w-[2px] rounded-lg bg-primary"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
