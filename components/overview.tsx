"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"

export function Overview() {
  const [data, setData] = useState<{ name: string; total: number }[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()
  const team = searchParams.get("team") || "personal"

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/overview?team=${team}`)
        const json = await res.json()
        if (json.success) {
          setData(json.data)
        }
      } catch (err) {
        console.error("Failed to fetch overview data", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [team])

  if (isLoading) {
    return <Skeleton className="w-full h-[350px] rounded-md" />
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} />
        <YAxis stroke="#888888" fontSize={12} />
        <Bar dataKey="total" fill="#000000" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
