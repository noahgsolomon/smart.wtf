"use client";

import { useSectionContext } from "@/app/lesson/sectioncontext";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { type Section } from "@/types";
import useSound from "use-sound";

export default function LessonButtons({
  subSection,
  section,
  params,
}: {
  section: Section[];
  subSection: number;
  params: { lesson: string; slug: string; chapter: string };
}) {
  const [play] = useSound("/click.mp3");
  const [finishAudio] = useSound("/finish.mp3");

  const subSectionMutate = trpc.course.setSubsectionCompleted.useMutation();
  const { setSection } = useSectionContext();

  const handleContinue = ({ finish }: { finish?: boolean }) => {
    if (finish) {
      finishAudio();
    } else {
      play();
    }
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
        <Button onClick={() => handleContinue({})}>Continue</Button>
      ) : (
        <Button onClick={() => handleContinue({ finish: true })}>Finish</Button>
      )}
    </>
  );
}
