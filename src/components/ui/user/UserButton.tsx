"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Fish, Landmark, Settings } from "lucide-react";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

const UserButton = () => {
  const user = useUser();
  const clerk = useClerk();

  const logOutHandler = async () => {
    await clerk.signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full transition-all hover:opacity-80 focus:outline-0">
        <Avatar className="border border-border">
          <AvatarImage
            className={`object-cover transition-all`}
            src={user.user?.imageUrl}
          />
          <AvatarFallback>{user.user?.firstName?.at(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-10 min-w-[300px] p-0">
        <DropdownMenuLabel className="gap-4 border-b border-border p-2">
          <div>
            <h3 className="text-base">{user.user?.fullName}</h3>
            <p className="text-sm opacity-60">@{user.user?.username}</p>
          </div>
        </DropdownMenuLabel>
        <Link href="/settings/achievements">
          <DropdownMenuItem className="mx-1 my-1 cursor-pointer gap-2 text-sm">
            <Fish className="h-4 w-4" />
            Achievements
          </DropdownMenuItem>
        </Link>
        <Link href="/settings/billing">
          <DropdownMenuItem className="mx-1 my-1 cursor-pointer gap-4 text-sm">
            <Landmark className="h-4 w-4" />
            Billing
          </DropdownMenuItem>
        </Link>
        <Link href="/settings">
          <DropdownMenuItem className="mx-1 my-1 cursor-pointer gap-4 text-sm">
            <Settings className="h-4 w-4" />
            Settings
          </DropdownMenuItem>
        </Link>
        <div className="border-t border-border">
          <DropdownMenuItem
            className="mx-1 my-1 cursor-pointer gap-4 text-sm"
            onClick={logOutHandler}
          >
            Log out
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
