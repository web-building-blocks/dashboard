import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  const db = await connectToDatabase();

  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("query") || "";

  const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const matchStage: any = {
    createdAt: { $gte: oneMonthAgo },
  };

  if (keyword) {
    matchStage.$or = [
      { name: { $regex: keyword, $options: "i" } },
      { email: { $regex: keyword, $options: "i" } },
    ];
  }

  const sales = await db.collection("dashboard").aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: { name: "$name", email: "$email" },
        totalAmount: { $sum: "$amount" },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id.name",
        email: "$_id.email",
        totalAmount: 1,
      },
    },
    { $sort: { totalAmount: -1 } },
  ]).toArray();

  return NextResponse.json(sales);
}
