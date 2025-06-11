import { connectToDatabase } from "@/db/dbConfig";
import { User } from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
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
				{ status: 400 }
			);
		}
		const { email, password } = reqBody;

		// find user by email
		if (!email || !password) {
			return NextResponse.json(
				{ error: "Email and password are required" },
				{ status: 400 }
			);
		}

		const user = await User.findOne({ email });
		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return NextResponse.json({ error: "Invalid password" }, { status: 401 });
		}

		// You can return a success response here
		return NextResponse.json({ message: "Login successful" }, { status: 200 });
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message || "Internal Server Error" },
			{ status: error.status || 500 }
		);
	}
}
