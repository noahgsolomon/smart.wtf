"use client";

import { Sparkles } from "lucide-react";
import { useState } from "react";
import Chat from "./chat";
import { motion } from "framer-motion";

export default function ChatButton() {
  const [open, setOpen] = useState(false);

  const buttonVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="fixed bottom-4 right-4 z-30">
      {open ? (
        <Chat setOpen={setOpen} />
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
                <Sparkles className="h-7 w-7 fill-primary" />
              </div>
            </div>
          </button>
        </motion.div>
      )}
    </div>
  );
}
