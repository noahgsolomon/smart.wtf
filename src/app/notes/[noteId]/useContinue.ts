import { trpc } from "@/trpc/client";
import { useEffect, useState } from "react";
import { calculateReadingTime } from "./useRegenerate";

export const useContinue = ({
  note,
  markdown,
  setMarkdown,
  agent = false,
  agentPrompt = "",
  otherMarkdown = "",
}: {
  note: { id: number; title: string } | undefined;
  markdown: string;
  setMarkdown: React.Dispatch<React.SetStateAction<string>>;
  otherMarkdown: string;
  agent?: boolean;
  agentPrompt?: string;
}) => {
  const [continuing, setContinuing] = useState(false);
  const [done, setDone] = useState(false);
  const [finishedImages, setFinishedImages] = useState<string[]>([]);
  const [addedMarkdown, setAddedMarkdown] = useState("");
  const [initialMarkdown, setInitialMarkdown] = useState("");

  const updateNoteMutation = trpc.notes.updateNote.useMutation();
  const updateImagesMutation = trpc.notes.updateImages.useMutation({
    onSuccess: ({ replacements }) => {
      setMarkdown(
        (prev) =>
          initialMarkdown +
          "\n\n" +
          replacements.reduce(
            (currentMarkdown, replacement) =>
              currentMarkdown.replace(replacement.asset, replacement.link),
            prev,
          ),
      );
      setAddedMarkdown((prev) =>
        replacements.reduce(
          (currentMarkdown, replacement) =>
            currentMarkdown.replace(replacement.asset, replacement.link),
          prev,
        ),
      );
    },
  });

  useEffect(() => {
    if (done) {
      const minutes = calculateReadingTime(
        markdown.length + otherMarkdown.length,
      );
      updateNoteMutation.mutate({
        id: note?.id!,
        markdown,
        agent,
        minutes,
      });
      setContinuing(false);
      setDone(false);
    }
  }, [done]);

  useEffect(() => {
    const images = (addedMarkdown.match(/image-\d-asset/g) ?? [])
      .map((asset: string) => {
        const regex = new RegExp(`\\!\\[(.*?)\\]\\(${asset}\\)`, "g");
        const match = regex.exec(addedMarkdown);
        if (match && match[1] && !finishedImages.includes(asset)) {
          setFinishedImages((prev) => [...prev, asset]);
          const searchQuery = match[1];
          return { asset, searchQuery };
        }
        return null;
      })
      .filter((item) => item !== null) as {
      asset: string;
      searchQuery: string;
    }[];

    if (images.length > 0) {
      updateImagesMutation.mutate({
        images: images,
      });
    }
  }, [addedMarkdown, markdown]);

  const handleContinue = async () => {
    setInitialMarkdown(markdown + "\n\n");
    setContinuing(true);
    setFinishedImages([]);
    setMarkdown((prev) => prev + "\n\n");
    setAddedMarkdown("");

    await fetch("/api/ai/continue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: note?.title,
        markdown,
        agent,
        agentPrompt,
      }),
    }).then(async (res: any) => {
      const reader = res.body?.getReader();

      while (true) {
        const { done, value } = await reader?.read();

        if (done) {
          setDone(true);
          break;
        }

        const decoded = new TextDecoder("utf-8").decode(value);

        setMarkdown((prev) => prev + decoded);
        setAddedMarkdown((prev) => prev + decoded);
      }
    });
  };

  return {
    handleContinue,
    continuing,
  };
};
