"use client";

import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

type NoteContextType = {
  openNotes: { id: number; title: string; emoji: string }[];
  setOpenNotes: Dispatch<
    SetStateAction<{ id: number; title: string; emoji: string }[]>
  >;
  userNotes: { id: number; title: string; emoji: string }[];
  setUserNotes: Dispatch<
    SetStateAction<{ id: number; title: string; emoji: string }[]>
  >;
};

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const useNoteContext = () => {
  const context = useContext(NoteContext);
  if (context === undefined) {
    throw new Error("useNoteContext must be used within a NoteProvider");
  }
  return context;
};

export const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [openNotes, setOpenNotes] = useState<
    { id: number; title: string; emoji: string }[]
  >([]);
  const [userNotes, setUserNotes] = useState<
    { id: number; title: string; emoji: string }[]
  >([]);

  return (
    <NoteContext.Provider
      value={{ openNotes, setOpenNotes, userNotes, setUserNotes }}
    >
      {children}
    </NoteContext.Provider>
  );
};
