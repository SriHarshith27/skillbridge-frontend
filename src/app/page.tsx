"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  BookOpenIcon, 
  UserGroupIcon, 
  AcademicCapIcon,
  ChartBarIcon,
  StarIcon,
  PlayIcon,
  CheckIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

export default function LandingPage() {
  const features = [
    {
      icon: BookOpenIcon,
      title: "Expert-Led Courses",
      description: "Learn from industry professionals with real-world experience and proven track records."
    },
    {
      icon: UserGroupIcon,
      title: "Interactive Community",
      description: "Connect with fellow learners, share knowledge, and grow together in our vibrant community."
    },
    {
      icon: AcademicCapIcon,
      title: "Certified Learning",
      description: "Earn recognized certificates that validate your skills and boost your career prospects."
    },
    {
      icon: ChartBarIcon,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics and personalized recommendations."
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Learners" },
    { number: "200+", label: "Expert Instructors" },
    { number: "1000+", label: "Courses Available" },
    { number: "95%", label: "Success Rate" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Developer",
      content: "SkillBridge transformed my career. The courses are practical and the mentors are incredibly supportive.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Data Scientist",
      content: "The quality of content and the interactive learning approach made complex topics easy to understand.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      content: "I love how the platform adapts to my learning pace. The community support is amazing too!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Animated Background Particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  🚀 New courses added weekly
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-4xl lg:text-6xl font-bold leading-tight"
                >
                  Master New Skills with{" "}
                  <span className="gradient-text">SkillBridge</span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl text-muted-foreground max-w-2xl"
                >
                  Your gateway to mastering new skills with expert-led courses, 
                  interactive learning, and a supportive community. Start your journey today!
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 animate-glow">
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
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl lg:text-3xl font-bold text-primary">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Hero Image/Animation */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden glass-effect">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 border-4 border-primary/30 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute w-24 h-24 border-4 border-purple-500/30 rounded-full"
                  />
                  <div className="absolute w-16 h-16 bg-primary/20 rounded-full animate-pulse" />
                </div>
              </div>
              
              {/* Floating Cards */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 p-4 bg-card border border-border rounded-xl shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                    <CheckIcon className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Course Completed</div>
                    <div className="text-xs text-muted-foreground">React Fundamentals</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 p-4 bg-card border border-border rounded-xl shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <StarIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">5.0 Rating</div>
                    <div className="text-xs text-muted-foreground">From 1,200+ students</div>
                  </div>
                </div>
              </motion.div>
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
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose <span className="gradient-text">SkillBridge</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide everything you need to accelerate your learning journey and achieve your goals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 glass-effect">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center"
                    >
                      <feature.icon className="h-8 w-8 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              What Our <span className="gradient-text">Students</span> Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of successful learners who have transformed their careers with SkillBridge.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full glass-effect">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                        <span className="text-primary font-semibold">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-purple-600/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Start Your <span className="gradient-text">Learning Journey</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of learners who are already advancing their careers with SkillBridge. 
              Start your free trial today!
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 animate-glow">
                <Link href="/login" className="flex items-center space-x-2">
                  <span>Get Started Free</span>
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}