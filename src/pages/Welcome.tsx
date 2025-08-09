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
            <Logo size="2xl" animated />
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
           <hr className="my-8 border-border/20" />
         </div>
          <a href="https://jeet-solanki-portfolio.netlify.app/" className="ml-4 text-primary hover:text-primary-glow transition-colors">
          <h6> Powerd by JLSS</h6>
           </a>
       </div>
       
       {/* Background gradient */}
       <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
     </section>

     {/* Footer */}
     <footer className="bg-card/50 backdrop-blur-md border-t border-border/20">
       <div className="container mx-auto px-4 py-12">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           {/* Product */}
           <div>
             <h3 className="font-semibold text-foreground mb-4">Product</h3>
             <ul className="space-y-2">
               <li><a href="/features" className="text-muted-foreground hover:text-primary transition-colors">Features</a></li>
               <li><a href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a></li>
               <li><a href="/roadmap" className="text-muted-foreground hover:text-primary transition-colors">Roadmap</a></li>
               <li><a href="/changelog" className="text-muted-foreground hover:text-primary transition-colors">Changelog</a></li>
             </ul>
           </div>

           {/* Resources */}
           <div>
             <h3 className="font-semibold text-foreground mb-4">Resources</h3>
             <ul className="space-y-2">
               <li><a href="https://junior-docs.netlify.app/" className="text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
               <li><a href="/tutorials" className="text-muted-foreground hover:text-primary transition-colors">Tutorials</a></li>
               <li><a href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
               <li><a href="/api" className="text-muted-foreground hover:text-primary transition-colors">API Reference</a></li>
             </ul>
           </div>

           {/* Community */}
           <div>
             <h3 className="font-semibold text-foreground mb-4">Community</h3>
             <ul className="space-y-2">
               <li><a href="https://discord.gg/junior-ai" className="text-muted-foreground hover:text-primary transition-colors">Discord Server</a></li>
               <li><a href="https://github.com/orgs/All-Origin/discussions" className="text-muted-foreground hover:text-primary transition-colors">GitHub Discussions</a></li>
               <li><a href="/community" className="text-muted-foreground hover:text-primary transition-colors">Forum</a></li>
               <li><a href="/events" className="text-muted-foreground hover:text-primary transition-colors">Events</a></li>
             </ul>
           </div>

           {/* Open Source */}
           <div>
             <h3 className="font-semibold text-foreground mb-4">Open Source</h3>
             <ul className="space-y-2">
               <li><a href="https://github.com/All-Origin" className="text-muted-foreground hover:text-primary transition-colors">GitHub Repository</a></li>
               <li><a href="/contribute" className="text-muted-foreground hover:text-primary transition-colors">Contributing</a></li>
               <li><a href="/license" className="text-muted-foreground hover:text-primary transition-colors">License</a></li>
               <li><a href="/security" className="text-muted-foreground hover:text-primary transition-colors">Security</a></li>
             </ul>
           </div>
         </div>

         {/* Bottom section */}
         <div className="border-t border-border/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
           <div className="flex items-center space-x-4 mb-4 md:mb-0">
             <Logo size="sm" />
             <span className="text-muted-foreground">© 2025 Junior AI. All rights reserved.</span>
           </div>
           
           <div className="flex items-center space-x-6">
             <a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
             <a href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
             <a href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
           </div>
         </div>
       </div>
     </footer>
   </div>
  );
}