// API Types based on OpenAPI specifications

// Auth Types
export interface LoginRequestDto {
  username: string;
  password: string;
}

export interface RefreshTokenRequestDto {
  refreshToken: string;
}

export interface AuthResponseDto {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  username: string;
  email: string;
  message: string;
}

// User Types
export enum UserRole {
  ROLE_USER = "ROLE_USER",
  ROLE_ADMIN = "ROLE_ADMIN", 
  ROLE_MANAGER = "ROLE_MANAGER"
}

export interface UserDto {
  name: string;
  userName: string;
  email: string;
  roles: UserRole[];
  createdAt: string;
  updatedAt: string;
}

export interface RegistrationRequestDto {
  name?: string;
  userName: string;
  password: string;
  email: string;
}

export interface UserValidationResponse {
  userId: number;
  userName: string;
  email: string;
  roles: UserRole[];
}

// API Response wrapper
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Error response
export interface ApiError {
  message: string;
  status: number;
  error?: string;
}