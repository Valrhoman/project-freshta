"use client";
import { useSession, signOut } from "next-auth/react";

import Link from "next/link";
import Image from "next/image";
import { FiX } from "react-icons/fi";

export default function NavPanel({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data: session } = useSession({
    required: false,
  });
  return (
    <div
      className={`fixed top-0 right-0 z-50 w-full h-full bg-white transition-all duration-300 font-poppins ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-8 border-b border-gray-200 ">
        <Link href="/" onClick={() => setOpen(false)}>
          <Image
            src="/freshta-logo.svg"
            alt="freshta logo"
            width={100}
            height={100}
            priority
          />
        </Link>
        <button onClick={() => setOpen(false)}>
          <FiX className="text-5xl text-gray-600 hover:text-greeny-700" />
        </button>
      </div>
      <div className="my-16 mx-8 pb-8 flex flex-col gap-8 text-3xl font-semibold text-greeny-700 items-start border-b border-gray-200">
        <Link href="/" className="hover:text-greeny-500">
          Shop All
        </Link>
        <Link href="/" className="hover:text-greeny-500">
          Vegetables
        </Link>
        <Link href="/" className="hover:text-greeny-500">
          Fruits
        </Link>
      </div>
      <div className="my-16 mx-8 flex flex-col gap-4 text-3xl items-start">
        {!session ? (
          <>
            <Link
              href="/account/login"
              onClick={() => setOpen(false)}
              className="hover:text-greeny-500"
            >
              Login
            </Link>
            <Link
              href="/account/register"
              onClick={() => setOpen(false)}
              className="hover:text-greeny-500"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link href="/myAccount" className="hover:text-greeny-500">
              My Account
            </Link>
            <button
              onClick={() => {
                signOut();
                setOpen(false);
              }}
              className="text-left hover:text-red-600 transition-all"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </div>
  );
}
