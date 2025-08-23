"use client";

import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const virtualCards = [
  {
    id: "1",
    name: "Shopping Card",
    last4: "4242",
    balance: 500,
    currency: "USD",
    status: "active",
    expiryMonth: "12",
    expiryYear: "25",
  },
  {
    id: "2",
    name: "Subscription Card",
    last4: "8888",
    balance: 100,
    currency: "EUR",
    status: "frozen",
    expiryMonth: "06",
    expiryYear: "26",
  },
];

const transactions = [
  {
    id: "1",
    merchant: "Netflix",
    amount: -15.99,
    currency: "USD",
    date: "2024-01-20",
    status: "completed",
  },
  {
    id: "2",
    merchant: "Amazon",
    amount: -29.99,
    currency: "USD",
    date: "2024-01-19",
    status: "completed",
  },
];

export default function VirtualCards() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-[#003943]">Virtual Cards</h1>
              <p className="mt-1 text-sm text-[#003943]/80">
                Create and manage your virtual cards for international payments
              </p>
            </div>
            <Button className="bg-accent text-white hover:bg-warning hover:text-lumoBackground">
              Create New Card
            </Button>
          </div>

          {/* Virtual Cards List */}
          <div className="grid gap-6 md:grid-cols-2">
            {virtualCards.map((card) => (
              <Card key={card.id} className="bg-gradient-to-br from-[#003943] to-[#006173] border-0">
                <CardContent className="p-6 space-y-4 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-white">{card.name}</h3>
                      <p className="text-sm text-white/60">**** **** **** {card.last4}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-white/60">
                        {card.status === "active" ? "Active" : "Frozen"}
                      </span>
                      <Switch checked={card.status === "active"} />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Balance</span>
                      <span className="font-medium">{card.currency} {card.balance.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-white/60">Expires</span>
                      <span className="font-medium">{card.expiryMonth}/{card.expiryYear}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1 border-white text-white hover:bg-white/10">
                      View Details
                    </Button>
                    <Button variant="outline" className="flex-1 border-white text-white hover:bg-white/10">
                      Set Limits
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Transactions and Settings */}
          <Card className="bg-gradient-to-br from-[#003943] to-[#006173] border-0 text-white">
            <CardHeader>
              <CardTitle className="text-white">Card Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="transactions">
                <TabsList className="grid w-full grid-cols-2 bg-lumoSurface">
                  <TabsTrigger value="transactions" className="data-[state=active]:bg-accent data-[state=active]:text-white text-white">
                    Transactions
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="data-[state=active]:bg-accent data-[state=active]:text-white text-white">
                    Card Settings
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="transactions" className="mt-6 space-y-4">
                  {transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-lumoSurface border border-white/10"
                    >
                      <div>
                        <p className="font-medium text-white">{tx.merchant}</p>
                        <p className="text-sm text-white/60">{tx.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-red-400">
                          {tx.currency} {tx.amount.toFixed(2)}
                        </p>
                        <p className="text-sm text-green-400">{tx.status}</p>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="settings" className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-4 text-white">Spending Limits</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-white/60">Daily Limit</label>
                        <Input type="number" placeholder="Enter amount" className="bg-lumoSurface border-lumoSurface text-white" />
                      </div>
                      <div>
                        <label className="text-sm text-white/60">Monthly Limit</label>
                        <Input type="number" placeholder="Enter amount" className="bg-lumoSurface border-lumoSurface text-white" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-4 text-white">Security Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white">International Payments</p>
                          <p className="text-sm text-white/60">Allow international transactions</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white">Online Payments</p>
                          <p className="text-sm text-white/60">Allow online purchases</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-accent text-white hover:bg-warning hover:text-lumoBackground">
                    Save Settings
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
