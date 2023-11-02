"use client";

import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";

export default function CopyButton() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    // Your copy logic here
    setCopied(true);
    toast({
      title: "Copied!",
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
        className="absolute right-1 top-4 opacity-80 transition-all"
        variant={"ghost"}
      >
        {copied ? (
          <CopyCheck className="h-4 w-4 text-success" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
      <Toaster />
    </>
  );
}
