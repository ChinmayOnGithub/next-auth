import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/db/dbConfig";
import { User } from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connectToDatabase();
export async function GET(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);
    const user = await User.findById(userId).select("-password");
    return NextResponse.json(
      { user },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}