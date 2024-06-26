import { trpc } from "@/trpc/client";
import { useEffect, useState } from "react";

export function calculateReadingTime(textLength: number) {
  const averageWordLength = 5;
  const wordsPerMinute = 200;

  const wordCount = textLength / averageWordLength;
  const readingTimeMinutes = wordCount / wordsPerMinute;

  return Math.ceil(readingTimeMinutes);
}

export const useRegenerate = ({
  note,
  markdown,
  setMarkdown,
  agent = false,
  agentPrompt = "",
}: {
  note: { id: number; title: string } | undefined;
  markdown: string;
  setMarkdown: React.Dispatch<React.SetStateAction<string>>;
  agent?: boolean;
  agentPrompt?: string;
}) => {
  const [regenerating, setRegenerating] = useState(false);
  const [done, setDone] = useState(false);
  const [finishedImages, setFinishedImages] = useState<string[]>([]);

  const updateImagesMutation = trpc.notes.updateImages.useMutation({
    onSuccess: ({ replacements }) => {
      setMarkdown((prev) =>
        replacements.reduce(
          (currentMarkdown, replacement) =>
            currentMarkdown.replace(replacement.asset, replacement.link),
          prev,
        ),
      );
    },
    onError: () => {
      console.log("error, we hit da google search api limit :(");
    },
  });

  const updateNoteMutation = trpc.notes.updateNote.useMutation();

  useEffect(() => {
    if (done) {
      const minutes = calculateReadingTime(markdown.length);
      updateNoteMutation.mutate({
        id: note?.id!,
        markdown,
        agent,
        minutes,
      });
      setDone(false);
    }
  }, [done]);

  useEffect(() => {
    const images = (markdown?.match(/image-\d-asset/g) ?? [])
      .map((asset: string) => {
        const regex = new RegExp(`\\!\\[(.*?)\\]\\(${asset}\\)`, "g");
        const match = regex.exec(markdown);
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
  }, [markdown]);

  const handleRegenerate = async () => {
    setRegenerating(true);
    setFinishedImages([]);
    setMarkdown("");

    await fetch("/api/ai/regenerate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: note?.id,
        title: note?.title,
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
      }
      setRegenerating(false);
    });
  };

  return {
    handleRegenerate,
    regenerating,
  };
};
