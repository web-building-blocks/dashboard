"use client";

import { Button } from "@/components/ui/button";


export function DownloadButton({ dateRange }: { dateRange: { from: Date; to: Date } }) {
  const handleDownload = () => {
    const params = new URLSearchParams({
      from: dateRange.from.toISOString(),
      to: dateRange.to.toISOString(),
    });

    const link = document.createElement("a");
    link.href = `/api/download-sales?${params.toString()}`;
    link.download = "filtered-sales.csv";
    link.click();
  };

  return <Button onClick={handleDownload}>Download</Button>;
}

