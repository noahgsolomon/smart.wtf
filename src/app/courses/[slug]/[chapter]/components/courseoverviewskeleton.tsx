import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CourseOverviewSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center gap-16 px-10 pb-8">
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col gap-4 text-center text-3xl">
          <Skeleton className="mb-8 h-10 w-64" />
        </div>
        <div className="flex flex-row justify-center gap-2">
          <Skeleton className="h-8 w-20 "></Skeleton>
          <Skeleton className="h-8 w-20"></Skeleton>
        </div>
        <Card className="relative h-[250px] w-[350px] cursor-pointer justify-center rounded-lg border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:h-[150px] sm:w-[500px] lg:h-[200px] lg:w-[800px]">
          <div className="flex h-full w-full flex-col justify-between sm:flex-row">
            <div className="flex flex-col items-center justify-center gap-2 px-4 py-2">
              <Skeleton className="h-5 w-24" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-2 w-36" />
                <Skeleton className="h-2 w-36" />
              </div>
            </div>
            <div>
              <Skeleton className="h-[125px] w-[348px] rounded-b-lg rounded-t-none border-t border-t-border sm:h-[148px] sm:w-[150px] sm:rounded-r-lg sm:rounded-bl-none lg:h-[198px] lg:w-[300px]" />
            </div>
          </div>
        </Card>
        <Card className="relative h-[250px] w-[350px] cursor-pointer justify-center rounded-lg border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:h-[150px] sm:w-[500px] lg:h-[200px] lg:w-[800px]">
          <div className="flex h-full w-full flex-col justify-between sm:flex-row">
            <div className="flex flex-col items-center justify-center gap-2 px-4 py-2">
              <Skeleton className="h-5 w-24" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-2 w-36" />
                <Skeleton className="h-2 w-36" />
              </div>
            </div>
            <div>
              <Skeleton className="h-[125px] w-[348px] rounded-b-lg rounded-t-none border-t border-t-border sm:h-[148px] sm:w-[150px] sm:rounded-r-lg sm:rounded-bl-none lg:h-[198px] lg:w-[300px]" />
            </div>
          </div>
        </Card>
        <Card className="relative h-[250px] w-[350px] cursor-pointer justify-center rounded-lg border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:h-[150px] sm:w-[500px] lg:h-[200px] lg:w-[800px]">
          <div className="flex h-full w-full flex-col justify-between sm:flex-row">
            <div className="flex flex-col items-center justify-center gap-2 px-4 py-2">
              <Skeleton className="h-5 w-24" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-2 w-36" />
                <Skeleton className="h-2 w-36" />
              </div>
            </div>
            <div>
              <Skeleton className="h-[125px] w-[348px] rounded-b-lg rounded-t-none border-t border-t-border sm:h-[148px] sm:w-[150px] sm:rounded-r-lg sm:rounded-bl-none lg:h-[198px] lg:w-[300px]" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
