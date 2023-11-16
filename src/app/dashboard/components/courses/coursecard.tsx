import { Badge } from "@/components/ui/badge";
import { Circle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/trpc/server";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

const CourseCard = async ({
  course,
}: {
  course: {
    id: number;
    name: string;
    description: string;
    instructorId: number;
    imageUrl: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    slug: string;
    instructor: {
      name: string;
    };
    courseLikes: {
      courseId?: number;
    }[];
  };
}) => {
  const isStarted = await api.course.isCourseStarted.query({
    courseId: course.id,
  });

  return (
    <div className="relative">
      <Badge className="absolute -left-2 -top-2 z-[1] rounded-lg">new</Badge>
      {/* <CourseLikeButton
        courseId={course.id}
        clicked={course.courseLikes.length > 0}
      /> */}
      <Link href={"/courses/" + course.slug}>
        <div className="group cursor-pointer overflow-hidden rounded-lg border border-border bg-card transition-all hover:scale-[101%] active:scale-[99%]">
          <div className="relative overflow-hidden border-b border-border">
            <div className="transition-all duration-300 group-hover:scale-[105%]">
              <Image
                src={course.imageUrl}
                width={325}
                height={325}
                className="rounded-t-lg"
                alt="systems design group-hover:bg-black"
              />
            </div>
            <div className="absolute bottom-2 left-2">
              <Badge
                variant={
                  course.difficulty === "EASY"
                    ? "easy"
                    : course.difficulty === "MEDIUM"
                    ? "medium"
                    : "hard"
                }
              >
                {course.difficulty}
              </Badge>
            </div>
          </div>

          <div className="flex min-h-[100px] flex-col justify-between gap-2 p-4">
            <div className="flex flex-col justify-between gap-2">
              <h2 className="text-2xl">{course.name}</h2>
              <div className="flex">
                <div className="flex flex-row items-center gap-1 rounded-lg bg-secondary p-1 text-xs font-bold text-opacity-60">
                  <Suspense fallback={<div></div>}>
                    <Circle
                      className={cn(
                        "h-2 w-2 text-secondary",
                        `${
                          isStarted.isCourseStarted
                            ? "fill-blue"
                            : "fill-destructive"
                        }`,
                      )}
                    />
                    <p>
                      {isStarted.isCourseStarted ? "STARTED" : "NOT STARTED"}
                    </p>
                  </Suspense>
                </div>
              </div>
            </div>
            <div className="max-w-[35ch] text-xs opacity-60">
              {course.description}
            </div>

            {/* <div className="flex flex-col">
              <h3 className="text-sm">Progress</h3>
              <div className="flex flex-row items-center gap-2">
                <h3 className="text-xs opacity-60">10%</h3>
                <Progress
                  className=" bg-secondary"
                  indicatorClassName="bg-blue rounded-r-lg"
                  value={10}
                />
              </div>
            </div> */}
            {/* <div className="flex flex-row justify-between"> */}
            {/* <div className="flex flex-row items-center gap-2">
                <div>
                  <Avatar className="h-[35px] w-[35px] border border-border">
                    <AvatarImage
                      className={`object-cover transition-all`}
                      src={"https://images.codefoli.com/ricknmort.png"}
                    />
                    <AvatarFallback>
                      {course.instructor.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  
                </div>
                <div>
                  <h3 className="text-sm">{course.instructor.name}</h3>
                  <h3 className="text-xs">Instructor</h3>
                </div>
              </div> */}
            {/* <div className="group flex flex-row items-center rounded-lg border border-border bg-background p-1 transition-all hover:scale-105">
                <Image width={30} height={30} src={wtfCoin} alt="wtf coin" />
                <p className="text-sm"> + 500</p>
              </div> */}
            {/* </div> */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
