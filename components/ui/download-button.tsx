"use client";

import { Button } from "@/components/ui/button";

export function DownloadButton() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/api/download-sales";
    link.download = "recent-sales.csv";
    link.click();
  };

  return <Button onClick={handleDownload}>Download</Button>;
}
