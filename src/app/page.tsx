import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import LandingPageClient from "@/components/LandingPageClient";

export default async function Page() {
  const session = await getSession();

  // If already authenticated, redirect to students dashboard
  if (session) {
    redirect("/dashboard");
  }

  return <LandingPageClient />;
}
