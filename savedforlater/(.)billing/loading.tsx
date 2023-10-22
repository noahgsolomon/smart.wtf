import { CardSkeleton } from "@/components/ui/cardskeleton";

const Loading = () => {
  return (
    <div className="mx-auto w-full max-w-[60%]">
      <CardSkeleton />
    </div>
  );
};

export default Loading;
