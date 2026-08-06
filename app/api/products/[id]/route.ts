import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { auth } from "@/auth";
import { connectDB } from "@/utils/db";
import Product from "@/utils/models/Product";

type RouteContext = {
  params: Promise<{ id: string }>;
};

const ALLOWED_PATCH_FIELDS = ["name", "weight", "price", "tags", "imageUrl"] as const;

function normalizeTags(tags: unknown): string[] | undefined {
  if (tags === undefined) return undefined;
  if (Array.isArray(tags)) {
    return tags.map((t) => String(t).trim()).filter(Boolean);
  }
  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return undefined;
}

function parseFiniteNumber(value: unknown): number | null {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : null;
}

async function loadOwnedProduct(id: string, ownerId: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  const product = await Product.findById(id).exec();
  if (!product || product.ownerId !== ownerId) {
    return null;
  }
  return product;
}

export async function DELETE(_req: Request, context: RouteContext) {
  try {
    const session = await auth();
    if (!session?.user?._id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await context.params;
    const product = await loadOwnedProduct(id, session.user._id);
    if (!product) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await product.deleteOne();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(req: Request, context: RouteContext) {
  try {
    const session = await auth();
    if (!session?.user?._id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await context.params;
    const product = await loadOwnedProduct(id, session.user._id);
    if (!product) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    let raw: unknown;
    try {
      raw = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    if (raw === null || typeof raw !== "object" || Array.isArray(raw)) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const body = raw as Record<string, unknown>;

    if ("ownerId" in body) {
      return NextResponse.json(
        { error: "Cannot change ownerId" },
        { status: 400 },
      );
    }

    const updates: Record<string, unknown> = {};

    if ("name" in body) {
      if (typeof body.name !== "string" || !body.name.trim()) {
        return NextResponse.json({ error: "Invalid name" }, { status: 400 });
      }
      updates.name = body.name.trim();
    }
    if ("weight" in body) {
      const weight = parseFiniteNumber(body.weight);
      if (weight === null) {
        return NextResponse.json({ error: "Invalid weight" }, { status: 400 });
      }
      updates.weight = weight;
    }
    if ("price" in body) {
      const price = parseFiniteNumber(body.price);
      if (price === null) {
        return NextResponse.json({ error: "Invalid price" }, { status: 400 });
      }
      updates.price = price;
    }
    if ("imageUrl" in body) {
      if (typeof body.imageUrl !== "string" || !body.imageUrl.trim()) {
        return NextResponse.json({ error: "Invalid imageUrl" }, { status: 400 });
      }
      updates.imageUrl = body.imageUrl.trim();
    }
    if ("tags" in body) {
      const tags = normalizeTags(body.tags);
      if (tags === undefined) {
        return NextResponse.json({ error: "Invalid tags" }, { status: 400 });
      }
      updates.tags = tags;
    }

    const hasAllowed = ALLOWED_PATCH_FIELDS.some((key) => key in updates);
    if (!hasAllowed) {
      return NextResponse.json(
        { error: "No updatable fields provided" },
        { status: 400 },
      );
    }

    Object.assign(product, updates);
    const result = await product.save();
    return NextResponse.json({ result });
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
