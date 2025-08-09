import { Brain, Trophy, Users, Settings, Zap, Star } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const quickActions = [
  { title: "View Leaderboard", icon: Trophy, variant: "mint" as const },
  { title: "Join Group Chat", icon: Users, variant: "bloom" as const },
  { title: "Account Settings", icon: Settings, variant: "sunflower" as const },
];


export function AppSidebar() {
  const navigate = useNavigate();
  return (
    <Sidebar className="w-80">
     
      <div className="flex items-center gap-3 p-5">
        <Avatar className="h-10 w-10 bg-gradient-rose">
          <AvatarFallback className="bg-gradient-to-br from-rose-500 via-pink-500 to-yellow-400 text-white text-md">
            Jr.
          </AvatarFallback>
        </Avatar>

        <SidebarHeader className="text-xl font-bold text-transparent bg-gradient-to-r from-rose-500 via-pink-500 to-yellow-400 bg-clip-text">
          Junior AI
        </SidebarHeader>
      </div>
    
     
      
      <SidebarContent className="px-4 space-y-4">
        {/* Junior Status */}
        <Card className="shadow-soft border-border/50 bg-card/80 backdrop-blur-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-rose text-sm">
              Your Junior
            </CardTitle>
            <CardDescription className="text-xs">
              Level 3 • 1,250 XP
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button 
              variant="rose" 
              size="sm" 
              className="bg-gradient-to-br from-rose-500 via-pink-500 to-yellow-400 text-white text-md"
               onClick={() => navigate("/train")}
            >
              <Zap className="h-3 w-3" />
              Continue Training
            </Button>
          </CardContent>
        </Card>

        {/* Performance Stats */}
        <Card className="shadow-soft border-border/50 bg-card/80 backdrop-blur-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Global Rank</span>
              <span className="text-sm font-bold text-primary">#1,247</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Total XP</span>
              <span className="text-sm font-bold text-mint">#1,250</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Badges</span>
              <span className="text-sm font-bold text-sunflower">7</span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs text-muted-foreground">
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {quickActions.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Button 
                      variant={`rose`} 
                      className="w-full justify-start h-8" 
                      size="sm"
                    >
                      <item.icon className="h-3 w-3" />
                      <span className="text-xs">{item.title}</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Recent Activity */}
        <Card className="shadow-soft border-border/50 bg-card/80 backdrop-blur-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex items-start gap-2 p-2 rounded-lg bg-muted/30">
                <div className="w-1.5 h-1.5 bg-mint rounded-full mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-xs">Training session #47</p>
                  <p className="text-xs text-muted-foreground">+50 XP • 2h ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2 p-2 rounded-lg bg-muted/30">
                <div className="w-1.5 h-1.5 bg-rose rounded-full mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-xs">Answered quantum question</p>
                  <p className="text-xs text-muted-foreground">+25 XP • 5h ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2 p-2 rounded-lg bg-muted/30">
                <div className="w-1.5 h-1.5 bg-sunflower rounded-full mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-xs">Neural Pioneer badge</p>
                  <p className="text-xs text-muted-foreground">+100 XP • 1d ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </SidebarContent>
    </Sidebar>
  );
}