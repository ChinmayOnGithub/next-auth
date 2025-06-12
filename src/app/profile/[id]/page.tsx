import React from "react";

export default function ParamterProfilePage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-xl">
      <h1 className="text-white">Profile</h1>
      <hr />
      <p className="text-white mt-4">
        This is the profile of
        <span className="bg-orange-500 text-black p-2 ml-2 rounded-sm font-bold">
          {params.id}
        </span>
      </p>
    </div>
  );
}
