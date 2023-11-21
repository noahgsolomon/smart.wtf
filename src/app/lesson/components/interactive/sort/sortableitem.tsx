import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem({
  className,
  option,
}: {
  className?: string;
  option: string;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: option });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={className}
      {...attributes}
      {...listeners}
    >
      <div className="rounded-lg border border-border bg-card p-4 transition-all active:scale-[101%] active:shadow-sm">
        <div className="group flex justify-between">
          <p>{option}</p>
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
        </div>
      </div>
    </div>
  );
}
