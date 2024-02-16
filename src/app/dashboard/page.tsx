import DashboardNew from "./dashboardnew";

const Page = async () => {
  return (
    <>
      <main className="mx-4 mt-24 flex h-[60vh] items-center justify-center transition-all md:mx-20 xl:mx-80">
        <DashboardNew />
      </main>
    </>
  );
};

export default Page;
