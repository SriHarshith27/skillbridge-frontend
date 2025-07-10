"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ChartBarIcon,
  UserGroupIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  BellIcon
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "My Courses", href: "/dashboard/courses", icon: BookOpenIcon },
  { name: "Achievements", href: "/dashboard/achievements", icon: AcademicCapIcon },
  { name: "Progress", href: "/dashboard/progress", icon: ChartBarIcon },
  { name: "Community", href: "/dashboard/community", icon: UserGroupIcon },
  { name: "Notifications", href: "/dashboard/notifications", icon: BellIcon },
  { name: "Settings", href: "/dashboard/settings", icon: CogIcon },
  { name: "Help", href: "/dashboard/help", icon: QuestionMarkCircleIcon },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-sidebar border-r border-sidebar-border overflow-y-auto"
    >
      <div className="p-6">
        <nav className="space-y-2">
          {navigation.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg' 
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    }
                  `}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-2 h-2 bg-sidebar-primary-foreground rounded-full"
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 p-4 bg-sidebar-accent rounded-lg"
        >
          <h3 className="text-sm font-semibold text-sidebar-accent-foreground mb-3">
            Quick Stats
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-sidebar-foreground/70">Courses Completed</span>
              <span className="font-medium text-sidebar-primary">12</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-sidebar-foreground/70">Hours Learned</span>
              <span className="font-medium text-sidebar-primary">48h</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-sidebar-foreground/70">Streak</span>
              <span className="font-medium text-sidebar-primary">7 days</span>
            </div>
          </div>
        </motion.div>

        {/* Upgrade Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 p-4 bg-gradient-to-br from-primary/10 to-purple-600/10 rounded-lg border border-primary/20"
        >
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-2 bg-primary/20 rounded-full flex items-center justify-center">
              <AcademicCapIcon className="h-4 w-4 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">
              Upgrade to Pro
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Unlock premium courses and features
            </p>
            <button className="w-full px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-md hover:bg-primary/90 transition-colors">
              Upgrade Now
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}