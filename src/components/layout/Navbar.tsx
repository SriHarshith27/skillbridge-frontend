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
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur"
    >
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-lg bg-blue-600/10 group-hover:bg-blue-600/20 transition-colors">
              <BookOpenIcon className="h-6 w-6 text-blue-400" />
            </div>
            <span className="text-xl font-bold gradient-text">SkillBridge</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-600/50 rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Loading...</span>
              </div>
            ) : isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-secondary">
                  <UserCircleIcon className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium">{user?.username}</span>
                </div>
                
                <Button asChild variant="ghost" size="sm">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                
                <Button 
                  onClick={handleLogout}
                  variant="outline" 
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/login">Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </motion.header>
  );
}