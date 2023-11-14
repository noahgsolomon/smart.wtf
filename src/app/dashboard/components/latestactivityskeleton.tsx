import { Skeleton } from "@/components/ui/skeleton";

export default function LatestActivitySkeleton() {
  return (
    <div className="z-10 flex flex-col gap-2">
      <Skeleton className="h-[20px] w-[200px]" />
      <div className="flex ">
        <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4">
          <div>
            <Skeleton className="h-[229px] w-[400px]" />
          </div>
          <div className="flex flex-col gap-4">
            <Skeleton className="h-[40px] w-[200px]" />
            <Skeleton className="h-[20px] w-[125px]" />
            <Skeleton className="h-[10px] w-[75px]" />
            <Skeleton className="h-[10px] w-[75px]" />
          </div>
          <Skeleton className="h-[15px] w-[400px]" />
          <Skeleton className="h-[35px] w-[400px]" />
        </div>
      </div>
    </div>
  );
}
