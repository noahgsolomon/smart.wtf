import { create } from "zustand";

interface UseAddNoteProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useAddNote = create<UseAddNoteProps>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));
