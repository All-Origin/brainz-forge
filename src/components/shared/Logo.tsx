import { Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl"; // ✅ Include "2xl"
  animated?: boolean;
}

const sizeClasses = {
  sm: "h-6 w-6 text-sm",
  md: "h-8 w-8 text-base",
  lg: "h-10 w-10 text-lg",
  xl: "h-12 w-12 text-xl",
  "2xl": "h-16 w-16 text-2xl",
};

export function Logo({ className, size = "md", animated = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
   <Avatar className="h-10 w-10 bg-gradient-rose">
          <AvatarFallback className="bg-gradient-to-br from-rose-500 via-pink-500 to-yellow-400 text-white text-md">
            Jr.
          </AvatarFallback>
        </Avatar>
      <span 
      className={cn(
          "font-bold gradient-text",
          size === "sm" && "text-lg",
          size === "md" && "text-xl",
          size === "lg" && "text-2xl",
          size === "xl" && "text-3xl",
          size === "2xl" && "text-4xl"
        )}
        >
         <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent text-md">
  Junior AI
</div>


      </span>
    </div>
  );
}