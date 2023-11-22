import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

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
    <div className="flex w-full flex-row items-center gap-2">
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
            <p>{option}</p>
            {completed ? (
              <Check className="h-5 w-5 text-success" />
            ) : (
              <div className="flex flex-col gap-1 transition-all group-hover:opacity-50">
                <div className="flex flex-row gap-1"></div>
                <div className="flex flex-row gap-1">
                  <div className="h-1 w-1 rounded-lg bg-primary"></div>
                  <div className="h-1 w-1 rounded-lg bg-primary"></div>
                </div>
                <div className="flex flex-row gap-1">
                  <div className="h-1 w-1 rounded-lg bg-primary"></div>
                  <div className="h-1 w-1 rounded-lg bg-primary"></div>
                </div>
                <div className="flex flex-row gap-1">
                  <div className="h-1 w-1 rounded-lg bg-primary"></div>
                  <div className="h-1 w-1 rounded-lg bg-primary"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
