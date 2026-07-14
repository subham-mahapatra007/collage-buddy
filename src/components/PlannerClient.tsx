"use client";

import { useState } from "react";
import {
  Clock,
  Calendar,
  Sparkles,
  Loader,
  Brain,
  AlertCircle,
  Play,
  Coffee,
  CheckCircle,
} from "lucide-react";
import GlassCard from "@/components/GlassCard";
import { generateStudyPlanAction } from "@/app/actions";

export default function PlannerClient() {
  const [examDate, setExamDate] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(["Data Structures"]);
  const [studyHours, setStudyHours] = useState(4);
  const [aiPlan, setAiPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const subjectsList = [
    "Data Structures",
    "Object Oriented Programming (C++)",
    "Discrete Mathematics",
    "Digital Logic Design",
    "Computer Organization",
    "Operating Systems",
    "Design & Analysis of Algorithms",
    "Database Management Systems",
  ];

  const handleSubjectToggle = (sub: string) => {
    if (selectedSubjects.includes(sub)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== sub));
    } else {
      setSelectedSubjects([...selectedSubjects, sub]);
    }
  };

  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!examDate) return;

    setLoading(true);
    setAiPlan(null);

    try {
      const formData = {
        examDate,
        subjects: selectedSubjects,
        availableHours: studyHours,
      };
      const res = await generateStudyPlanAction(formData);
      setLoading(false);
      if (res.success && res.plan) {
        setAiPlan(res.plan);
      }
    } catch (err) {
      setLoading(false);
      setAiPlan("Failed to generate AI study plan. Try again.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Configuration Form (1 col) */}
      <div className="flex flex-col gap-6">
        <GlassCard glowColor="rgba(59, 130, 246, 0.04)" hoverEffect={false}>
          <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-zinc-900">
            <Clock className="h-5 w-5 text-blue-500 animate-pulse" />
            <div>
              <h3 className="font-extrabold text-sm text-zinc-150 uppercase tracking-wide">
                Plan Parameters
              </h3>
              <p className="text-[10px] text-zinc-555">Custom AI study schedule planner</p>
            </div>
          </div>

          <form onSubmit={handleGeneratePlan} className="flex flex-col gap-4">
            {/* Exam Date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">
                Exam Start Date
              </label>
              <input
                type="date"
                required
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-850 text-zinc-300 text-xs rounded-xl py-2.5 px-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* Daily Hours Slider */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider flex justify-between">
                <span>Study Hours Per Day</span>
                <span className="text-blue-400">{studyHours} Hrs</span>
              </label>
              <input
                type="range"
                min="2"
                max="10"
                step="1"
                value={studyHours}
                onChange={(e) => setStudyHours(Number(e.target.value))}
                className="w-full h-1 bg-zinc-850 rounded-lg appearance-none cursor-pointer accent-blue-550"
              />
            </div>

            {/* Subjects checklist */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">
                Subjects to Prepare
              </label>
              <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1 border border-zinc-900 rounded-xl p-2 bg-zinc-950/20">
                {subjectsList.map((sub) => {
                  const isChecked = selectedSubjects.includes(sub);
                  return (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => handleSubjectToggle(sub)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border text-[10px] font-bold text-left transition-all ${
                        isChecked
                          ? "bg-blue-600/10 border-blue-500/25 text-blue-400"
                          : "bg-zinc-900/60 border-zinc-850/60 text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      <span>{sub}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || selectedSubjects.length === 0}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <Loader className="h-4.5 w-4.5 animate-spin" />
              ) : (
                <>
                  <Sparkles className="h-4.5 w-4.5" /> Generate Plan with AI
                </>
              )}
            </button>
          </form>
        </GlassCard>
      </div>

      {/* Generated Plan Output (2 cols) */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        <GlassCard glowColor="rgba(59, 130, 246, 0.05)" hoverEffect={false} className="min-h-96">
          <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-zinc-900">
            <Brain className="h-5 w-5 text-blue-500 animate-pulse" />
            <div>
              <h3 className="font-extrabold text-sm text-zinc-150 uppercase tracking-wide">
                AI Generation Console
              </h3>
              <p className="text-[10px] text-zinc-500">Your personalized academic preparation routine</p>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
              <Loader className="h-8 w-8 text-blue-500 animate-spin" />
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">
                Synthesizing Pomodoro Blocks & Schedules...
              </p>
            </div>
          ) : aiPlan ? (
            <div className="text-xs text-zinc-300 leading-relaxed text-left max-h-[70vh] overflow-y-auto pr-1">
              <div className="prose prose-invert prose-xs">
                {aiPlan.split("\n").map((line, idx) => {
                  if (line.startsWith("###")) {
                    return <h4 key={idx} className="font-extrabold text-white mt-4 mb-2 text-sm">{line.replace("###", "").trim()}</h4>;
                  }
                  if (line.startsWith("**")) {
                    return <p key={idx} className="font-bold text-zinc-200 mt-2">{line.replace(/\*\*/g, "")}</p>;
                  }
                  if (line.startsWith("-") || line.startsWith("*")) {
                    return <li key={idx} className="ml-4 mt-1 font-medium">{line.substring(1).trim()}</li>;
                  }
                  return <p key={idx} className="mt-1.5 font-medium">{line}</p>;
                })}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-28 text-center text-zinc-550 text-xs leading-relaxed max-w-sm mx-auto font-medium">
              <AlertCircle className="h-8 w-8 text-zinc-700 mb-3" />
              <span>Input your exam start date, select your study list, and hit "Generate Plan" to construct your AI-powered timetable.</span>
            </div>
          )}
        </GlassCard>

        {/* Dynamic Pomodoro widgets (Gamification/productivity teaser) */}
        {aiPlan && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <GlassCard hoverEffect={false}>
              <h4 className="font-bold text-xs uppercase text-zinc-400 tracking-wider flex items-center gap-1.5 mb-2">
                <Play className="h-4 w-4 text-emerald-500 fill-emerald-500/20" /> Active study block
              </h4>
              <p className="text-[11px] text-zinc-500 leading-relaxed font-semibold">
                Start a 50-minute Pomodoro focus block. College Buddy will automatically mute community notifications and reward you with +15 XP at completion.
              </p>
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-xl text-[10px] uppercase mt-4 transition-all w-fit cursor-pointer">
                Start Session
              </button>
            </GlassCard>

            <GlassCard hoverEffect={false}>
              <h4 className="font-bold text-xs uppercase text-zinc-400 tracking-wider flex items-center gap-1.5 mb-2">
                <Coffee className="h-4 w-4 text-blue-500" /> Active break block
              </h4>
              <p className="text-[11px] text-zinc-500 leading-relaxed font-semibold">
                Set a 10-minute break timer. Take a stretch or view quick coding MCQs in the Coding Hub during your downtime.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl text-[10px] uppercase mt-4 transition-all w-fit cursor-pointer">
                Take Break
              </button>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  );
}
