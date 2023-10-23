import { CardSkeleton } from "@/app/settings/components/billing/billingskeleton";

const Loading = () => {
  return (
    <div className="mx-auto w-full max-w-[60%]">
      <CardSkeleton />
    </div>
  );
};

export default Loading;
