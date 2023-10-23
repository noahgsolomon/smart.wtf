import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { useClerk, useUser } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import { type ChangeEvent, useRef, useState } from "react";

const AvatarUpload = () => {
  const clerk = useClerk();
  const user = useUser();

  const { toast } = useToast();

  const [dragging, setDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0);
    if (file) {
      await clerk.user?.setProfileImage({ file });
      toast({
        title: "Success",
        description: "Profile image updated",
        variant: "success",
      });
    }
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    if (
      event.dataTransfer.items &&
      event.dataTransfer.items[0]?.kind === "file"
    ) {
      const file = event.dataTransfer.items[0].getAsFile();
      if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
        clerk.user
          ?.setProfileImage({ file })
          .catch.bind(clerk.user?.setProfileImage);
        toast({
          title: "Success",
          description: "Profile image updated",
          variant: "success",
        });
      } else {
        toast({
          title: "Error",
          description: "Invalid file type",
          variant: "destructive",
        });
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <div className="rounded-full transition-all focus:outline-0">
      <div className="flex flex-row items-center gap-4">
        <Avatar
          className={`h-40 w-40 cursor-pointer border border-border ${
            dragging ? "opacity-50" : ""
          } transition-all hover:opacity-80`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleClick}
          onDragLeave={handleDragLeave}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
          <AvatarImage
            className={`object-cover transition-all`}
            src={user.user?.imageUrl}
          />
          <AvatarFallback>{user.user?.firstName?.at(0)}</AvatarFallback>
        </Avatar>
        <p className="flex max-w-[15ch] flex-row gap-2 text-sm opacity-60">
          <ArrowLeft />
          drag and drop or click to upload
        </p>
      </div>
    </div>
  );
};

export default AvatarUpload;
