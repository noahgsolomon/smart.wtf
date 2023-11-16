"use client";

import { useSectionContext } from "@/app/lesson/sectioncontext";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { type Section } from "@/types";
import { useRouter } from "next/navigation";
import useSound from "use-sound";

export default function LessonButtons({
  redirect,
  chapterId,
  chapterOrder,
  sectionOrder,
  subSection,
  section,
  blockOrder,
  blockId,
  params,
}: {
  redirect: string;
  chapterId: number;
  chapterOrder: number;
  sectionOrder: number;
  section: Section[];
  blockOrder: number;
  blockId: number;
  subSection: number;
  params: { lesson: string; slug: string; chapter: string };
}) {
  const [play] = useSound("/click.mp3");
  const [finishAudio] = useSound("/finish.mp3");
  const router = useRouter();

  const mutateBlock = trpc.course.setBlockCompleted.useMutation();
  const { setSection } = useSectionContext();

  const handleContinue = ({ finish = false }: { finish?: boolean }) => {
    if (finish) {
      finishAudio();
    } else {
      play();
    }
    mutateBlock.mutate({
      blockId,
      courseId: section[0]?.courseChapterSections.course.id!,
      blockOrder,
      sectionId: section[subSection - 1]?.courseChapterSections.id!,
      subSectionId: section[subSection - 1]?.id!,
      subSectionOrder: subSection,
      chapterId,
      chapterOrder,
      sectionOrder,
      slug: params.slug,
    });
    setSection((prev) => {
      const newSection = JSON.parse(JSON.stringify(prev));
      if (
        newSection[subSection - 1]?.blocks[blockOrder - 1]?.userCompletedBlocks
          .length === 0
      ) {
        newSection[subSection - 1]?.blocks[
          blockOrder - 1
        ]?.userCompletedBlocks.push({
          blockId: blockId,
        });
      }
      return newSection;
    });
    router.push(redirect);
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
