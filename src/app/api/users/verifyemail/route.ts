import { NextResponse, NextRequest } from 'next/server';
import { connectToDatabase } from '@/db/dbConfig';
import { User } from '@/models/userModel';

connectToDatabase();

export async function POST(request: NextRequest) {

  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log("Received token:", token);

    const user = await User.findOne(
      { verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } }
    );

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid or expired token" }),
        { status: 400 }
      );
    }
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return new NextResponse(
      JSON.stringify({ message: "Email verified successfully" }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Error in POST /api/users/verifyemail:", error);
    return new NextResponse(
      JSON.stringify(
        { error: "Internal Server Error" }
      ),
      { status: 500 }
    );
  }
};


