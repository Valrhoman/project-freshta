import { connectDB } from "@/utils/db";
import Product from "@/utils/models/Product";

export async function getProducts() {
  await connectDB();
  const products = await Product.find({}).lean().exec();
  // Serialize for RSC props (ObjectId / Date → plain JSON)
  return JSON.parse(JSON.stringify(products));
}
