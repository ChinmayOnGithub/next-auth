"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      if (response.data?.error) {
        toast.error(response.data.error);
        return;
      }
      toast.success("User signed up successfully!");
      router.push("/login");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.error ||
          error.response?.data?.message ||
          "An error occurred while signing up. Please try again.";
        toast.error(message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-white">Sign Up</h1>
      <hr />
      <div className="w-fit max-w-md py-8 px-4  mt-3 flex flex-col bg-gray-950 rounded">
        <label className="text-white">
          Username:
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-800 text-white"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </label>
        <br />
        <label className="text-white mt-4">
          Email:
          <input
            type="email"
            className="w-full p-2 rounded bg-gray-800 text-white"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </label>
        <br />
        <label className="text-white mt-4">
          Password:
          <input
            type="password"
            className="w-full p-2 rounded bg-gray-800 text-white"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </label>
      </div>
      <button
        className="mt-4 bg-blue-600 text-white p-2 rounded"
        onClick={onSignUp}
        disabled={buttonDisabled}
      >
        {loading ? "Loading..." : "Sign Up"}
      </button>
      <div className="mt-4 text-white">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-400 underline">
          Log In
        </Link>
      </div>
    </div>
  );
}
