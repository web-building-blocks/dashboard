import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const team = searchParams.get("team") || "personal"
  const db = await connectToDatabase()

  try {
    const sales = await db.collection(`sales_${team}`).find({}).toArray()
    const total = sales.reduce((sum: number, s: any) => sum + (s.amount || 0), 0)

    return NextResponse.json({ success: true, total })
  } catch (err) {
    console.error("Error fetching revenue data", err)
    return NextResponse.json({ success: false, total: 0 }, { status: 500 })
  }
}
