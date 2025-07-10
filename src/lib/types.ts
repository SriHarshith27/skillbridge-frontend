// src/lib/types.ts

export interface User {
  id: number;
  username: string;
  email: string;
  phone?: string;
  role: 'USER' | 'MENTOR' | 'ADMIN';
}

export interface JwtResponse {
  token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  phone?: string;
  role: 'USER' | 'MENTOR';
}