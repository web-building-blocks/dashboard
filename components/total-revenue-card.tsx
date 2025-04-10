import { connectToDatabase } from "@/lib/mongodb";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export default async function TotalRevenueCard() {
  const db = await connectToDatabase();
  const allSales = await db.collection("dashboard").find({}).toArray();

  const total = allSales.reduce(
    (sum: number, sale: any) => sum + (sale.amount || 0),
    0
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        <DollarIcon />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${total.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground">Total revenue this year</p>
      </CardContent>
    </Card>
  );
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
  );
}
