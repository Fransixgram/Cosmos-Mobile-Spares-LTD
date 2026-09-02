// src/components/FeaturedProductsSection.tsx
//
// Uses the existing mock product data — no second dataset created.

import { mockProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function FeaturedProductsSection() {
  const featured = mockProducts.slice(0, 6);

  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Featured Products
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            A few of what we currently have in stock.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
