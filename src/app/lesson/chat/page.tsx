import Chat from "@/components/chat";
import { redirect } from "next/navigation";

const Page = ({ searchParams }: { searchParams: { prev: string } }) => {
  redirect(searchParams.prev);
  return (
    <div className="flex h-screen w-screen items-center justify-center px-5">
      <Chat page={true} className="max-w-[800px]" />
    </div>
  );
};

export default Page;
