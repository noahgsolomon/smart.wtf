import { create } from "zustand";

interface UseAddingNoteProps {
  topic: string;
  setTopic: (topic: string) => void;
  agent: {
    name: "rick" | "mrburns" | "bender" | "patrick";
    id: number;
  };
  setAgent: (agent: {
    name: "rick" | "mrburns" | "bender" | "patrick";
    id: number;
  }) => void;
  noteId: number;
  setNoteId: (noteId: number) => void;
}

export const useAddingNote = create<UseAddingNoteProps>((set) => ({
  topic: "",
  setTopic: (topic) => set({ topic }),
  agent: { name: "rick", id: 1 },
  setAgent: (agent) => set({ agent }),
  noteId: 0,
  setNoteId: (noteId) => set({ noteId }),
}));
