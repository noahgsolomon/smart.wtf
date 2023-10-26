import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { trpc } from "@/trpc/client";
import { useState } from "react";

const SettingsInput = () => {
  const userDB = trpc.user.user.useQuery();
  const { toast } = useToast();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const nameUpload = trpc.user.setName.useMutation();
  const usernameUpload = trpc.user.setUsername.useMutation();

  const handleUsernameSubmit = () => {
    if (username.length < 3 || username.length > 20) {
      toast({
        title: "Error",
        description: "Username must be between 3 and 20 characters",
        variant: "destructive",
      });
      return;
    }

    usernameUpload.mutate(
      { username },
      {
        onSuccess: async (data) => {
          toast({
            title: data.status === "OK" ? "Sucess!" : "Error",
            description: data.message,
            variant: data.status === "OK" ? "success" : "destructive",
          });
          setUsername("");
          if (data.status === "OK") {
            await userDB.refetch();
          }
        },
      },
    );
  };

  const handleNameSubmit = () => {
    if (name.length < 3 || name.length > 75) {
      toast({
        title: "Error",
        description: "Name must be between 3 and 75 characters",
        variant: "destructive",
      });
      return;
    }
    nameUpload.mutate(
      { name },
      {
        onSuccess: async (data) => {
          toast({
            title: data.status === "OK" ? "Sucess!" : "Error",
            description: data.message,
            variant: data.status === "OK" ? "success" : "destructive",
          });
          setName("");
          if (data.status === "OK") {
            await userDB.refetch();
          }
        },
      },
    );
  };

  return (
    <div className="mt-4 flex w-full items-center gap-1.5">
      <div className="space-y-4">
        <div>
          <Label htmlFor="username">username</Label>
          <div className="flex flex-row gap-2">
            <Input
              className="shadow-none"
              type="username"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleUsernameSubmit();
                }
              }}
              placeholder={"@" + userDB.data?.user?.username}
            />
            <Button
              className={"shadow-none"}
              variant={"secondary"}
              onClick={handleUsernameSubmit}
            >
              save
            </Button>
          </div>
        </div>
        <div>
          <Label htmlFor="name">name</Label>
          <div className="flex flex-row gap-2">
            <Input
              className="shadow-none"
              type="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleNameSubmit();
                }
              }}
              placeholder={userDB.data?.user?.name}
            />
            <Button
              className={"shadow-none"}
              variant={"secondary"}
              onClick={handleNameSubmit}
            >
              save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsInput;
