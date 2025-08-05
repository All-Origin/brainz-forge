import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/shared/Logo";
import { Brain, Zap, Trophy, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="flex justify-center mb-8">
            <Logo size="xl" animated />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6 animate-float">
            Train Your Junior
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Welcome to Juniour Ai - where you create and train your personal AI companion through 
            gamified challenges and social competitions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/register">
              <Button variant="rose" size="xl" className="group">
                Start Your Journey
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link to="/login">
              <Button variant="bloom" size="xl">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-16 h-16 bg-primary/20 rounded-full blur-xl" />
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-12 h-12 bg-accent/20 rounded-full blur-xl" />
        </div>
        <div className="absolute bottom-20 left-1/4 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-20 h-20 bg-secondary/20 rounded-full blur-xl" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text">
            How Junior Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-card border-border/50 bg-card/80 backdrop-blur-md hover:shadow-glow-primary/20 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Train Your AI</h3>
                <p className="text-muted-foreground">
                  Answer 20 personalized questions to teach your Junior your knowledge and personality.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border/50 bg-card/80 backdrop-blur-md hover:shadow-glow-accent/20 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Zap className="h-8 w-8 text-background" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Gain XP</h3>
                <p className="text-muted-foreground">
                  Level up your Junior through training sessions and earn experience points.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border/50 bg-card/80 backdrop-blur-md hover:shadow-glow-success/20 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-success rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Compete</h3>
                <p className="text-muted-foreground">
                  Enter Olympiad competitions and climb the global leaderboards.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border/50 bg-card/80 backdrop-blur-md hover:shadow-glow-primary/20 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Connect</h3>
                <p className="text-muted-foreground">
                  Join group discussions and watch your Junior interact with other AIs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
              Ready to Meet Your AI Twin?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users already training their personal AI companions. 
              Your Junior is waiting to learn from you.
            </p>
            <Link to="/register">
              <Button variant="rose" size="xl" className="glow-primary">
                Create Your Junior
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      </section>
    </div>
  );
}