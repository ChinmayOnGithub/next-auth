import { connectToDatabase } from "@/db/dbConfig";
import { User } from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

connectToDatabase();

export async function POST(req: NextRequest) {
  try {
    const reqBody = (await req.json()) as {
      email: string;
      password: string;
    };

    // Ensure email and password are provided
    if (!reqBody || !reqBody.email || !reqBody.password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }
    const { email, password } = reqBody;

    // find user by email
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }
    // is there user in the database with this email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Prepare token data
    const tokenData = {
      id: user._id,
      email: user.email,
      name: user.name,
      // Add any other user data you want to include in the token
    };

    // create JWT token
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET as string, {
      expiresIn: "1d", // Token expiration time
    });

    // You can return a success response here
    const response = NextResponse.json(
      { message: "Login successful", token },
      { status: 200 },
    );

    response?.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: error.status || 500 },
    );
  }
}
