import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017"
const dbName = "dashboard"

export async function GET() {
  try {
    const client = new MongoClient(uri)
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection("dashboard")

    const now = new Date()
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(now.getDate() - 30)

    const result = await collection.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" }
        }
      }
    ]).toArray()

    await client.close()

    const totalAmount = result[0]?.totalAmount || 0

    return NextResponse.json({ success: true, totalAmount })
  } catch (err) {
    console.error("Order API error:", err)
    return NextResponse.json({ success: false, error: "Failed to fetch order data" }, { status: 500 })
  }
}
