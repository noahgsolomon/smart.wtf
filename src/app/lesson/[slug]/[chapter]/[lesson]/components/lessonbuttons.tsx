"use client";

import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";

type Section = {
  id: number;
  name: string;
  order: number;
  sectionId: number;
  time: number;
  blocks: {
    id: number;
    subSectionId: number;
    order: number;
    markdown: string;
    interactiveComponents: {
      type: "QUIZ" | "QUESTION";
      quizzes: {
        id: number;
        questionMarkdown: string;
        optionOne: string;
        optionTwo: string;
        optionThree: string;
        optionFour: string;
        correctOption: "ONE" | "TWO" | "THREE" | "FOUR";
        explanationMarkdown: string;
      } | null;
      questions: {
        id: number;
        questionMarkdown: string;
      } | null;
    }[];
    userCompletedBlocks: {
      blockId: number;
    }[];
  }[];
};

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
  const sectionQuery = trpc.course.getCourseSection.useQuery({
    sectionId: parseInt(
      params.lesson && typeof params.lesson === "string" ? params.lesson : "1",
    ),
  });

  return (
    <>
      {section.length > subSection ? (
        <Button
          onClick={() => {
            subSectionMutate.mutate({
              sectionId: parseInt(params.lesson),
              order: subSection,
            });
            sectionQuery.remove();
            sectionQuery.refetch();
          }}
        >
          Continue
        </Button>
      ) : (
        <Button
          onClick={() => {
            subSectionMutate.mutate({
              sectionId: parseInt(params.lesson),
              order: subSection,
            });
            sectionQuery.remove();
            sectionQuery.refetch();
          }}
        >
          Finish
        </Button>
      )}
    </>
  );
}
