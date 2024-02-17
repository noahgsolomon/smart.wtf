import { api } from "@/trpc/server";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

const Page = async ({
  searchParams,
}: {
  searchParams: {
    noteTopic?: string;
    noteAgent?: string;
    noteCategory?: string;
    noteNextTopic?: string;
  };
}) => {
  await api.user.exists.mutate();
  console.log(searchParams);
  redirect(
    `/${
      searchParams.noteTopic &&
      searchParams.noteAgent &&
      searchParams.noteCategory &&
      searchParams.noteNextTopic
        ? `?noteTopic=${encodeURIComponent(
            searchParams.noteTopic,
          )}&noteAgent=${encodeURIComponent(
            searchParams.noteAgent,
          )}&noteCategory=${encodeURIComponent(
            searchParams.noteCategory,
          )}&noteNextTopic=${encodeURIComponent(searchParams.noteNextTopic)}`
        : ""
    }`,
  );

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Loader2 className="h-5 w-5 animate-spin" />
    </div>
  );
};

export default Page;
