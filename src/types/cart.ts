// src/types/cart.ts
//
// Shape of an item once it's in the cart. Kept separate from `Product`
// because a cart item also needs a chosen quantity (and later, a chosen
// variant/spec selection where applicable) — not everything on `Product`
// belongs here.

import type { Product } from "./product";

export interface CartItem {
  product: Product;
  quantity: number;
}
