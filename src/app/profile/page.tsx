"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function ProfilePage() {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred while logging out.");
    }
  };

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

      <button
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
