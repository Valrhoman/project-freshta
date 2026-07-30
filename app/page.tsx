import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import ShopbyCateg from "@/components/ShopbyCateg";
import FeaturedCard from "@/components/FeaturedCard";
import { getProducts } from "@/utils/helpers/getProducts";

export default async function Home() {
  const products = await getProducts();
  return (
    <main className="flex min-h-screen flex-col mx-auto">
      <Hero />
      <Featured products={products} />
      <ShopbyCateg />
      <FeaturedCard />
    </main>
  );
}
