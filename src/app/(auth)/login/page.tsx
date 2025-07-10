"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useAuth } from "~/contexts/AuthProvider";
import { RegisterRequest } from "~/lib/types";
import { 
  UserIcon, 
  LockClosedIcon, 
  EyeIcon, 
  EyeSlashIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserPlusIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

function LoginForm({ onSwitchToRegister }: { onSwitchToRegister: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, isLoading } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login({ username, password });
    } catch (err: any) {
      setError((err as Error).message || "An unexpected error occurred.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
        >
          <UserIcon className="h-8 w-8 text-white" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          Welcome Back
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-muted-foreground mt-2"
        >
          Sign in to continue your learning journey
        </motion.p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm"
          >
            {error}
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-2"
        >
          <Label htmlFor="username" className="text-sm font-medium">Username</Label>
          <div className="relative group">
            <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-blue-400 transition-colors" />
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pl-12 h-12 bg-background/50 border-border/50 rounded-xl focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
              placeholder="Enter your username"
              required
            />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="space-y-2"
        >
          <Label htmlFor="password" className="text-sm font-medium">Password</Label>
          <div className="relative group">
            <LockClosedIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-blue-400 transition-colors" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-12 pr-12 h-12 bg-background/50 border-border/50 rounded-xl focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
              placeholder="Enter your password"
              required
            />
            <motion.button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-4"
        >
          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Signing In...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>Sign In</span>
                <ArrowRightIcon className="h-4 w-4" />
              </div>
            )}
          </Button>
          
          <div className="text-center">
            <span className="text-sm text-muted-foreground">Don't have an account? </span>
            <motion.button
              type="button"
              onClick={onSwitchToRegister}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
            >
              Create one now
            </motion.button>
          </div>
        </motion.div>
      </form>
    </motion.div>
  );
}

function RegisterForm({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const [formData, setFormData] = useState<RegisterRequest>({
    username: "",
    email: "",
    password: "",
    phone: "",
    role: "USER",
  });
  const [showPassword, setShowPassword] = useState(false);
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
      setTimeout(() => {
        onSwitchToLogin();
      }, 2000);
    } catch (err: any) {
      setError((err as Error).message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg"
        >
          <UserPlusIcon className="h-8 w-8 text-white" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          Join SkillBridge
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-muted-foreground mt-2"
        >
          Create your account and start learning
        </motion.p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm"
          >
            {error}
          </motion.div>
        )}
        
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-xl backdrop-blur-sm flex items-center space-x-2"
          >
            <CheckCircleIcon className="h-5 w-5" />
            <span>{success}</span>
          </motion.div>
        )}
        
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-2"
          >
            <Label htmlFor="username" className="text-sm font-medium">Username</Label>
            <div className="relative group">
              <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-purple-400 transition-colors" />
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="pl-12 h-11 bg-background/50 border-border/50 rounded-xl focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                placeholder="Username"
                required
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-2"
          >
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <div className="relative group">
              <EnvelopeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-purple-400 transition-colors" />
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="pl-12 h-11 bg-background/50 border-border/50 rounded-xl focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                placeholder="Email"
                required
              />
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-2"
        >
          <Label htmlFor="password" className="text-sm font-medium">Password</Label>
          <div className="relative group">
            <LockClosedIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-purple-400 transition-colors" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className="pl-12 pr-12 h-11 bg-background/50 border-border/50 rounded-xl focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
              placeholder="Password"
              required
            />
            <motion.button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </motion.button>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="space-y-2"
          >
            <Label htmlFor="phone" className="text-sm font-medium">Phone (Optional)</Label>
            <div className="relative group">
              <PhoneIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-purple-400 transition-colors" />
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="pl-12 h-11 bg-background/50 border-border/50 rounded-xl focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                placeholder="Phone"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="space-y-2"
          >
            <Label htmlFor="role" className="text-sm font-medium">I want to</Label>
            <Select onValueChange={handleRoleChange} defaultValue="USER">
              <SelectTrigger className="h-11 bg-background/50 border-border/50 rounded-xl focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-background/95 backdrop-blur-xl border-border/50 rounded-xl">
                <SelectItem value="USER" className="rounded-lg">Learn new skills</SelectItem>
                <SelectItem value="MENTOR" className="rounded-lg">Teach and mentor</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="space-y-4"
        >
          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Creating Account...</span>
              </div>
            ) : (
              "Create Account"
            )}
          </Button>
          
          <div className="text-center">
            <span className="text-sm text-muted-foreground">Already have an account? </span>
            <motion.button
              type="button"
              onClick={onSwitchToLogin}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
            >
              Sign in instead
            </motion.button>
          </div>
        </motion.div>
      </form>
    </motion.div>
  );
}

export default function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(true);
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || isAuthenticated) {
    return (
      <div className="flex items-center justify-center space-x-3">
        <div className="w-8 h-8 border-3 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
        <span className="text-muted-foreground font-medium">Loading...</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Sliding Toggle */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mb-8 p-1 bg-background/50 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg"
      >
        <motion.div
          className="absolute top-1 bottom-1 w-1/2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg"
          animate={{
            x: isLoginView ? 0 : "100%",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        />
        <div className="relative grid grid-cols-2">
          <motion.button
            onClick={() => setIsLoginView(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative z-10 py-3 px-6 text-sm font-semibold rounded-xl transition-colors duration-300 ${
              isLoginView ? 'text-white' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <ArrowLeftIcon className="h-4 w-4" />
              <span>Sign In</span>
            </div>
          </motion.button>
          <motion.button
            onClick={() => setIsLoginView(false)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative z-10 py-3 px-6 text-sm font-semibold rounded-xl transition-colors duration-300 ${
              !isLoginView ? 'text-white' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <span>Sign Up</span>
              <ArrowRightIcon className="h-4 w-4" />
            </div>
          </motion.button>
        </div>
      </motion.div>

      {/* Form Container */}
      <motion.div
        layout
        className="relative overflow-hidden bg-background/30 backdrop-blur-2xl border border-border/50 rounded-3xl shadow-2xl p-8"
      >
        <AnimatePresence mode="wait">
          {isLoginView ? (
            <LoginForm key="login" onSwitchToRegister={() => setIsLoginView(false)} />
          ) : (
            <RegisterForm key="register" onSwitchToLogin={() => setIsLoginView(true)} />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}