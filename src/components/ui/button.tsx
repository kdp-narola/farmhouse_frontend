import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";


const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-violet-500 text-primary-foreground hover:bg-violet-600 rounded-lg shadow-soft",
        gradient: "gradient-primary text-white rounded-lg shadow-soft hover:shadow-glow hover:scale-105",
        accent: "bg-accent text-accent-foreground hover:bg-accent-light rounded-lg shadow-soft hover:shadow-glow hover:scale-105",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-light rounded-lg shadow-soft",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-lg",
        outline: "border-2 border-violet-500 text-violet-500 hover:bg-violet-500 hover:text-primary-foreground rounded-lg",
        ghost: "hover:bg-muted hover:text-foreground rounded-lg",
        link: "text-gray-700 hover:text-teal-600 font-medium transition-colors",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-10 text-base",
        xl: "h-16 px-12 text-lg",
        icon: "h-11 w-11",
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
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
