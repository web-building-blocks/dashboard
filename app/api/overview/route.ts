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

    const oneYearAgo = new Date()
    oneYearAgo.setMonth(oneYearAgo.getMonth() - 11)
    oneYearAgo.setDate(1)
    oneYearAgo.setHours(0, 0, 0, 0)

    const pipeline = [
      { $match: { createdAt: { $gte: oneYearAgo } } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$amount" }
        }
      },
      {
        $sort: { "_id": 1 }
      }
    ]

    const results = await collection.aggregate(pipeline).toArray()

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const fullYearData = Array.from({ length: 12 }, (_, i) => {
      const month = (oneYearAgo.getMonth() + i) % 12
      return {
        name: monthNames[month],
        total: results.find(r => r._id === month + 1)?.total || 0
      }
    })

    await client.close()
    return NextResponse.json({ success: true, data: fullYearData })
  } catch (err) {
    console.error("Overview API error:", err)
    return NextResponse.json({ success: false, error: "Failed to load overview data" }, { status: 500 })
  }
}
