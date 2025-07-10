// src/app/dashboard/page.tsx

"use client";

import { useAuth } from "~/contexts/AuthProvider";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // The user object is guaranteed to exist here because the layout
  // will handle the loading and null states.
  if (!user) {
    // This is a fallback, you shouldn't see it if the layout is working.
    return <p>Loading user details...</p>;
  }

  return (
    <div>
      <h2>Dashboard Home Page</h2>
      <p>
        This is the main content of your dashboard.
      </p>
      <p>
        Welcome, <strong>{user.username}</strong>!
      </p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}