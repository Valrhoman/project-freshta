"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { useSession } from "next-auth/react";

export default function SearchBar({ open, setOpen }: any) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputData, setInputData] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputData(e.target.value);
  }
  function handleClose() {
    setOpen(false);
    setInputData("");
  }
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log("subsubmitmit");
  }
  return (
    <div
      className={`relative mt-6 -mb-2 pt-6 border-t z-10 border-gray-100 ${
        open ? "" : "hidden"
      } transition-all`}
    >
      <form onSubmit={handleSubmit} className="flex">
        <input
          ref={inputRef}
          className="py-4 pl-4 pr-16 rounded-xl w-full text-xl font-poppins outline-none border border-gray-200 focus:outline-greeny-200 focus:outline-2 outline-offset-0"
          placeholder="Search fresh bananas, apples, greens, etc."
          autoComplete="true"
          onChange={handleInputChange}
          value={inputData}
        />
        <button
          type="submit"
          className="absolute right-12 mt-6 top-4 flex items-center px-4 rounded-lg"
          title="Search fresh products"
        >
          <FiSearch className="text-3xl text-gray-500  hover:text-greeny-400" />
        </button>
        <button
          type="button"
          className="self-center ml-3 text-gray-400 hover:text-greeny-700"
          onClick={handleClose}
        >
          <FiX className="text-3xl" />
        </button>
      </form>
      {session && <RecentSearches />}
    </div>
  );
}

function RecentSearches() {
  return (
    <div className="my-6 text-gray-500 text-lg ml-4">
      <h3 className="text-greeny-700 text-xl font-semibold mb-4">
        Recent searches
      </h3>
      <ol className="flex flex-col gap-2 text-xl">
        <RecentListItem>Lettuce</RecentListItem>
        <RecentListItem>Tomato</RecentListItem>
        <RecentListItem>Apple</RecentListItem>
      </ol>
    </div>
  );
}

function RecentListItem({ children }: any) {
  return (
    <li className="cursor-pointer hover:text-greeny-500 self-start">
      <FiSearch className="inline-block mr-4" />
      {children}
    </li>
  );
}
