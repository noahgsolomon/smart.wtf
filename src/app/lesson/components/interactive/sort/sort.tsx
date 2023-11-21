"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./sortableitem";
import { Button } from "@/components/ui/button";

export default function Sort() {
  const [items, setItems] = useState([
    "option1",
    "option2",
    "option3",
    "option4",
  ]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <div className="rounded-lg border border-border p-4">
      <div className="flex flex-col gap-4">
        <div></div>
        <div>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-2">
                {items.map((option) => (
                  <SortableItem key={option} option={option} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
        <div className="flex flex-row gap-2">
          <Button>Check</Button>
          <Button variant={"secondary"}>See explanation</Button>
        </div>
      </div>
    </div>
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}
