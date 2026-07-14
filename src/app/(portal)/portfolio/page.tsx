import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import PortfolioClient from "@/components/PortfolioClient";

export default async function PortfolioPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  return <PortfolioClient />;
}
