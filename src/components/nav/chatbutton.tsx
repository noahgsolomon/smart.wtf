"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "../ui/button";
import { MessageSquare } from "lucide-react";

const ChatButton = ({
  lesson = false,
  query = "",
}: {
  lesson?: boolean;
  query?: string;
}) => {
  const pathname = usePathname();

  console.log("QUEERRRY", query);

  return (
    <>
      {pathname === `/lesson/chat?${query}` || pathname === `/chat?${query}` ? (
        <Button variant={"default"}>
          <MessageSquare className="h-4 w-4" />
        </Button>
      ) : (
        <Link
          href={lesson ? `/lesson/chat?${query}` : `/chat?${query}`}
          className={buttonVariants({
            variant: "default",
          })}
        >
          <MessageSquare className="h-4 w-4" />
        </Link>
      )}
    </>
  );
};

export default ChatButton;
