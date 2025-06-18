"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const registered = searchParams.get("registered");
    const emailParam = searchParams.get("email");
    if (registered && emailParam) {
      setSuccess("Account created successfully! Please sign in.");
      setEmail(decodeURIComponent(emailParam));
    }
  }, [searchParams]);

  useEffect(() => {
    const demoLoginButton = document.getElementById("demo-login-button") as HTMLButtonElement;
    const signInDemoUser = async () => {
      setError(null);
      setLoading(true);
      try {
        const result = await signIn("credentials", {
          email: "demo@lumo.finance",
          password: "demo123",
          redirect: false,
        });
        if (result?.error) {
          throw new Error(result.error);
        }
        router.push("/");
        router.refresh();
      } catch (error: any) {
        setError(error.message || "Invalid email or password");
      } finally {
        setLoading(false);
      }
    };
    if (demoLoginButton) {
      signInDemoUser();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
      if (result?.error) {
        throw new Error(result.error);
      }
      router.push("/");
      router.refresh();
    } catch (error: any) {
      setError(error.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <div className="relative isolate flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white font-serif mb-2">Digital Banking for Africa</h1>
          <p className="text-lumo-cream/80">Seamless, secure, and accessible financial services for everyone</p>
        </div>

        <Card className="w-full max-w-md border-0 bg-lumo-midnight/90 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-white">Welcome back</CardTitle>
            <p className="text-sm text-lumo-cream/80 text-center">Enter your details to access your secure banking</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-lumo-cream/80">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="bg-lumo-navy/50 border-lumo-teal/20 text-white placeholder:text-lumo-cream/50"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-lumo-cream/80">Password</label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="bg-lumo-navy/50 border-lumo-teal/20 text-white placeholder:text-lumo-cream/50 pr-10"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-lumo-cream/80 hover:text-lumo-yellow"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-lumo-teal text-lumo-teal focus:ring-lumo-teal"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  disabled={loading}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-lumo-cream/80">Remember me</label>
              </div>

              {/* Success + Error Messages */}
              {success && (
                <div className="text-sm text-lumo-teal bg-lumo-teal/10 border border-lumo-teal/20 p-3 rounded-md flex items-center">
                  ✅ {success}
                </div>
              )}
              {error && (
                <div className="text-sm text-lumo-orange bg-lumo-orange/10 border border-lumo-orange/20 p-3 rounded-md flex items-center">
                  ⚠️ {error}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-lumo-orange text-white hover:bg-lumo-yellow hover:text-lumo-navy transition-all"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-current rounded-full animate-spin" />
                    <span className="ml-2">Signing in...</span>
                  </div>
                ) : ("Sign in securely")}
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-lumo-teal/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-lumo-midnight text-lumo-cream/60">or</span>
                </div>
              </div>

              {/* Demo Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full border-lumo-teal text-lumo-teal hover:bg-lumo-teal hover:text-white"
                onClick={() => {
                  const demoCredentials = { email: "demo@lumo.finance", password: "demo123" };
                  const form = document.querySelector("form") as HTMLFormElement;
                  const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement;
                  const passwordInput = form.querySelector('input[name="password"]') as HTMLInputElement;
                  emailInput.value = demoCredentials.email;
                  passwordInput.value = demoCredentials.password;
                  form.requestSubmit();
                }}
              >
                Try Demo Account
              </Button>

              <button id="demo-login-button" style={{ display: "none" }} />

              <div className="text-center text-sm mt-4">
                <span className="text-lumo-cream/60">Don't have an account?</span>{" "}
                <Link href="/register" className="text-lumo-teal hover:text-lumo-yellow transition-colors">Create one</Link>
              </div>

              <div className="mt-4 p-4 bg-lumo-teal/10 rounded-lg">
                <p className="text-sm text-lumo-teal">
                  <strong>Demo Account Access:</strong><br />
                  Experience all features with our demo account. Perfect for testing and presentations.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

