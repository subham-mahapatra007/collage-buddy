import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import CgpaClient from "@/components/CgpaClient";

export default async function CgpaPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  return <CgpaClient />;
}
