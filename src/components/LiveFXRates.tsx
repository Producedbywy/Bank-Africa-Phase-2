"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ExchangeRate {
  from: string
  to: string
  rate: number
  change: number // Percentage change in last 24h
}

export function LiveFXRates() {
  const [rates, setRates] = useState<ExchangeRate[]>([
    { from: "GHS", to: "USD", rate: 12.35, change: -0.2 },
    { from: "GHS", to: "EUR", rate: 13.45, change: 0.3 },
    { from: "GHS", to: "GBP", rate: 15.75, change: 0.1 },
  ])

  // TODO: Replace with actual API call to get live rates
  useEffect(() => {
    const updateRates = () => {
      // Simulate rate changes
      setRates(prev => prev.map(rate => ({
        ...rate,
        rate: rate.rate + (Math.random() - 0.5) * 0.01,
        change: rate.change + (Math.random() - 0.5) * 0.1
      })))
    }

    const interval = setInterval(updateRates, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-gradient-card border-0">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white">Live Exchange Rates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {rates.map((rate) => (
            <div 
              key={rate.to} 
              className="flex items-center justify-between p-3 rounded-lg bg-lumo-midnight/50 border-0"
            >
              <div className="flex items-center space-x-4">
                <div className="font-medium text-lumo-cream/80">
                  {rate.from}/{rate.to}
                </div>
                <div className="text-lg font-bold text-white">
                  {rate.rate.toFixed(4)}
                </div>
              </div>
              <Badge 
                variant={rate.change >= 0 ? "default" : "destructive"} 
                className={`ml-auto ${
                  rate.change >= 0 
                    ? "bg-lumo-teal text-white hover:bg-lumo-teal/80" 
                    : "bg-lumo-orange text-white hover:bg-lumo-orange/80"
                }`}
              >
                {rate.change >= 0 ? "+" : ""}{rate.change.toFixed(2)}%
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
