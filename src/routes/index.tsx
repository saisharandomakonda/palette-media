import { createFileRoute } from "@tanstack/react-router";
import { GlassPage } from "@/components/glass/glass-page";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <GlassPage />;
}
