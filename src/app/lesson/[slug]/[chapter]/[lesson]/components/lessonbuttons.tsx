"use client";

import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";

export default function LessonButtons({ block, subSection, section }: any) {
  const blockMutate = trpc.course.setBlockCompleted.useMutation();

  return (
    <>
      {section.section.length > subSection ? (
        <Button
          onClick={() => {
            blockMutate.mutate({
              blockId: block.id,
            });
          }}
        >
          Continue
        </Button>
      ) : (
        <Button
          onClick={() => {
            blockMutate.mutate({
              blockId: block.id,
            });
          }}
        >
          Finish
        </Button>
      )}
    </>
  );
}
