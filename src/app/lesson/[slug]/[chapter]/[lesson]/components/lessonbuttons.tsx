"use client";

import { useSectionContext } from "@/app/lesson/sectioncontext";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { type Section } from "@/types";

export default function LessonButtons({
  subSection,
  section,
  params,
}: {
  section: Section[];
  subSection: number;
  params: { lesson: string; slug: string; chapter: string };
}) {
  const subSectionMutate = trpc.course.setSubsectionCompleted.useMutation();
  const { setSection } = useSectionContext();

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
