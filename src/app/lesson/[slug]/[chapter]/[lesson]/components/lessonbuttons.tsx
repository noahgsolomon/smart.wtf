"use client";

import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";

export default function LessonButtons({
  block,
  subSection,
  section,
  params,
}: any) {
  const subSectionMutate = trpc.course.setSubsectionCompleted.useMutation();
  const sectionQuery = trpc.course.getCourseSection.useQuery({
    sectionId: parseInt(
      params.lesson && typeof params.lesson === "string" ? params.lesson : "1",
    ),
  });

  return (
    <>
      {section.section.length > subSection ? (
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
