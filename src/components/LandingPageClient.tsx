"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  BookOpen,
  Code,
  Calendar,
  Clock,
  FileText,
  Briefcase,
  Users,
  ArrowRight,
  ShieldCheck,
  Zap,
  Star,
} from "lucide-react";

export default function LandingPageClient() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  const features = [
    {
      title: "AI Study Assistant",
      desc: "Instant answers for BPUT syllabus concepts, code explanation, flashcard creation, and exam MCQ sets.",
      icon: Sparkles,
      color: "from-blue-500 to-cyan-400",
    },
    {
      title: "Coding Hub",
      desc: "Solve daily coding challenges in C, C++, Java, Python, and SQL with AI debugger and live leaderboards.",
      icon: Code,
      color: "from-indigo-500 to-purple-500",
    },
    {
      title: "Attendance Manager",
      desc: "Log daily lectures and calculate bunk safety using the BPUT 75% attendance rule and visual trackers.",
      icon: Calendar,
      color: "from-emerald-500 to-teal-400",
    },
    {
      title: "AI Study Planner",
      desc: "Input your target exam date and hours to generate Pomodoro schedules and day-by-day revision roadmaps.",
      icon: Clock,
      color: "from-amber-500 to-orange-400",
    },
    {
      title: "ATS Resume Builder",
      desc: "Build professional ATS-friendly resumes conforming to campus recruitment structures and export to PDF.",
      icon: FileText,
      color: "from-rose-500 to-pink-500",
    },
    {
      title: "Placement Hub",
      desc: "Ace company rounds with interview mock questions, HR guides, and real campus interview experiences.",
      icon: Briefcase,
      color: "from-violet-500 to-indigo-400",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden flex flex-col font-sans select-none">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[130px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="max-w-6xl w-full mx-auto px-6 py-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-blue-500/25">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <span className="font-bold text-base tracking-wider block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-200">
              COLLEGE BUDDY
            </span>
            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest block">
              BPUT CSE Academic Companion
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-lg shadow-blue-500/10 transition-all duration-200"
          >
            Create Account
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl w-full mx-auto px-6 flex-1 flex flex-col items-center justify-center text-center py-20 z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-8"
        >
          {/* Top Pill */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-bold uppercase tracking-wider shadow-inner"
          >
            <Zap className="h-3.5 w-3.5 text-blue-500" />
            Designed Exclusively for BPUT CSE Students
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-100 to-zinc-400"
          >
            Your All-in-One AI <br className="hidden sm:inline" />
            Academic Companion
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed font-medium"
          >
            Solve previous year papers, master complex concepts, compile code, calculate attendance buns, and prepare for TCS, Wipro, and Infosys placements.
          </motion.p>

          {/* Call to Actions */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 items-center mt-2">
            <Link
              href="/register"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-7 py-3.5 rounded-2xl shadow-xl shadow-blue-500/10 hover:shadow-blue-500/20 transform hover:-translate-y-0.5 transition-all text-sm w-full sm:w-auto justify-center"
            >
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="text-zinc-300 hover:text-white font-bold border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/60 px-7 py-3.5 rounded-2xl transition-all text-sm w-full sm:w-auto justify-center flex items-center"
            >
              Sign In (student@bput.ac.in)
            </Link>
          </motion.div>

          {/* Tech Badge */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-6 mt-6 justify-center flex-wrap"
          >
            <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Secure Authentication</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500/30" />
              <span>Gamified XP & Streaks</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <section className="mt-32 w-full text-left">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
              Academic features designed for daily use
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm mt-2 max-w-lg mx-auto">
              Everything a BPUT Computer Science and Engineering student needs to stay on track.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, idx) => {
              const Icon = f.icon;
              return (
                <div
                  key={idx}
                  className="glass-card rounded-2xl p-6 border border-zinc-900 hover:border-zinc-800 shadow-xl flex flex-col gap-4 relative overflow-hidden"
                >
                  <div className={`bg-gradient-to-tr ${f.color} p-2.5 rounded-xl text-white w-fit shadow-md`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-extrabold text-sm text-zinc-100 uppercase tracking-wide">
                    {f.title}
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed font-medium">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-8 z-10 mt-auto">
        <div className="max-w-6xl w-full mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-zinc-500 text-[10px] gap-4 font-medium uppercase tracking-wider">
          <span>&copy; 2026 College Buddy BPUT. All rights reserved.</span>
          <span>Designed with absolute premium aesthetics for CSE.</span>
        </div>
      </footer>
    </div>
  );
}
