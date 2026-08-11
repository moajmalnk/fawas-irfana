import { createFileRoute } from "@tanstack/react-router";
import { WeddingInvite } from "@/components/wedding/WeddingInvite";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Muhammed Fawas Wafy weds Irfana Mahdiyya — 16 Aug 2026" },
      {
        name: "description",
        content:
          "Wedding invitation: Muhammed Fawas Wafy weds Irfana Mahdiyya on Sunday, 16 August 2026, 11:00 am to 02:00 pm at C.V. Auditorium, Athirumada.",
      },
      { property: "og:title", content: "Muhammed Fawas Wafy weds Irfana Mahdiyya" },
      {
        property: "og:description",
        content:
          "Cordially inviting your esteemed presence — 16 August 2026, C.V. Auditorium, Athirumada.",
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
