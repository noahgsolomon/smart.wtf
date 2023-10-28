import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CourseSkeleton() {
  return (
    <div>
      <h1>Courses</h1>
      <div className="flex flex-wrap gap-12 py-4">
        <Card className="m-0 h-[500px] w-[300px] rounded-lg">
          <CardHeader className="flex h-[300px] w-[300px] items-center justify-center ">
            <Skeleton className="h-full w-full rounded-lg" />
          </CardHeader>
          <CardContent className="h-12 w-3">
            <Skeleton className="h-6 w-[200px]" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-[120px]" />
          </CardFooter>
        </Card>
        <Card className="m-0 h-[500px] w-[300px] rounded-lg">
          <CardHeader className="flex h-[300px] w-[300px] items-center justify-center ">
            <Skeleton className="h-full w-full rounded-lg" />
          </CardHeader>
          <CardContent className="h-12 w-3">
            <Skeleton className="h-4 w-[250px]" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-4 w-[80px]" />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
