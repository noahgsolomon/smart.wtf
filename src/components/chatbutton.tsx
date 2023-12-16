"use client";

import { Bot, Sparkles } from "lucide-react";
import Chat from "./chat";
import { motion } from "framer-motion";
import { useChatContext } from "@/app/context/chat/ChatContext";

export default function ChatButton() {
  const buttonVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const { open, setOpen } = useChatContext();

  return (
    <div className="fixed bottom-4 right-4 z-30">
      {open ? (
        <Chat />
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={buttonVariants}
          transition={{ duration: 0.1 }}
        >
          <button onClick={() => setOpen(true)}>
            <div className=" overflow-hidden rounded-full border border-border bg-card transition-all hover:opacity-80">
              <div className="p-4">
                <Bot className="h-7 w-7" />
              </div>
            </div>
          </button>
        </motion.div>
      )}
    </div>
  );
}
