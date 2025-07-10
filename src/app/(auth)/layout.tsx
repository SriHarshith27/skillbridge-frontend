"use client";

import { motion } from "framer-motion";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-purple-600/5" />
      
      {/* Floating Particles */}
      <div className="particles">
        {[...Array(15)].map((_, i) => (
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

      {/* Geometric Shapes */}
      <div className="absolute top-20 left-20 w-32 h-32 border border-primary/20 rounded-full animate-float" />
      <div className="absolute bottom-20 right-20 w-24 h-24 border border-purple-500/20 rotate-45 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-10 w-16 h-16 bg-primary/10 rounded-lg animate-float" style={{ animationDelay: '4s' }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {children}
      </motion.div>
    </div>
  );
}