"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const actions = [
  {
    title: "Mobile Money",
    items: [
      { 
        name: "Send Money", 
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M19.5 4.5H8.25M19.5 4.5v11.25" />
          </svg>
        )
      },
      { 
        name: "Top Up", 
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15M19.5 12h-15" />
          </svg>
        )
      },
      { 
        name: "Withdraw", 
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 4.5l-15 15M4.5 19.5h11.25M4.5 19.5V8.25" />
          </svg>
        )
      },
      { 
        name: "QR Pay", 
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875a1.125 1.125 0 011.125-1.125h4.5A1.125 1.125 0 0110.5 4.875v4.5A1.125 1.125 0 019.375 10.5h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625a1.125 1.125 0 011.125-1.125h4.5A1.125 1.125 0 0110.5 14.625v4.5A1.125 1.125 0 019.375 20.25h-4.5A1.125 1.125 0 013.75 19.125v-4.5zM13.5 4.875a1.125 1.125 0 011.125-1.125h4.5A1.125 1.125 0 0120.25 4.875v4.5A1.125 1.125 0 0119.125 10.5h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
          </svg>
        )
      },
    ],
  },
  {
    title: "Virtual Cards",
    items: [
      { 
        name: "Create Card", 
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15M19.5 12h-15" />
          </svg>
        )
      },
      { 
        name: "View Cards", 
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M5.25 13.5h6M5.25 15.75h3M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5z" />
          </svg>
        )
      },
      { 
        name: "Freeze Card", 
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 9.563A.563.563 0 019.563 9h4.874c.311 0 .563.252.563.563v4.874a.563.563 0 01-.563.563H9.563a.563.563 0 01-.563-.563V9.563z" />
          </svg>
        )
      },
      { 
        name: "Card Limits", 
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
          </svg>
        )
      },
    ],
  },
];

export function QuickActions() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {actions.map((section) => (
        <Card key={section.title} className="bg-gradient-card border-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {section.items.map((item) => (
                <button
                  key={item.name}
                  className="flex flex-col items-center justify-center p-4 rounded-lg bg-lumo-midnight/50 hover:bg-lumo-midnight transition-colors group"
                >
                  <span className="text-accent group-hover:text-warning transition-colors mb-2">
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium text-white group-hover:text-warning transition-colors">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}


