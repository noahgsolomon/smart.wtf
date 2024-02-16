import { create } from "zustand";

interface UseGenerationTypeProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useGenerationType = create<UseGenerationTypeProps>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));
