import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017"
const dbName = "dashboard"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const team = searchParams.get("team") || "personal"
  const collectionName = `customers_${team}`

  try {
    const client = new MongoClient(uri)
    await client.connect()

    const db = client.db(dbName)
    const collection = db.collection(collectionName)

    const result = await collection.aggregate([
      { $match: { subscribed: true } },
      {
        $group: {
          _id: "$subscriptionType",
          count: { $sum: 1 }
        }
      }
    ]).toArray()

    await client.close()

    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error("Subscription API error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch" }, { status: 500 })
  }
}
