// src/lib/category.ts

import { categories } from "@/data/categories";

/**
 * Maps a product's category label (e.g. "Soldering Tools") to its
 * canonical slug (e.g. "soldering-tools"), using the shared categories
 * list as the source of truth. Falls back to a naive slugify for any
 * label that doesn't have a defined category yet, rather than throwing.
 */
export function getCategorySlug(label: string): string {
  const match = categories.find((category) => category.title === label);
  if (match) return match.slug;

  return label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
