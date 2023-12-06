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
  const [, setFinishedImages] = useState<string[]>([]);

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

  const handleRegenerate = async () => {
    setRegenerating(true);
    let accumulatedMarkdown = "";
    setFinishedImages([]);
    setMarkdown("");
    const accumulatedImages: string[] = [];

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
        accumulatedMarkdown += decoded;

        const images = (accumulatedMarkdown.match(/image-\d-asset/g) ?? [])
          .map((asset: string) => {
            const regex = new RegExp(`\\!\\[(.*?)\\]\\(${asset}\\)`, "g");
            const match = regex.exec(accumulatedMarkdown);
            if (match && match[1] && !accumulatedImages.includes(asset)) {
              setFinishedImages((prev) => [...prev, asset]);
              accumulatedImages.push(asset);
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
          console.log(images);
          updateImagesMutation.mutate({
            images: images,
            markdown: accumulatedMarkdown,
          });
        }
      }
      setRegenerating(false);
    });
  };

  return {
    handleRegenerate,
    regenerating,
  };
};
