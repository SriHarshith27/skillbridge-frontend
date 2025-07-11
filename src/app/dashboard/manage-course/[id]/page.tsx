"use client";

import { useState, useEffect, use } from "react";
import { useAuth } from "~/contexts/AuthProvider";
import { 
  getCourseById, 
  addModuleToCourse, 
  addAssignmentToCourse, 
  deleteModule, 
  deleteAssignment,
  getSubmissionsForCourse, // Import new functions
  gradeAssignment 
} from "~/lib/api";
import { CourseDto, SubmissionDto } from "~/lib/types"; // Import SubmissionDto
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { 
  VideoCameraIcon, 
  DocumentPlusIcon, 
  TrashIcon, 
  FilmIcon, 
  DocumentTextIcon, 
  InboxArrowDownIcon,
  DocumentCheckIcon
} from "@heroicons/react/24/outline";

export default function ManageCoursePage({ params }: { params: Promise<{ id:string }> }) {
  const { id: courseId } = use(params);
  const { token } = useAuth();

  const [course, setCourse] = useState<CourseDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // States for uploads and deletes
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleDuration, setModuleDuration] = useState(0);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isUploadingModule, setIsUploadingModule] = useState(false);
  const [moduleStatus, setModuleStatus] = useState("");
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentFile, setAssignmentFile] = useState<File | null>(null);
  const [isUploadingAssignment, setIsUploadingAssignment] = useState(false);
  const [assignmentStatus, setAssignmentStatus] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // --- NEW: State for submissions and grading ---
  const [submissions, setSubmissions] = useState<SubmissionDto[]>([]);
  const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(true);
  const [gradeValues, setGradeValues] = useState<{ [assignmentId: number]: string }>({});
  const [isGradingId, setIsGradingId] = useState<number | null>(null);
  const [gradingStatus, setGradingStatus] = useState<{ [assignmentId: number]: string }>({});

  const fetchCourseAndSubmissions = async () => {
    if (!token || !courseId) return;
    try {
      setIsLoading(true);
      // Fetch both course details and submissions
      const courseData = await getCourseById(courseId, token);
      setCourse(courseData);
      
      setIsLoadingSubmissions(true);
      const submissionData = await getSubmissionsForCourse(courseId, token);
      setSubmissions(submissionData);

    } catch (error) {
      console.error("Failed to fetch course data", error);
    } finally {
      setIsLoading(false);
      setIsLoadingSubmissions(false);
    }
  };

  useEffect(() => {
    fetchCourseAndSubmissions();
  }, [courseId, token]);

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setVideoFile(file);
      const videoUrl = URL.createObjectURL(file);
      const videoElement = document.createElement('video');
      videoElement.onloadedmetadata = () => {
        const durationInSeconds = videoElement.duration;
        if (!isNaN(durationInSeconds)) {
          setModuleDuration(Math.round(durationInSeconds / 60));
        }
        URL.revokeObjectURL(videoUrl);
      };
      videoElement.src = videoUrl;
    }
  };

  const handleModuleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile || !token) return;
    setIsUploadingModule(true);
    setModuleStatus("Uploading...");
    const formData = new FormData();
    formData.append("title", moduleTitle);
    formData.append("duration", moduleDuration.toString());
    formData.append("video", videoFile);
    try {
      await addModuleToCourse(courseId, formData, token);
      await fetchCourseAndSubmissions(); // Re-fetch all data
    } catch (error: any) {
      setModuleStatus(`Error: ${error.message}`);
    } finally {
      setIsUploadingModule(false);
    }
  };

  const handleAssignmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignmentFile || !token) return;
    setIsUploadingAssignment(true);
    setAssignmentStatus("Uploading...");
    const formData = new FormData();
    formData.append("title", assignmentTitle);
    formData.append("file", assignmentFile);
    try {
      await addAssignmentToCourse(courseId, formData, token);
      await fetchCourseAndSubmissions(); // Re-fetch all data
    } catch (error: any) {
      setAssignmentStatus(`Error: ${error.message}`);
    } finally {
      setIsUploadingAssignment(false);
    }
  };

  const handleDeleteModule = async (moduleId: number) => {
    if (!token || !window.confirm("Are you sure?")) return;
    setDeletingId(moduleId);
    try {
      await deleteModule(moduleId, token);
      await fetchCourseAndSubmissions();
    } catch (error) { console.error(error); } 
    finally { setDeletingId(null); }
  };

  const handleDeleteAssignment = async (assignmentId: number) => {
    if (!token || !window.confirm("Are you sure?")) return;
    setDeletingId(assignmentId);
    try {
      await deleteAssignment(assignmentId, token);
      await fetchCourseAndSubmissions();
    } catch (error) { console.error(error); }
    finally { setDeletingId(null); }
  };

  // --- NEW: Handler for submitting a grade ---
  const handleGradeSubmit = async (assignmentId: number) => {
    if (!token) return;
    const grade = parseInt(gradeValues[assignmentId], 10);
    if (isNaN(grade) || grade < 0 || grade > 100) {
      setGradingStatus(prev => ({...prev, [assignmentId]: "Invalid grade (0-100)"}));
      return;
    }
    
    setIsGradingId(assignmentId);
    setGradingStatus(prev => ({...prev, [assignmentId]: "Submitting..."}));
    try {
      await gradeAssignment(assignmentId, grade, token);
      setGradingStatus(prev => ({...prev, [assignmentId]: "Graded!"}));
      await fetchCourseAndSubmissions(); // Refresh data to show new grade
    } catch (error: any) {
      setGradingStatus(prev => ({...prev, [assignmentId]: `Error: ${error.message}`}));
    } finally {
      setIsGradingId(null);
    }
  };

  if (isLoading) return <div>Loading course details...</div>;
  if (!course) return <div>Course not found.</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Manage: <span className="gradient-text">{course.name}</span></h1>
      </div>

      {/* Upload Forms & Existing Content Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Modules Section */}
        <div className="space-y-4">
          <Card className="glass-card">
            <CardHeader><CardTitle>Add a Video Module</CardTitle></CardHeader>
            <CardContent><form onSubmit={handleModuleSubmit} className="space-y-4">
              {/* ... form inputs ... */}
               <div className="space-y-2"><Label>Title</Label><Input value={moduleTitle} onChange={(e) => setModuleTitle(e.target.value)} required /></div>
              <div className="space-y-2"><Label>Video File</Label><Input type="file" accept="video/*" onChange={handleVideoFileChange} required /></div>
              <div className="space-y-2"><Label>Duration (mins)</Label><Input type="number" value={moduleDuration} readOnly className="bg-secondary" /></div>
              <Button type="submit" disabled={isUploadingModule || !videoFile} className="w-full">{isUploadingModule ? "Uploading..." : "Upload Module"}</Button>
              {moduleStatus && <p className="text-sm text-center mt-2">{moduleStatus}</p>}
            </form></CardContent>
          </Card>
          <Card className="glass-card">
            <CardHeader><CardTitle>Existing Modules</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {course.modules?.map(module => (
                <div key={module.id} className="flex items-center justify-between p-2 bg-secondary rounded-lg">
                  <div className="flex items-center space-x-3"><FilmIcon className="h-5 w-5 text-blue-400" /><span>{module.title}</span></div>
                  <Button variant="destructive" size="icon" onClick={() => handleDeleteModule(module.id)} disabled={deletingId === module.id}><TrashIcon className="h-4 w-4" /></Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        {/* Assignments Section */}
        <div className="space-y-4">
          <Card className="glass-card">
            <CardHeader><CardTitle>Add an Assignment</CardTitle></CardHeader>
            <CardContent><form onSubmit={handleAssignmentSubmit} className="space-y-4">
              {/* ... form inputs ... */}
              <div className="space-y-2"><Label>Title</Label><Input value={assignmentTitle} onChange={(e) => setAssignmentTitle(e.target.value)} required /></div>
              <div className="space-y-2"><Label>File</Label><Input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setAssignmentFile(e.target.files ? e.target.files[0] : null)} required /></div>
              <Button type="submit" disabled={isUploadingAssignment || !assignmentFile} className="w-full">{isUploadingAssignment ? "Uploading..." : "Upload Assignment"}</Button>
              {assignmentStatus && <p className="text-sm text-center mt-2">{assignmentStatus}</p>}
            </form></CardContent>
          </Card>
          <Card className="glass-card">
            <CardHeader><CardTitle>Existing Assignments</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {course.assignments?.map(assignment => (
                <div key={assignment.id} className="flex items-center justify-between p-2 bg-secondary rounded-lg">
                  <div className="flex items-center space-x-3"><DocumentTextIcon className="h-5 w-5 text-green-400" /><span>{assignment.title}</span></div>
                  <Button variant="destructive" size="icon" onClick={() => handleDeleteAssignment(assignment.id)} disabled={deletingId === assignment.id}><TrashIcon className="h-4 w-4" /></Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* --- NEW: Student Submissions Panel --- */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <InboxArrowDownIcon className="h-6 w-6 text-purple-400" />
            <CardTitle>Student Submissions</CardTitle>
          </div>
          <CardDescription>Review and grade assignments submitted by students.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingSubmissions ? <p>Loading submissions...</p> : 
            submissions.length === 0 ? <p className="text-muted-foreground">No students have submitted assignments yet.</p> :
            (
              <div className="space-y-4">
                {submissions.map(sub => (
                  <div key={sub.assignmentId} className="p-4 bg-secondary rounded-lg">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="font-bold">{sub.assignmentTitle}</p>
                        <p className="text-sm text-muted-foreground">Submitted by: {sub.studentUsername}</p>
                      </div>
                      <a href={sub.answerFileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                        <Button variant="outline" size="sm">
                          <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
                          Download Answer
                        </Button>
                      </a>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
                      <Label htmlFor={`grade-${sub.assignmentId}`} className="text-sm">Grade:</Label>
                      <Input 
                        id={`grade-${sub.assignmentId}`}
                        type="number" 
                        placeholder={sub.grade ? sub.grade.toString() : "0-100"}
                        className="w-24 h-8"
                        value={gradeValues[sub.assignmentId] || ""}
                        onChange={(e) => setGradeValues(prev => ({...prev, [sub.assignmentId]: e.target.value}))}
                      />
                      <Button 
                        size="sm" 
                        onClick={() => handleGradeSubmit(sub.assignmentId)}
                        disabled={isGradingId === sub.assignmentId}
                      >
                        <DocumentCheckIcon className="h-4 w-4 mr-2" />
                        {isGradingId === sub.assignmentId ? "Saving..." : "Save Grade"}
                      </Button>
                    </div>
                    {gradingStatus[sub.assignmentId] && <p className="text-xs text-center mt-2">{gradingStatus[sub.assignmentId]}</p>}
                  </div>
                ))}
              </div>
            )
          }
        </CardContent>
      </Card>
    </div>
  );
}
