import { WeddingInvite } from "@/components/wedding/WeddingInvite";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ashmal K weds Fathima Shifa — 16 Sep 2026" },
      {
        name: "description",
        content:
          "Wedding invitation: Ashmal K weds Fathima Shifa on Wednesday, 16 September 2026, 11:00 AM at Kurathithodika Juma Masjid.",
      },
      { property: "og:title", content: "Ashmal K weds Fathima Shifa" },
      {
        property: "og:description",
        content:
          "Cordially inviting your esteemed presence — 16 September 2026, Kurathithodika Juma Masjid.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://ashmal-shifa.vercel.app/apple-touch-icon.png" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:image", content: "https://ashmal-shifa.vercel.app/apple-touch-icon.png" },
    ],
  }),
  component: Index,
});

function Index() {
  return <WeddingInvite />;
}
