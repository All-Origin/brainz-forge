import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Logo } from "@/components/shared/Logo";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  userName: z.string().min(4, "Username must be at least 4 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(4, "Password must be at least 4 characters").max(20, "Password must be less than 20 characters"),
});

type RegisterForm = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { register: registerUser, isRegisterLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterForm) => {
    registerUser(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-bg">
      <Card className="w-full max-w-md shadow-card border-border/50 bg-card/80 backdrop-blur-md">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          <CardTitle className="text-2xl gradient-text">Join Brainz</CardTitle>
          <CardDescription className="text-muted-foreground">
            Create your account and meet your AI companion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                className="bg-input/50 border-border/50 focus:border-primary focus:shadow-glow-primary/20"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="userName">Username</Label>
              <Input
                id="userName"
                placeholder="Choose a username"
                className="bg-input/50 border-border/50 focus:border-primary focus:shadow-glow-primary/20"
                {...register("userName")}
              />
              {errors.userName && (
                <p className="text-sm text-destructive">{errors.userName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="bg-input/50 border-border/50 focus:border-primary focus:shadow-glow-primary/20"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="bg-input/50 border-border/50 focus:border-primary focus:shadow-glow-primary/20 pr-10"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="rose"
              size="lg"
              className="w-full"
              disabled={isRegisterLoading}
            >
              {isRegisterLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Creating Account...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Create Account
                </div>
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <a href="/login" className="text-primary hover:text-primary-glow transition-colors">
                Sign in here
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}