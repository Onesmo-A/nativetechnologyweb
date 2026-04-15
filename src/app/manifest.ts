import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Native Technology",
    short_name: "Native Tech",
    description:
      "Web & mobile development, design, business systems, maintenance & support, and IT consulting.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#02666D",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}

