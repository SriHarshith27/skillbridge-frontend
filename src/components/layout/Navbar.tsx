// src/components/layout/Navbar.tsx

"use client";

import Link from "next/link";
import { useAuth } from "~/contexts/AuthProvider";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { isAuthenticated, logout, isLoading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/">
          <h1 style={{ margin: 0, cursor: 'pointer' }}>SkillBridge</h1>
        </Link>
        
        {/* We use a loading state to prevent the wrong buttons from flashing briefly on page load */}
        <div>
          {isLoading ? (
            <span>Loading...</span>
          ) : isAuthenticated ? (
            // If the user IS logged in
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link href="/dashboard">
                <button>Dashboard</button>
              </Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            // If the user is NOT logged in
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link href="/login">
                <button>Login</button>
              </Link>
              {/* You can add a separate register button if you like */}
              {/* <Link href="/register"><button>Register</button></Link> */}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}