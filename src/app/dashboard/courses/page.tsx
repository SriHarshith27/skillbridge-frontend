// src/app/dashboard/courses/page.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "~/contexts/AuthProvider";
import { getAllCourses, enrollInCourse } from "~/lib/api";
import { CourseDto } from "~/lib/types";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { 
  BookOpenIcon, 
  UserCircleIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  CogIcon 
} from "@heroicons/react/24/outline";

export default function CoursesPage() {
  const [courses, setCourses] = useState<CourseDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State to track which course is being enrolled in
  const [enrollingId, setEnrollingId] = useState<number | null>(null);
  const [enrollmentStatus, setEnrollmentStatus] = useState<{ [key: number]: string }>({});

  const { token, user } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      if (!token) return;
      try {
        const courseData = await getAllCourses(token);
        setCourses(courseData.content);
      } catch (err: any) {
        setError(err.message || "Could not load courses.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, [token]);

  const handleEnroll = async (courseId: number) => {
    if (!token) return;
    setEnrollingId(courseId);
    try {
      await enrollInCourse(courseId, token);
      setEnrollmentStatus(prev => ({ ...prev, [courseId]: "Enrolled!" }));
    } catch (err: any) {
      setEnrollmentStatus(prev => ({ ...prev, [courseId]: err.message || "Failed" }));
    } finally {
      setEnrollingId(null);
    }
  };

  if (isLoading) return <div>Loading courses...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-8">
      <motion.div /* ... */ >
        <h1 className="text-3xl font-bold">Available Courses</h1>
        <p className="text-muted-foreground mt-2">
          {user?.role === 'MENTOR' ? "Manage your created courses." : "Browse our catalog and enroll."}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => {
          const isMentorOfCourse = user?.role === 'MENTOR' && user?.id === course.mentor.id;
          const status = enrollmentStatus[course.id];

          return (
            <motion.div key={course.id} /* ... */ >
              <Card className="glass-card h-full flex flex-col">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center mb-4">
                    <BookOpenIcon className="h-6 w-6 text-blue-400" />
                  </div>
                  <CardTitle>{course.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <UserCircleIcon className="h-4 w-4 mr-2" />
                    <span>Mentor: {course.mentor.username}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <ClockIcon className="h-4 w-4 mr-2" />
                    <span>Duration: {course.duration} hours</span>
                  </div>
                </CardContent>
                <CardFooter>
                  {isMentorOfCourse ? (
                    // --- MENTOR'S VIEW ---
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/dashboard/manage-course/${course.id}`}>
                        <CogIcon className="h-4 w-4 mr-2" />
                        Manage Course
                      </Link>
                    </Button>
                  ) : (
                    // --- USER'S VIEW ---
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleEnroll(course.id)}
                      disabled={!!enrollingId || status === "Enrolled!"}
                    >
                      {enrollingId === course.id ? "Enrolling..." : status || "Enroll Now"}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}