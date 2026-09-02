// src/components/Footer.tsx
//
// Site footer. Contact details (phone, email, socials, address) are
// deliberately omitted — that information hasn't been provided for this
// project yet, and inventing it isn't acceptable for a real business site.

import { Link } from "react-router-dom";
import { categories } from "@/data/categories";

const navLinks = [
  { title: "Home", url: "/" },
  { title: "Shop", url: "/shop" },
  { title: "About", url: "/about" },
  { title: "Contact", url: "/contact" },
  { title: "FAQ", url: "/faq" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <span className="text-lg font-bold tracking-tight">
              Cosmos<span className="text-primary"> Mobile Spares</span>
            </span>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Phone spare parts and repair accessories, sourced for
              technicians and everyday repairs alike.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Navigate
            </h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.url}
                    className="text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Categories
            </h3>
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    to={`/shop?category=${category.slug}`}
                    className="text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {year} Cosmos Mobile Spares LTD. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
