"use client";

import { trpc } from "@/trpc/client";
import { Message } from "@/types";
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from "react";

type ChatContextType = {
  chat: string;
  threadId: string;
  assistantId: string;
  setChat: Dispatch<SetStateAction<string>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};

type ChatProviderProps = {
  children: ReactNode;
};

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [chat, setChat] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const userThreadQuery = trpc.ai.getThread.useQuery();

  const threadId = userThreadQuery.data?.threadId!;

  const assistantId = "asst_Z1KwKAyaA4lKWtKEiutE2ORK";

  const [messages, setMessages] = useState<Message[]>([]);

  const messageQuery = trpc.ai.getMessages.useQuery({
    assistantId,
    threadId,
  });

  useEffect(() => {
    if (messages.length === 0 && open) {
      setMessages(messageQuery.data?.messages!);
    }
  }, [open]);

  console.log(messages);

  return (
    <ChatContext.Provider
      value={{
        chat,
        setChat,
        open,
        setOpen,
        assistantId,
        threadId,
        messages,
        setMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
