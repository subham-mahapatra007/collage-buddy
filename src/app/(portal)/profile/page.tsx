import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import GlassCard from "@/components/GlassCard";
import { User, Trophy, Flame, Sparkles, Shield, Bookmark, Award } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  // Parse badges from session
  let badges: string[] = ["first_login"];
  try {
    if (session.xp > 100) {
      badges.push("level_2");
    }
    if (session.studyStreak >= 3) {
      badges.push("streak_master");
    }
  } catch (e) {
    // default
  }

  const getBadgeDetails = (badgeId: string) => {
    switch (badgeId) {
      case "first_login":
        return { name: "First Login", desc: "Registered on College Buddy", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" };
      case "level_2":
        return { name: "Level 2 Scholar", desc: "Crossed 100 XP threshold", color: "text-amber-500 bg-amber-500/10 border-amber-500/20" };
      case "streak_master":
        return { name: "Streak Master", desc: "Maintained active study streak", color: "text-rose-400 bg-rose-500/10 border-rose-500/20" };
      default:
        return { name: "Explorer", desc: "Academic browser", color: "text-zinc-400 bg-zinc-500/10 border-zinc-500/20" };
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Profile Details Card (2 cols) */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        <GlassCard glowColor="rgba(59, 130, 246, 0.05)" hoverEffect={false}>
          <div className="flex items-center gap-4 pb-4 border-b border-zinc-900 mb-6">
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-3 rounded-2xl text-white">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">{session.name}</h2>
              <p className="text-[10px] text-zinc-550 font-bold uppercase tracking-wider">
                BPUT CSE Student Portfolio
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-left">
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] text-zinc-550 font-bold uppercase tracking-wider">College</span>
              <span className="font-bold text-zinc-300">{session.college}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] text-zinc-550 font-bold uppercase tracking-wider">Branch</span>
              <span className="font-bold text-zinc-300">{session.branch}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] text-zinc-550 font-bold uppercase tracking-wider">Email</span>
              <span className="font-bold text-zinc-300">{session.email}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] text-zinc-550 font-bold uppercase tracking-wider">Semester Status</span>
              <span className="font-bold text-zinc-300">Semester {session.semester} CSE</span>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="mt-8 pt-6 border-t border-zinc-900 flex gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white font-bold transition-colors"
            >
              <GithubIcon className="h-4.5 w-4.5" /> github.com/student
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white font-bold transition-colors"
            >
              <LinkedinIcon className="h-4.5 w-4.5" /> linkedin.com/student
            </a>
          </div>
        </GlassCard>

        {/* User Badges */}
        <GlassCard hoverEffect={false}>
          <div className="flex items-center gap-2 mb-6">
            <Award className="h-5 w-5 text-amber-500 animate-pulse" />
            <h3 className="font-extrabold text-sm text-zinc-200 uppercase tracking-wide">
              Badges & Achievements
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {badges.map((bId) => {
              const details = getBadgeDetails(bId);
              return (
                <div
                  key={bId}
                  className={`p-4 rounded-2xl border text-center flex flex-col items-center gap-2 ${details.color}`}
                >
                  <Trophy className="h-6 w-6" />
                  <div>
                    <h4 className="font-extrabold text-xs text-zinc-200 mt-1">{details.name}</h4>
                    <p className="text-[9px] text-zinc-500 font-medium leading-tight mt-1">
                      {details.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>

      {/* Gamification Level stats (1 col) */}
      <div className="flex flex-col gap-6">
        <GlassCard glowColor="rgba(59, 130, 246, 0.05)" hoverEffect={false}>
          <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-zinc-900">
            <Trophy className="h-5 w-5 text-amber-500 animate-pulse" />
            <h3 className="font-extrabold text-xs uppercase text-zinc-200 tracking-wider">
              Gamified Stats
            </h3>
          </div>

          <div className="flex flex-col gap-5 text-left">
            <div className="flex justify-between items-center bg-zinc-900/40 p-3 rounded-2xl border border-zinc-850">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4.5 w-4.5 text-blue-400" />
                <span className="text-xs font-semibold text-zinc-400">Current Level</span>
              </div>
              <span className="font-black text-sm text-white">Level {session.level}</span>
            </div>

            <div className="flex justify-between items-center bg-zinc-900/40 p-3 rounded-2xl border border-zinc-850">
              <div className="flex items-center gap-2">
                <Flame className="h-4.5 w-4.5 text-rose-500" />
                <span className="text-xs font-semibold text-zinc-400">Streak Record</span>
              </div>
              <span className="font-black text-sm text-white">🔥 {session.studyStreak} Days</span>
            </div>

            <div className="flex justify-between items-center bg-zinc-900/40 p-3 rounded-2xl border border-zinc-850">
              <div className="flex items-center gap-2">
                <Shield className="h-4.5 w-4.5 text-amber-500" />
                <span className="text-xs font-semibold text-zinc-400">Total Experience Points</span>
              </div>
              <span className="font-black text-sm text-amber-500">{session.xp} XP</span>
            </div>

            <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden mt-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full"
                style={{ width: `${(session.xp % 100)}%` }}
              />
            </div>
            <span className="text-[9px] text-zinc-500 font-semibold block text-center uppercase tracking-wide">
              {100 - (session.xp % 100)} XP remaining until next level up
            </span>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
