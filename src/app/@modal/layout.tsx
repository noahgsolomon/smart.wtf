import Modal from "./components/Modal";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <Modal>{children}</Modal>;
};

export default Layout;
