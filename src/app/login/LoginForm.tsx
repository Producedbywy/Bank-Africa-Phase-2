"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/wallet");
    }
  }, [status, router]);

  useEffect(() => {
    const registered = searchParams.get("registered");
    const emailParam = searchParams.get("email");
    if (registered && emailParam) {
      setSuccess("Account created successfully! Please sign in.");
      setEmail(decodeURIComponent(emailParam));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.replace("/wallet");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-lumoText mb-1">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-lumoText mb-1">
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>

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

      <Button type="submit" className="w-full bg-accent text-white hover:bg-warning hover:text-lumoBackground transition-all" disabled={loading}>
        {loading ? "Signing in..." : "Sign in securely"}
      </Button>

      <div className="text-center text-sm mt-4">
        <span className="text-lumoText/60">Don&apos;t have an account?</span>{" "}
        <Link href="/register" className="text-lumo-teal hover:text-warning transition-colors">
          Create one
        </Link>
      </div>
    </form>
  );
}
