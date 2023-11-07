"use client";

import { type Section } from "@/types";
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

type SectionContextType = {
  section: Section[];
  setSection: Dispatch<SetStateAction<Section[]>>;
};

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export const useSectionContext = () => {
  const context = useContext(SectionContext);
  if (context === undefined) {
    throw new Error("useSectionContext must be used within a SectionProvider");
  }
  return context;
};

type SectionProviderProps = {
  children: ReactNode;
};

export const SectionProvider = ({ children }: SectionProviderProps) => {
  const [section, setSection] = useState<Section[]>([]);

  return (
    <SectionContext.Provider value={{ section, setSection }}>
      {children}
    </SectionContext.Provider>
  );
};
