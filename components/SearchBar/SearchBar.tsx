"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { useSession } from "next-auth/react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  inputRef?: React.RefObject<HTMLInputElement>;
}

export default function SearchBar({ inputRef, ...props }: Props) {
  // const inputRef = useRef<HTMLInputElement>(null);
  const [inputData, setInputData] = useState("");
  const { data: session } = useSession();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputData(e.target.value);
  }
  // function handleClose() {
  //   setOpen?.(false);
  //   setInputData("");
  // }
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }
  return (
    <div className={`z-10 transition-all w-full`} {...props}>
      <form onSubmit={handleSubmit} className="flex relative">
        <input
          ref={inputRef}
          className="py-4 pl-4 pr-16 rounded-3xl w-full text-xl font-poppins outline-2 outline-gray-50 bg-gray-50 focus:bg-white focus:outline-greeny-200  outline-offset-0"
          placeholder="Search fresh bananas, apples, greens, etc."
          autoComplete="true"
          onChange={handleInputChange}
          value={inputData}
        />
        <button
          type="submit"
          className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center px-4 py-4 rounded-lg  group"
          title="Search fresh products"
        >
          <FiSearch className="text-3xl text-gray-500  group-hover:text-greeny-700" />
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
