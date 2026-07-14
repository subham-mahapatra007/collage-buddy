import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import PlacementClient from "@/components/PlacementClient";

export default async function PlacementPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  return <PlacementClient />;
}
