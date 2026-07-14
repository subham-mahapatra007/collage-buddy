import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProjectClient from "@/components/ProjectClient";

export default async function ProjectsPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  return <ProjectClient />;
}
