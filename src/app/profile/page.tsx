"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);

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

  let hasShownToast = false;

  const getUserData = async () => {
    try {
      const response = await axios.get("/api/users/me");
      console.log("User data:", response.data);
      setUserData(response.data.user);

      if (!hasShownToast) {
        toast.success("User data fetched successfully");
        hasShownToast = true;
      }

    } catch (error) {
      console.error("Error fetching user data:", error);

      if (!hasShownToast) {
        toast.error("Failed to fetch user data.");
        hasShownToast = true;
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-white">Profile</h1>
      <div className="text-center mt-4">
        {userData ? (
          <span className="text-green-400">Welcome, {(userData as any)?.email}!</span>
        ) : (
          <span className="text-red-400">Loading user data...</span>
        )}
        <br />
        {userData && (
          (userData as any).isVerified ? (
            <span className="text-orange-400"> Your email is verified.</span>
          ) : (
            <div>
              <span className="text-red-400"> Your email is not verified. </span>
              <span className="text-blue-400"
              >verify</span>
            </div>
          )
        )}
        <br />
        {userData && (userData as any).isAdmin && (
          <span className="text-blue-400">admin.</span>
        )}
        <br />
      </div>
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
