import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  const db = await connectToDatabase();

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
  ]).toArray();

  return NextResponse.json(sales);
}
