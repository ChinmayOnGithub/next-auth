"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

const ParamterProfilePage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-xl">
      <h1 className="text-white">Profile</h1>
      <hr className="w-full border-gray-600 my-4" />
      <p className="text-white mt-4">
        This is the profile of
        <span className="bg-orange-500 text-black p-2 ml-2 rounded-sm font-bold">
          {id}
        </span>
      </p>
    </div>
  );
};

export default ParamterProfilePage;

