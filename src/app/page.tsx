"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();

	return (
		<div>
			<ul>
				<li>
					<button onClick={() => router.push("/login")}>Go to Login</button>
				</li>
				<li>
					<button onClick={() => router.push("/signup")}>Go to Sign Up</button>
				</li>
			</ul>
		</div>
	);
}
