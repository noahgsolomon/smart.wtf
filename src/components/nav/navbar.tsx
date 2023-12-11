"use client";

import ThemeButton from "./theme";
import { buttonVariants } from "../ui/button";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SmartWtfLogo from "../svg/smartwtf";
import { usePathname } from "next/navigation";
import UserButton from "./UserButton";
import ChatButton from "../chatbutton";
import { useChatContext } from "@/app/context/chat/ChatContext";

const NavBar = () => {
  const { userId } = useAuth();

  const { ready } = useChatContext();

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

  return (
    <>
      {!path.startsWith("/lesson") && !path.startsWith("/notes") ? (
        <header className="border-sm fixed left-0 right-0 top-0 z-20 border-b border-border bg-card shadow-sm">
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

            <div className="flex flex-row items-center gap-8">
              <Link
                className={cn(
                  buttonVariants({
                    variant: "link",
                  }),
                  "text-lg font-bold",
                )}
                href={""}
              >
                Notes
              </Link>
              <Link
                className={cn(
                  buttonVariants({
                    variant: "link",
                  }),
                  "text-lg font-bold",
                )}
                href={""}
              >
                Learning Paths
              </Link>
            </div>
            <div className="flex items-center justify-end gap-4">
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
      {userId && ready && <ChatButton />}
    </>
  );
};

export default NavBar;
