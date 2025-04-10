"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function OrderCountCard() {
  const [amount, setAmount] = useState<number | null>(null)

  useEffect(() => {
    async function fetchAmount() {
      try {
        const res = await fetch("/api/order-count")
        const json = await res.json()
        if (json.success) {
          setAmount(json.totalAmount)
        }
      } catch (err) {
        console.error("Failed to fetch order amount:", err)
      }
    }

    fetchAmount()
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Order Count</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18v4H3V3z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18v13H3V7z" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {amount !== null ? `${amount.toLocaleString()}` : "Loading..."}
        </div>
        <p className="text-xs text-muted-foreground">Total order count this year</p>
      </CardContent>
    </Card>
  )
}
