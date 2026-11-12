import type { MetadataRoute } from "next";
import { guides } from "@/lib/guides";
import { legalNav, mainNav } from "@/lib/nav";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const corePaths = ["/", "/request-a-ride", ...mainNav.map((item) => item.href), ...legalNav.map((item) => item.href)];
  const guidePaths = ["/guides", ...guides.map((guide) => `/guides/${guide.slug}`)];
  return [
    ...corePaths.map((path) => ({
      url: `${site.url}${path === "/" ? "" : path}`,
      priority: path === "/" || path === "/request-a-ride" ? 1 : 0.6,
    })),
    ...guidePaths.map((path) => ({ url: `${site.url}${path}`, priority: 0.5 })),
  ];
}
