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
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-card border-r border-border overflow-y-auto"
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

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 p-4 bg-secondary rounded-lg"
        >
          <h3 className="text-sm font-semibold mb-3">Quick Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Courses</span>
              <span className="font-medium text-blue-400">12</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Hours</span>
              <span className="font-medium text-blue-400">48h</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Streak</span>
              <span className="font-medium text-blue-400">7 days</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}