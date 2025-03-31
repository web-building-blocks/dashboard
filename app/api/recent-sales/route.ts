// app/api/recent-sales/route.ts
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB)
  const sales = await db.collection("dashboard").find({}).toArray()

  return NextResponse.json(sales)
}
