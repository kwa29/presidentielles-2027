import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = getSiteUrl();
  const lastModified = new Date("2026-09-02");
  const pages = [
    "",
    "/jouer",
    "/comment-jouer",
    "/mesures",
    "/indicateurs",
    "/a-propos",
    "/mentions-legales",
  ];

  return pages.map((path) => ({
    url: `${url}${path}`,
    lastModified,
  }));
}
