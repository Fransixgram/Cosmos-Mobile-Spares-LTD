// src/pages/ProductDetails.tsx

import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, Minus, Plus, ShoppingCart, PackageX } from "lucide-react";
import { mockProducts } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";

const PLACEHOLDER_IMAGE = "/placeholder-product.png";

function formatNaira(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

// Turns a specs key like "compatibleModel" into "Compatible Model"
function formatSpecKey(key: string) {
  const spaced = key.replace(/([a-z])([A-Z])/g, "$1 $2");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const { showToast } = useToast();

  const product = mockProducts.find((item) => item.id === id);

  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-muted">
          <PackageX className="size-7 text-muted-foreground" />
        </span>
        <h1 className="mt-6 text-2xl font-bold tracking-tight">
          Product not found
        </h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          We couldn't find the product you're looking for. It may have been
          removed or the link may be incorrect.
        </p>
        <Button asChild size="lg" className="mt-6">
          <Link to="/shop">Back to Shop</Link>
        </Button>
      </div>
    );
  }

  const images = product.images.length > 0 ? product.images : [PLACEHOLDER_IMAGE];
  const activeImage = images[activeImageIndex] ?? images[0];
  const inStock = product.stock > 0;
  const atMax = quantity >= product.stock;
  const specEntries = Object.entries(product.specs);

  const relatedProducts = mockProducts
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  function handleAddToCart() {
    if (!inStock || !product) return;
    addItem(product, quantity);
    showToast("Added to cart");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Breadcrumb / back link */}
      <Link
        to="/shop"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
        Back to Shop
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Image gallery */}
        <div>
          <div className="aspect-square overflow-hidden rounded-xl border border-border bg-muted">
            <img
              src={activeImage}
              alt={product.name}
              className="h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.src = PLACEHOLDER_IMAGE;
              }}
            />
          </div>

          {images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {images.map((image, index) => (
                <button
                  key={image + index}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  aria-label={`View image ${index + 1} of ${product.name}`}
                  className={
                    index === activeImageIndex
                      ? "size-16 shrink-0 overflow-hidden rounded-lg border-2 border-primary"
                      : "size-16 shrink-0 overflow-hidden rounded-lg border border-border"
                  }
                >
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.src = PLACEHOLDER_IMAGE;
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {product.category}
          </span>
          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-semibold">
              {formatNaira(product.price)}
            </span>
            <span
              className={
                inStock
                  ? "text-sm font-medium text-emerald-600"
                  : "text-sm font-medium text-destructive"
              }
            >
              {inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {/* Specifications */}
          {specEntries.length > 0 && (
            <div className="mt-6">
              <h2 className="text-sm font-semibold">Specifications</h2>
              <dl className="mt-3 divide-y divide-border rounded-lg border border-border">
                {specEntries.map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between gap-4 px-4 py-2.5 text-sm"
                  >
                    <dt className="text-muted-foreground">
                      {formatSpecKey(key)}
                    </dt>
                    <dd className="font-medium">{String(value)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Quantity + Add to Cart */}
          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                className="flex size-10 items-center justify-center rounded-full border border-input transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-40"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-8 text-center text-base font-medium">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))
                }
                disabled={!inStock || atMax}
                aria-label="Increase quantity"
                title={atMax ? "Maximum available stock" : undefined}
                className="flex size-10 items-center justify-center rounded-full border border-input transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-40"
              >
                <Plus className="size-4" />
              </button>
            </div>

            <Button
              size="lg"
              className="flex-1"
              disabled={!inStock}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="size-4" />
              {inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 border-t border-border pt-10">
          <h2 className="text-xl font-bold tracking-tight">
            Related Products
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((related) => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
