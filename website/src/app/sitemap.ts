import type { MetadataRoute } from "next";
import { legalNav, mainNav } from "@/lib/nav";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/request-a-ride", ...mainNav.map((item) => item.href), ...legalNav.map((item) => item.href)];
  return paths.map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    priority: path === "/" || path === "/request-a-ride" ? 1 : 0.6,
  }));
}
