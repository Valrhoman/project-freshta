"use client";
import Image from "next/image";
import Link from "next/link";
// import { useState } from "react";
import { FiSearch, FiShoppingCart, FiUser, FiMenu } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import NavPanel from "./NavPanel";

export default function NavBar() {
  const { data: session } = useSession({
    required: false,
  });

  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  function handleSearchButtonClick() {
    setShowSearchBar(!showSearchBar);
  }

  function handleMenuClick() {
    setShowPanel(!showPanel);
  }

  return (
    <>
      <div className="fixed top-0 z-50 w-full py-6 px-8 border-b-2 border-slate-100 bg-white">
        <NavPanel open={showPanel} setOpen={setShowPanel} />
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              src="/freshta-logo.svg"
              alt="freshta logo"
              width={90}
              height={90}
              priority
            />
          </Link>
          <div className="flex gap-6 items-center text-gray-500 text-3xl">
            {!showSearchBar && (
              <button
                onClick={handleSearchButtonClick}
                className="hover:text-greeny-700"
              >
                <FiSearch />
              </button>
            )}
            <button className="hover:text-greeny-700">
              <FiShoppingCart />
            </button>
            {session && (
              <Link href="/upload">
                <FiUser className="" />
              </Link>
            )}
            <button
              onClick={handleMenuClick}
              className="text-4xl ml-1 hover:text-greeny-700"
            >
              <FiMenu />
            </button>
          </div>
        </div>
        <SearchBar open={showSearchBar} setOpen={setShowSearchBar} />
      </div>

      <div className=" w-full py-6 px-8 opacity-0">
        <Image
          src="/freshta-logo.svg"
          alt="freshta logo"
          width={70}
          height={70}
        />
      </div>
    </>
  );
}
