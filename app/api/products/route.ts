import { NextResponse } from "next/server";
import { closeDB, connectDB } from "@/utils/db";
import Product from "@/utils/models/Product";

export async function POST(req: Request, res: Response) {
  try {
    await connectDB();

    const formData = await req.formData();

    // Converted tags data to array
    const tags = formData.get("tags") as string;
    const tagsArr = tags.split(",").map((item) => item.trim());

    const product = new Product({
      name: formData.get("name"),
      weight: Number(formData.get("weight")), // Convert to number
      price: Number(formData.get("price")), // Convert to number
      tags: tagsArr,
      imageUrl: formData.get("imageUrl"),
    });
    const result = await product.save();
    return NextResponse.json(result);
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  } finally {
    await closeDB();
  }

  //
}

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find().exec();
    return NextResponse.json(products);
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  } finally {
    await closeDB();
  }
  //
}
