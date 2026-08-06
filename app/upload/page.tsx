import { redirect } from "next/navigation";
import { NavBar } from "@/components/Nav";
import UploadForm from "@/components/UploadForm";
import OwnedProductCard from "@/components/UploadForm/OwnedProductCard";
import { auth } from "@/auth";
import { getProducts } from "@/utils/helpers/getProducts";

type ProductItem = {
  _id: string;
  name: string;
  weight: number;
  price: number;
  imageUrl: string;
  tags: string[];
  ownerId?: string;
};

export const metadata = {
  title: "Post new product",
  description:
    "Sell and post your local fresh produce fruits and vegetables here at freshta",
  keywords:
    "freshta, fresh produce, sell, upload, post, vegetables, fruits, local produce",
};

export default async function Upload() {
  const session = await auth();
  if (!session?.user?._id) {
    redirect("/account/login?callbackUrl=/upload");
  }

  const products = (await getProducts({
    ownerId: session.user._id,
  })) as ProductItem[];

  return (
    <div>
      <NavBar />
      <div className="h-40"></div>
      <h1 className="text-2xl font-semibold mx-4">Your listings</h1>
      <UploadForm />
      {products.length === 0 ? (
        <p className="mx-4 mt-8 text-gray-600">
          You have not posted any products yet.
        </p>
      ) : (
        products.map((item) => (
          <OwnedProductCard
            key={String(item._id)}
            product={{
              ...item,
              _id: String(item._id),
              tags: item.tags ?? [],
            }}
          />
        ))
      )}
    </div>
  );
}
