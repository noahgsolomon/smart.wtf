import Settings from "./components/settings/settings";

const Page = () => {
  return (
    <div className="mx-10 mt-40 flex w-full flex-col">
      <h3 className="mb-2 text-3xl font-bold">Settings</h3>
      <p className="mb-4 opacity-60 ">Manage account settings</p>
      <Settings />
    </div>
  );
};

export default Page;
