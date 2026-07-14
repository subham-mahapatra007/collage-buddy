import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AttendanceClient from "@/components/AttendanceClient";

export default async function AttendancePage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  return <AttendanceClient />;
}
