import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="mx-10 mt-40 flex w-full flex-col">
      <h3 className="mb-2 text-3xl font-bold">Settings</h3>
      <p className="mb-4 opacity-60 ">Manage account settings</p>
      <Card>
        <CardHeader className="gap-8">
          <Skeleton className="h-40 w-40 rounded-full" />
          <Skeleton className="h-6 w-2/5" />
          <Skeleton className="h-6 w-2/5" />
        </CardHeader>
        <CardContent className="h-12" />
        <CardFooter className="flex flex-col items-start gap-4">
          <Skeleton className="h-10 w-[120px]" />
          <Skeleton className="h-10 w-[120px]" />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Loading;
