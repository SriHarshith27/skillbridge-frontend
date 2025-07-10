// src/app/(auth)/login/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useAuth } from "~/contexts/AuthProvider";
import { RegisterForm } from "~/components/auth/RegisterForm";

// The LoginForm component no longer needs to handle redirection.
// It just focuses on logging the user in.
function LoginForm({ onSwitchToRegister }: { onSwitchToRegister: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login, isLoading } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    // The login function will be awaited, but we don't need to do anything after.
    // The parent AuthPage component will handle the redirect.
    try {
      await login({ username, password });
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your credentials to access your account.</CardDescription>
      </CardHeader>
      <form onSubmit={handleLogin}>
        <CardContent className="grid gap-4">
          {error && <p className="text-sm text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <button type="button" onClick={onSwitchToRegister} className="font-semibold text-blue-600 hover:underline">
              Register
            </button>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}


// --- NEW AND IMPROVED AuthPage ---
// This component now acts as a gatekeeper.
export default function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(true);
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // This effect runs whenever the authentication state changes.
    if (!isLoading && isAuthenticated) {
      // If the user is authenticated, redirect them to the dashboard.
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  // While we're checking the auth status, show a loading message.
  // Also, if the user is already authenticated, this prevents the
  // login form from briefly flashing on the screen before redirecting.
  if (isLoading || isAuthenticated) {
    return <div>Loading...</div>; // Or a proper spinner component
  }

  // If we're done loading and the user is not authenticated, show the forms.
  if (isLoginView) {
    return <LoginForm onSwitchToRegister={() => setIsLoginView(false)} />;
  } else {
    return <RegisterForm onSuccess={() => setIsLoginView(true)} />;
  }
}