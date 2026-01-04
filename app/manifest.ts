import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "WeMoveX - Vehicle Transport Australia",
    short_name: "WeMoveX",
    description:
      "Get instant quotes for vehicle transport across Australia. Cars, motorcycles, caravans, heavy machinery - fully insured, door-to-door delivery.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#d63c83",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

