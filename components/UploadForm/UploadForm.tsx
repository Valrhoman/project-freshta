"use client";
import { useState, useTransition } from "react";
import Image from "next/image";
import { toast } from "sonner";
import resizeImage from "../../utils/helpers/resizeImage";
import { saveImage } from "@/utils/imageStorage";
import { redirect } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { createProduct } from "@/app/actions/products";

const uploadFormInit = {
  name: "",
  price: null,
  weight: null,
  image: "",
  tags: "",
};

export default function UploadForm() {
  const [formData, setFormData] = useState<UploadFormState>(uploadFormInit);
  const [isPending, startTransition] = useTransition();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/account/login?callbackUrl=/upload");
    },
  });

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file" && files?.length) {
      const resizedImage = await resizeImage(files[0] as File);
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
    const form = e.target as HTMLFormElement;

    if (!formData.price || !formData.weight || !formData.image) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const imageUrl = await saveImage(formData);

      startTransition(async () => {
        const result = await createProduct({
          name: formData.name,
          tags: formData.tags,
          imageUrl,
          price: Number(formData.price),
          weight: Number(formData.weight),
        });

        if (!result.ok) {
          toast.error(result.error || "Failed to add product");
          return;
        }

        toast.success("Product posted");
        setFormData(uploadFormInit);
        form.reset();
      });
    } catch (err) {
      console.error("Error:", err);
      toast.error(err instanceof Error ? err.message : "Failed to add product");
    }
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
            disabled={isPending}
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
            disabled={isPending}
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
            disabled={isPending}
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
            disabled={isPending}
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
            disabled={isPending}
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
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={isPending}
        >
          {isPending ? "Adding…" : "Add Product"}
        </button>
      </form>
      {session && (
        <>
          <p>{session && session.user?.email}</p>
          <button
            className="text-2xl p-4"
            onClick={() => signOut({ callbackUrl: "/account/login" })}
          >
            Sign out
          </button>
        </>
      )}
    </>
  );
}
