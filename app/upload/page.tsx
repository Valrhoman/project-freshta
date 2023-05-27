import { NavBar } from "@/components/Nav";
import UploadForm from "@/components/UploadForm";
import Image from "next/image";

export const metadata = {
  title: "Post new product",
  description:
    "Sell and post your local fresh produce fruits and vegetables here at freshta",
  keywords:
    "freshta, fresh produce, sell, upload, post, vegetables, fruits, local produce",
};

async function getProducts() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  const data = await res.json();
  console.log("fetching api/products");
  return data;
}

export default async function Upload() {
  const products = await getProducts();
  return (
    <div>
      <NavBar />
      <div className="h-40"></div>
      Upload
      <UploadForm />
      {products.map((item: any) => {
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
