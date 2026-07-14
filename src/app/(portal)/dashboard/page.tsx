import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import DashboardClient from "@/components/DashboardClient";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  // Fetch initial goals from DB with a graceful fallback for local testing
  let goals = [];
  try {
    goals = await db.studyGoal.findMany({
      where: { userId: session.id },
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    console.warn("Prisma dashboard query error, falling back to mock goals.");
    // Fallback Mock Goals
    goals = [
      { id: "g1", title: "Complete Chapter 2 Linked Lists Notes", completed: false },
      { id: "g2", title: "Review BPUT 2024 DAA PYQ Questions", completed: true },
      { id: "g3", title: "Attempt Daily Compiler Coding Challenge", completed: false },
    ];
  }

  return <DashboardClient user={session} initialGoals={goals} />;
}
