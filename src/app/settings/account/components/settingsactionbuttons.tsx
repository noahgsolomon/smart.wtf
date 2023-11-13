"use client";

import { Button } from "@/components/ui/button";
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
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const SettingsActionButtons = () => {
  const clerk = useClerk();
  const router = useRouter();

  const logOutHandler = async () => {
    await clerk.signOut(() => router.push("/"));
  };

  return (
    <div className="mt-4 flex">
      <div className="flex flex-col">
        <Button className="mt-4" variant={"outline"} onClick={logOutHandler}>
          log out
        </Button>
        <Dialog>
          <DialogTrigger disabled={true}>
            <Button disabled={true} className="mt-4 " variant={"destructive"}>
              delete account
            </Button>
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
              <DialogClose asChild>
                <Button
                  className="shadow-none"
                  type="button"
                  variant="secondary"
                >
                  Close
                </Button>
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
