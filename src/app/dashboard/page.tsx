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
  ChartBarIcon,
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
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "Hours Learned",
      value: "48h",
      change: "+8h this week",
      icon: ClockIcon,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      title: "Achievements",
      value: "24",
      change: "+3 new badges",
      icon: TrophyIcon,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10"
    },
    {
      title: "Learning Streak",
      value: "7 days",
      change: "Keep it up!",
      icon: FireIcon,
      color: "text-red-500",
      bgColor: "bg-red-500/10"
    }
  ];

  const recentCourses = [
    {
      title: "Advanced React Patterns",
      progress: 75,
      instructor: "Sarah Johnson",
      duration: "2h 30m left",
      thumbnail: "bg-gradient-to-br from-blue-500 to-purple-600"
    },
    {
      title: "Node.js Masterclass",
      progress: 45,
      instructor: "Michael Chen",
      duration: "4h 15m left",
      thumbnail: "bg-gradient-to-br from-green-500 to-teal-600"
    },
    {
      title: "UI/UX Design Fundamentals",
      progress: 90,
      instructor: "Emily Rodriguez",
      duration: "30m left",
      thumbnail: "bg-gradient-to-br from-pink-500 to-rose-600"
    }
  ];

  const achievements = [
    { name: "First Course", icon: "🎯", earned: true },
    { name: "Week Warrior", icon: "⚡", earned: true },
    { name: "Knowledge Seeker", icon: "🔍", earned: true },
    { name: "Master Learner", icon: "🏆", earned: false }
  ];

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <span className="text-muted-foreground">Loading user details...</span>
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
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, <span className="gradient-text">{user.username}</span>! 👋
          </h1>
          <p className="text-muted-foreground mt-2">
            Ready to continue your learning journey? Let's pick up where you left off.
          </p>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button className="bg-primary hover:bg-primary/90">
            <PlayIcon className="h-4 w-4 mr-2" />
            Continue Learning
          </Button>
        </motion.div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card className="glass-effect hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground mt-2">
                      {stat.value}
                    </p>
                    <p className={`text-xs mt-1 ${stat.color}`}>
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
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
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpenIcon className="h-5 w-5 text-primary" />
                <span>Continue Learning</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentCourses.map((course, index) => (
                <motion.div
                  key={course.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-4 p-4 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors cursor-pointer"
                >
                  <div className={`w-16 h-16 rounded-lg ${course.thumbnail} flex items-center justify-center`}>
                    <PlayIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="flex-1 bg-secondary rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
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
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Achievements & Activity */}
        <div className="space-y-6">
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrophyIcon className="h-5 w-5 text-yellow-500" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                      className={`p-3 rounded-lg text-center transition-all duration-300 ${
                        achievement.earned 
                          ? 'bg-primary/10 border border-primary/20' 
                          : 'bg-secondary/20 border border-border/50 opacity-50'
                      }`}
                    >
                      <div className="text-2xl mb-1">{achievement.icon}</div>
                      <p className="text-xs font-medium">{achievement.name}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ChartBarIcon className="h-5 w-5 text-primary" />
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
    </div>
  );
}