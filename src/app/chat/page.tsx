import Chat from "../dashboard/components/chat";

const Page = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center px-5">
      <Chat page={true} className="max-w-[800px]" />
    </div>
  );
};

export default Page;
