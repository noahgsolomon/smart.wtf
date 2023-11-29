"use client";

import { trpc } from "@/trpc/client";
import { type Message } from "@/types";
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
  threadId: string;
  setThreadId: Dispatch<SetStateAction<string>>;
  assistantId: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
  ready: boolean;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  lesson: string;
  setLesson: Dispatch<SetStateAction<string>>;
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
  const [open, setOpen] = useState<boolean>(false);
  const userThreadQuery = trpc.ai.getThread.useQuery();
  const [ready, setReady] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [lesson, setLesson] = useState<string>("you are not in a lesson");

  const [threadId, setThreadId] = useState(userThreadQuery.data?.threadId!);

  const assistantId = "asst_Z1KwKAyaA4lKWtKEiutE2ORK";

  const [messages, setMessages] = useState<Message[]>([]);

  const messageQuery = trpc.ai.getMessages.useQuery({
    assistantId,
    threadId,
  });

  useEffect(() => {
    if (userThreadQuery.data?.threadId) {
      setThreadId(userThreadQuery.data.threadId);
    }
  }, [userThreadQuery.data]);

  useEffect(() => {
    if (messages?.length === 0 && open) {
      setMessages(messageQuery.data?.messages!);
    }
    setTimeout(() => {
      setReady(true);
    }, 1000);
  }, [open, messageQuery.data?.messages, messages?.length]);

  return (
    <ChatContext.Provider
      value={{
        loading,
        setLoading,
        lesson,
        setLesson,
        open,
        setOpen,
        assistantId,
        setThreadId,
        threadId,
        messages,
        setMessages,
        ready,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
