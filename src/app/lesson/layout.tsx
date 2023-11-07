import { ReactNode } from "react";
import { SectionProvider } from "./sectioncontext";

export default function Layout({ children }: { children: ReactNode }) {
  return <SectionProvider>{children}</SectionProvider>;
}
