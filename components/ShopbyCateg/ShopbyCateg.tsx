import Link from "next/link";
export default function ShopbyCateg() {
  return (
    <div className="flex flex-col space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-6 w-full max-w-[120rem] mb-16 sm:mx-auto px-8 sm:px-16 text-4xl font-poppins font-semibold text-white">
      <CategItem name="Fruits" />
      <CategItem name="Vegetables" />
      <CategItem name="Herbs" />
      <CategItem name="Shop All" />
    </div>
  );
}

function CategItem({ name }: { name: string }) {
  return (
    <Link
      href="/"
      className="py-16 px-4 rounded-3xl bg-gradient-to-tr to-greeny-300 from-greeny-400 hover:shadow-lg hover:bg-transparent relative overflow-clip"
    >
      <div className="absolute top-0 bottom-0 left-0 right-0 w-full p-4 bg-slate-400 flex items-center justify-center hover:bg-transparent transition-all">
        {name}
      </div>
    </Link>
  );
}
