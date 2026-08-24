import { createFileRoute } from "@tanstack/react-router";
import { WeddingInvite } from "@/components/wedding/WeddingInvite";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jumna weds Irshad — 26 Aug 2026" },
      {
        name: "description",
        content:
          "Wedding invitation: Jumna weds Irshad on Wednesday, 26 August 2026, 11:00 AM at Akbar Plaza Auditorium, Kodinhi, Farooq Nagar.",
      },
      { property: "og:title", content: "Jumna weds Irshad" },
      {
        property: "og:description",
        content:
          "Cordially inviting your presence — 26 August 2026, Akbar Plaza Auditorium, Kodinhi.",
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
