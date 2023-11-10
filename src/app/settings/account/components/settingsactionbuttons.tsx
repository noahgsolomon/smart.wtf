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
import { trpc } from "@/trpc/client";
import { useClerk } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const SettingsActionButtons = () => {
  const clerk = useClerk();

  const [deleting, setDeleting] = useState(false);

  const logOutHandler = async () => {
    await clerk.signOut();
  };

  const deleteUser = trpc.user.delete.useMutation();

  const deleteHandler = async () => {
    setDeleting(true);
    try {
      deleteUser.mutateAsync(undefined, {
        onError: () => {
          toast.error("an error occurred");
        },
      });
      await clerk.user?.delete();
      await logOutHandler();
    } catch (e) {
      toast.error("an error occurred");
    }
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
                onClick={deleteHandler}
                type="submit"
                disabled={deleting}
                className="shadow-none"
                variant={"destructive"}
              >
                {deleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Delete"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SettingsActionButtons;
