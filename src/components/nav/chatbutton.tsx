'use client'

import Link from "next/link";
import { usePathname } from "next/navigation"
import { buttonVariants } from "../ui/button";
import { MessageSquare } from "lucide-react";

const ChatButton = () => {
    const pathname = usePathname();

    return (<>
    {pathname === '/chat' ? (
            null
    ): (
<Link
                href={"/chat"}

                className={buttonVariants({ variant: "outline" })}
              >
                <MessageSquare className="h-4 w-4" />
              </Link>
    )}
    </>
        
    )
}

export default ChatButton;