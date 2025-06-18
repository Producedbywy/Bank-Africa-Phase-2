import { Suspense } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white font-serif mb-2">
            Digital Banking for Africa
          </h1>
          <p className="text-lumoText/80">
            Seamless, secure, and accessible financial services for everyone.
          </p>
        </div>

        <Card className="w-full max-w-md border-0 bg-lumoSurface shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-white">
              Welcome back
            </CardTitle>
            <p className="text-sm text-lumoText/80 text-center">
              Enter your details to access your secure banking
            </p>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div className="text-center text-white">Loading form...</div>}>
              <LoginForm />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
