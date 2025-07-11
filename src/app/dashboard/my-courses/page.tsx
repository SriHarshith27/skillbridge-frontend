// src/app/dashboard/my-courses/page.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "~/contexts/AuthProvider";
import { getEnrolledCourses } from "~/lib/api"; // Use our new function
import { CourseDto } from "~/lib/types";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { BookOpenIcon, PlayCircleIcon } from "@heroicons/react/24/outline";

export default function MyCoursesPage() {
  const [courses, setCourses] = useState<CourseDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      if (!token) return;
      try {
        const enrolledCourses = await getEnrolledCourses(token);
        setCourses(enrolledCourses);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, [token]);

  if (isLoading) return <div>Loading your courses...</div>;

  return (
    <div className="space-y-8">
      <motion.div>
        <h1 className="text-3xl font-bold">My Courses</h1>
        <p className="text-muted-foreground mt-2">
          Continue your learning journey. Select a course to view its content.
        </p>
      </motion.div>

      {courses.length === 0 ? (
        <p>You are not enrolled in any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <motion.div key={course.id} /* ... */>
              <Card className="glass-card h-full flex flex-col">
                <CardHeader>
                  <CardTitle>{course.name}</CardTitle>
                  <CardDescription>by {course.mentor.username}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  {/* We can add progress bars here later */}
                </CardContent>
                <CardFooter>
                      <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                        {/* This will now link to our new detailed course view page */}
                        <Link href={`/dashboard/view-course/${course.id}`}>
                          <PlayCircleIcon className="h-5 w-5 mr-2" />
                          View Course
                        </Link>
                      </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}