"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export type OwnedProduct = {
  _id: string;
  name: string;
  weight: number;
  price: number;
  imageUrl: string;
  tags: string[];
};

type EditState = {
  name: string;
  weight: string;
  price: string;
  tags: string;
};

function toEditState(product: OwnedProduct): EditState {
  return {
    name: product.name,
    weight: String(product.weight),
    price: String(product.price),
    tags: product.tags.join(", "),
  };
}

export default function OwnedProductCard({ product }: { product: OwnedProduct }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<EditState>(() => toEditState(product));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!window.confirm(`Delete “${product.name}”?`)) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/products/${product._id}`, { method: "DELETE" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Delete failed");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setBusy(false);
    }
  };

  const handleSave = async () => {
    const name = draft.name.trim();
    const weight = Number(draft.weight);
    const price = Number(draft.price);
    if (!name) {
      setError("Name is required");
      return;
    }
    if (!Number.isFinite(weight) || !Number.isFinite(price)) {
      setError("Weight and price must be valid numbers");
      return;
    }

    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/products/${product._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          weight,
          price,
          tags: draft.tags,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Update failed");
      }
      setEditing(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setBusy(false);
    }
  };

  const startEdit = () => {
    setDraft(toEditState(product));
    setError(null);
    setEditing(true);
  };

  const cancelEdit = () => {
    setDraft(toEditState(product));
    setError(null);
    setEditing(false);
  };

  return (
    <div className="mx-4 mb-6">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={100}
        height={100}
      />
      {editing ? (
        <div className="mt-2 max-w-xs space-y-2">
          <label className="block text-sm">
            Name
            <input
              className="mt-1 w-full border px-2 py-1"
              value={draft.name}
              onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
              disabled={busy}
            />
          </label>
          <label className="block text-sm">
            Weight (grams)
            <input
              className="mt-1 w-full border px-2 py-1"
              value={draft.weight}
              onChange={(e) => setDraft((d) => ({ ...d, weight: e.target.value }))}
              disabled={busy}
            />
          </label>
          <label className="block text-sm">
            Price (Php)
            <input
              className="mt-1 w-full border px-2 py-1"
              value={draft.price}
              onChange={(e) => setDraft((d) => ({ ...d, price: e.target.value }))}
              disabled={busy}
            />
          </label>
          <label className="block text-sm">
            Tags
            <input
              className="mt-1 w-full border px-2 py-1"
              value={draft.tags}
              onChange={(e) => setDraft((d) => ({ ...d, tags: e.target.value }))}
              disabled={busy}
              placeholder="featured, bestseller"
            />
          </label>
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              className="bg-blue-500 px-3 py-1 text-white disabled:opacity-50"
              onClick={handleSave}
              disabled={busy}
            >
              Save
            </button>
            <button
              type="button"
              className="border px-3 py-1 disabled:opacity-50"
              onClick={cancelEdit}
              disabled={busy}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3>{product.name}</h3>
          <p>{product.weight} grams</p>
          <p>{product.price} Php</p>
          <div>
            {product.tags.map((tag, i) => (
              <p className="bg-green text-white" key={`${tag}-${i}`}>
                {tag}
              </p>
            ))}
          </div>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              className="border px-3 py-1 disabled:opacity-50"
              onClick={startEdit}
              disabled={busy}
            >
              Edit
            </button>
            <button
              type="button"
              className="border border-red-600 px-3 py-1 text-red-700 disabled:opacity-50"
              onClick={handleDelete}
              disabled={busy}
            >
              Delete
            </button>
          </div>
        </>
      )}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
