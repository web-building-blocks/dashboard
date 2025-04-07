import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  const db = await connectToDatabase();

  const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); //Last 30 days

  const sales = await db.collection("dashboard").aggregate([
    {
      $match: {
        createdAt: { $gte: oneMonthAgo }
      }
    },
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
