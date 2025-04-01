
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import clientPromise from "@/lib/mongodb"

export default async function TotalRevenueCard() {
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB)


  const allSales = await db.collection("dashboard").find({}).toArray()

  const total = allSales.reduce((sum, sale) => sum + (sale.amount || 0), 0)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        <DollarIcon />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${total.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
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
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="h-4 w-4 text-muted-foreground"
    >
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}
