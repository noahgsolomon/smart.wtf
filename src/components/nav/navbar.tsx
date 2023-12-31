"use client";

import ThemeButton from "./theme";
import { Button, buttonVariants } from "../ui/button";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SmartWtfLogo from "../svg/smartwtf";
import { usePathname } from "next/navigation";
import UserButton from "./UserButton";
import { QuickActionsModal } from "../ui/modals/quickactionsmodal";
import { useQuickActions } from "hooks/usequickactions";
import AddNote from "@/app/dashboard/components/notes/addnote";
import ChatButton from "../chatbutton";
import { useEffect, useState } from "react";

const NavBar = () => {
  const { userId } = useAuth();

  const path = usePathname();

  // let user;
  // let daysSinceAccountCreation = 0;
  // trial length
  // const trialLength = 7;
  // const userQuery = trpc.user.user.useQuery();

  // if (userId) {
  // user = userQuery.data;

  // const createdAt = user?.user?.created_at;

  // if (createdAt) {
  //   const accountCreationDate = new Date(createdAt).getTime();
  //   const currentDate = new Date().getTime();

  //   const timeDifference = currentDate - accountCreationDate;
  //   daysSinceAccountCreation = Math.floor(
  //     timeDifference / (1000 * 60 * 60 * 24),
  //   );
  // const accountCreationDate = new Date(createdAt).getTime();
  // const currentDate = new Date().getTime();

  // const timeDifference = currentDate - accountCreationDate;
  // daysSinceAccountCreation = Math.floor(
  //   timeDifference / (1000 * 60 * 60 * 24),
  // );
  // }
  // }

  const { setIsOpen } = useQuickActions();

  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const checkScroll = () => {
      setIsTop(window.scrollY <= 35);
    };

    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return (
    <>
      {!path.startsWith("/lesson") &&
      !path.startsWith("/notes") &&
      !path.startsWith("/quiz") ? (
        <header
          className={`border-sm fixed left-0 right-0 top-0 z-20 transition-all coarse:border-b coarse:bg-card/80 coarse:backdrop-blur-3xl ${
            isTop
              ? ""
              : "fine:border-sm fine:border-b fine:bg-card/80 fine:backdrop-blur-3xl"
          } `}
        >
          {/* <div 
            className={
              "flex flex-row items-center justify-center gap-4 border-b border-border pt-1"
            }
          >
            <p className="py-1  text-sm">
              We are expecting to be in <span className="font-bold">Beta</span>{" "}
              in January
            </p>
          </div> */}
          {/* {user && !user?.user?.subscribed && (
            <FreeTrialBanner
              className="border-b border-border py-2"
              progress={
                (trialLength -
                  (daysSinceAccountCreation > 7
                    ? 7
                    : daysSinceAccountCreation)) /
                trialLength
              }
              daysLeft={
                trialLength -
                (daysSinceAccountCreation > 7 ? 7 : daysSinceAccountCreation)
              }
            />
          )} */}
          <div className="flex items-center justify-between px-[5%] py-1">
            <div>
              <Link href={"/"}>
                <SmartWtfLogo
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "h-14 w-14 cursor-pointer p-0 transition-all hover:opacity-80",
                  )}
                />
              </Link>
            </div>
            {/* <div className="flex flex-row gap-4">
              <Button className="flex flex-row gap-1" variant={"link"}>
                <StickyNote className="h-4 w-4" />
                Notes
              </Button>
              <Button className="flex flex-row gap-1" variant={"link"}>
                <BookMarked className={"h-4 w-4"} />
                Courses
              </Button>
            </div> */}
            {/* {user && !user?.user?.subscribed && (
          <FreeTrialBanner
            className="hidden w-full md:flex"
            progress={
              (trialLength -
                (daysSinceAccountCreation > 7 ? 7 : daysSinceAccountCreation)) /
              trialLength
            }
            daysLeft={
              trialLength -
              (daysSinceAccountCreation > 7 ? 7 : daysSinceAccountCreation)
            }
          />
        )} */}

            <div className="flex items-center justify-end gap-4">
              {userId && (
                <div
                  onClick={() => setIsOpen(true)}
                  className="relative hidden cursor-pointer transition-all hover:opacity-80 md:block"
                >
                  <div className="rounded-lg border border-border bg-secondary/60 py-2 pl-2 pr-24 text-sm text-primary/60">
                    Search...
                  </div>
                  <Button
                    className="bg-card md:absolute md:right-1 md:top-1/2 md:-translate-y-1/2 md:transform"
                    size={"sm"}
                    variant={"outline"}
                  >
                    ⌘K
                  </Button>
                </div>
              )}

              <ThemeButton />
              {userId ? (
                <>
                  {/* {user?.user && !user?.user?.subscribed && (
                    <Link
                      href={"/pricing"}
                      className={buttonVariants({ variant: "outline" })}
                    >
                      UPGRADE
                    </Link>
                  )} */}
                  <UserButton />
                </>
              ) : (
                <>
                  <Link
                    href={"signup"}
                    className={buttonVariants({ variant: "outline" })}
                  >
                    Sign up
                  </Link>
                  <Link
                    className={buttonVariants({ variant: "outline" })}
                    href={"login"}
                  >
                    Log in
                  </Link>
                </>
              )}
            </div>
          </div>
        </header>
      ) : null}
      {userId && (
        <>
          {!path.startsWith("/quiz") && <ChatButton />}
          <AddNote />
          <QuickActionsModal />
        </>
      )}
    </>
  );
};

export default NavBar;
