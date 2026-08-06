import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/utils/db";
import Product from "@/utils/models/Product";
import { createProductForOwner } from "@/utils/products/mutations";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?._id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const result = await createProductForOwner(session.user._id, {
      name: String(formData.get("name") ?? ""),
      weight: Number(formData.get("weight")),
      price: Number(formData.get("price")),
      tags: String(formData.get("tags") ?? ""),
      imageUrl: String(formData.get("imageUrl") ?? ""),
    });

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status },
      );
    }
    return NextResponse.json({ result: result.result });
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
