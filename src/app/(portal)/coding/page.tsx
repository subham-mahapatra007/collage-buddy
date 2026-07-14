import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import CodingHubClient from "@/components/CodingHubClient";

export default async function CodingPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  return <CodingHubClient />;
}
