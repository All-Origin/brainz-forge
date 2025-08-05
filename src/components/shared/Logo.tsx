import { Brain } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
}

const sizeClasses = {
  sm: "h-6 w-6",
  md: "h-8 w-8", 
  lg: "h-12 w-12",
  xl: "h-16 w-16"
};

export function Logo({ className, size = "md", animated = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn(
        "relative rounded-full bg-gradient-primary p-2 shadow-glow-primary",
        animated && "animate-pulse-glow"
      )}>
      </div>
      <span className={cn(
        "font-bold gradient-text",
        size === "sm" && "text-lg",
        size === "md" && "text-xl", 
        size === "lg" && "text-2xl",
        size === "xl" && "text-3xl"
      )}>
        Junior
      </span>
    </div>
  );
}