import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-xs font-medium transition-colors ring-1 ring-inset disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background ring-foreground hover:bg-foreground/90",
        outline: "bg-transparent text-foreground ring-foreground/20 hover:bg-foreground/5",
        ghost: "bg-transparent text-foreground ring-transparent hover:bg-foreground/5",
        destructive: "bg-destructive text-white ring-destructive hover:bg-destructive/90",
      },
      size: {
        default: "h-9 px-4",
        sm: "h-8 px-3",
        lg: "h-11 px-6 text-sm",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
);
Button.displayName = "Button";

export { Button, buttonVariants };
