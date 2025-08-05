import axios, { AxiosResponse } from 'axios';
import { toast } from '@/hooks/use-toast';
import { 
  AuthResponseDto, 
  LoginRequestDto, 
  RefreshTokenRequestDto,
  UserDto,
  RegistrationRequestDto
} from '@/types/api';

// Base API configuration
export const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_URL || 'http://localhost:8080',
  timeout: 10000,
});

export const userApi = axios.create({
  baseURL: import.meta.env.VITE_USER_API_URL || 'http://localhost:8081',
  timeout: 10000,
});

// Token management
const getAccessToken = () => localStorage.getItem('access_token');
const getRefreshToken = () => localStorage.getItem('refresh_token');
const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('refresh_token', refreshToken);
};
const clearTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

// Request interceptors
[authApi, userApi].forEach(api => {
  api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
});

// Response interceptors for token refresh
[authApi, userApi].forEach(api => {
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          const refreshToken = getRefreshToken();
          if (refreshToken) {
            const response = await authApi.post<AuthResponseDto>('/api/auth/refresh', {
              refreshToken
            });
            
            const { accessToken, refreshToken: newRefreshToken } = response.data;
            setTokens(accessToken, newRefreshToken);
            
            // Retry original request
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          clearTokens();
          window.location.href = '/login';
        }
      }
      
      // Show error toast for other errors
      if (error.response?.status >= 400) {
        toast({
          title: "Error",
          description: error.response?.data?.message || "Something went wrong",
          variant: "destructive",
        });
      }
      
      return Promise.reject(error);
    }
  );
});

// Auth API endpoints
export const authService = {
  login: async (credentials: LoginRequestDto): Promise<AuthResponseDto> => {
    const response = await authApi.post<AuthResponseDto>('/api/auth/login', credentials);
    const { accessToken, refreshToken } = response.data;
    setTokens(accessToken, refreshToken);
    return response.data;
  },

  refresh: async (refreshToken: string): Promise<AuthResponseDto> => {
    const response = await authApi.post<AuthResponseDto>('/api/auth/refresh', { refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = response.data;
    setTokens(accessToken, newRefreshToken);
    return response.data;
  },

  logout: () => {
    clearTokens();
  }
};

// User API endpoints
export const userService = {
  getMe: async (): Promise<UserDto> => {
    const response = await userApi.get<UserDto>('/api/user/me');
    return response.data;
  },

  updateMe: async (userData: Partial<UserDto>): Promise<UserDto> => {
    const response = await userApi.put<UserDto>('/api/user/me', userData);
    return response.data;
  },

  deleteMe: async (): Promise<string> => {
    const response = await userApi.delete<string>('/api/user/me');
    return response.data;
  },

  register: async (userData: RegistrationRequestDto): Promise<UserDto> => {
    const response = await userApi.post<UserDto>('/api/user/register', userData);
    return response.data;
  },

  getAllUsers: async (): Promise<UserDto[]> => {
    const response = await userApi.get<UserDto[]>('/api/user');
    return response.data;
  },

  searchUsers: async (username: string): Promise<UserDto> => {
    const response = await userApi.get<UserDto>('/api/user/search', {
      params: { username }
    });
    return response.data;
  }
};