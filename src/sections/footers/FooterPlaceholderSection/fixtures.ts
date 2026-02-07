import type { FooterPlaceholderProps } from "./types";

export const footerPlaceholderDefault: FooterPlaceholderProps = {
  orgName: "Northwind Studio",
  columns: [
    {
      heading: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Careers", href: "#" },
        { label: "News", href: "#" }
      ]
    },
    {
      heading: "Resources",
      links: [
        { label: "Docs", href: "#" },
        { label: "Guides", href: "#" },
        { label: "Support", href: "#" }
      ]
    },
    {
      heading: "Legal",
      links: [
        { label: "Terms", href: "#" },
        { label: "Privacy", href: "#" },
        { label: "Cookies", href: "#" }
      ]
    }
  ],
  legalText: "All rights reserved."
};
