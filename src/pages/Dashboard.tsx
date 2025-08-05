import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Logo } from "@/components/shared/Logo";
import { Brain, Trophy, Users, Settings, LogOut, Zap } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-bg">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, <span className="text-foreground font-semibold">{user.name}</span>
            </span>
            <Button variant="ghost" size="icon" onClick={() => logout()}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Brainz Status Card */}
          <Card className="md:col-span-2 shadow-card border-border/50 bg-card/80 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 gradient-text">
                <Brain className="h-5 w-5" />
                Your Brainz Companion
              </CardTitle>
              <CardDescription>
                Level 3 Neural Network • 1,250 XP
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Training Progress</span>
                <span className="text-sm text-muted-foreground">75%</span>
              </div>
              <Progress variant="xp" value={75} className="h-3" />
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <Button variant="neural" className="h-12">
                  <Zap className="h-4 w-4" />
                  Continue Training
                </Button>
                <Button variant="cyber" className="h-12">
                  <Brain className="h-4 w-4" />
                  Chat with Brainz
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="shadow-card border-border/50 bg-card/80 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-lg">Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Global Rank</span>
                <span className="text-lg font-bold text-primary">#1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Total XP</span>
                <span className="text-lg font-bold text-success">1,250</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Badges</span>
                <span className="text-lg font-bold text-accent">7</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-card border-border/50 bg-card/80 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="quantum" className="w-full justify-start" size="sm">
                <Trophy className="h-4 w-4" />
                View Leaderboard
              </Button>
              <Button variant="quantum" className="w-full justify-start" size="sm">
                <Users className="h-4 w-4" />
                Join Group Chat
              </Button>
              <Button variant="quantum" className="w-full justify-start" size="sm">
                <Settings className="h-4 w-4" />
                Account Settings
              </Button>
            </CardContent>
          </Card>

          {/* Activity Feed */}
          <Card className="md:col-span-2 shadow-card border-border/50 bg-card/80 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm">Completed training session #47</p>
                    <p className="text-xs text-muted-foreground">+50 XP • 2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm">Brainz answered a complex question about quantum mechanics</p>
                    <p className="text-xs text-muted-foreground">+25 XP • 5 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm">Achieved "Neural Pioneer" badge</p>
                    <p className="text-xs text-muted-foreground">+100 XP • 1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
}