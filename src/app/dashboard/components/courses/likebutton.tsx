'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { Heart } from "lucide-react";
import { useState } from "react";

const CourseLikeButton = ({clicked, courseId}: {clicked: boolean, courseId: number}) => {
const [isLiked, setIsLiked] = useState(clicked); 
    const like = trpc.course.addLike.useMutation();

    const handleLikeToggle = () => {
        setIsLiked(!isLiked);
        like.mutate({ courseId }, {
                onSuccess: (data) => console.log(data),
                onError: () => {
                    setIsLiked(isLiked);
                }
        });
    };

    return (
        <Button onClick={handleLikeToggle} className="absolute right-3 top-3 z-10" variant={"secondary"}>
        <Heart className={cn("h-4 w-4 text-pink-500 dark:text-pink-700", isLiked ? 'fill-pink-500 dark:fill-pink-700' : '')} />
      </Button>
    )
};

export default CourseLikeButton;