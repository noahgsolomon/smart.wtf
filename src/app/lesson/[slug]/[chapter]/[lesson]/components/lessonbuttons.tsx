"use client";

import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { Section } from "@/types";
import { type Dispatch, type SetStateAction } from "react";

export default function LessonButtons({
  subSection,
  setSection,
  section,
  params,
}: {
  section: Section[];
  setSection: Dispatch<SetStateAction<Section[]>>;
  subSection: number;
  params: { lesson: string; slug: string; chapter: string };
}) {
  const subSectionMutate = trpc.course.setSubsectionCompleted.useMutation();

  const handleContinue = () => {
    subSectionMutate.mutate({
      sectionId: parseInt(params.lesson),
      order: subSection,
    });
    setSection((prev) => {
      const newSections = JSON.parse(JSON.stringify(prev));
      const currentSubSection = newSections[subSection - 1];
      if (currentSubSection?.blocks) {
        for (const block of currentSubSection.blocks) {
          if (block.userCompletedBlocks.length === 0) {
            block.userCompletedBlocks.push({ blockId: block.id });
          }
        }
      }
      return newSections;
    });
  };

  return (
    <>
      {section.length > subSection ? (
        <Button onClick={handleContinue}>Continue</Button>
      ) : (
        <Button onClick={handleContinue}>Finish</Button>
      )}
    </>
  );
}
