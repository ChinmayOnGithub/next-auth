import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "User logged out successfully",
      status: 200,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0), // Set the cookie to expire immediately
    });

    return response;
  } catch (error) {
    console.log("Error during logout:", error);
    return NextResponse.json(
      { error: "An error occurred during logout" },
      { status: 500 },
    );
  }
}
