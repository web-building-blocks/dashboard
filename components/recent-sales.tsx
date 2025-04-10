"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type SalesSummary = {
  name: string;
  email: string;
  totalAmount: number;
};

function RecentSales() {
  const [salesData, setSalesData] = useState<SalesSummary[]>([]);
  const searchParams = useSearchParams();
  const keyword = searchParams.get("query") || "";

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await fetch(`/api/recent-sales?query=${encodeURIComponent(keyword)}`);
        if (!res.ok) return;
        const data = await res.json();
        setSalesData(data);
      } catch (err) {
        console.error("Error fetching recent sales:", err);
      }
    };

    fetchSales();
  }, [keyword]);

  if (!salesData.length) {
    return <p className="text-sm text-muted-foreground">No recent sales found.</p>;
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
  );
}

export default RecentSales;

