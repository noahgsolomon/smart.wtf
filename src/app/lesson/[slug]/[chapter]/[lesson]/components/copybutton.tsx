"use client";

import { Button } from "@/components/ui/button";
import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CopyButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Your copy logic here
    setCopied(true);
    toast("Copied!", {
      description: "The markdown has been copied to your clipboard.",
      duration: 2000,
    });

    // Reset state after some time
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Button
        onClick={handleCopy}
        className="absolute -right-1 -top-1 opacity-80 transition-all"
        variant={"ghost"}
      >
        {copied ? (
          <CopyCheck className="h-4 w-4 text-success" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </>
  );
}
