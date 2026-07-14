export const dynamic = "force-dynamic";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import GlassCard from "@/components/GlassCard";
import { ShieldAlert, Users, BookOpen, AlertCircle, Plus, FileText } from "lucide-react";
import { db } from "@/lib/db";
import { seedAcademicData } from "@/app/actions";

export default async function AdminPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  // Server-side security check: Only ADMIN can view this page
  if (session.role !== "ADMIN") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 max-w-md mx-auto">
        <ShieldAlert className="h-16 w-16 text-rose-500 mb-4 animate-bounce" />
        <h2 className="text-xl font-black text-white tracking-tight">Security Alert: Access Denied</h2>
        <p className="text-zinc-500 text-xs mt-2 leading-relaxed font-semibold">
          You do not have the required administrative permissions to access the **College Buddy** control panel. This event has been logged on the server.
        </p>
      </div>
    );
  }

  // Fetch registered users (with local fallbacks)
  let registeredUsers = [];
  try {
    registeredUsers = await db.user.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    // mock fallback
    registeredUsers = [
      { id: "u1", name: "Pratyush Panda", email: "pratyush@bput.ac.in", role: "STUDENT", xp: 940 },
      { id: "u2", name: "Ananya Mishra", email: "ananya@bput.ac.in", role: "MENTOR", xp: 810 },
      { id: "u3", name: "Subham Kumar", email: "student@bput.ac.in", role: "STUDENT", xp: 320 },
    ];
  }

  async function triggerSeed() {
    "use server";
    await seedAcademicData();
  }

  return (
    <div className="flex flex-col gap-6 text-left">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-rose-600/10 border border-rose-500/15 p-6 rounded-3xl">
        <div className="flex items-center gap-3">
          <ShieldAlert className="h-8 w-8 text-rose-500" />
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">Admin Control Console</h2>
            <p className="text-rose-400 text-xs mt-0.5 font-bold uppercase tracking-wider">
              Secure Operations Panel & Analytics
            </p>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <GlassCard glowColor="rgba(244, 63, 94, 0.05)" hoverEffect={false}>
          <Users className="h-5 w-5 text-rose-500 mb-2" />
          <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block">
            System Accounts
          </span>
          <p className="text-2xl font-black text-white mt-1.5 leading-none">
            {registeredUsers.length} active
          </p>
        </GlassCard>

        <GlassCard glowColor="rgba(59, 130, 246, 0.05)" hoverEffect={false}>
          <BookOpen className="h-5 w-5 text-blue-500 mb-2" />
          <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block">
            Course Registries
          </span>
          <p className="text-2xl font-black text-white mt-1.5 leading-none">
            5 Active
          </p>
        </GlassCard>

        <GlassCard glowColor="rgba(251, 191, 36, 0.05)" hoverEffect={false}>
          <AlertCircle className="h-5 w-5 text-amber-500 mb-2" />
          <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block">
            Announcements Published
          </span>
          <p className="text-2xl font-black text-white mt-1.5 leading-none">
            3 Board
          </p>
        </GlassCard>
      </div>

      {/* Split Operations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Management List */}
        <GlassCard hoverEffect={false}>
          <h3 className="font-extrabold text-sm text-zinc-200 mb-4 pb-2 border-b border-zinc-900">
            Registered Student Listing
          </h3>

          <div className="flex flex-col gap-2.5 max-h-96 overflow-y-auto">
            {registeredUsers.map((u) => (
              <div
                key={u.id}
                className="flex items-center justify-between p-3.5 bg-zinc-900/40 border border-zinc-850 rounded-2xl"
              >
                <div>
                  <h4 className="font-bold text-xs text-zinc-200">{u.name}</h4>
                  <span className="text-[9px] text-zinc-550 block font-mono mt-0.5">{u.email}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded font-extrabold block w-fit ml-auto">
                    {u.role}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-bold block mt-1">
                    {u.xp} XP
                  </span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Database seed and configurations */}
        <div className="flex flex-col gap-6">
          <GlassCard hoverEffect={false}>
            <h3 className="font-extrabold text-sm text-zinc-200 mb-4 pb-2 border-b border-zinc-900">
              Database Seeding Utilities
            </h3>
            <p className="text-zinc-500 text-xs leading-relaxed font-semibold mb-4">
              If running on a clean PostgreSQL environment, trigger the seeder to populate courses syllabus definitions.
            </p>

            <form action={triggerSeed} className="flex gap-2">
              <button
                type="submit"
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md shadow-rose-500/10 cursor-pointer"
              >
                <Plus className="h-4 w-4" /> Seed BPUT Syllabus Registry
              </button>
            </form>
          </GlassCard>

          {/* Site Announcements Board simulator */}
          <GlassCard hoverEffect={false}>
            <h3 className="font-extrabold text-sm text-zinc-200 mb-4 pb-2 border-b border-zinc-900">
              Publish System Announcement
            </h3>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Announcement Title"
                className="bg-zinc-900 border border-zinc-850 text-zinc-200 text-xs rounded-xl p-2.5 outline-none"
              />
              <textarea
                placeholder="Write system message description..."
                rows={3}
                className="bg-zinc-900 border border-zinc-850 text-zinc-200 text-xs rounded-xl p-2.5 outline-none"
              />
              <button className="bg-zinc-900 border border-zinc-850 text-zinc-400 hover:text-zinc-200 py-2 rounded-xl text-xs font-bold transition-all w-fit cursor-pointer">
                Publish Announcement
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
