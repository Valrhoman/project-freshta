import Featured from "./Featured";
import { getProducts } from "@/utils/helpers/getProducts";

export default async function FeaturedSection() {
  const products = await getProducts();
  return <Featured products={products} />;
}
