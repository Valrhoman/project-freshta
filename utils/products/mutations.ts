import mongoose from "mongoose";
import { connectDB } from "@/utils/db";
import Product from "@/utils/models/Product";

export type MutationOk<T = unknown> = { ok: true; result?: T };
export type MutationErr = { ok: false; status: number; error: string };
export type MutationResult<T = unknown> = MutationOk<T> | MutationErr;

export type CreateProductInput = {
  name: string;
  weight: number;
  price: number;
  tags: string | string[];
  imageUrl: string;
};

export type UpdateProductInput = {
  name?: string;
  weight?: number | string;
  price?: number | string;
  tags?: string | string[];
  imageUrl?: string;
  ownerId?: unknown;
};

const ALLOWED_PATCH_FIELDS = ["name", "weight", "price", "tags", "imageUrl"] as const;

export function normalizeTags(tags: unknown): string[] | undefined {
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

/** Plain JSON for Server Action / RSC boundaries (ObjectId / Date / Mongoose docs). */
function toPlain(doc: unknown): unknown {
  return JSON.parse(JSON.stringify(doc));
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

export async function createProductForOwner(
  ownerId: string,
  input: CreateProductInput,
): Promise<MutationResult> {
  try {
    await connectDB();

    const tagsArr = normalizeTags(input.tags) ?? [];
    const weight = parseFiniteNumber(input.weight);
    const price = parseFiniteNumber(input.price);

    if (!input.name?.trim()) {
      return { ok: false, status: 400, error: "Invalid name" };
    }
    if (weight === null) {
      return { ok: false, status: 400, error: "Invalid weight" };
    }
    if (price === null) {
      return { ok: false, status: 400, error: "Invalid price" };
    }
    if (typeof input.imageUrl !== "string" || !input.imageUrl.trim()) {
      return { ok: false, status: 400, error: "Invalid imageUrl" };
    }

    const product = new Product({
      name: input.name.trim(),
      weight,
      price,
      tags: tagsArr,
      imageUrl: input.imageUrl.trim(),
      ownerId,
    });
    const result = await product.save();
    return { ok: true, result: toPlain(result) };
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return { ok: false, status: 500, error: message };
  }
}

export async function updateProductForOwner(
  id: string,
  ownerId: string,
  body: UpdateProductInput,
): Promise<MutationResult> {
  try {
    await connectDB();
    const product = await loadOwnedProduct(id, ownerId);
    if (!product) {
      return { ok: false, status: 404, error: "Not found" };
    }

    if (body === null || typeof body !== "object" || Array.isArray(body)) {
      return { ok: false, status: 400, error: "Invalid JSON body" };
    }

    if ("ownerId" in body) {
      return { ok: false, status: 400, error: "Cannot change ownerId" };
    }

    const updates: Record<string, unknown> = {};

    if ("name" in body) {
      if (typeof body.name !== "string" || !body.name.trim()) {
        return { ok: false, status: 400, error: "Invalid name" };
      }
      updates.name = body.name.trim();
    }
    if ("weight" in body) {
      const weight = parseFiniteNumber(body.weight);
      if (weight === null) {
        return { ok: false, status: 400, error: "Invalid weight" };
      }
      updates.weight = weight;
    }
    if ("price" in body) {
      const price = parseFiniteNumber(body.price);
      if (price === null) {
        return { ok: false, status: 400, error: "Invalid price" };
      }
      updates.price = price;
    }
    if ("imageUrl" in body) {
      if (typeof body.imageUrl !== "string" || !body.imageUrl.trim()) {
        return { ok: false, status: 400, error: "Invalid imageUrl" };
      }
      updates.imageUrl = body.imageUrl.trim();
    }
    if ("tags" in body) {
      const tags = normalizeTags(body.tags);
      if (tags === undefined) {
        return { ok: false, status: 400, error: "Invalid tags" };
      }
      updates.tags = tags;
    }

    const hasAllowed = ALLOWED_PATCH_FIELDS.some((key) => key in updates);
    if (!hasAllowed) {
      return { ok: false, status: 400, error: "No updatable fields provided" };
    }

    Object.assign(product, updates);
    const result = await product.save();
    return { ok: true, result: toPlain(result) };
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return { ok: false, status: 500, error: message };
  }
}

export async function deleteProductForOwner(
  id: string,
  ownerId: string,
): Promise<MutationResult> {
  try {
    await connectDB();
    const product = await loadOwnedProduct(id, ownerId);
    if (!product) {
      return { ok: false, status: 404, error: "Not found" };
    }

    await product.deleteOne();
    return { ok: true };
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return { ok: false, status: 500, error: message };
  }
}
