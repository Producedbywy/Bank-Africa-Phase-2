"use client";

import { useState } from "react";
import {
  Card, CardContent, CardHeader, CardTitle
} from "@/components/ui/card";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface Balance {
  currency: string;
  symbol: string;
  rate: number;
}

const baseBalance = 5000;

const fxRates: Balance[] = [
  { currency: "GHS", symbol: "₵", rate: 1 },
  { currency: "USD", symbol: "$", rate: 0.097534962 },
  { currency: "EUR", symbol: "€", rate: 0.084438661 },
  { currency: "GBP", symbol: "£", rate: 0.071811018 },
];

export function MultiCurrencyBalance() {
  const [convertAmount, setConvertAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("GHS");
  const [toCurrency, setToCurrency] = useState("USD");
  const [convertedResult, setConvertedResult] = useState<number | null>(null);

  const getRate = (currency: string) =>
    fxRates.find((b) => b.currency === currency)?.rate || 1;

  const handleConversion = () => {
    const fromRate = getRate(fromCurrency);
    const toRate = getRate(toCurrency);
    const amount = parseFloat(convertAmount);
    if (isNaN(amount)) return;

    const converted = (amount / fromRate) * toRate;
    setConvertedResult(converted);
  };

  return (
    <div className="space-y-6">
      <Card className="w-full border-0 bg-gradient-to-br from-[#003943] to-[#006173]">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white">Your Balances</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-lumoSurface">
              <TabsTrigger value="all" className="data-[state=active]:bg-accent data-[state=active]:text-white text-white">
                All
              </TabsTrigger>
              {fxRates.map((balance) => (
                <TabsTrigger key={balance.currency} value={balance.currency}
                  className="data-[state=active]:bg-accent data-[state=active]:text-white text-white">
                  {balance.currency}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all" className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {fxRates.map((balance) => (
                <Card key={balance.currency} className="bg-lumoSurface border-0 shadow-lg rounded-xl">
                  <CardContent className="pt-8">
                    <div className="text-2xl font-bold text-white">
                      {balance.symbol}{(baseBalance * balance.rate).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                    <p className="text-xs text-white mt-1">{balance.currency} Balance</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {fxRates.map((balance) => (
              <TabsContent key={balance.currency} value={balance.currency}>
                <Card className="bg-lumoSurface border-0">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-white">
                      {balance.symbol}{(baseBalance * balance.rate).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                    <p className="text-sm text-white mt-2">Current {balance.currency} Balance</p>

                    <div className="mt-4 space-y-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full bg-accent text-white hover:bg-warning hover:text-lumoBackground transition-all">
                            Convert Currency
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-lumoBackground border-lumoSurface">
                          <DialogHeader>
                            <DialogTitle className="text-white">Convert Currency</DialogTitle>
                          </DialogHeader>

                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium mb-2 block text-white">From</label>
                                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                                  <SelectTrigger className="bg-lumoSurface border-lumoSurface text-white">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-lumoBackground border-lumoSurface">
                                    {fxRates.map((b) => (
                                      <SelectItem key={b.currency} value={b.currency} className="text-white hover:text-white hover:bg-lumoSurface">
                                        {b.currency} ({b.symbol})
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              <div>
                                <label className="text-sm font-medium mb-2 block text-white">To</label>
                                <Select value={toCurrency} onValueChange={setToCurrency}>
                                  <SelectTrigger className="bg-lumoSurface border-lumoSurface text-white">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-lumoBackground border-lumoSurface">
                                    {fxRates.map((b) => (
                                      <SelectItem key={b.currency} value={b.currency} className="text-white hover:text-white hover:bg-lumoSurface">
                                        {b.currency} ({b.symbol})
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div>
                              <label className="text-sm font-medium mb-2 block text-white">Amount</label>
                              <Input type="number" placeholder="Enter amount" value={convertAmount}
                                onChange={(e) => setConvertAmount(e.target.value)}
                                className="bg-lumoSurface border-lumoSurface text-white placeholder:text-lumoText/50"
                              />
                            </div>

                            <Button onClick={handleConversion} className="w-full bg-accent text-white hover:bg-warning hover:text-lumoBackground transition-all">
                              Convert Now
                            </Button>

                            {convertedResult !== null && (
                              <div className="mt-4 text-center text-accent">
                                Converted Amount: {convertedResult.toFixed(2)} {toCurrency}
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button variant="outline" className="w-full border-accent text-white hover:bg-accent hover:text-white">
                        Send Money
                      </Button>
                      <Button variant="outline" className="w-full border-accent text-white hover:bg-accent hover:text-white">
                        Receive Money
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

