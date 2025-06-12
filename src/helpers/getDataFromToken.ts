import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function getDataFromToken(res: NextResponse) {
  try {
    const token = res.cookies.get("token")?.value || "";

    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
    return decodedToken.id;
  } catch (error: any) {
    console.error("Error decoding token:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
