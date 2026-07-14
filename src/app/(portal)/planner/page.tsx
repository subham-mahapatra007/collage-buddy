import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import PlannerClient from "@/components/PlannerClient";

export default async function PlannerPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  return <PlannerClient />;
}
