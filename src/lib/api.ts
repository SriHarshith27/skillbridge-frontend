// src/lib/api.ts

import { LoginRequest, RegisterRequest, JwtResponse, User } from "./types";

const API_BASE_URL = "http://localhost:8080/api/v1";

export async function loginUser(credentials: LoginRequest): Promise<JwtResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Invalid credentials');
  }
  return response.json();
}

export async function registerUser(data: RegisterRequest): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Registration failed');
  }
  return response.text();
}

export async function getMe(token: string): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error('Session expired or invalid. Please log in again.');
  }
  return response.json();
}