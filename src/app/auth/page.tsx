import { api } from "@/trpc/server";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

const Page = async () => {
  await api.user.exists.mutate();
  redirect("/dashboard");

  return (
    <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
      <p>authenticating...</p>
      <Loader2 className="h-5 w-5 animate-spin" />
    </div>
  );
};

export default Page;
