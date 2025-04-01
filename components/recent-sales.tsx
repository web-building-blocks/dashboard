"use client"

import { useEffect, useState } from "react"

type SaleSummary = {
  name: string
  email: string
  totalAmount: number
}

export default function RecentSales() {
  const [data, setData] = useState<SaleSummary[]>([])

  useEffect(() => {
    fetch("/api/recent-sales")
      .then(res => res.json())
      .then(data => setData(data))
  }, [])

  return (
    <div className="space-y-8">
      {data.map((item, index) => (
        <div key={index} className="flex items-center">
          <div className="h-9 w-9 flex items-center justify-center rounded-full bg-muted">
            {item.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{item.name}</p>
            <p className="text-sm text-muted-foreground">{item.email}</p>
          </div>
          <div className="ml-auto font-medium">
            +${item.totalAmount ? item.totalAmount.toFixed(2) : "0.00"}
          </div>

        </div>
      ))}
    </div>
  )
}
