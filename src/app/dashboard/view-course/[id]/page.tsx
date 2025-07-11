"use client";

import { useState, useEffect, use } from "react";
import { useAuth } from "~/contexts/AuthProvider";
import { getCourseById, submitAssignment } from "~/lib/api";
import { CourseDto } from "~/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { 
  PlayCircleIcon, 
  DocumentArrowDownIcon, 
  DocumentArrowUpIcon, 
  AcademicCapIcon 
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function ViewCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id: courseId } = use(params);
  const { token } = useAuth();

  const [course, setCourse] = useState<CourseDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);

  const [submissionFile, setSubmissionFile] = useState<File | null>(null);
  const [submittingId, setSubmittingId] = useState<number | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchCourse = async () => {
      if (!token || !courseId) return;
      try {
        const data = await getCourseById(courseId, token);
        setCourse(data);
      } catch (error) {
        console.error("Failed to fetch course", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourse();
  }, [courseId, token]);

  const handleAssignmentSubmit = async (assignmentId: number) => {
    if (!submissionFile || !token) return;
    setSubmittingId(assignmentId);
    setSubmissionStatus(prev => ({ ...prev, [assignmentId]: "Uploading..." }));
    try {
      await submitAssignment(assignmentId, submissionFile, token);
      setSubmissionStatus(prev => ({ ...prev, [assignmentId]: "Submitted successfully!" }));
    } catch (error: any) {
      setSubmissionStatus(prev => ({ ...prev, [assignmentId]: `Error: ${error.message}` }));
    } finally {
      setSubmittingId(null);
      setSubmissionFile(null);
    }
  };

  if (isLoading) return <div>Loading course content...</div>;
  if (!course) return <div>Course not found.</div>;

  return (
    <div className="space-y-8">
      {/* Course Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">{course.name}</h1>
        <p className="text-muted-foreground mt-2">by {course.mentor.username}</p>
        <p className="mt-4 max-w-2xl">{course.description}</p>
      </motion.div>

      {/* Video Player */}
      {selectedVideoUrl && (
        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="overflow-hidden">
          <Card className="glass-card">
            <CardHeader><CardTitle>Video Player</CardTitle></CardHeader>
            <CardContent>
              <video src={selectedVideoUrl} controls autoPlay className="w-full rounded-lg" />
              <Button variant="outline" size="sm" onClick={() => setSelectedVideoUrl(null)} className="mt-4">Close Player</Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Video Modules Section */}
        <Card className="glass-card">
          <CardHeader><CardTitle>Course Modules</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {course.modules?.map(module => (
              <div key={module.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <div>
                  <p className="font-semibold">{module.title}</p>
                  <p className="text-sm text-muted-foreground">{module.duration} mins</p>
                </div>
                <Button size="sm" onClick={() => setSelectedVideoUrl(module.sessionVideoUrl)}><PlayCircleIcon className="h-5 w-5 mr-2" />Watch</Button>
              </div>
            ))}
            {(!course.modules || course.modules.length === 0) && (<p className="text-sm text-muted-foreground">No video modules have been added.</p>)}
          </CardContent>
        </Card>

        {/* Assignments Section */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Assignments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {course.assignments?.map(assignment => (
              <div key={assignment.id} className="p-3 bg-secondary rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{assignment.title}</p>
                    {assignment.grade && (<p className="text-sm font-bold text-blue-400">Grade: {assignment.grade}/100</p>)}
                  </div>
                  {/* FIX: Revert to a simple link with the 'download' attribute. This is the most reliable method. */}
                  <Button asChild variant="outline" size="sm">
                    <a href={assignment.assignmentFileUrl} download>
                      <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                      Download
                    </a>
                  </Button>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <Label className="text-xs">Submit Your Answer</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input type="file" onChange={(e) => setSubmissionFile(e.target.files ? e.target.files[0] : null)} />
                    <Button size="sm" onClick={() => handleAssignmentSubmit(assignment.id)} disabled={!submissionFile || !!submittingId}>
                      <DocumentArrowUpIcon className="h-5 w-5" />
                    </Button>
                  </div>
                  {submissionStatus[assignment.id] && (<p className="text-xs text-center mt-2">{submissionStatus[assignment.id]}</p>)}
                </div>
              </div>
            ))}
            {(!course.assignments || course.assignments.length === 0) && (<p className="text-sm text-muted-foreground">No assignments have been added.</p>)}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
