"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <div className="relative isolate overflow-hidden bg-gradient-hero text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl sm:text-6xl font-bold font-serif mb-6">
            Digital Banking for Africa
          </h1>
          <p className="text-lg text-lumo-cream/90 mb-10">
            Experience seamless transactions, multi-currency support, and secure payments — all in one place. Join thousands managing their finances with ease.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/register">
              <Button className="bg-lumo-orange text-white hover:bg-lumo-yellow hover:text-lumo-navy transition-all text-lg px-8 py-4 rounded-xl shadow-lg">
                Get Started
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 transition-all text-lg px-8 py-4 rounded-xl">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Multi-Currency */}
          <div className="flex flex-col items-center text-center">
            <div className="rounded-lg bg-lumo-midnight/50 p-8">
              <svg className="w-12 h-12 text-lumo-yellow" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
              </svg>
            </div>
            <h3 className="mt-6 text-lg font-semibold">Multi-Currency Support</h3>
            <p className="mt-2 text-sm text-lumo-cream/80">Manage multiple currencies with real-time conversion rates.</p>
          </div>

          {/* Secure Transactions */}
          <div className="flex flex-col items-center text-center">
            <div className="rounded-lg bg-lumo-midnight/50 p-8">
              <svg className="w-12 h-12 text-lumo-teal" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <h3 className="mt-6 text-lg font-semibold">Secure Transactions</h3>
            <p className="mt-2 text-sm text-lumo-cream/80">Bank-grade security with two-factor authentication.</p>
          </div>

          {/* Instant Transfers */}
          <div className="flex flex-col items-center text-center">
            <div className="rounded-lg bg-lumo-midnight/50 p-8">
              <svg className="w-12 h-12 text-lumo-orange" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>
            </div>
            <h3 className="mt-6 text-lg font-semibold">Instant Transfers</h3>
            <p className="mt-2 text-sm text-lumo-cream/80">Send and receive money instantly across the globe.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

