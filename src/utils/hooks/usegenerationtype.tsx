import { create } from "zustand";

interface UseGenerationTypeProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isSignedIn: boolean;
  setIsSignedIn: (isSignedIn: boolean) => void;
}

export const useGenerationType = create<UseGenerationTypeProps>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  isSignedIn: false,
  setIsSignedIn: (isSignedIn) => set({ isSignedIn }),
}));
