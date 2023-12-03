import { ReactNode } from "react";
import { NoteProvider } from "./context/notescontext";

export default function Layout({ children }: { children: ReactNode }) {
  return <NoteProvider>{children}</NoteProvider>;
}
