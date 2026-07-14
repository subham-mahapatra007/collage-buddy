import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import GlassCard from "@/components/GlassCard";
import { BookOpen, FolderSync, CalendarRange, GraduationCap, ChevronRight } from "lucide-react";
import { mockSubjects } from "@/lib/mockData";

export default async function SemestersPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  // Group our subjects by semester for clean grid counts
  const semNumbers = [1, 2, 3, 4, 5, 6, 7, 8];

  const getSubjectCount = (sem: number) => {
    // If we have subjects in mock data for this sem, return count, otherwise simulated 5 subjects
    const count = mockSubjects.filter((s) => s.semester === sem).length;
    return count > 0 ? count : 4;
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
          BPUT CSE Semester Modules
        </h2>
        <p className="text-zinc-500 text-xs sm:text-sm font-semibold uppercase tracking-wider mt-1">
          Select a semester to access Notes, PYQs, Lab Manuals, and AI Explanations
        </p>
      </div>

      {/* Student's Current Semester Reminder */}
      <div className="bg-blue-600/10 border border-blue-500/15 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <GraduationCap className="h-8 w-8 text-blue-400" />
          <div>
            <h3 className="font-bold text-sm text-zinc-200">Current Semester Highlight</h3>
            <p className="text-xs text-zinc-400">
              You are currently registered in **Semester {session.semester}** for computer science & engineering.
            </p>
          </div>
        </div>
        <Link
          href={`#sem-${session.semester}`}
          className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl transition-all shadow-md shadow-blue-500/10 select-none"
        >
          Jump to Sem {session.semester}
        </Link>
      </div>

      {/* Semester Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {semNumbers.map((sem) => {
          const subjects = mockSubjects.filter((s) => s.semester === sem);
          const isCurrentSem = session.semester === sem;

          return (
            <div id={`sem-${sem}`} key={sem}>
              <GlassCard
                glowColor={isCurrentSem ? "rgba(59, 130, 246, 0.08)" : "rgba(255, 255, 255, 0.01)"}
                className={isCurrentSem ? "border-blue-500/30 bg-blue-950/10" : ""}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] text-blue-400 uppercase font-bold tracking-widest block">
                      BPUT Syllabus
                    </span>
                    <h3 className="text-base font-black text-white mt-1.5 leading-none">
                      Semester {sem}
                    </h3>
                  </div>
                  {isCurrentSem && (
                    <span className="text-[8px] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded font-extrabold uppercase select-none">
                      Current
                    </span>
                  )}
                </div>

                <p className="text-zinc-400 text-xs mt-4">
                  Access notes, code templates, viva questions, and AI doubt solvers.
                </p>

                {/* Sublist of subjects for semesters we have mock data for */}
                <div className="mt-5 pt-4 border-t border-zinc-900 flex flex-col gap-2.5">
                  {subjects.length > 0 ? (
                    subjects.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/semester/${sem}/${sub.id}`}
                        className="flex items-center justify-between text-xs font-semibold text-zinc-300 hover:text-blue-400 transition-colors"
                      >
                        <span className="truncate max-w-[150px]">{sub.name}</span>
                        <ChevronRight className="h-3.5 w-3.5 text-zinc-650 flex-shrink-0" />
                      </Link>
                    ))
                  ) : (
                    // Default subjects list placeholder for other semesters
                    <>
                      <div className="flex justify-between text-xs text-zinc-500 font-semibold italic">
                        <span>Digital Logic</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex justify-between text-xs text-zinc-500 font-semibold italic">
                        <span>Mathematics-III</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </div>
                    </>
                  )}
                </div>
              </GlassCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}
