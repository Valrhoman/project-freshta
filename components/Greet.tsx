"use client";
import { useSession, signOut } from "next-auth/react";

export default function Greet() {
  const { data: session } = useSession({
    required: false,
  });
  return (
    <>
      {session && (
        <div className="text-3xl mx-8 mt-4 text-gray-800">
          Hi, {session && session?.user?.firstName}!
          <button
            className="text-4xl p-4 bg-blue-500"
            onClick={() => signOut()}
          >
            {" "}
            Sign Out
          </button>
        </div>
      )}
    </>
  );
}
