import { type FunctionComponent } from "react";
import ThemeButton from "./ui/theme";
import { buttonVariants } from "./ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SmartWtfLogo from "./svg/smartwtf";

const NavBar: FunctionComponent = () => {
  const { userId } = auth();

  return (
    <header className="border-sm fixed left-0 right-0 top-0 z-10 border-b border-border p-3 backdrop-blur-sm">
      <div className="flex justify-between">
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
        <div className="flex items-center justify-end gap-4">
          <ThemeButton />
          {userId ? (
            <>
              <Link
                href={"/dashboard"}
                className={buttonVariants({ variant: "outline" })}
              >
                Dashboard
              </Link>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  userProfile: {
                    elements: {
                      userButtonPopoverCard: "p-0",
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
