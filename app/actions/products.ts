"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import {
  createProductForOwner,
  deleteProductForOwner,
  updateProductForOwner,
  type CreateProductInput,
  type MutationResult,
  type UpdateProductInput,
} from "@/utils/products/mutations";

function revalidateProductPaths() {
  revalidatePath("/");
  revalidatePath("/upload");
}

export async function createProduct(
  input: CreateProductInput,
): Promise<MutationResult> {
  const session = await auth();
  if (!session?.user?._id) {
    return { ok: false, status: 401, error: "Unauthorized" };
  }

  const result = await createProductForOwner(session.user._id, input);
  if (result.ok) {
    revalidateProductPaths();
  }
  return result;
}

export async function updateProduct(
  id: string,
  input: UpdateProductInput,
): Promise<MutationResult> {
  const session = await auth();
  if (!session?.user?._id) {
    return { ok: false, status: 401, error: "Unauthorized" };
  }

  const result = await updateProductForOwner(id, session.user._id, input);
  if (result.ok) {
    revalidateProductPaths();
  }
  return result;
}

export async function deleteProduct(id: string): Promise<MutationResult> {
  const session = await auth();
  if (!session?.user?._id) {
    return { ok: false, status: 401, error: "Unauthorized" };
  }

  const result = await deleteProductForOwner(id, session.user._id);
  if (result.ok) {
    revalidateProductPaths();
  }
  return result;
}
