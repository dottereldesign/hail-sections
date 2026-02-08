import type { NavbarPlaceholderProps } from "./types";

export const navbarPlaceholderDefault: NavbarPlaceholderProps = {
  brand: "Northwind",
  links: [
    { label: "Product", href: "#" },
    { label: "Solutions", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Company", href: "#" }
  ],
  ctaLabel: "Get Started",
  ctaHref: "#"
};
