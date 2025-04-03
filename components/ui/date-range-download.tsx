"use client";

import { useState } from "react";
import { DateRange } from "react-day-picker";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { DownloadButton } from "@/components/ui/download-button";

export function DateRangeDownloadSection() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date("2025-01-20"),
    to: new Date(), // up to today
  });

  return (
    <div className="flex items-center space-x-2">
      <CalendarDateRangePicker value={dateRange} onChange={setDateRange} />
      {dateRange?.from && dateRange?.to && (
        <DownloadButton dateRange={{ from: dateRange.from, to: dateRange.to }} />
      )}
    </div>
  );
}
