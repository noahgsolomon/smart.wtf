import { Skeleton } from "@/components/ui/skeleton";

export default function LatestActivitySkeleton() {
  return (
    <div className="flex w-full flex-col items-center gap-2 md:w-auto">
      <div className="flex w-full">
        <div className="flex w-full flex-col gap-4 rounded-lg border border-border bg-card p-4 md:w-auto">
          <div>
            <Skeleton className="h-[229px] w-[300px] sm:w-[400px]" />
          </div>
          <div className="flex flex-col gap-4">
            <Skeleton className="h-0 w-[200px] sm:h-[40px]" />
            <Skeleton className="h-[20px] w-[125px]" />
            <Skeleton className="h-[25px] w-[75px]" />
          </div>
          <Skeleton className="h-[15px] w-[300px] sm:w-[400px]" />
          <Skeleton className="h-[35px] w-[300px] sm:w-[400px]" />
        </div>
      </div>
    </div>
  );
}
