import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        blue: "border-transparent bg-blue text-white shadow hover:bg-blue/80",
        red: "border-transparent bg-red-500 text-white shadow hover:bg-red-400",
        easy: "border-transparent bg-success text-secondary dark:text-primary shadow hover:bg-success/80",
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        common:
          "border-transparent bg-common text-common-foreground shadow hover:bg-common/80",
        uncommon:
          "border-transparent bg-uncommon text-uncommon-foreground shadow hover:bg-uncommon/80",
        rare: "border-transparent bg-rare text-rare-foreground shadow hover:bg-rare/80",
        outline: "text-foreground",
        hard: "border-transparent bg-red-500 text-secondary dark:text-primary shadow hover:bg-red-400",
        medium:
          "border-transparent bg-yellow-500 text-secondary dark:text-primary shadow hover:bg-yellow-400",
        english:
          "border-transparent bg-blue-500 text-white shadow hover:bg-blue-400",
        math: "border-transparent bg-red-500 text-white shadow hover:bg-red-400",
        science:
          "border-transparent bg-indigo-500 text-white shadow hover:bg-indigo-400",
        history:
          "border-transparent bg-purple-500 text-white shadow hover:bg-purple-400",
        arts: "border-transparent bg-pink-500 text-white shadow hover:bg-pink-400",
        music:
          "border-transparent bg-teal-500 text-white shadow hover:bg-teal-400",
        literature:
          "border-transparent bg-deep-orange-500 text-white shadow hover:bg-deep-orange-400",
        philosophy:
          "border-transparent bg-lime-500 text-white shadow hover:bg-lime-400",
        geography:
          "border-transparent bg-cyan-500 text-white shadow hover:bg-cyan-400",
        socialStudies:
          "border-transparent bg-amber-500 text-white shadow hover:bg-amber-400",
        physicalEducation:
          "border-transparent bg-deep-purple-500 text-white shadow hover:bg-deep-purple-400",
        computerScience:
          "border-transparent bg-light-blue-500 text-white shadow hover:bg-light-blue-400",
        economics:
          "border-transparent bg-orange-500 text-white shadow hover:bg-orange-400",
        businessStudies:
          "border-transparent bg-brown-500 text-white shadow hover:bg-brown-400",
        psychology:
          "border-transparent bg-blue-grey-500 text-white shadow hover:bg-blue-grey-400",
        law: "border-transparent bg-red-800 text-white shadow hover:bg-red-700",
        politicalScience:
          "border-transparent bg-deep-orange-800 text-white shadow hover:bg-deep-orange-700",
        environmentalScience:
          "border-transparent bg-light-green-500 text-white shadow hover:bg-light-green-400",
        engineering:
          "border-transparent bg-grey-500 text-white shadow hover:bg-grey-400",
        medicine:
          "border-transparent bg-pink-800 text-white shadow hover:bg-pink-700",
        agriculture:
          "border-transparent bg-lime-800 text-white shadow hover:bg-lime-700",
        astronomy:
          "border-transparent bg-indigo-800 text-white shadow hover:bg-indigo-700",
        time: "border-transparent bg-secondary shadow hover:bg-secondary/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
