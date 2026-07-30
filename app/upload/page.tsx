import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { NavBar } from "@/components/Nav";
import UploadForm from "@/components/UploadForm";
import { authOptions } from "@/utils/helpers/authOptions";
import { getProducts } from "@/utils/helpers/getProducts";

type ProductItem = {
  _id: string;
  name: string;
  weight: number;
  price: number;
  imageUrl: string;
  tags: string[];
};

export const metadata = {
  title: "Post new product",
  description:
    "Sell and post your local fresh produce fruits and vegetables here at freshta",
  keywords:
    "freshta, fresh produce, sell, upload, post, vegetables, fruits, local produce",
};

export default async function Upload() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/account/login?callbackUrl=/upload");
  }

  const products = (await getProducts()) as ProductItem[];
  return (
    <div>
      <NavBar />
      <div className="h-40"></div>
      Upload
      <UploadForm />
      {products.map((item) => {
        return (
          <div key={item._id}>
            <Image
              key={item._id}
              src={item.imageUrl}
              alt="test"
              width={100}
              height={100}
            />
            <h3>{item.name}</h3>
            <p>{item.weight} grams</p>
            <p>{item.price} Php</p>
            <div>
              {item.tags.map((tag: string, i: number) => {
                return (
                  <p className="bg-green text-white" key={i}>
                    {tag}
                  </p>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
