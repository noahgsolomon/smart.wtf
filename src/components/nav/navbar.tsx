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
import { useQuickActions } from "@/utils/hooks/usequickactions";
import { useEffect, useState } from "react";
import GenerationType from "@/app/dashboard/generationtype";
import { Search } from "lucide-react";

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

  // const [lastScrollY, setLastScrollY] = useState(
  //   typeof window !== "undefined" ? window.scrollY : 0,
  // );
  // const [headerStyle, setHeaderStyle] = useState({});

  // const [sum, setSum] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollY = window.scrollY;
  //     const direction = scrollY - lastScrollY;

  //     if (direction > 0) {
  //       setSum((prev) => Math.min(prev + direction, 85));
  //       setHeaderStyle({
  //         transform: `translateY(${-sum}px)`,
  //         transition: "transform 0.3s ease-in-out",
  //       });
  //     } else {
  //       setSum((prev) => Math.max(prev + direction, 0));
  //       setHeaderStyle({
  //         transform: `translateY(${-sum}px)`,
  //         transition: "transform 0.3s ease-in-out",
  //       });
  //     }

  //     setLastScrollY(scrollY);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [lastScrollY]);

  return (
    <>
      {!path.startsWith("/lesson") && !path.startsWith("/quiz") ? (
        <header className="fixed left-0 right-0 top-0 z-20 rounded-b-lg  border-b bg-card shadow-sm transition-all">
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
            <div className="flex flex-row items-center gap-2">
              <Link href={"/"}>
                <SmartWtfLogo
                  className={cn(
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
                  className="relative cursor-pointer transition-all hover:opacity-80 sm:hidden"
                >
                  <div className="flex flex-row items-center text-primary/80">
                    <Search className="h-6 w-6" />
                  </div>
                </div>
              )}
              <div className="hidden sm:block coarse:hidden">
                <ThemeButton />
              </div>

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
      {/* <QuickActionsModal /> */}
      <GenerationType />
    </>
  );
};

export default NavBar;
