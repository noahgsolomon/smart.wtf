"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const SettingsActionButtons = () => {
  const clerk = useClerk();
  const router = useRouter();

  return (
    <div className="mt-4 flex">
      <div className="flex flex-col">
        <Button
          className="mt-4"
          variant={"outline"}
          onClick={() => clerk.signOut(() => router.push("/"))}
        >
          log out
        </Button>
        <Dialog>
          <DialogTrigger
            className={cn(buttonVariants({ variant: "destructive" }), "mt-4")}
            disabled={true}
          >
            delete account
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="justify-start gap-2">
              <DialogClose
                type="button"
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "shadow-none",
                )}
                asChild
              >
                Close
              </DialogClose>
              <Button
                type="submit"
                className="shadow-none"
                variant={"destructive"}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SettingsActionButtons;
