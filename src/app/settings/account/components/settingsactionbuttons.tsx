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
import { useToast } from "@/components/ui/use-toast";
import { trpc } from "@/trpc/client";
import { useClerk } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const SettingsActionButtons = () => {
  const { toast } = useToast();
  const clerk = useClerk();

  const [deleting, setDeleting] = useState(false);

  const logOutHandler = async () => {
    await clerk.signOut();
  };

  const deleteUser = trpc.user.delete.useMutation();

  const deleteHandler = () => {
    setDeleting(true);
    try {
      deleteUser
        .mutateAsync(undefined, {
          onError: (data) => {
            toast({
              title: "Error",
              description: data.message,
              variant: "destructive",
            });
          },
        })
        .catch.bind(deleteUser.mutateAsync);
      clerk.user?.delete().catch.bind(clerk.user?.delete);
      logOutHandler().catch.bind(logOutHandler);
    } catch (e) {
      toast({
        title: "Error",
        description: "error message",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-4 flex">
      <div className="flex flex-col">
        <Button
          className="mt-4 shadow-none"
          variant={"outline"}
          onClick={logOutHandler}
        >
          log out
        </Button>
        <Dialog>
          <DialogTrigger
            className={buttonVariants({
              variant: "destructive",
              className: "mt-4 shadow-none",
            })}
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
