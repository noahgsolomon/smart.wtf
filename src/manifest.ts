import { type MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "smart wtf",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#020a1c",
    theme_color: "#020a1c",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
