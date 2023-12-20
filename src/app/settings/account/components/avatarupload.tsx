import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useClerk, useUser } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import { type ChangeEvent, useRef, useState } from "react";
import { toast } from "sonner";

const AvatarUpload = () => {
  const clerk = useClerk();
  const user = useUser();

  const [dragging, setDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0);
    if (file) {
      await clerk.user?.setProfileImage({ file });
      toast.success("Profile image updated");
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

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    if (
      event.dataTransfer.items &&
      event.dataTransfer.items[0]?.kind === "file"
    ) {
      const file = event.dataTransfer.items[0].getAsFile();
      if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
        await clerk.user?.setProfileImage({ file });
        toast.success("Profile image updated");
      } else {
        toast.error("invalid file type");
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
