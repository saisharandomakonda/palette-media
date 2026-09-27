import { createFileRoute } from "@tanstack/react-router";
import { RameesPage } from "@/components/ramees/ramees-page";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <RameesPage />;
}
