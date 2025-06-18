"use client";

import { useSession } from "next-auth/react";
import { Navigation } from "@/components/Navigation";
import { MultiCurrencyBalance } from "@/components/MultiCurrencyBalance";
import { QuickActions } from "@/components/QuickActions";
import { TransactionList } from "@/components/TransactionList";
import Container from "@/components/Container";

export default function Wallet() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <main className="bg-lumoBackground min-h-screen flex items-center justify-center">
        <p className="text-lumoText text-lg font-medium">Loading...</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="bg-lumoBackground min-h-screen flex items-center justify-center">
        <p className="text-lumoText text-lg font-medium">Unauthorized. Please sign in.</p>
      </main>
    );
  }

  return (
    <main className="bg-lumoBackground min-h-screen">
      <Navigation />
      <Container>
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-lumoText">
              Welcome Back, {session.user?.name}
            </h1>
            <p className="mt-1 text-sm text-lumoText/70">
              Manage your money, mobile payments, and virtual cards all in one place
            </p>
          </div>

          <div className="grid gap-8">
            <MultiCurrencyBalance />
            <QuickActions />
            <TransactionList />
          </div>
        </div>
      </Container>
    </main>
  );
}

