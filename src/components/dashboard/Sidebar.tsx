"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "~/contexts/AuthProvider"; // FIX 1: Import useAuth
import {
  HomeIcon,
  BookOpenIcon,
  AcademicCapIcon,
  UserGroupIcon,
  CogIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import React from "react";

// FIX 2: Define a type for our navigation items for TypeScript safety
type NavItem = {
  name: string;
  href: string;
  icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
    title?: string | undefined;
    titleId?: string | undefined;
  } & React.RefAttributes<SVGSVGElement>>;
};

const userNavigation: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "My Courses", href: "/dashboard/my-courses", icon: BookOpenIcon },
  { name: "Browse All Courses", href: "/dashboard/courses", icon: AcademicCapIcon }, // Let's rename this for clarity
  { name: "Community", href: "/dashboard/community", icon: UserGroupIcon },
];

const mentorNavigation: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Create Course", href: "/dashboard/create-course", icon: PlusCircleIcon },
  { name: "My Created Courses", href: "/dashboard/courses", icon: BookOpenIcon },
  { name: "Student Submissions", href: "/dashboard/submissions", icon: AcademicCapIcon },
];

const sharedNavigation: NavItem[] = [
    { name: "Settings", href: "/dashboard/settings", icon: CogIcon },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  // Determine which navigation to display based on the user's role
  const navigation = user?.role === 'MENTOR' ? mentorNavigation : userNavigation;

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-card border-r border-border overflow-y-auto"
    >
      <div className="p-6 flex flex-col h-full">
        <nav className="space-y-2 flex-grow">
          {navigation.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={`
                    flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    }
                  `}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Shared navigation at the bottom */}
        <div className="mt-auto">
            <nav className="space-y-2 pt-4 border-t border-border">
                {sharedNavigation.map((item, index) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                isActive ? 'bg-blue-600 text-white' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                            }`}
                        >
                            <item.icon className="h-5 w-5" />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
      </div>
    </motion.div>
  );
}
