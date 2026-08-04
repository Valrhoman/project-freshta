import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/utils/db";
import Product from "@/utils/models/Product";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?._id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
      ownerId: session.user._id,
    });
    const result = await product.save();
    return NextResponse.json({ result });
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find({}).exec();
    return NextResponse.json(products);
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
