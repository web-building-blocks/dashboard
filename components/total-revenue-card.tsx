"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

export default function TotalRevenueCard() {
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const team = searchParams.get("team") || "personal"

  useEffect(() => {
    async function fetchRevenue() {
      try {
        const res = await fetch(`/api/total-revenue?team=${team}`)
        const json = await res.json()
        if (json.success) {
          setTotal(json.total)
        }
      } catch (err) {
        console.error("Failed to fetch revenue data", err)
      } finally {
        setLoading(false)
      }
    }

    fetchRevenue()
  }, [team])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        <DollarIcon />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading ? "Loading..." : `$${total.toLocaleString()}`}
        </div>
        <p className="text-xs text-muted-foreground">Total revenue this year</p>
      </CardContent>
    </Card>
  )
}

function DollarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="w-4 h-4 text-muted-foreground"
    >
      <path d="M12 2v20M7.5 5.5a3.5 3.5 0 0 0 7 0 7.5 3.5 0 0 1 0 7.5a3.5 3.5 0 0 0-7 0" />
    </svg>
  )
}
