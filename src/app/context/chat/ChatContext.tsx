"use client";

import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

type ChatContextType = {
  chat: string;
  setChat: Dispatch<SetStateAction<string>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
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

  return (
    <ChatContext.Provider value={{ chat, setChat, open, setOpen }}>
      {children}
    </ChatContext.Provider>
  );
};
