"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const currencies = [
  { code: "GHS", name: "Ghana Cedi", symbol: "₵" },
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
];

// ⚠ Fully simulated exchange rates:
const exchangeRates: Record<string, number> = {
  "GHSUSD": 0.084,
  "GHSGBP": 0.066,
  "GHSEUR": 0.077,
  "GHSCNY": 0.61,
  "USDGHS": 11.9,
  "USDEUR": 0.92,
  "USDGBP": 0.79,
  "USDCNY": 7.2,
  "EURUSD": 1.09,
  "EURGBP": 0.86,
  "EURGHS": 13.1,
  "EURCNY": 7.8,
};

export default function CurrencyConversionPage() {
  const [from, setFrom] = useState("GHS");
  const [to, setTo] = useState("USD");
  const [amount, setAmount] = useState<number>(0);
  const [converted, setConverted] = useState<number>(0);

  useEffect(() => {
    const key = `${from}${to}`;
    const rate = exchangeRates[key] ?? 1;
    setConverted(amount * rate);
  }, [from, to, amount]);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-bold text-foreground mb-6">Currency Exchange</h1>

        <Card className="bg-gradient-to-br from-[#003943] to-[#006173] card border-0">
          <CardHeader>
            <CardTitle className="text-xl text-white">Convert Currency</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* FROM */}
              <div>
                <label className="block text-sm mb-2 text-white">From</label>
                <Select value={from} onValueChange={(val) => setFrom(val)}>
                  <SelectTrigger className="bg-lumoSurface border-lumoSurface text-white">
                    <SelectValue />
                  </SelectTrigger>
                <SelectContent className="bg-[#0B1528] border-lumoSurface text-white">
  {currencies.map((cur) => (
    <SelectItem
      key={cur.code}
      value={cur.code}
      className="text-white hover:text-white hover:bg-lumoSurface"
    >
      {cur.symbol} {cur.code}
    </SelectItem>
  ))}
</SelectContent>

                </Select>
              </div>

              {/* TO */}
              <div>
                <label className="block text-sm mb-2 text-white">To</label>
                <Select value={to} onValueChange={(val) => setTo(val)}>
                  <SelectTrigger className="bg-lumoSurface border-lumoSurface text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0B1528] border-lumoSurface text-white">
  {currencies.map((cur) => (
    <SelectItem
      key={cur.code}
      value={cur.code}
      className="text-white hover:text-white hover:bg-lumoSurface"
    >
      {cur.symbol} {cur.code}
    </SelectItem>
  ))}
</SelectContent>

                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-2 text-white">Amount</label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-white">Converted</label>
                <Input
                  type="text"
                  value={`${converted.toFixed(2)} ${to}`}
                  readOnly
                />
              </div>
            </div>

            <Button className="w-full bg-accent text-white hover:bg-warning hover:text-lumoBackground transition-all">
              Convert Now
            </Button>

            <div className="text-sm text-white text-center pt-4">
              Last updated: {new Date().toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

