"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [hasMounted, setHasMounted] = React.useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);


  useEffect(() => {
    setButtonDisabled(!(user.email.length > 0 && user.password.length > 0));
  }, [user]);

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);

      if (response.data?.error) {
        setError(response.data.error);
        toast.error(response.data.error);
        return;
      }

      toast.success("User logged in successfully!");
      router.push("/profile");
    } catch (error: any) {
      const errMsg =
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "An unexpected error occurred";
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-white text-4xl font-bold">Log In</h1>
      <form
        onSubmit={onLogin}
        className="w-full max-w-md p-8 mt-4 bg-gray-800 rounded-lg"
      >
        <label className="block mb-2 text-white">
          Email:
          <input
            type="email"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
            required
          />
        </label>
        <label className="block mb-2 text-white">
          Password:
          <input
            type="password"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
            required
          />
        </label>
        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={buttonDisabled}
        >
          {loading ? "Loading..." : "Log In"}
        </button>
        <p className="mt-4 text-white text-center">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
        {hasMounted && error && (
          <p className="mt-4 text-red-500 text-center">{error}</p>
        )}
      </form>
    </div>
  );
}
