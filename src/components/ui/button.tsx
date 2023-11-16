import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "shadow-none transition-all inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 hover:scale-[101%] active:scale-[99%]",
  {
    variants: {
      variant: {
        default:
          "transition-all bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "transition-all bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "transition-all border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        secondary:
          "transition-all bg-accent text-secondary-foreground hover:bg-primary/10 dark:hover:bg-accent/80",
        ghost: "transition-all hover:bg-accent hover:text-accent-foreground",
        link: "transition-all text-primary underline-offset-4 hover:underline",
        success: "transition-all bg-success text-primary hover:bg-success/90",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
