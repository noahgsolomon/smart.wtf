import { trpc } from "@/trpc/client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useRegenerate = ({
  note,
  markdown,
  setMarkdown,
}: {
  note: { id: number; title: string } | undefined;
  markdown: string;
  setMarkdown: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [regenerating, setRegenerating] = useState(false);
  const [done, setDone] = useState(false);
  const [finishedImages, setFinishedImages] = useState<string[]>([]);

  const updateImagesMutation = trpc.notes.updateImages.useMutation({
    onSuccess: ({ markdown }) => {
      setMarkdown(markdown);
    },
  });

  const updateNoteMutation = trpc.notes.updateNote.useMutation();

  useEffect(() => {
    if (done) {
      updateNoteMutation.mutate({
        id: note?.id!,
        markdown,
      });
      setDone(false);
    }
  }, [done]);

  useEffect(() => {
    const images = (markdown.match(/image-\d-asset/g) ?? [])
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
        markdown,
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
      body: JSON.stringify({ id: note?.id, title: note?.title }),
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
