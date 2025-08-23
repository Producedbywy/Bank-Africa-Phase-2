"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      router.push(`/login?registered=true&email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white font-serif mb-2">
            Digital Banking for Africa
          </h1>
          <p className="text-white/80">
            Join thousands of users managing their finances with ease.
          </p>
        </div>

        <Card className="w-full max-w-md border-0 bg-lumoSurface shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-white">
              Create Account
            </CardTitle>
            <p className="text-sm text-white/80 text-center">
              Start your journey to modern banking
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1">
                  Full Name
                </label>
                <Input id="name" name="name" type="text" required placeholder="Enter your full name" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
                  Email
                </label>
                <Input id="email" name="email" type="email" required placeholder="Enter your email" />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1">
                  Password
                </label>
                <Input id="password" name="password" type="password" required placeholder="Create a secure password" />
              </div>

              {error && (
                <div className="text-sm text-lumo-orange bg-lumo-orange/10 border border-lumo-orange/20 p-3 rounded-md flex items-center">
                  ⚠️ {error}
                </div>
              )}

              <Button type="submit" className="w-full bg-accent text-white hover:bg-warning hover:text-lumoBackground transition-all" disabled={loading}>
                {loading ? "Creating..." : "Create Account"}
              </Button>

              <div className="text-center text-sm mt-4">
                <span className="text-white/60">Already have an account?</span>{" "}
                <Link href="/login" className="text-white/80 hover:text-warning transition-colors">
                  Sign in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

