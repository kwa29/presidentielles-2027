import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Président 2027",
    description: SITE_TAGLINE,
    start_url: "/jouer",
    display: "standalone",
    background_color: "#07111f",
    theme_color: "#07111f",
    lang: "fr",
  };
}
