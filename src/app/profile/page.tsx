"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
			<h1 className="text-white">Profile</h1>
			<hr />
			<p className="text-white mt-4">This is the profile page.</p>
			<p className="text-white mt-4">
				Go back to{" "}
				<Link href="/" className="text-blue-400">
					Home
				</Link>
			</p>
		</div>
	);
}
