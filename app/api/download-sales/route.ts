import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const from = new Date(searchParams.get("from") || "")
  const to = new Date(searchParams.get("to") || "")
  const team = searchParams.get("team") || "personal"
  const collectionName = `sales_${team}`

  if (isNaN(from.getTime()) || isNaN(to.getTime())) {
    return new NextResponse("Invalid date range", { status: 400 })
  }

  const db = await connectToDatabase()
  const collection = db.collection(collectionName)

  const results = await collection
    .find({
      createdAt: {
        $gte: from,
        $lte: to,
      },
    })
    .sort({ createdAt: -1 })
    .toArray()

  const header = "Name,Email,Quantity,Amount,Date\n"
  const rows = results.map((row) => {
    const date = new Date(row.createdAt).toISOString().split("T")[0]
    return `${row.name},${row.email},${row.quantity},${row.amount},${date}`
  }).join("\n")

  const csv = header + rows

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename=${team}-sales.csv`,
    },
  })
}
