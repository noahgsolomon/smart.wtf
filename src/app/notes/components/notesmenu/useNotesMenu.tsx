import { trpc } from "@/trpc/client";
import { Note, NoteCategories } from "@/types";
import { useAddNote } from "hooks/useaddnote";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const initialCategories = {
  ENGLISH: 0,
  MATH: 0,
  SCIENCE: 0,
  HISTORY: 0,
  ARTS: 0,
  MUSIC: 0,
  LITERATURE: 0,
  PHILOSOPHY: 0,
  GEOGRAPHY: 0,
  "SOCIAL STUDIES": 0,
  "PHYSICAL EDUCATION": 0,
  "COMPUTER SCIENCE": 0,
  ECONOMICS: 0,
  "BUSINESS STUDIES": 0,
  PSYCHOLOGY: 0,
  LAW: 0,
  "POLITICAL SCIENCE": 0,
  "ENVIRONMENTAL SCIENCE": 0,
  ENGINEERING: 0,
  MEDICINE: 0,
  AGRICULTURE: 0,
  ASTRONOMY: 0,
};

export default function useNotesMenu() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [topicInput, setTopicInput] = useState("");
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryOpenState, setCategoryOpenState] = useState<{
    [key in NoteCategories]: boolean;
  }>(
    Object.keys(initialCategories).reduce(
      (acc, category) => {
        acc[category as NoteCategories] = false;
        return acc;
      },
      {} as { [key in NoteCategories]: boolean },
    ),
  );
  const [preloadImages, setPreloadImages] = useState(false);
  const [preloadImagesList, setPreloadImagesList] = useState<string[]>([]);

  const { setIsOpen } = useAddNote();

  const deleteNoteMutation = trpc.notes.deleteNote.useMutation({
    onSuccess: () => {
      getUserNotesQuery.refetch();
      toast.success("Note deleted!");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const getUserNotesQuery = trpc.notes.getUserNotes.useQuery();

  const [presentCategories, setPresentCategories] =
    useState<{ [key in NoteCategories]: number }>(initialCategories);

  const [activeCategories, setActiveCategories] =
    useState<{ [key in NoteCategories]: number }>(initialCategories);

  useEffect(() => {
    setNotes(getUserNotesQuery.data?.notes ?? []);

    const categoryCounts = { ...presentCategories };
    for (const note of getUserNotesQuery.data?.notes ?? []) {
      if (note.category in categoryCounts) {
        categoryCounts[note.category as NoteCategories]++;
      }
    }

    setPresentCategories(categoryCounts);
    setLoading(false);
    setPreloadImages(true);
  }, [getUserNotesQuery.data?.notes]);

  useEffect(() => {
    const searchQuery = topicInput.toLowerCase();
    const filtered = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery) ||
        note.description?.toLowerCase().includes(searchQuery),
    );
    setFilteredNotes(filtered);

    const categoriesCount = { ...initialCategories };

    filtered.forEach((note) => {
      categoriesCount[note.category as NoteCategories]++;
    });

    setActiveCategories(categoriesCount);
  }, [notes, topicInput]);

  const toggleCategory = useCallback((category: NoteCategories) => {
    setCategoryOpenState((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  }, []);

  return {
    filteredNotes,
    loading,
    topicInput,
    setTopicInput,
    categoryOpenState,
    toggleCategory,
    activeCategories,
    presentCategories,
    deleteNoteMutation,
    preloadImages,
    preloadImagesList,
    setPreloadImagesList,
    setIsOpen,
    notes,
    setPresentCategories,
    initialCategories,
  };
}
