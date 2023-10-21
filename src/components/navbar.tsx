import { type FunctionComponent } from "react";
import ThemeButton from "./ui/theme";
import { buttonVariants } from "./ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SmartWtfLogo from "./svg/smartwtf";
import { api } from "@/trpc/server";
import FreeTrialBanner from "./freetrialbanner";

const NavBar: FunctionComponent = async () => {
  const { userId } = auth();

  let user;
  let daysSinceAccountCreation = 0;
  let trialLength = 7;

  if (userId) {
    user = await api.user.user.query();
    const createdAt = user.user?.created_at;

    if (createdAt) {
      const accountCreationDate = new Date(createdAt).getTime(); // convert to Unix timestamp
      const currentDate = new Date().getTime(); // convert to Unix timestamp

      const timeDifference = currentDate - accountCreationDate;
      daysSinceAccountCreation = Math.floor(
        timeDifference / (1000 * 60 * 60 * 24),
      );
    }
  }

  return (
    <header className="border-sm fixed left-0 right-0 top-0 z-10 border-b border-border backdrop-blur-sm">
      {user && !user?.user?.subscribed && (
        <FreeTrialBanner
          className="border-b border-border py-2"
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
      )}
      <div className="flex justify-between px-3 py-1">
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
          <ThemeButton />
          {userId ? (
            <>
              {!user?.user?.subscribed && (
                <Link
                  href={"/dashboard"}
                  className={buttonVariants({ variant: "glowing" })}
                >
                  UPGRADE
                </Link>
              )}
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  userProfile: {
                    elements: {
                      navbarMobileMenuRow: "hidden",
                      profileSection__danger: "hidden",
                    },
                  },
                  elements: {
                    userButtonTrigger: "focus:outline-none focus:ring-0 ",
                    rootBox: "w-10 h-10 flex items-center ",
                    avatarBox:
                      "border-border rounded-lg border-[1px] hover:opacity-80 transition-all w-9 h-9 active:border-2",
                    userButtonPopoverCard:
                      "rounded-lg border border-border bg-card",
                    userPreviewMainIdentifier: "text-primary",
                    userPreviewSecondaryIdentifier: "text-primary opacity-60",
                    userButtonPopoverFooter: "opacity-0 hidden",
                    userButtonPopoverActionButton:
                      "hover:bg-primary-foreground",
                    userButtonPopoverActionButtonText: "text-primary",
                    userButtonPopoverActionButtonIcon: "text-primary",
                  },
                }}
              />
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
  );
};

export default NavBar;
