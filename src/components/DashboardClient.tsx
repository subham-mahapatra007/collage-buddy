"use client";

import { useState } from "react";
import {
  Sparkles,
  Flame,
  CheckCircle2,
  Circle,
  Plus,
  Compass,
  ArrowRight,
  TrendingUp,
  Brain,
  Code,
  Trophy,
  Loader,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import GlassCard from "@/components/GlassCard";
import { askAI } from "@/lib/ai";
import { addStudyGoal, toggleStudyGoal } from "@/app/actions";

interface Goal {
  id: string;
  title: string;
  completed: boolean;
}

interface DashboardClientProps {
  user: {
    id: string;
    name: string;
    email: string;
    semester: number;
    college: string;
    branch: string;
    xp: number;
    level: number;
    studyStreak: number;
  };
  initialGoals: Goal[];
}

export default function DashboardClient({ user, initialGoals }: DashboardClientProps) {
  // Goal tracking
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [addingGoal, setAddingGoal] = useState(false);

  // AI Assistant Widget
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Attendance quick check (Mock stats for display)
  const totalClasses = 32;
  const attendedClasses = 25;
  const attendancePercentage = Math.round((attendedClasses / totalClasses) * 100);

  // Daily Challenge
  const dailyChallenge = {
    title: "Reverse a Singly Linked List",
    difficulty: "Medium",
    lang: "C / C++",
    xpReward: 30,
  };

  const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;

    setAddingGoal(true);
    // Simulate DB update locally if DB call fails
    const newGoal: Goal = {
      id: "temp-id-" + Math.floor(Math.random() * 1000),
      title: newGoalTitle,
      completed: false,
    };
    setGoals([...goals, newGoal]);
    setNewGoalTitle("");
    setAddingGoal(false);

    // Call server action in background
    try {
      const formData = {
        title: newGoalTitle,
        description: "Dashboard goal",
        targetDate: new Date().toISOString(),
      };
      await addStudyGoal(formData);
    } catch (err) {
      console.warn("Offline goal add completed.");
    }
  };

  const handleToggleGoal = async (id: string, currentStatus: boolean) => {
    setGoals(
      goals.map((g) => (g.id === id ? { ...g, completed: !currentStatus } : g))
    );
    try {
      await toggleStudyGoal(id, !currentStatus);
    } catch (err) {
      console.warn("Offline goal toggle completed.");
    }
  };

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    setAiLoading(true);
    setAiResponse(null);
    const res = await askAI(aiQuery, "You are a friendly BPUT CSE Tutor.");
    setAiLoading(false);
    if (res.success) {
      setAiResponse(res.content);
    } else {
      setAiResponse("Sorry, I could not generate an answer right now. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl p-8 bg-gradient-to-r from-blue-600/30 via-indigo-600/10 to-transparent border border-blue-500/15 overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            Welcome back, {user.name}! <span className="animate-bounce">👋</span>
          </h2>
          <p className="text-zinc-405 text-xs font-semibold uppercase tracking-wider">
            {user.college || "BPUT Engineering College"} &bull; Semester {user.semester}
          </p>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-lg leading-relaxed">
            Ready to ace your subjects? You have 🔥 {user.studyStreak} day streak. Let's finish today's challenges!
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-amber-500 to-orange-500 rounded-2xl p-4 text-white text-center shadow-lg shadow-amber-500/10 border border-amber-400/20">
            <span className="text-[10px] uppercase font-bold tracking-widest block opacity-70">
              Study Level
            </span>
            <span className="text-2xl font-black block leading-none mt-1">
              Lvl {user.level}
            </span>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Stat summaries (Attendance, Daily Challenge) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Attendance quick view */}
            <GlassCard glowColor="rgba(16, 185, 129, 0.05)">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xs uppercase font-extrabold tracking-wider text-zinc-400">
                    Average Attendance
                  </h3>
                  <p className="text-3xl font-black text-white mt-2">
                    {attendancePercentage}%
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    {attendedClasses} / {totalClasses} classes attended
                  </p>
                </div>
                <div
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase ${
                    attendancePercentage >= 75
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                      : "bg-rose-500/15 text-rose-400 border border-rose-500/20"
                  }`}
                >
                  {attendancePercentage >= 75 ? "Safe" : "Bunk Warning!"}
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden mt-4">
                <div
                  className={`h-full rounded-full transition-all ${
                    attendancePercentage >= 75
                      ? "bg-emerald-500"
                      : "bg-rose-500"
                  }`}
                  style={{ width: `${attendancePercentage}%` }}
                />
              </div>

              {/* Attendance action footer */}
              <div className="mt-5 pt-4 border-t border-zinc-900 flex justify-between items-center">
                <span className="text-[10px] text-zinc-500 font-medium">BPUT 75% rule active</span>
                <Link
                  href="/attendance"
                  className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                >
                  Bunk Calculator <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </GlassCard>

            {/* Daily Challenge Card */}
            <GlassCard glowColor="rgba(99, 102, 241, 0.05)">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Code className="h-4 w-4 text-indigo-400 animate-pulse" />
                    <h3 className="text-xs uppercase font-extrabold tracking-wider text-zinc-400">
                      Daily Coding Challenge
                    </h3>
                  </div>
                  <h4 className="text-sm font-bold text-zinc-200 mt-3.5 leading-snug">
                    {dailyChallenge.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] bg-zinc-900 text-zinc-400 border border-zinc-800 px-2 py-0.5 rounded font-mono">
                      {dailyChallenge.lang}
                    </span>
                    <span className="text-[9px] bg-indigo-500/15 text-indigo-400 px-2 py-0.5 rounded font-bold">
                      +{dailyChallenge.xpReward} XP
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-zinc-900 flex justify-between items-center">
                <span className="text-[10px] text-zinc-500 font-medium">Difficulty: {dailyChallenge.difficulty}</span>
                <Link
                  href="/coding"
                  className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  Solve Challenge <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </GlassCard>
          </div>

          {/* AI Doubt solver container */}
          <GlassCard glowColor="rgba(59, 130, 246, 0.05)" hoverEffect={false}>
            <div className="flex items-center gap-2 mb-4">
              <Brain className="h-5 w-5 text-blue-500" />
              <div>
                <h3 className="font-extrabold text-sm text-zinc-200">AI Subject Companion</h3>
                <p className="text-[10px] text-zinc-500">Ask any BPUT CSE doubts (e.g. "What is B-Tree?")</p>
              </div>
            </div>

            <form onSubmit={handleAskAI} className="flex gap-2">
              <input
                type="text"
                placeholder="Ask about pointers, AVL trees, CPU Scheduling..."
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                className="flex-1 bg-zinc-900/60 border border-zinc-850 text-zinc-200 placeholder-zinc-600 rounded-xl py-2.5 px-4 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
              />
              <button
                type="submit"
                disabled={aiLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2 text-xs font-bold transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                {aiLoading ? <Loader className="h-4 w-4 animate-spin" /> : "Ask AI"}
              </button>
            </form>

            {aiResponse && (
              <div className="mt-5 bg-zinc-900/60 border border-zinc-850/80 rounded-xl p-4 max-h-64 overflow-y-auto text-xs leading-relaxed text-zinc-300 font-medium text-left">
                <div className="prose prose-invert prose-xs">
                  {aiResponse.split("\n").map((line, idx) => {
                    if (line.startsWith("###")) {
                      return <h4 key={idx} className="font-extrabold text-white mt-3 mb-1 text-sm">{line.replace("###", "").trim()}</h4>;
                    }
                    if (line.startsWith("**")) {
                      return <p key={idx} className="font-bold text-zinc-200 mt-2">{line.replace(/\*\*/g, "")}</p>;
                    }
                    return <p key={idx} className="mt-1">{line}</p>;
                  })}
                </div>
              </div>
            )}
          </GlassCard>
        </div>

        {/* Right Column: Today's Goals checklist */}
        <div className="flex flex-col gap-6">
          <GlassCard glowColor="rgba(251, 191, 36, 0.03)" hoverEffect={false}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-extrabold text-sm text-zinc-200">Today's Study Goals</h3>
              <span className="text-[10px] bg-zinc-900 text-zinc-500 border border-zinc-850 px-2 py-0.5 rounded font-bold">
                {goals.filter((g) => g.completed).length} / {goals.length} Done
              </span>
            </div>

            {/* Goals List */}
            <div className="flex flex-col gap-2 max-h-56 overflow-y-auto mb-4 pr-1">
              {goals.length === 0 ? (
                <div className="text-center py-6 text-zinc-650 text-xs font-medium">
                  No study goals set for today.
                </div>
              ) : (
                goals.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => handleToggleGoal(g.id, g.completed)}
                    className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-850/60 hover:border-zinc-850 transition-all text-left group"
                  >
                    {g.completed ? (
                      <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 flex-shrink-0" />
                    ) : (
                      <Circle className="h-4.5 w-4.5 text-zinc-600 group-hover:text-blue-500 flex-shrink-0" />
                    )}
                    <span
                      className={`text-xs font-semibold ${
                        g.completed
                          ? "line-through text-zinc-600"
                          : "text-zinc-300"
                      }`}
                    >
                      {g.title}
                    </span>
                  </button>
                ))
              )}
            </div>

            {/* Add Goal Form */}
            <form onSubmit={handleAddGoal} className="flex gap-2">
              <input
                type="text"
                placeholder="Add new study goal..."
                value={newGoalTitle}
                onChange={(e) => setNewGoalTitle(e.target.value)}
                className="flex-1 bg-zinc-900/60 border border-zinc-850 text-zinc-200 placeholder-zinc-600 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={addingGoal}
                className="bg-zinc-850 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-xl p-2.5 transition-all"
              >
                <Plus className="h-4 w-4" />
              </button>
            </form>
          </GlassCard>

          {/* Placement Alert Teaser */}
          <GlassCard glowColor="rgba(244, 63, 94, 0.02)">
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-zinc-400 mb-3">
              Placement Preparation
            </h3>
            <p className="text-zinc-300 text-xs font-semibold leading-relaxed">
              Ace Quantitative Aptitude, Technical Coding, and HR Interviews.
            </p>
            <Link
              href="/placement"
              className="mt-4 flex items-center gap-1.5 text-xs font-bold text-amber-500 hover:text-amber-400 group"
            >
              Browse Placement Hub <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
