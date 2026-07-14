import { getSession } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { mockSubjects } from "@/lib/mockData";
import SubjectDetailClient from "@/components/SubjectDetailClient";

interface PageProps {
  params: Promise<{
    sem: string;
    subjectId: string;
  }>;
}

export default async function SubjectDetailPage({ params }: PageProps) {
  const { sem, subjectId } = await params;
  
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  // Find subject details in the BPUT registry
  const subject = mockSubjects.find(
    (s) => s.id === subjectId && s.semester === Number(sem)
  );

  if (!subject) {
    notFound();
  }

  return <SubjectDetailClient subject={subject} />;
}
