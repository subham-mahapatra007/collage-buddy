"use client";

import { useState } from "react";
import {
  Calendar,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  Percent,
} from "lucide-react";
import GlassCard from "@/components/GlassCard";
import { markAttendance } from "@/app/actions";

interface SubjectAttendance {
  id: string;
  name: string;
  code: string;
  attended: number;
  total: number;
}

export default function AttendanceClient() {
  const [subjects, setSubjects] = useState<SubjectAttendance[]>([
    { id: "ds", name: "Data Structures", code: "BCS-301", attended: 18, total: 24 },
    { id: "oops", name: "Object Oriented Programming", code: "BCS-302", attended: 15, total: 18 },
    { id: "math", name: "Discrete Mathematics", code: "BCS-303", attended: 12, total: 15 },
    { id: "digit", name: "Digital Logic Design", code: "BCS-304", attended: 9, total: 14 },
  ]);

  const [activeSubject, setActiveSubject] = useState("ds");
  const [logStatus, setLogStatus] = useState("PRESENT");
  const [targetPercentage, setTargetPercentage] = useState(75);

  // Safe Bunk Calculator Calculations
  const calculateBunkStats = (attended: number, total: number) => {
    const p = targetPercentage / 100;
    const currentPct = total > 0 ? (attended / total) * 100 : 0;

    if (currentPct >= targetPercentage) {
      // How many classes can be bunked?
      // (attended) / (total + B) >= p  =>  attended >= p * (total + B)  => B <= (attended - p * total) / p
      const maxBunks = Math.floor((attended - p * total) / p);
      return {
        pct: Math.round(currentPct),
        status: "safe",
        message: `You can safely bunk the next ${maxBunks} classes of this subject while maintaining over ${targetPercentage}% attendance.`,
        value: maxBunks,
      };
    } else {
      // How many consecutive classes need to be attended?
      // (attended + C) / (total + C) >= p => attended + C >= p * total + p * C => C * (1 - p) >= p * total - attended
      const reqClasses = Math.ceil((p * total - attended) / (1 - p));
      return {
        pct: Math.round(currentPct),
        status: "unsafe",
        message: `You need to attend the next ${reqClasses} classes consecutively to cross the ${targetPercentage}% threshold.`,
        value: reqClasses,
      };
    }
  };

  const handleLogAttendance = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate updating local client state first
    setSubjects(
      subjects.map((sub) => {
        if (sub.id === activeSubject) {
          const isPresent = logStatus === "PRESENT";
          return {
            ...sub,
            attended: sub.attended + (isPresent ? 1 : 0),
            total: sub.total + 1,
          };
        }
        return sub;
      })
    );

    // Run action in background
    try {
      const formData = {
        subjectId: activeSubject,
        date: new Date().toISOString().split("T")[0],
        status: logStatus,
      };
      await markAttendance(formData);
    } catch (err) {
      console.warn("Offline attendance logged.");
    }
  };

  // Aggregated Stats
  const totalAttended = subjects.reduce((sum, s) => sum + s.attended, 0);
  const totalClasses = subjects.reduce((sum, s) => sum + s.total, 0);
  const overallPercentage = totalClasses > 0 ? Math.round((totalAttended / totalClasses) * 100) : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Attendance Summary and Logs (2 cols) */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        {/* Statistics Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <GlassCard glowColor="rgba(59, 130, 246, 0.05)" hoverEffect={false}>
            <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">
              Overall Attendance
            </span>
            <p className={`text-3xl font-black mt-2 ${overallPercentage >= 75 ? "text-emerald-400" : "text-rose-400"}`}>
              {overallPercentage}%
            </p>
            <span className="text-[10px] text-zinc-500 block mt-1">
              BPUT Target: 75%
            </span>
          </GlassCard>

          <GlassCard glowColor="rgba(251, 191, 36, 0.03)" hoverEffect={false}>
            <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">
              Total Lectures Attended
            </span>
            <p className="text-3xl font-black text-white mt-2">
              {totalAttended}
            </p>
            <span className="text-[10px] text-zinc-500 block mt-1">
              Out of {totalClasses} classes registered
            </span>
          </GlassCard>

          <GlassCard glowColor="rgba(16, 185, 129, 0.03)" hoverEffect={false}>
            <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">
              Academic Status
            </span>
            <p className={`text-sm font-extrabold uppercase mt-4 py-1.5 px-3 rounded-xl border w-fit ${
              overallPercentage >= 75
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-rose-500/10 border-rose-500/20 text-rose-400"
            }`}>
              {overallPercentage >= 75 ? "Exam Eligible" : "Detained Risk"}
            </p>
          </GlassCard>
        </div>

        {/* Subjects list with individual details */}
        <GlassCard hoverEffect={false}>
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="h-5 w-5 text-blue-500 animate-pulse" />
            <h3 className="font-extrabold text-sm text-zinc-200 uppercase tracking-wide">
              Subject Wise Tracking
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            {subjects.map((sub) => {
              const pct = sub.total > 0 ? Math.round((sub.attended / sub.total) * 100) : 0;
              const isSafe = pct >= 75;

              return (
                <div
                  key={sub.id}
                  className="bg-zinc-900/40 border border-zinc-850 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div>
                    <span className="text-[10px] text-zinc-500 font-mono font-bold">
                      {sub.code}
                    </span>
                    <h4 className="text-xs font-bold text-zinc-200 mt-0.5">
                      {sub.name}
                    </h4>
                    <p className="text-[10px] text-zinc-500 mt-1 leading-none font-medium">
                      Attended: {sub.attended} | Total classes: {sub.total}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    {/* Progress slider mini */}
                    <div className="flex flex-col gap-1 items-end w-24">
                      <span className={`text-xs font-black ${isSafe ? "text-emerald-400" : "text-rose-400"}`}>
                        {pct}%
                      </span>
                      <div className="w-full bg-zinc-950 h-1.5 rounded-full overflow-hidden border border-zinc-900">
                        <div
                          className={`h-full rounded-full ${isSafe ? "bg-emerald-500" : "bg-rose-500"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>

      {/* Logger & Safe Bunk Calculator Sidebar (1 col) */}
      <div className="flex flex-col gap-6">
        {/* Log Attendance Form */}
        <GlassCard glowColor="rgba(59, 130, 246, 0.04)" hoverEffect={false}>
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-900">
            <Plus className="h-4.5 w-4.5 text-blue-500" />
            <h3 className="font-extrabold text-xs uppercase text-zinc-200 tracking-wider">
              Log Today's Lectures
            </h3>
          </div>

          <form onSubmit={handleLogAttendance} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">
                Select Subject
              </label>
              <select
                value={activeSubject}
                onChange={(e) => setActiveSubject(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-850 text-zinc-300 text-xs rounded-xl py-2.5 px-3 outline-none"
              >
                {subjects.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">
                Status
              </label>
              <select
                value={logStatus}
                onChange={(e) => setLogStatus(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-850 text-zinc-300 text-xs rounded-xl py-2.5 px-3 outline-none"
              >
                <option value="PRESENT">Present (Attended)</option>
                <option value="ABSENT">Absent (Bunked)</option>
                <option value="EXCUSED">Excused Leave</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-md shadow-blue-500/10 cursor-pointer"
            >
              Add Attendance Log
            </button>
          </form>
        </GlassCard>

        {/* Safe Bunk Calculator */}
        <GlassCard glowColor="rgba(251, 191, 36, 0.04)" hoverEffect={false}>
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-900">
            <Percent className="h-4.5 w-4.5 text-amber-500" />
            <h3 className="font-extrabold text-xs uppercase text-zinc-200 tracking-wider">
              BPUT Safe Bunk Calculator
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider flex justify-between">
                <span>Target Percentage</span>
                <span className="text-amber-500">{targetPercentage}%</span>
              </label>
              <input
                type="range"
                min="50"
                max="90"
                step="5"
                value={targetPercentage}
                onChange={(e) => setTargetPercentage(Number(e.target.value))}
                className="w-full h-1 bg-zinc-850 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            <div className="flex flex-col gap-3.5 mt-2">
              {subjects.map((sub) => {
                const calc = calculateBunkStats(sub.attended, sub.total);
                const isSafe = calc.status === "safe";

                return (
                  <div
                    key={sub.id}
                    className={`p-3 rounded-xl border text-xs leading-relaxed text-left ${
                      isSafe
                        ? "bg-emerald-500/5 border-emerald-500/15"
                        : "bg-rose-500/5 border-rose-500/15"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-zinc-200">{sub.name}</span>
                      <span className={`font-mono text-[10px] font-black ${isSafe ? "text-emerald-400" : "text-rose-400"}`}>
                        {calc.pct}%
                      </span>
                    </div>
                    <p className={`text-[10px] ${isSafe ? "text-emerald-400/90" : "text-rose-400/90"} font-medium`}>
                      {calc.message}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
