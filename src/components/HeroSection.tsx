// src/components/HeroSection.tsx
//
// Hero visual is an icon-based device/parts panel built from lucide-react
// icons — not a stock photo or an invented product image. The existing
// src/assets/hero.png is the default Vite starter graphic and isn't
// phone-repair themed, so it isn't used here.

import { Link } from "react-router-dom";
import { Smartphone, Battery, Camera, Wrench, Cable } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Quality Phone Spare Parts &amp; Repair Essentials
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Find reliable phone replacement parts, repair tools and
            accessories for your next repair job.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/shop">Shop Products</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>

        {/* Icon-based device/parts panel */}
        <div className="relative mx-auto w-full max-w-sm">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="flex items-center justify-center rounded-xl bg-muted p-8">
              <Smartphone className="size-20 text-primary" strokeWidth={1.5} />
            </div>
            <div className="mt-6 grid grid-cols-4 gap-3">
              <div className="flex items-center justify-center rounded-lg bg-muted p-3">
                <Battery className="size-5 text-foreground/70" />
              </div>
              <div className="flex items-center justify-center rounded-lg bg-muted p-3">
                <Camera className="size-5 text-foreground/70" />
              </div>
              <div className="flex items-center justify-center rounded-lg bg-muted p-3">
                <Wrench className="size-5 text-foreground/70" />
              </div>
              <div className="flex items-center justify-center rounded-lg bg-muted p-3">
                <Cable className="size-5 text-foreground/70" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
