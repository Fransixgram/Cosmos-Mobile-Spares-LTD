// src/pages/Shop.tsx
//
// Product catalogue: search + category filter + sort, all working
// together over the existing mock data. Category state lives in the URL
// (?category=slug) so links from the navbar/Home category cards work
// correctly and the page stays bookmarkable/shareable.

import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X, PackageX } from "lucide-react";
import { mockProducts } from "@/data/products";
import { categories } from "@/data/categories";
import { getCategorySlug } from "@/lib/category";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A-Z" },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("featured");

  const activeCategorySlug = searchParams.get("category");

  function setCategory(slug: string | null) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (slug) {
        next.set("category", slug);
      } else {
        next.delete("category");
      }
      return next;
    });
  }

  function resetFilters() {
    setSearchTerm("");
    setSortOption("featured");
    setCategory(null);
  }

  const hasActiveFilters = Boolean(activeCategorySlug) || searchTerm.trim() !== "";

  const visibleProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    let result = mockProducts.filter((product) => {
      const matchesCategory =
        !activeCategorySlug ||
        getCategorySlug(product.category) === activeCategorySlug;

      const matchesSearch =
        term === "" ||
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });

    result = [...result].sort((a, b) => {
      switch (sortOption) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "featured":
        default:
          return 0; // keep catalogue order
      }
    });

    return result;
  }, [activeCategorySlug, searchTerm, sortOption]);

  const activeCategoryTitle = categories.find(
    (category) => category.slug === activeCategorySlug
  )?.title;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Shop</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {activeCategoryTitle
            ? `Browsing: ${activeCategoryTitle}`
            : "Browse our full range of phone spare parts and repair accessories."}
        </p>
      </div>

      {/* Search + sort */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 shrink-0 text-muted-foreground" />
          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value as SortOption)}
            aria-label="Sort products"
            className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category filter pills */}
      <div className="mt-4 -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        <button
          type="button"
          onClick={() => setCategory(null)}
          className={
            !activeCategorySlug
              ? "shrink-0 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground"
              : "shrink-0 rounded-full border border-border px-4 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent"
          }
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.slug}
            type="button"
            onClick={() => setCategory(category.slug)}
            className={
              activeCategorySlug === category.slug
                ? "shrink-0 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground"
                : "shrink-0 rounded-full border border-border px-4 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent"
            }
          >
            {category.title}
          </button>
        ))}
      </div>

      {/* Active filters + reset */}
      {hasActiveFilters && (
        <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
          <span>
            {visibleProducts.length} result
            {visibleProducts.length === 1 ? "" : "s"}
          </span>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1 text-foreground underline-offset-2 hover:underline"
          >
            <X className="size-3.5" />
            Clear filters
          </button>
        </div>
      )}

      {/* Product grid / empty state */}
      {visibleProducts.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-muted">
            <PackageX className="size-7 text-muted-foreground" />
          </span>
          <h2 className="mt-6 text-lg font-semibold">No products found</h2>
          <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
            Try a different search term or category, or clear your filters to
            see everything we carry.
          </p>
          <Button variant="outline" className="mt-5" onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
