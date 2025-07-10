// src/components/auth/RegisterForm.tsx

"use client";




import { useState } from "react";
import { Button } from "~/components/ui/button";
// Inside src/components/auth/RegisterForm.tsx

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useAuth } from "~/contexts/AuthProvider";
import { RegisterRequest } from "~/lib/types";

interface RegisterFormProps {
  // This function will be called to switch back to the login view on success
  onSuccess: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [formData, setFormData] = useState<RegisterRequest>({
    username: "",
    email: "",
    password: "",
    phone: "",
    role: "USER", // Default role
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (value: 'USER' | 'MENTOR') => {
    setFormData({ ...formData, role: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);
    try {
      const successMessage = await register(formData);
      setSuccess(`${successMessage} You can now log in.`);
      // After 2 seconds, call the onSuccess function to switch views
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Create an Account</CardTitle>
        <CardDescription>
          Fill in the details below to start your journey with SkillBridge.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="grid gap-4">
          {error && <p className="text-sm text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}
          {success && <p className="text-sm text-green-500 bg-green-100 p-3 rounded-md">{success}</p>}
          
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" required onChange={handleChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required onChange={handleChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required onChange={handleChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone (Optional)</Label>
            <Input id="phone" name="phone" type="tel" onChange={handleChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">Register as a</Label>
            <Select onValueChange={handleRoleChange} defaultValue="USER">
              <SelectTrigger id="role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USER">User</SelectItem>
                <SelectItem value="MENTOR">Mentor</SelectItem>
              </SelectContent>
            </Select>
          </div>

        </CardContent>
        <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
        </CardFooter>
      </form>
    </Card>
  );
}