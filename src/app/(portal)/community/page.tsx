import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import CommunityClient from "@/components/CommunityClient";

export default async function CommunityPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  return <CommunityClient />;
}
