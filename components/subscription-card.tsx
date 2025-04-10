"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SubscriptionCard() {
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const team = searchParams.get("team") || "personal"

  useEffect(() => {
    async function fetchSubscriptions() {
      try {
        const res = await fetch(`/api/subscription?team=${team}`)
        const json = await res.json()
        if (json.success) {
          const count = json.data.reduce((sum: number, item: any) => sum + item.count, 0)
          setTotal(count)
        }
      } catch (err) {
        console.error("Failed to fetch subscription data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchSubscriptions()
  }, [team])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m0 0l4-4m-4 4l4 4" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{loading ? "Loading..." : total}</div>
        <p className="text-xs text-muted-foreground">Active subscribers</p>
      </CardContent>
    </Card>
  )
}
