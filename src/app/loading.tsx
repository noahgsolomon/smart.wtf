import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center opacity-60">
        <Loader2 className="h-10 w-10 animate-spin" />
        <p className="text-center">Loading</p>
      </div>
    </div>
  );
};

export default Loading;
