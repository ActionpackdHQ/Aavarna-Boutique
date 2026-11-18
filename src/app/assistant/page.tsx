import type { Metadata } from "next";
import AssistantChat from "@/components/AssistantChat";

export const metadata: Metadata = {
  title: "Ask our assistant — Aavarna Boutique",
  description:
    "Ask Aavarna Boutique's assistant about custom stitching, bridal blouses, Aari, prices and studio visits in Chennai.",
};

export default function AssistantPage() {
  return <AssistantChat />;
}
