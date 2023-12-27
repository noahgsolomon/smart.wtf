"use client";

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
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
  lesson: string;
  setLesson: Dispatch<SetStateAction<string>>;
  generating: boolean;
  handleGenerate: (s: string) => void;
  chatPrompt: string;
  setChatPrompt: Dispatch<SetStateAction<string>>;
  chatResponse: string;
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
  const [lesson, setLesson] = useState<string>("you are not in a lesson");
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatPrompt, setChatPrompt] = useState<string>("");
  const [chatResponse, setChatResponse] = useState<string>("");
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) {
      setMessages((prev) => [
        ...prev,
        { content: chatResponse, role: "assistant" },
      ]);
      setChatPrompt("");
    }
    setDone(false);
  }, [done]);

  const handleGenerate = async (prompt: string) => {
    setGenerating(true);
    setChatResponse("");

    await fetch("/api/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [...messages, { content: prompt, role: "user" }],
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

        setChatResponse((prev) => prev + decoded);
      }
      setGenerating(false);
    });
  };

  return (
    <ChatContext.Provider
      value={{
        lesson,
        setLesson,
        open,
        setOpen,
        messages,
        setMessages,
        generating,
        handleGenerate,
        chatPrompt,
        setChatPrompt,
        chatResponse,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
