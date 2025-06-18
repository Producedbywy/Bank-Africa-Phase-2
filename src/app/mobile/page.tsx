"use client";

import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const providers = [
  { id: "mpesa", name: "M-Pesa", icon: "📱" },
  { id: "airtel", name: "Airtel Money", icon: "📱" },
  { id: "mtn", name: "MTN Mobile Money", icon: "📱" },
  { id: "orange", name: "Orange Money", icon: "📱" },
  { id: "vodafone", name: "Vodafone/Telecel", icon: "📱" },
];

const billTypes = [
  { id: "utilities", name: "Utilities", icon: "💡" },
  { id: "internet", name: "Internet", icon: "🌐" },
  { id: "tv", name: "TV & Cable", icon: "📺" },
  { id: "education", name: "Education", icon: "🎓" },
];

const topupMethods = [
  { id: "virtual", name: "Virtual Card", icon: "💳" },
  { id: "mobilemoney", name: "Mobile Money", icon: "📱" },
  { id: "bank", name: "Bank Transfer", icon: "🏦" },
];

export default function MobileMoney() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#003943] to-[#006173]">
      <Navigation />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div>
  <h1 className="text-3xl font-bold text-white">Mobile Money Services</h1>
  <p className="mt-1 text-sm text-white/80">
    Send, receive, and manage your mobile money transactions
  </p>
</div>

          <Tabs defaultValue="send" className="w-full">
            <TabsList className="grid w-full grid-cols-6 bg-lumo-midnight/50">
              <TabsTrigger value="send" className="text-white">Send</TabsTrigger>
              <TabsTrigger value="topup" className="text-white">Top Up</TabsTrigger>
              <TabsTrigger value="withdraw" className="text-white">Withdraw</TabsTrigger>
              <TabsTrigger value="bills" className="text-white">Bills</TabsTrigger>
              <TabsTrigger value="virtual" className="text-white">Card</TabsTrigger>
              <TabsTrigger value="qr" className="text-white">QR</TabsTrigger>
            </TabsList>

            {/* SEND MONEY */}
            <TabsContent value="send" className="mt-6">
              <Card className="bg-lumo-midnight/50 border-0">
                <CardHeader>
                  <CardTitle className="text-white">Send Money</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Select Provider</label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {providers.map((provider) => (
                        <button key={provider.id}
                          className="flex flex-col items-center justify-center p-4 rounded-lg bg-lumo-midnight hover:bg-lumoSurface transition">
                          <span className="text-3xl mb-2">{provider.icon}</span>
                          <span className="text-sm font-medium text-white">{provider.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-white">Recipient Phone Number</label>
                      <Input type="tel" placeholder="+233..." className="bg-lumoSurface border-lumoSurface text-white" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white">Amount</label>
                      <Input type="number" placeholder="0.00" className="bg-lumoSurface border-lumoSurface text-white" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white">Note (Optional)</label>
                      <Input type="text" placeholder="Add a note" className="bg-lumoSurface border-lumoSurface text-white" />
                    </div>
                  </div>

                  <Button className="w-full bg-accent text-white hover:bg-warning hover:text-lumoBackground transition-all">
                    Continue to Send
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TOP UP */}
            <TabsContent value="topup" className="mt-6">
              <Card className="bg-lumo-midnight/50 border-0">
                <CardHeader>
                  <CardTitle className="text-white">Top Up Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Select Top-up Method</label>
                    <div className="grid grid-cols-3 gap-4">
                      {topupMethods.map((method) => (
                        <button key={method.id}
                          className="flex flex-col items-center justify-center p-4 rounded-lg bg-lumo-midnight hover:bg-lumoSurface transition">
                          <span className="text-3xl mb-2">{method.icon}</span>
                          <span className="text-sm font-medium text-white">{method.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-white">Amount to Top Up (GHS)</label>
                      <Input type="number" placeholder="0.00" className="bg-lumoSurface border-lumoSurface text-white" />
                    </div>
                    <div className="rounded-lg bg-lumoSurface p-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-white/80">Current Balance:</span>
                        <span className="font-medium text-white">₵ 5,000.00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/80">Top-up Fee:</span>
                        <span className="font-medium text-green-400">Free</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-accent text-white hover:bg-warning hover:text-lumoBackground transition-all">
                    Continue to Top Up
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* WITHDRAW */}
            <TabsContent value="withdraw" className="mt-6">
              <Card className="bg-lumo-midnight/50 border-0">
                <CardHeader>
                  <CardTitle className="text-white">Withdraw to Mobile Money</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-white">Your Mobile Money Number</label>
                      <Input type="tel" placeholder="+233 XX XXX XXXX" className="bg-lumoSurface border-lumoSurface text-white" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white">Amount (GHS)</label>
                      <Input type="number" placeholder="0.00" className="bg-lumoSurface border-lumoSurface text-white" />
                    </div>
                    <div className="rounded-lg bg-lumoSurface p-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-white/80">Available Balance:</span>
                        <span className="font-medium text-white">₵ 5,000.00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/80">Withdrawal Fee:</span>
                        <span className="font-medium">₵ 5.00</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-accent text-white hover:bg-warning hover:text-lumoBackground transition-all">
                    Withdraw to Mobile Money
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* BILLS */}
            <TabsContent value="bills" className="mt-6">
              <Card className="bg-lumo-midnight/50 border-0">
                <CardHeader>
                  <CardTitle className="text-white">Pay Bills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {billTypes.map((bill) => (
                      <button key={bill.id}
                        className="flex flex-col items-center justify-center p-4 rounded-lg bg-lumo-midnight hover:bg-lumoSurface transition">
                        <span className="text-3xl mb-2">{bill.icon}</span>
                        <span className="text-sm font-medium text-white">{bill.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-white">Account/Bill Number</label>
                      <Input type="text" placeholder="Enter Account Number" className="bg-lumoSurface border-lumoSurface text-white" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white">Amount</label>
                      <Input type="number" placeholder="0.00" className="bg-lumoSurface border-lumoSurface text-white" />
                    </div>
                  </div>

                  <Button className="w-full bg-accent text-white hover:bg-warning hover:text-lumoBackground transition-all">
                    Pay Bill
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* VIRTUAL CARD */}
            <TabsContent value="virtual" className="mt-6 flex justify-center">
  <Card className="bg-lumo-midnight/50 border-0 w-[350px]">
    <CardHeader>
      <CardTitle className="text-white">Virtual Card</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="relative w-full h-48 rounded-xl bg-gradient-to-r from-lumo-midnight to-lumoSurface p-6 text-white shadow-lg border border-white/20">
        <div className="flex flex-col justify-between h-full">
          <div className="flex justify-between">
            <div className="text-lg font-bold">Virtual Debit Card</div>
            <div className="text-xl">💳</div>
          </div>
          <div>
            <div className="text-lg tracking-widest">**** **** **** 1234</div>
            <div className="mt-4 text-sm">
              <span className="mr-4">Valid thru: 12/25</span>
              <span>CVV: ***</span>
            </div>
            <div className="mt-2 text-sm font-medium">JOHN DOE</div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</TabsContent>


            {/* QR */}
         <TabsContent value="qr" className="mt-6">
  <Card className="bg-lumo-midnight/50 border-0">
    <CardHeader>
      <CardTitle className="text-white">QR Code Payment</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-center text-white/80 py-20">
        Coming Soon
      </div>
    </CardContent>
  </Card>
</TabsContent>

          </Tabs>
        </div>
      </div>
    </main>
  );
}