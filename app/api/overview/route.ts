import { NextResponse } from "next/server";
import { getOverviewData } from "@/lib/getOverviewData";

export async function GET() {
  const data = await getOverviewData();
  return NextResponse.json(data);
}
