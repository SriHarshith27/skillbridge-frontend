"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  BookOpenIcon, 
  UserGroupIcon, 
  AcademicCapIcon,
  ChartBarIcon,
  PlayIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

export default function LandingPage() {
  const features = [
    {
      icon: BookOpenIcon,
      title: "Expert-Led Courses",
      description: "Learn from industry professionals with real-world experience."
    },
    {
      icon: UserGroupIcon,
      title: "Interactive Community",
      description: "Connect with fellow learners and grow together."
    },
    {
      icon: AcademicCapIcon,
      title: "Certified Learning",
      description: "Earn recognized certificates that boost your career."
    },
    {
      icon: ChartBarIcon,
      title: "Progress Tracking",
      description: "Monitor your journey with detailed analytics."
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Learners" },
    { number: "200+", label: "Expert Instructors" },
    { number: "1000+", label: "Courses Available" },
    { number: "95%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10" />
        
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.div
                  key={`${feature.title}-${featureIndex}`}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600/10 text-blue-400 text-sm font-medium border border-blue-600/20"
                >
                  🚀 New courses added weekly
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-4xl lg:text-6xl font-bold leading-tight"
                >
                  Master New Skills with{" "}
                  <span className="gradient-text">SkillBridge</span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-xl text-muted-foreground"
                >
                  Your gateway to mastering new skills with expert-led courses, 
                  interactive learning, and a supportive community.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/login" className="flex items-center space-x-2">
                    <span>Start Learning</span>
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </Button>
                
                <Button variant="outline" size="lg" className="flex items-center space-x-2">
                  <PlayIcon className="h-4 w-4" />
                  <span>Watch Demo</span>
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8"
              >
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-blue-400">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              <div className="relative w-full h-96 lg:h-[500px] rounded-2xl glass-card overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 border-2 border-blue-600/30 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
                  <div className="absolute w-24 h-24 border-2 border-purple-500/30 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
                  <div className="absolute w-16 h-16 bg-blue-600/20 rounded-full animate-pulse" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose <span className="gradient-text">SkillBridge</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to accelerate your learning journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, featureIndex) => (
              <motion.div
                key={`${feature.title}-${featureIndex}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: featureIndex * 0.1 }}
                className="hover-lift"
              >
                <Card className="h-full glass-card">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 bg-blue-600/10 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Start Your <span className="gradient-text">Learning Journey</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of learners advancing their careers with SkillBridge.
            </p>
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/login" className="flex items-center space-x-2">
                <span>Get Started Free</span>
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}