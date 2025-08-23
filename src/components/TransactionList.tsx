"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Transaction {
  id: string;
  type: "mobile-money" | "virtual-card" | "transfer";
  title: string;
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed";
  date: string;
}

const transactions: Transaction[] = [
  {
    id: "1",
    type: "mobile-money",
    title: "Mobile Money Top Up",
    amount: 100,
    currency: "USD",
    status: "completed",
    date: "2024-06-15",
  },
  {
    id: "2",
    type: "virtual-card",
    title: "Netflix Subscription",
    amount: -15.99,
    currency: "USD",
    status: "completed",
    date: "2024-06-14",
  },
  {
    id: "3",
    type: "transfer",
    title: "Currency Exchange",
    amount: 500,
    currency: "EUR",
    status: "completed",
    date: "2024-06-13",
  },
  {
    id: "4",
    type: "mobile-money",
    title: "Withdrawal to M-Pesa",
    amount: -50,
    currency: "USD",
    status: "pending",
    date: "2024-06-13",
  },
];

const getTransactionIcon = (type: Transaction["type"]) => {
  switch (type) {
    case "mobile-money":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
        </svg>
      );
    case "virtual-card":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
        </svg>
      );
    case "transfer":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        </svg>
      );
  }
};

export function TransactionList() {
  return (
    <Card className="bg-gradient-to-br from-[#003943] to-[#006173] border-0">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg bg-lumo-midnight/50 hover:bg-lumo-midnight transition-colors">
              <div className="flex items-center space-x-4">
                <div>{getTransactionIcon(transaction.type)}</div>
                <div>
                  <p className="font-medium text-white">{transaction.title}</p>
                  <p className="text-sm text-white">{transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium text-white`}>
                  {transaction.amount < 0 ? "-" : "+"}{transaction.currency} {Math.abs(transaction.amount).toFixed(2)}
                </p>
                <p className="text-sm text-white">
                  {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

