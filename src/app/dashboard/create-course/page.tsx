// src/app/dashboard/create-course/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "~/contexts/AuthProvider";
import { createCourse } from "~/lib/api";
import { CourseRequest } from "~/lib/types";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea"; // We need a textarea component
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

// We need to add the Textarea component from shadcn/ui
// In your terminal, run: npx shadcn-ui@latest add textarea

export default function CreateCoursePage() {
  const [formData, setFormData] = useState<CourseRequest>({
    name: "",
    description: "",
    category: "",
    duration: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError("You must be logged in to create a course.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const newCourse = await createCourse(formData, token);
      // On success, redirect to the main course list page
      router.push('/dashboard/courses');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <PlusCircleIcon className="h-6 w-6 text-blue-400" />
            <CardTitle>Create a New Course</CardTitle>
          </div>
          <CardDescription>Fill in the details below to launch your new course.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && <p className="text-red-500">{error}</p>}
            <div className="space-y-2">
              <Label htmlFor="name">Course Title</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Course Description</Label>
              <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" value={formData.category} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (in hours)</Label>
                <Input id="duration" name="duration" type="number" value={formData.duration} onChange={handleChange} required />
              </div>
            </div>
            <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700">
              {isLoading ? "Creating..." : "Create Course"}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}