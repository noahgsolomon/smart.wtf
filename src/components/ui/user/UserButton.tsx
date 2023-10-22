"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "../button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

const UserButton = () => {
  const user = useUser();
  const clerk = useClerk();

  const logOutHandler = () => {
    clerk.signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative rounded-full transition-all hover:opacity-80 focus:outline-0">
        <Avatar className="border border-border">
          <AvatarImage
            className={`object-cover transition-all`}
            src={user.user?.imageUrl}
          />
          <AvatarFallback>{user.user?.firstName?.at(0)}</AvatarFallback>
        </Avatar>
        <Loader2
          className={`absolute ${
            user.isLoaded ? "hidden" : ""
          } left-0 top-0 h-4 w-4 animate-spin opacity-60`}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-10 min-w-[300px] p-0">
        <DropdownMenuLabel className="gap-4 border-b border-border p-2">
          <div>
            <h3 className="text-base">{user.user?.fullName}</h3>
            <p className="text-sm opacity-60">@{user.user?.username}</p>
          </div>
        </DropdownMenuLabel>
        <Link href="/dashboard">
          <DropdownMenuItem className="mx-1 my-1 cursor-pointer gap-4 text-sm">
            Dashboard
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="mx-1 my-1 cursor-pointer gap-4 text-sm">
          Settings
        </DropdownMenuItem>
        <Link href="/billing">
          <DropdownMenuItem className="mx-1 my-1 cursor-pointer gap-4 text-sm">
            Billing
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
