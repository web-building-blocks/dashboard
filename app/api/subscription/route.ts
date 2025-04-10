import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"


const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017"
const dbName = "dashboard"

export async function GET() {
  try {
    const client = new MongoClient(uri)
    await client.connect()

    const db = client.db(dbName)
    const collection = db.collection("customers")

    const subscriptionCounts = await collection.aggregate([
      { $match: { subscribed: { $in: [true, false] } } },
      { $group: { _id: "$subscriptionType", count: { $sum: 1 } } },
    ]).toArray()

    await client.close()

    return NextResponse.json({ success: true, data: subscriptionCounts })
  } catch (error) {
    console.error("Error fetching subscription data:", error)
    return NextResponse.json({ success: false, error: "Failed to load data" }, { status: 500 })
  }
}
