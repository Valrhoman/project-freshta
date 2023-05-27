"use client";
import Image from "next/image";
import toTitleCase from "@/utils/helpers/toTitleCase";
import { HiOutlinePlus } from "react-icons/hi";

export default function List({ products }: { products: Product[] }) {
  return (
    <div className="flex gap-16 w-auto h-auto overflow-x-scroll p-4 pb-12">
      {products.map((item) => (
        <div key={item._id} className="shadow-lg rounded-3xl relative">
          <div className="overflow-hidden rounded-3xl">
            <div className="w-72 h-60 relative bg-white group">
              <Image
                className="group-hover:scale-110 transition-all"
                src={item.imageUrl}
                alt={item.name}
                loading="lazy"
                sizes="30vw"
                // width={300}
                // height={300}
                style={{ objectFit: "contain" }}
                fill
              />
            </div>
            <div className="flex justify-between border-t-4 border-greeny-50">
              <div className="pt-4 pb-6 px-6 text-gray-600">
                <h3 className="text-xl font-semibold tracking-normal">
                  Fresh {toTitleCase(item.name)}
                </h3>
                <p className="text-2xl font-semibold text-gray-500">
                  &#8369;{item.price}
                </p>
              </div>

              <button
                title="Add to cart"
                className="bg-gradient-to-r to-[#659d0b] from-greeny-500 self-center text-white rounded-[4rem] p-2 mr-6 hover:shadow-lg hover:bg-gradient-to-r hover:from-greeny-400 hover:to-[#659d0bc6]"
              >
                <HiOutlinePlus className="text-3xl" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
