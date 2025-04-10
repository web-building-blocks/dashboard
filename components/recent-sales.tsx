"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"

type SalesSummary = {
  name: string
  email: string
  totalAmount: number
}

function RecentSales() {
  const [salesData, setSalesData] = useState<SalesSummary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()
  const keyword = searchParams.get("query") || ""
  const team = searchParams.get("team") || "personal"

  useEffect(() => {
    const fetchSales = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/recent-sales?query=${encodeURIComponent(keyword)}&team=${team}`)
        if (!res.ok) return
        const data = await res.json()
        setSalesData(data)
      } catch (err) {
        console.error("Error fetching recent sales:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSales()
  }, [keyword, team])

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-3 w-[200px]" />
            </div>
            <Skeleton className="h-4 w-[50px]" />
          </div>
        ))}
      </div>
    )
  }

  if (!salesData.length) {
    return <p className="text-sm text-muted-foreground">No recent sales found.</p>
  }

  return (
    <div className="space-y-8">
      {salesData.map((user) => (
        <div key={user.email} className="flex items-center justify-between">
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="text-sm font-medium">${user.totalAmount.toFixed(2)}</div>
        </div>
      ))}
    </div>
  )
}

export default RecentSales
