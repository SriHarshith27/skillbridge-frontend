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


export interface UserDto {
  id: number;
  username: string;
  email: string;
  phone?: string;
  role: string;
}

export interface CourseDto {
  id: number;
  name: string;
  description: string;
  duration: number;
  category: string;
  mentor: UserDto;
}

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; 
} 


export interface CourseRequest {
  name: string;
  description: string;
  category: string;
  duration: number;
}


export interface CourseModuleDto {
  id: number;
  title: string;
  sessionVideoUrl: string;
  duration: number;
}

export interface AssignmentDto {
  id: number;
  title: string;
  assignmentFileUrl: string;
  studentAnswerFileUrl?: string; // This can be optional
  grade?: number; // This can be optional
}

// Find your existing CourseDto and add the new properties
export interface CourseDto {
  id: number;
  name: string;
  description: string;
  duration: number;
  category: string;
  mentor: UserDto;
  modules: CourseModuleDto[]; // Add this line
  assignments: AssignmentDto[]; // Add this line
}

export interface SubmissionDto {
  assignmentId: number;
  assignmentTitle: string;
  studentId: number;
  studentUsername: string;
  answerFileUrl: string;
  grade?: number; // Grade is optional
}