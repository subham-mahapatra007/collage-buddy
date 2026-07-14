import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import GroupsClient from "@/components/GroupsClient";

export default async function GroupsPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  return <GroupsClient />;
}
