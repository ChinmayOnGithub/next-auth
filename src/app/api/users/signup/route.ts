import { connectToDatabase } from "@/db/dbConfig";
import { User } from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
connectToDatabase();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { username, email, password } = reqBody;
    console.log("Received signup request:", reqBody);

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 },
      );
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return NextResponse.json(
        { error: "Username already in use" },
        { status: 409 },
      );
    }

    // hashing the password
    // what is salt? => Salt is a random value added to the password before hashing to ensure that even if two users have the same password, their hashed passwords will be different.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log("User created successfully:", savedUser);

    return NextResponse.json(
      {
        message: "User created successfully",
        user: savedUser,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error during user signup:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
