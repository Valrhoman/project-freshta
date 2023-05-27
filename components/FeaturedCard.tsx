import Image from "next/image";
export default function FeaturedCard() {
  return (
    <>
      <h3 className="mx-8 text-4xl font-poppins font-semibold mb-12 mt-8 text-greeny-500">
        Daily Bestseller
      </h3>
      <div className="mx-8 relative rounded-3xl overflow-hidden h-[100vw] mb-16 shadow-lg bg-gray-950 hover:shadow-lg">
        <Image
          src={"/images/processed_food-bean-breakfast-handle-natural.jpg"}
          alt={"coffee beans sale"}
          loading="lazy"
          sizes="90vw"
          // width={300}
          // height={300}
          style={{ objectFit: "cover", opacity: 0.8, transform: "scaleX(-1)" }}
          fill
        />
        <div className="absolute top-10 left-0 text-white font-poppins m-12 flex flex-col gap-4">
          <p className="text-2xl">Get this before close!</p>

          <h3 className="text-4xl font-semibold mb-4">
            100% Organic Coffee Beans
          </h3>
          <button className="bg-white text-2xl text-green-700 px-8 py-4 rounded-[10rem] shadow-md font-semibold self-start hover:bg-greeny-400 hover:text-white hover:drop-shadow-lg transition-all">
            Order now
          </button>
        </div>
      </div>
    </>
  );
}
