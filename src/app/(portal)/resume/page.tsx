import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import ResumeBuilderClient from "@/components/ResumeBuilderClient";

export default async function ResumePage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  return <ResumeBuilderClient />;
}
