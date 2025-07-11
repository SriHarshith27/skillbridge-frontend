
import { LoginRequest, RegisterRequest, JwtResponse, User } from "./types";
import { Page, CourseDto,CourseRequest,SubmissionDto } from './types';

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

export async function getAllCourses(token: string): Promise<Page<CourseDto>> {
  const response = await fetch(`${API_BASE_URL}/courses`, {
    headers: {
      // This is a protected endpoint, so we need to send our JWT
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch courses');
  }
  
  return response.json();
}


//course create function

export async function createCourse(courseData: CourseRequest, token: string): Promise<CourseDto> {
  const response = await fetch(`${API_BASE_URL}/courses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // This endpoint is protected
    },
    body: JSON.stringify(courseData),
  });

  if (!response.ok) {
    // Try to get a meaningful error message from the backend
    const error = await response.json().catch(() => ({ message: 'Failed to create course' }));
    throw new Error(error.message || 'An unknown error occurred');
  }

  return response.json();
}

//enroll
export async function enrollInCourse(courseId: number, token: string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/courses/${courseId}/enroll`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to enroll in course' }));
    throw new Error(error.message || 'An unknown error occurred');
  }

  return response.json().catch(() => ({ message: 'Successfully enrolled!' }));
}


//getting enrolled ccurses

export async function getEnrolledCourses(token: string): Promise<CourseDto[]> {
  const response = await fetch(`${API_BASE_URL}/user/my-courses`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch enrolled courses');
  }
  
  // This endpoint returns a simple array of courses, not a Page object
  return response.json();
}

// 1. Fetches a single course by its ID
export async function getCourseById(id: string, token: string): Promise<CourseDto> {
  const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch course details.");
  return response.json();
}

// 2. Uploads a new video module to a course
export async function addModuleToCourse(courseId: string, formData: FormData, token: string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/courses/${courseId}/modules`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData, // When sending files, we use FormData, not JSON
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to upload module.' }));
    throw new Error(error.message);
  }
  return response.json();
}

// 3. Uploads a new assignment to a course
export async function addAssignmentToCourse(courseId: string, formData: FormData, token: string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/courses/${courseId}/assignments`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to upload assignment.' }));
    throw new Error(error.message);
  }
  return response.json();
}

export async function submitAssignment(assignmentId: number, file: File, token: string): Promise<any> {
  const formData = new FormData();
  formData.append("file", file);

  // This matches the endpoint in your CourseController: POST /assignments/{assignmentId}/submit
  const response = await fetch(`${API_BASE_URL}/courses/assignments/${assignmentId}/submit`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to submit assignment.' }));
    throw new Error(error.message);
  }
  return response.json();
}


export async function deleteModule(moduleId: number, token: string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/courses/modules/${moduleId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to delete module.' }));
    throw new Error(error.message);
  }
  return response.json();
}

export async function deleteAssignment(assignmentId: number, token: string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/courses/assignments/${assignmentId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to delete assignment.' }));
    throw new Error(error.message);
  }
  return response.json();
}

export async function getSubmissionsForCourse(courseId: string, token: string): Promise<SubmissionDto[]> {
  const response = await fetch(`${API_BASE_URL}/courses/${courseId}/submissions`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch student submissions.");
  }
  return response.json();
}

export async function gradeAssignment(assignmentId: number, grade: number, token: string): Promise<any> {
  // Your backend expects the grade as a request parameter
  const response = await fetch(`${API_BASE_URL}/courses/assignments/${assignmentId}/grade?grade=${grade}`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to submit grade.' }));
    throw new Error(error.message);
  }
  return response.json();
}