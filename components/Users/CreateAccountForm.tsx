"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Option from "./Option";
import { CgSpinner } from "react-icons/cg";
import InputField from "./InputField";

const signupFormInit = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function CreateAccountForm() {
  const [formData, setFormData] = useState(signupFormInit);
  const [submitError, setSubmitError] = useState<string>("");
  const [focusedInput, setFocusedInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    e.preventDefault();
    e.stopPropagation();

    setFocusedInput(e.target.name);
  }

  function handleBlur() {
    setFocusedInput("");
  }

  function handlePasswordMismatch(e: React.ChangeEvent<HTMLInputElement>) {
    if (formData.password !== formData.confirmPassword) {
      e.target.setCustomValidity("Passwords do not match");
    } else {
      e.target.setCustomValidity("");
    }
  }

  async function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setSubmitError("");

    console.log(formData.password, formData.confirmPassword);

    // Handle form submission
    const formDataToDB = new FormData();

    formDataToDB.append("firstName", formData.firstName);
    formDataToDB.append("lastName", formData.lastName);
    formDataToDB.append("email", formData.email);
    formDataToDB.append("password", formData.password);

    // Send data to api/auth/signup POST handler
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: formDataToDB,
      });

      const resData = await res.json();
      if (resData?.success) {
        // Save data in session using next-auth
        setIsLoading(false);

        console.log(resData.returnUserData);

        // Reset the form element and formData state
        setFormData(signupFormInit);
        const form = e.target as HTMLFormElement;
        form.reset();
        router.replace("/account/login");
      } else {
        setIsLoading(false);
        throw new Error(resData.error);
      }
    } catch (err) {
      if (err instanceof Error) {
        setSubmitError(err.message);
      }
    }
  }

  return (
    <div className="mx-8 my-36 font-poppins">
      <h2 className="text-4xl font-semibold text-greeny-600 my-12">
        Create Account
      </h2>
      <div>
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <InputField
            type="text"
            name="firstName"
            label="First Name"
            value={formData.firstName}
            focusedInput={focusedInput}
            onFocus={handleFocus}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
          />
          <InputField
            type="text"
            name="lastName"
            label="Last Name"
            value={formData.lastName}
            focusedInput={focusedInput}
            onFocus={handleFocus}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
          />
          <InputField
            type="email"
            name="email"
            label="Email Address"
            value={formData.email}
            focusedInput={focusedInput}
            onFocus={handleFocus}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
          />
          <InputField
            type="password"
            name="password"
            label="Password"
            value={formData.password}
            focusedInput={focusedInput}
            onFocus={handleFocus}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
            minLength={8}
          />
          <InputField
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            value={formData.confirmPassword}
            focusedInput={focusedInput}
            onFocus={handleFocus}
            onChange={handleInputChange}
            onBlur={(e) => {
              handleBlur();
              handlePasswordMismatch(e);
            }}
            required
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
            Register
          </button>
        </form>
        <Option to={"/account/login"} />
      </div>
    </div>
  );
}
