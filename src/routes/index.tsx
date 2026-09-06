import { createFileRoute } from "@tanstack/react-router";
import { WeddingInvite } from "@/components/wedding/WeddingInvite";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ashmal K weds Fathima Shifa — 16 Sep 2026" },
      {
        name: "description",
        content:
          "Wedding invitation: Ashmal K weds Fathima Shifa on Wednesday, 16 September 2026, 11:00 AM at Kurathithodika Juma Maajid.",
      },
      { property: "og:title", content: "Ashmal K weds Fathima Shifa" },
      {
        property: "og:description",
        content:
          "Cordially inviting your esteemed presence — 16 September 2026, Kurathithodika Juma Maajid.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <WeddingInvite />;
}
