// app/api/download-sales/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb"; // 你自己的连接逻辑
import { subMonths } from "date-fns";

export async function GET() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("dashboard");

    const sixMonthsAgo = subMonths(new Date(), 6);

    const results = await collection
      .find({ createdAt: { $gte: sixMonthsAgo } })
      .sort({ createdAt: -1 })
      .toArray();

    const header = "Name,Email,Quantity,Amount,Date\n";
    const rows = results.map((row) =>
      `${row.name},${row.email},${row.quantity},${row.amount},${new Date(row.createdAt).toISOString()}`
    ).join("\n");

    const csv = header + rows;

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=recent-sales.csv",
      },
    });
  } catch (err) {
    console.error("❌ Failed to download:", err);
    return new NextResponse("Error", { status: 500 });
  }
}
