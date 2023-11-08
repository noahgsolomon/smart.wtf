export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-28">
      {/* <div className="left-4 top-32 hidden w-[25%] pl-8 lg:fixed lg:block">
        <SidebarCurrentSection params={params} />
      </div> */}
      {children}
    </div>
  );
}
