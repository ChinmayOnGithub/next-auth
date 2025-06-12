"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user.email, user.password]);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      if (response.data?.error) {
        toast.error(response.data.error);
        return;
      }
      toast.success("User logged in successfully!");
      router.push("/profile");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "Login failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-white">Log In</h1>
      <hr />
      <label className="text-white mt-4">
        Email:
        <input
          type="email"
          className="ml-2 p-2 rounded bg-gray-800 text-white"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter your email"
        />
      </label>
      <label className="text-white mt-4">
        Password:
        <input
          type="password"
          className="ml-2 p-2 rounded bg-gray-800 text-white"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password"
        />
      </label>
      <button
        className="mt-4 bg-blue-600 text-white p-2 rounded"
        disabled={buttonDisabled}
        onClick={onLogin}
      >
        {loading ? "Loading..." : "Log In"}
      </button>
      <p className="text-white mt-4">
        Dont have an account?{" "}
        <Link href="/signup" className="text-blue-400">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
