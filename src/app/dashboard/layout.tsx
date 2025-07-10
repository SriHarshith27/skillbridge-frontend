// src/app/dashboard/layout.tsx

"use client";

import React, { useEffect } from "react";
import { useAuth } from "~/contexts/AuthProvider";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <div>Verifying session...</div>;
  }

  if (isAuthenticated) {
    // The layout no longer needs a header, just the main content area for its children.
    return <>{children}</>;
  }

  return <div>Redirecting to login...</div>;
}