"use client";

import Link from "next/link";
import { useAuth } from "~/contexts/AuthProvider";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpenIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { Button } from "~/components/ui/button";

export function Navbar() {
  const { isAuthenticated, logout, isLoading, user } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors"
            >
              <BookOpenIcon className="h-6 w-6 text-primary" />
            </motion.div>
            <span className="text-xl font-bold gradient-text">SkillBridge</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-primary/50 rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Loading...</span>
              </div>
            ) : isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-secondary/50"
                >
                  <UserCircleIcon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{user?.username}</span>
                </motion.div>
                
                <Button asChild variant="ghost" size="sm">
                  <Link href="/dashboard" className="flex items-center space-x-2">
                    <span>Dashboard</span>
                  </Link>
                </Button>
                
                <Button 
                  onClick={handleLogout}
                  variant="outline" 
                  size="sm"
                  className="flex items-center space-x-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50"
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-3"
              >
                <Button asChild variant="ghost" size="sm">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
                  <Link href="/login">Get Started</Link>
                </Button>
              </motion.div>
            )}
          </div>
        </nav>
      </div>
    </motion.header>
  );
}