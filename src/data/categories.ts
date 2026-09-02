// src/data/categories.ts
//
// Category list for Cosmos Mobile Spares' product range, used by the
// Shop-by-Category section on the Home page. Slugs match the ?category=
// query param the Shop page will filter on, and match the slugs already
// used in the navbar's Categories dropdown.

import type { LucideIcon } from "lucide-react";
import {
  Smartphone,
  Fingerprint,
  BatteryCharging,
  Camera,
  Volume2,
  CreditCard,
  Wrench,
  Cable,
  Droplet,
  Layers,
} from "lucide-react";

export interface Category {
  title: string;
  slug: string;
  icon: LucideIcon;
}

export const categories: Category[] = [
  { title: "Screens", slug: "screens", icon: Smartphone },
  { title: "Touch Pads", slug: "touch-pads", icon: Fingerprint },
  { title: "Charging Ports", slug: "charging-ports", icon: BatteryCharging },
  { title: "Camera Glass", slug: "camera-glass", icon: Camera },
  { title: "Speakers & Earpieces", slug: "speakers", icon: Volume2 },
  { title: "SIM Trays", slug: "sim-trays", icon: CreditCard },
  { title: "Soldering Tools", slug: "soldering-tools", icon: Wrench },
  { title: "Power Flexes", slug: "power-flexes", icon: Cable },
  { title: "Screen Gum / Paste", slug: "screen-gum", icon: Droplet },
  { title: "iPhone Back Glass", slug: "back-glass", icon: Layers },
];
