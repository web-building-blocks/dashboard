"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { format } from "date-fns"
import { CalendarIcon, DownloadIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DownloadButtonWithDateRange() {
  const [date, setDate] = React.useState<DateRange | undefined>(undefined)
  const searchParams = useSearchParams()
  const team = searchParams.get("team") || "personal"

  const handleDownload = () => {
    if (!date?.from || !date?.to) return

    const params = new URLSearchParams()
    params.set("from", date.from.toISOString())
    params.set("to", date.to.toISOString())
    params.set("team", team)

    const url = `/api/download-sales?${params.toString()}`
    window.open(url, "_blank")
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-[260px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      <Button onClick={handleDownload} disabled={!date?.from || !date?.to}>
        <DownloadIcon className="mr-2 h-4 w-4" />
        Download CSV
      </Button>
    </div>
  )
}
