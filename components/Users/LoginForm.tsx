"use client";
import React, { useState, useEffect } from "react";
import Option from "./Option";
import { CgSpinner } from "react-icons/cg";
import { loginUser } from "@/utils/helpers/loginUser";
import { useRouter, useSearchParams } from "next/navigation";
import InputField from "./InputField";
import { useSession } from "next-auth/react";

const loginFormInit = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const [focusedInput, setFocusedInput] = useState("");
  const [formData, setFormData] = useState(loginFormInit);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const { data: session } = useSession({
    required: false,
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  //TODO handle redirection to specific page after logging in

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    setFocusedInput(e.target.name);
  }

  function handleBlur() {
    setFocusedInput("");
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setSubmitError("");

    try {
      const response = await loginUser(formData);

      if (response && response.error !== null) {
        setSubmitError(response.error || "");
      } else {
        router.push("/"); // TODO modify this to depend on URL search params
      }
    } catch (err) {
      if (err instanceof Error) {
        setSubmitError(err.message);
      }
    }

    setIsLoading(false);
  }

  return (
    <div className="mx-8 my-36 font-poppins">
      <h2 className="text-4xl font-semibold text-greeny-600 my-12">Login</h2>
      <div>
        <form className="flex flex-col gap-8" onSubmit={handleLogin}>
          <InputField
            type="email"
            name="email"
            label="Email address"
            value={formData.email}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            focusedInput={focusedInput}
          />

          <InputField
            type="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            focusedInput={focusedInput}
          />

          {isLoading && (
            <CgSpinner className="animate-spin self-center text-6xl text-gray-700" />
          )}

          {submitError && (
            <p className="text-red-500 text-center text-lg font-semibold">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            className={`bg-greeny-400 py-4 text-2xl text-white mt-4 rounded-xl ${
              isLoading && "opacity-50"
            }`}
            disabled={isLoading}
          >
            Sign In
          </button>
        </form>
        <Option to={"/account/register"} />
      </div>
    </div>
  );
}
