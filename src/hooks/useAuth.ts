import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { authService, userService } from '@/lib/api';
import { LoginRequestDto, RegistrationRequestDto } from '@/types/api';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, setUser, setLoading, logout } = useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Check authentication status and load user data
  const { data: userData, error } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: userService.getMe,
    enabled: !user && !!localStorage.getItem('access_token'),
    retry: false,
  });

  // Handle auth data changes
  useEffect(() => {
    if (userData) {
      setUser(userData);
      setLoading(false);
    } else if (error) {
      setLoading(false);
      logout();
    }
  }, [userData, error, setUser, setLoading, logout]);

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authService.login,
  });

  // Handle login success/error
  useEffect(() => {
    if (loginMutation.isSuccess && loginMutation.data) {
      const data = loginMutation.data;
      toast({
        title: "Welcome back!",
        description: `Hello ${data.username}`,
      });
      // Fetch user data after successful login
      userService.getMe().then(userData => {
        setUser(userData);
        navigate('/dashboard');
      });
    }
    if (loginMutation.isError) {
      const error = loginMutation.error as any;
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Invalid credentials",
        variant: "destructive",
      });
    }
  }, [loginMutation.isSuccess, loginMutation.isError, loginMutation.data, loginMutation.error]);

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (data: RegistrationRequestDto) => {
      // Register the user
      const userData = await userService.register(data);
      
      // Auto-login after registration
      const authData = await authService.login({
        username: data.userName,
        password: data.password,
      });
      
      return { userData, authData };
    },
  });

  // Handle register success/error
  useEffect(() => {
    if (registerMutation.isSuccess && registerMutation.data) {
      const { userData } = registerMutation.data;
      setUser(userData);
      toast({
        title: "Welcome to Brainz!",
        description: "Your AI companion is ready to train",
      });
      navigate('/dashboard');
    }
    if (registerMutation.isError) {
      const error = registerMutation.error as any;
      toast({
        title: "Registration failed",
        description: error.response?.data?.message || "Please try again",
        variant: "destructive",
      });
    }
  }, [registerMutation.isSuccess, registerMutation.isError, registerMutation.data, registerMutation.error]);

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => {
      authService.logout();
      return Promise.resolve();
    },
  });

  // Handle logout success
  useEffect(() => {
    if (logoutMutation.isSuccess) {
      logout();
      queryClient.clear();
      navigate('/');
      toast({
        title: "Goodbye!",
        description: "You've been logged out successfully",
      });
    }
  }, [logoutMutation.isSuccess]);

  return {
    user,
    isAuthenticated,
    isLoading,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
  };
};