import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { JuniorChat } from "@/components/chat/JuniorChat";
import { LogOut } from "lucide-react";

export default function Dashboard() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <SidebarProvider>
        <AppSidebar /> {/* Make sure AppSidebar has a fixed width, e.g. w-64 */}
        <div className="flex-1 min-w-0 flex flex-col bg-gradient-bg">
          {/* Header */}
          <header className="border-b border-border/50 bg-card/80 backdrop-blur-md ml-0 md:ml-[4rem]">
            <div className="px-6 py-4 flex items-center justify-between">
              <SidebarTrigger />
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  Welcome,{" "}
                  <span className="text-foreground font-semibold">{user.name}</span>
                </span>
                <Button variant="ghost" size="icon" onClick={() => logout()}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>
          {/* Main Chat Area */}
          <div className="flex-1 overflow-auto ml-0 md:ml-[4rem]">
            <JuniorChat />
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}