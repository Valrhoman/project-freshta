"use client";
import Image from "next/image";
import Link from "next/link";
// import { useState } from "react";
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import SearchBar from "../SearchBar";
import NavPanel from "./NavPanel";

export const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Shop",
    href: "/",
  },
  {
    name: "How It Works",
    href: "/",
  },
  {
    name: "Blog",
    href: "/",
  },
  {
    name: "Contact",
    href: "/",
  },
];

export default function NavBar() {
  const { data: session } = useSession({
    required: false,
  });

  const [showSearchBar, setShowSearchBar] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const [showPanel, setShowPanel] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  function handleSearchButtonClick() {
    setShowSearchBar(!showSearchBar);
  }

  function handleCloseSearchBar() {
    setShowSearchBar(false);
  }

  function handleMenuClick() {
    setShowPanel(!showPanel);
  }

  useEffect(() => {
    if (showSearchBar) {
      inputRef.current?.focus();
      inputRef2.current?.focus();
    }
  }, [showSearchBar]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 z-50 w-full py-6 px-8 md:px-16 md:py-10 lg:py-12  border-slate-100 bg-white ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        {/* <div className="max-w-7xl mx-auto"> */}
        <div className="flex items-center justify-between h-10 lg:max-w-[120rem] mx-auto ">
          <Link href="/">
            <div className="w-36 h-10 relative">
              <Image src="/freshta-logo.svg" alt="freshta logo" fill priority />
            </div>
            {/* <Image
              src="/freshta-logo.svg"
              alt="freshta logo"
              width={90}
              height={90}
              priority
            /> */}
          </Link>

          <div className="flex gap-6 items-center justify-center text-gray-500 text-3xl">
            <div className="absolute left-1/2 -translate-x-1/2 w-2/5 max-w-2xl">
              {!showSearchBar && (
                <div className="hidden md:flex items-center justify-between">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`text-gray-600 hover:text-greeny-400 text-2xl ${
                        link.name === "Home" ? "text-greeny-400" : ""
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}

              {showSearchBar && (
                <div className="items-center justify-center gap-4 hidden md:flex">
                  <SearchBar className={`w-full`} inputRef={inputRef2} />
                  <button
                    type="button"
                    className="self-center ml-2 text-gray-400 hover:text-greeny-400"
                    onClick={handleCloseSearchBar}
                  >
                    <FiX className="text-3xl" />
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={handleSearchButtonClick}
              className="hover:text-greeny-400"
            >
              <FiSearch />
            </button>
            <button className="hover:text-greeny-400">
              <FiShoppingCart />
            </button>
            {session && (
              <Link href="/upload">
                <FiUser className="" />
              </Link>
            )}
            <button
              onClick={handleMenuClick}
              className="text-4xl ml-1 hover:text-greeny-400 md:hidden"
            >
              <FiMenu />
            </button>

            <Link
              href="/account/login"
              className="hover:text-greeny-400 hidden md:block"
            >
              <FiUser />
            </Link>
          </div>
        </div>
        <div
          className={`flex items-center justify-center gap-4 w-full mt-8 md:hidden ${
            showSearchBar ? "block" : "hidden"
          } `}
        >
          <SearchBar className="w-full md:w-1/2 lg:w-1/3" inputRef={inputRef} />
          <button
            type="button"
            className="self-center ml-3 text-gray-400 hover:text-greeny-400"
            onClick={handleCloseSearchBar}
          >
            <FiX className="text-3xl" />
          </button>
        </div>
      </div>

      <div className=" w-full py-6 px-8 md:px-16 md:py-8 ">
        <div className="h-10"></div>
      </div>

      <div className="h-14 md:h-18 gap-8 items-center justify-center hidden md:flex">
        {/* {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-gray-500 hover:text-greeny-500 text-2xl font-semibold"
          >
            {link.name}
          </Link>
        ))} */}
      </div>

      {/* <div className="fixed top-0 w-full py-6 px-8 bg-red-700 opacity-25">
        asdf
      </div> */}

      <NavPanel open={showPanel} setOpen={setShowPanel} />

      {/* </div> */}
    </>
  );
}
