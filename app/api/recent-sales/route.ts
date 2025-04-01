// app/api/recent-sales/route.ts
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB)

  const sales = await db.collection("dashboard").aggregate([
    {
      $group: {
        _id: { name: "$name", email: "$email" },
        totalAmount: { $sum: "$amount" }
      }
    },
    {
      $project: {
        _id: 0,
        name: "$_id.name",
        email: "$_id.email",
        totalAmount: 1
      }
    },
    {
      $sort: { totalAmount: -1 }
    }
  ]).toArray()

  return NextResponse.json(sales)
}
