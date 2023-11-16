import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/trpc/client";
import { useState } from "react";
import toast from "react-hot-toast";

const SettingsInput = () => {
  const userDB = trpc.user.user.useQuery();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const nameUpload = trpc.user.setName.useMutation();
  const usernameUpload = trpc.user.setUsername.useMutation();

  const handleUsernameSubmit = () => {
    if (username.length < 3 || username.length > 20) {
      toast.error("Username must be between 3 and 20 characters", {
        style: {
          borderRadius: "var(--radius)",
          background: "hsl(var(--toast))",
          color: "hsl(var(--primary))",
        },
      });
      return;
    }

    usernameUpload.mutate(
      { username },
      {
        onSuccess: async (data) => {
          data.status === "OK"
            ? toast.success("Username updated", {
                style: {
                  borderRadius: "var(--radius)",
                  background: "hsl(var(--toast))",
                  color: "hsl(var(--primary))",
                },
              })
            : toast.error("Username is taken", {
                style: {
                  borderRadius: "var(--radius)",
                  background: "hsl(var(--toast))",
                  color: "hsl(var(--primary))",
                },
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
      toast.error("Name must be between 3 and 75 characters", {
        style: {
          borderRadius: "var(--radius)",
          background: "hsl(var(--toast))",
          color: "hsl(var(--primary))",
        },
      });
      return;
    }
    nameUpload.mutate(
      { name },
      {
        onSuccess: async (data) => {
          data.status === "OK"
            ? toast.success("Name updated", {
                style: {
                  borderRadius: "var(--radius)",
                  background: "hsl(var(--toast))",
                  color: "hsl(var(--primary))",
                },
              })
            : toast.error("An error occurred", {
                style: {
                  borderRadius: "var(--radius)",
                  background: "hsl(var(--toast))",
                  color: "hsl(var(--primary))",
                },
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
