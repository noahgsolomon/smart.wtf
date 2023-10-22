import SideBar from "./components/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-[300px] w-screen flex-row justify-center">
      <SideBar />
      {children}
    </div>
  );
};

export default Layout;
