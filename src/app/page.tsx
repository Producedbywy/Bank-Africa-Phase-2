"use client";

import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main className="bg-lumoBackground min-h-screen">
      <Navigation />
      <Hero />
    </main>
  );
}
