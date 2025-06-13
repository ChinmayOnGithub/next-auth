"use client";
import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();

  const createToast = () => {
    toast.success(
      <div className="flex items-center gap-2">
        <span className="text-sm">Toast created successfully!</span>
      </div>,
      {
        duration: 3000,
        style: {
          background: "#333",
          color: "#fff",
          padding: "0.5rem",
          borderRadius: "0.5rem",
          animation: "slide-in 0.3s ease-in-out, fade-out 0.3s ease-in-out forwards",
          animationDelay: "2.7s",
        },
      }
    );
  }

  return (
    <div className="bg-gray-900">
      <div className="flex flex-row gap-2 items-center justify-center min-h-screen">
        <button
          className="w-fit bg-gray-500/50 hover:bg-gray-700 text-white py-2 px-4 rounded mt-4"
          onClick={() => router.push("/login")}>Go to Login</button>

        <button
          className="w-fit bg-gray-500/50 hover:bg-gray-700 text-white py-2 px-4 rounded mt-4"
          onClick={() => router.push("/signup")}>Go to Sign Up</button>

        <button
          className="w-fit bg-gray-500/50 hover:bg-gray-700 text-white py-2 px-4 rounded mt-4"
          onClick={() => router.push("/profile")}>Go to Profile</button>

        <button
          className="w-fit bg-gray-500/50 hover:bg-gray-700 text-white py-2 px-4 rounded mt-4"
          onClick={() => createToast()}>
          Create a toast
        </button>
      </div>
    </div>
  );
}
