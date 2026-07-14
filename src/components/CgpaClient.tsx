"use client";

import { useState } from "react";
import { Percent, Sparkles, TrendingUp, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";
import GlassCard from "@/components/GlassCard";

interface SgpaRow {
  subjectName: string;
  credits: number;
  gradeValue: number; // e.g. O=10, E=9, A=8, B=7, C=6, D=5, F=2
}

export default function CgpaClient() {
  // SGPA calculator rows
  const [sgpaRows, setSgpaRows] = useState<SgpaRow[]>([
    { subjectName: "Data Structures", credits: 4, gradeValue: 10 },
    { subjectName: "Object Oriented Programming", credits: 3, gradeValue: 9 },
    { subjectName: "Discrete Mathematics", credits: 4, gradeValue: 8 },
    { subjectName: "Digital Logic Design", credits: 3, gradeValue: 7 },
    { subjectName: "Data Structures Lab", credits: 2, gradeValue: 10 },
  ]);

  // Target CGPA calculator fields
  const [currentCgpa, setCurrentCgpa] = useState(8.2);
  const [completedSemesters, setCompletedSemesters] = useState(2);
  const [targetCgpa, setTargetCgpa] = useState(8.5);

  const gradeOptions = [
    { label: "O (Outstanding) - 10", value: 10 },
    { label: "E (Excellent) - 9", value: 9 },
    { label: "A (Very Good) - 8", value: 8 },
    { label: "B (Good) - 7", value: 7 },
    { label: "C (Fair) - 6", value: 6 },
    { label: "D (Pass) - 5", value: 5 },
    { label: "F (Fail) - 2", value: 2 },
  ];

  // SGPA Calculation
  const handleGradeChange = (idx: number, val: number) => {
    setSgpaRows(sgpaRows.map((r, i) => (i === idx ? { ...r, gradeValue: val } : r)));
  };

  const handleCreditsChange = (idx: number, val: number) => {
    setSgpaRows(sgpaRows.map((r, i) => (i === idx ? { ...r, credits: val } : r)));
  };

  const calculateSgpa = () => {
    const totalCredits = sgpaRows.reduce((sum, r) => sum + r.credits, 0);
    const weightedPoints = sgpaRows.reduce((sum, r) => sum + r.credits * r.gradeValue, 0);
    return totalCredits > 0 ? (weightedPoints / totalCredits).toFixed(2) : "0.00";
  };

  // Target CGPA Projection
  const calculateRequiredSgpa = () => {
    const remainingSemesters = 8 - completedSemesters;
    if (remainingSemesters <= 0) return { error: "You have completed all semesters." };

    // Math: TargetCGPA * 8 = CurrentCGPA * completedSems + ReqSGPA * remainingSems
    // ReqSGPA = (TargetCGPA * 8 - CurrentCGPA * completedSems) / remainingSems
    const totalSemesters = 8;
    const requiredSgpa = (targetCgpa * totalSemesters - currentCgpa * completedSemesters) / remainingSemesters;

    if (requiredSgpa > 10.0) {
      return {
        error: "Goal Unreachable",
        message: `It is mathematically impossible to reach ${targetCgpa} CGPA. Required average SGPA: ${requiredSgpa.toFixed(2)} (exceeds 10.0 scale). Try adjusting your target.`,
        success: false,
      };
    }

    if (requiredSgpa < 5.0) {
      return {
        message: `Easily Reachable! You require an average SGPA of ${Math.max(5.0, requiredSgpa).toFixed(2)} in your remaining semesters.`,
        success: true,
      };
    }

    return {
      message: `You require an average SGPA of ${requiredSgpa.toFixed(2)} across the remaining ${remainingSemesters} semesters to achieve your target.`,
      success: true,
    };
  };

  const projection = calculateRequiredSgpa();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* SGPA Calculator Card */}
      <GlassCard glowColor="rgba(59, 130, 246, 0.04)" hoverEffect={false}>
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-900">
          <Percent className="h-5 w-5 text-blue-500 animate-pulse" />
          <div>
            <h3 className="font-extrabold text-sm text-zinc-150 uppercase tracking-wide">
              SGPA Calculator
            </h3>
            <p className="text-[10px] text-zinc-500">Calculate GPA for your current semester subjects</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {sgpaRows.map((row, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-zinc-900/40 p-3 rounded-2xl border border-zinc-850"
            >
              {/* Subject Title */}
              <div className="flex flex-col gap-1 justify-center">
                <span className="text-[10px] text-zinc-550 font-bold uppercase">Subject</span>
                <span className="text-xs font-bold text-zinc-200 truncate">{row.subjectName}</span>
              </div>

              {/* Credits Selection */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] text-zinc-550 font-bold uppercase tracking-wider">
                  Credits (L-T-P)
                </label>
                <select
                  value={row.credits}
                  onChange={(e) => handleCreditsChange(idx, Number(e.target.value))}
                  className="bg-zinc-950 border border-zinc-900 text-zinc-300 text-xs rounded-xl p-2 outline-none"
                >
                  {[1, 2, 3, 4].map((c) => (
                    <option key={c} value={c}>
                      {c} Credit{c > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Grade Selection */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] text-zinc-550 font-bold uppercase tracking-wider">
                  Select Grade
                </label>
                <select
                  value={row.gradeValue}
                  onChange={(e) => handleGradeChange(idx, Number(e.target.value))}
                  className="bg-zinc-950 border border-zinc-900 text-zinc-300 text-xs rounded-xl p-2 outline-none"
                >
                  {gradeOptions.map((g) => (
                    <option key={g.value} value={g.value}>
                      {g.label.split(" (")[0]} ({g.value} pts)
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          {/* Results Block */}
          <div className="mt-6 p-5 bg-blue-600/10 border border-blue-500/15 rounded-2xl flex justify-between items-center">
            <div>
              <span className="text-[10px] uppercase font-bold text-blue-400 block tracking-widest">
                Semester SGPA
              </span>
              <p className="text-3xl font-black text-white mt-1 leading-none">
                {calculateSgpa()}
              </p>
            </div>
            <span className="text-[10px] text-zinc-500 text-right leading-relaxed max-w-[150px] font-medium uppercase">
              Calculated using standard BPUT credit weights
            </span>
          </div>
        </div>
      </GlassCard>

      {/* Target CGPA projections */}
      <div className="flex flex-col gap-6">
        <GlassCard glowColor="rgba(251, 191, 36, 0.04)" hoverEffect={false}>
          <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-zinc-900">
            <TrendingUp className="h-5 w-5 text-amber-500 animate-pulse" />
            <div>
              <h3 className="font-extrabold text-sm text-zinc-150 uppercase tracking-wide">
                Target CGPA Planner
              </h3>
              <p className="text-[10px] text-zinc-500">Determine required grades for remaining semesters</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* Input fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-zinc-550 font-bold uppercase tracking-wider">
                  Current CGPA
                </label>
                <input
                  type="number"
                  step="0.05"
                  min="4.0"
                  max="10.0"
                  value={currentCgpa}
                  onChange={(e) => setCurrentCgpa(Number(e.target.value))}
                  className="bg-zinc-900 border border-zinc-850 text-zinc-200 text-xs rounded-xl p-2.5 outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-zinc-550 font-bold uppercase tracking-wider">
                  Completed Semesters
                </label>
                <select
                  value={completedSemesters}
                  onChange={(e) => setCompletedSemesters(Number(e.target.value))}
                  className="bg-zinc-900 border border-zinc-850 text-zinc-200 text-xs rounded-xl p-2.5 outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7].map((s) => (
                    <option key={s} value={s}>
                      {s} Semester{s > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 mt-2">
              <label className="text-[10px] text-zinc-550 font-bold uppercase tracking-wider flex justify-between">
                <span>Target CGPA at Graduation</span>
                <span className="text-amber-500 font-bold">{targetCgpa}</span>
              </label>
              <input
                type="range"
                min="6.0"
                max="9.8"
                step="0.1"
                value={targetCgpa}
                onChange={(e) => setTargetCgpa(Number(e.target.value))}
                className="w-full h-1 bg-zinc-850 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Results Block */}
            <div className="mt-4">
              {projection.success !== false ? (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="h-4.5 w-4.5 text-amber-500" />
                    <span className="font-extrabold text-[10px] text-amber-500 uppercase tracking-wider">
                      Required Grade Output
                    </span>
                  </div>
                  <p className="text-xs text-zinc-350 leading-relaxed font-semibold">
                    {projection.message}
                  </p>
                </div>
              ) : (
                <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-5 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4.5 w-4.5 text-rose-500" />
                    <span className="font-extrabold text-[10px] text-rose-500 uppercase tracking-wider">
                      {projection.error}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-350 leading-relaxed font-semibold">
                    {projection.message}
                  </p>
                </div>
              )}
            </div>
          </div>
        </GlassCard>

        {/* Grade Conversion Tip */}
        <GlassCard hoverEffect={false}>
          <h4 className="font-bold text-[10px] uppercase tracking-wider text-zinc-500 mb-2">
            BPUT Grade Point System reference
          </h4>
          <p className="text-[11px] text-zinc-450 leading-relaxed font-medium">
            BPUT awards letter grades as follows: <b>O</b> (Outstanding, 10pts), <b>E</b> (Excellent, 9pts), <b>A</b> (Very Good, 8pts), <b>B</b> (Good, 7pts), <b>C</b> (Fair, 6pts), <b>D</b> (Pass, 5pts), <b>F</b> (Fail, 2pts). Practical courses have high credit weights. Keep SGPA above 7.5 to remain eligible for top campus placements.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
