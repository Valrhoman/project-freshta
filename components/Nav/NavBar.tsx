"use client";
import Image from "next/image";
import Link from "next/link";
// import { useState } from "react";
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import SearchBar from "../SearchBar";
import NavPanel from "./NavPanel";
import clsx from "clsx";

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/" },
  { name: "How It Works", href: "/" },
  { name: "Blog", href: "/" },
  { name: "Contact", href: "/" },
];

export default function NavBar() {
  const { data: session } = useSession({
    required: false,
  });

  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showSearchBar) {
      desktopInputRef.current?.focus();
      mobileInputRef.current?.focus();
    }
  }, [showSearchBar]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleSearchButtonClick() {
    setShowSearchBar(!showSearchBar);
  }

  function handleCloseSearchBar() {
    setShowSearchBar(false);
  }

  function handleMenuClick() {
    setShowPanel(!showPanel);
  }

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black transition-opacity duration-300 z-40 ${
          showPanel
            ? "opacity-50 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setShowPanel(false)}
      />
      <div
        className={`fixed top-0 left-1/2 -translate-x-1/2 z-30 w-full py-6 sm:py-8  md:py-10 lg:py-12 border-slate-100 bg-blue-1  ${
          isScrolled ? "shadow-md" : ""
        } `}
        style={{ backgroundColor: "rgba(255, 255, 255, 0.97)" }}
      >
        <div className="flex items-center justify-between px-8 sm:px-16 h-10 mx-auto sm:max-w-[120rem]  bg-orange-5">
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
                      className={clsx(
                        "text-2xl hover:text-greeny-400",
                        link.name === "Home"
                          ? "text-greeny-400"
                          : "text-gray-600"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}

              {showSearchBar && (
                <div className="items-center justify-center gap-4 hidden md:flex">
                  <SearchBar className={`w-full`} inputRef={desktopInputRef} />
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

        {/* Mobile Search */}
        <div
          className={`flex items-center justify-center gap-4 w-full mt-8 md:hidden ${
            showSearchBar ? "block" : "hidden"
          } `}
        >
          <SearchBar
            className="w-full md:w-1/2 lg:w-1/3"
            inputRef={mobileInputRef}
          />
          <button
            type="button"
            className="self-center ml-3 text-gray-400 hover:text-greeny-400"
            onClick={handleCloseSearchBar}
          >
            <FiX className="text-3xl" />
          </button>
        </div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className=" w-full px-8 py-6 sm:px-12 sm:py-8 md:px-16 md:py-10 lg:py-12">
        <div className="h-10"></div>
      </div>

      <NavPanel open={showPanel} setOpen={setShowPanel} />

      {/* </div> */}
    </>
  );
}
