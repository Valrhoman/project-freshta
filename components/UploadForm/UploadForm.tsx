"use client";
import { useState } from "react";
import Image from "next/image";
import resizeImage from "../../utils/helpers/resizeImage";
import Success from "./Success";
import { saveImage } from "@/utils/imageStorage";
import { useRouter, redirect } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const uploadFormInit = {
  name: "",
  price: null,
  weight: null,
  image: "",
  tags: "",
};

export default function UploadForm() {
  const [formData, setFormData] = useState<UploadFormState>(uploadFormInit);
  const [showSuccess, setShowSucess] = useState<boolean>(false);

  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/account/login?callbackUrl=/protected/upload");
    },
  });

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file" && files?.length) {
      const resizedImage = await resizeImage(files[0] as File);
      console.log(resizedImage);
      setFormData((prevData) => ({
        ...prevData,
        [name]: resizedImage,
      }));
    } else {
      const inputValue = type === "checkbox" ? checked : value;
      setFormData((prevData) => ({
        ...prevData,
        [name]: inputValue,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Save image to firebase
    const imageUrl = await saveImage(formData);

    // Handle form submission
    const formDataToDB = new FormData();

    formDataToDB.append("name", formData.name);
    formDataToDB.append("tags", formData.tags);
    formDataToDB.append("imageUrl", imageUrl);
    if (formData.price && formData.weight) {
      formDataToDB.append("price", formData.price.toString());
      formDataToDB.append("weight", formData.weight.toString());
    }

    // Send data to api/products POST handler
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formDataToDB,
      });

      if (res.ok) {
        // Form submitted successfully
        setShowSucess(true);
      }
    } catch (err) {
      console.error("Error:", err);
    }

    // Reset the form element and formData state
    setFormData(uploadFormInit);
    const form = e.target as HTMLFormElement;
    form.reset();
    router.refresh();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-xs mt-48 mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1">
            Product Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-2 py-1 border rounded"
            placeholder="Ex. Oranges"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="weight" className="block mb-1">
            Weight (grams):
          </label>
          <input
            type="text"
            id="weight"
            name="weight"
            value={formData.weight ?? ""}
            onChange={handleInputChange}
            className="w-full px-2 py-1 border rounded"
            placeholder="Ex. 1000"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block mb-1">
            Price (Php):
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price ?? ""}
            onChange={handleInputChange}
            className="w-full px-2 py-1 border rounded"
            placeholder="Ex. 200"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tags" className="block mb-1">
            Tags:
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            className="w-full px-2 py-1 border rounded"
            placeholder="Ex. featured, bestseller (separated by commas)"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block mb-1">
            Image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleInputChange}
            className="w-full"
            accept="image/*"
            required
          />
        </div>
        {formData.image && (
          <Image
            className="mb-4"
            src={URL.createObjectURL(formData.image)}
            alt=""
            width={300}
            height={300}
          />
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </form>
      {session && (
        <>
          <p>{session && session.user?.email}</p>
          <button className="text-2xl p-4" onClick={() => signOut()}>
            Sign out
          </button>
        </>
      )}
      <Success open={showSuccess} onClose={() => setShowSucess(false)} />
    </>
  );
}
