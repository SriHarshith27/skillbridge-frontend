"use client";

import { useAuth } from "~/contexts/AuthProvider";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  BookOpenIcon,
  ClockIcon,
  TrophyIcon,
  FireIcon,
  PlayIcon,
  UserGroupIcon,
  StarIcon
} from "@heroicons/react/24/outline";

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    {
      title: "Courses Enrolled",
      value: "12",
      change: "+2 this week",
      icon: BookOpenIcon,
      color: "text-blue-400"
    },
    {
      title: "Hours Learned",
      value: "48h",
      change: "+8h this week",
      icon: ClockIcon,
      color: "text-green-400"
    },
    {
      title: "Achievements",
      value: "24",
      change: "+3 new badges",
      icon: TrophyIcon,
      color: "text-yellow-400"
    },
    {
      title: "Learning Streak",
      value: "7 days",
      change: "Keep it up!",
      icon: FireIcon,
      color: "text-red-400"
    }
  ];

  const recentCourses = [
    {
      title: "Advanced React Patterns",
      progress: 75,
      instructor: "Sarah Johnson",
      duration: "2h 30m left"
    },
    {
      title: "Node.js Masterclass",
      progress: 45,
      instructor: "Michael Chen",
      duration: "4h 15m left"
    },
    {
      title: "UI/UX Design Fundamentals",
      progress: 90,
      instructor: "Emily Rodriguez",
      duration: "30m left"
    }
  ];

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
          <span className="text-muted-foreground">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, <span className="gradient-text">{user.username}</span>! 👋
          </h1>
          <p className="text-muted-foreground mt-2">
            Ready to continue your learning journey?
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <PlayIcon className="h-4 w-4 mr-2" />
          Continue Learning
        </Button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, statIndex) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: statIndex * 0.1 }}
            className="hover-lift"
          >
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold mt-2">
                      {stat.value}
                    </p>
                    <p className={`text-xs mt-1 ${stat.color}`}>
                      {stat.change}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Courses */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpenIcon className="h-5 w-5 text-blue-400" />
                <span>Continue Learning</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentCourses.map((course, index) => (
                <div
                  key={`${course.title}-${courseIndex}`}
                  className="flex items-center space-x-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer hover-lift"
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center">
                    <PlayIcon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="flex-1 bg-secondary rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{course.progress}%</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{course.duration}</p>
                    <Button size="sm" variant="ghost" className="mt-1">
                      Continue
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrophyIcon className="h-5 w-5 text-yellow-400" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <BookOpenIcon className="h-4 w-4 mr-2" />
                Browse Courses
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <UserGroupIcon className="h-4 w-4 mr-2" />
                Join Study Group
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <StarIcon className="h-4 w-4 mr-2" />
                Rate Courses
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}