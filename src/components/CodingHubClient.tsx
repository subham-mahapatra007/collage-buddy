"use client";

import { useState } from "react";
import {
  Code,
  Terminal,
  Play,
  Brain,
  Wrench,
  Loader,
  Trophy,
  Flame,
  Award,
  BookOpen,
} from "lucide-react";
import GlassCard from "@/components/GlassCard";
import { askAI } from "@/lib/ai";

export default function CodingHubClient() {
  const [lang, setLang] = useState("cpp");
  const [code, setCode] = useState(`#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello BPUT Students!" << endl;\n    return 0;\n}`);
  const [consoleOut, setConsoleOut] = useState("Click 'Run Code' to compile...");
  const [aiExplain, setAiExplain] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionType, setActionType] = useState<"run" | "debug" | "explain" | null>(null);

  // Gamified coding leaderboard
  const leaderBoard = [
    { rank: 1, name: "Pratyush Panda", level: 5, score: 940, badge: "Compiler King" },
    { rank: 2, name: "Ananya Mishra", level: 4, score: 810, badge: "Bug Hunter" },
    { rank: 3, name: "Subham Kumar (You)", level: 2, score: 320, badge: "Logic Starter" },
    { rank: 4, name: "Rajesh Sekhar", level: 2, score: 290, badge: "Loop Master" },
  ];

  const handleLangChange = (selectedLang: string) => {
    setLang(selectedLang);
    setAiExplain(null);
    if (selectedLang === "cpp") {
      setCode(`#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello BPUT Students!" << endl;\n    return 0;\n}`);
    } else if (selectedLang === "c") {
      setCode(`#include <stdio.h>\n\nint main() {\n    printf("Hello BPUT Students!\\n");\n    return 0;\n}`);
    } else if (selectedLang === "java") {
      setCode(`public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello BPUT Students!");\n    }\n}`);
    } else if (selectedLang === "python") {
      setCode(`print("Hello BPUT Students!")`);
    } else if (selectedLang === "js") {
      setCode(`console.log("Hello BPUT Students!");`);
    } else if (selectedLang === "sql") {
      setCode(`SELECT * FROM Students WHERE branch = 'CSE' ORDER BY xp DESC;`);
    }
  };

  const handleRun = () => {
    setActionType("run");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (lang === "sql") {
        setConsoleOut(`Executing SQL...\n\n+----+-------------------+--------+-----+\n| id | name              | branch | xp  |\n+----+-------------------+--------+-----+\n|  1 | Pratyush Panda    | CSE    | 940 |\n|  2 | Ananya Mishra     | CSE    | 810 |\n|  3 | Subham Kumar      | CSE    | 320 |\n+----+-------------------+--------+-----+\n\n(3 rows in set)`);
      } else {
        setConsoleOut(`Compiling code using standard ${lang.toUpperCase()} compiler...\n\n[SUCCESS] Compilation complete.\n\nOutput:\n--------------------\nHello BPUT Students!\n--------------------\nProcess returned 0 (0x0)\nExecution time: 0.12s`);
      }
    }, 1500);
  };

  const handleAIDebug = async () => {
    setActionType("debug");
    setLoading(true);
    setAiExplain(null);

    const prompt = `Debug this code written in ${lang.toUpperCase()}:
\`\`\`${lang}
${code}
\`\`\`
Check for syntax errors, common BPUT test case failures, and memory allocation issues. Explain the bugs and provide the corrected code.`;

    const res = await askAI(prompt, "You are a professional compiler design teacher and coding evaluator.");
    setLoading(false);
    if (res.success) {
      setAiExplain(res.content);
    } else {
      setAiExplain("Could not contact debugger. Code looks clean.");
    }
  };

  const handleAIExplain = async () => {
    setActionType("explain");
    setLoading(true);
    setAiExplain(null);

    const prompt = `Provide a step-by-step line explanation of this ${lang.toUpperCase()} code:
\`\`\`${lang}
${code}
\`\`\`
Make it very simple for a CSE 1st/2nd year student.`;

    const res = await askAI(prompt, "You are an encouraging computer science coding tutor.");
    setLoading(false);
    if (res.success) {
      setAiExplain(res.content);
    } else {
      setAiExplain("AI explanation failed. Try again.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Code Editor and Output (2 columns) */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        {/* Editor Card */}
        <GlassCard glowColor="rgba(59, 130, 246, 0.04)" hoverEffect={false}>
          {/* Header toolbar */}
          <div className="flex justify-between items-center gap-4 flex-wrap pb-4 border-b border-zinc-900 mb-4">
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5 text-blue-500 animate-pulse" />
              <h3 className="font-extrabold text-sm text-zinc-150">Interactive Sandbox</h3>
            </div>
            
            {/* Language Selector */}
            <select
              value={lang}
              onChange={(e) => handleLangChange(e.target.value)}
              className="bg-zinc-900 border border-zinc-850 text-zinc-300 text-xs px-3 py-1.5 rounded-xl outline-none focus:border-blue-500"
            >
              <option value="cpp">C++ (GCC 14)</option>
              <option value="c">C (GCC 14)</option>
              <option value="java">Java (JDK 21)</option>
              <option value="python">Python 3.12</option>
              <option value="js">JavaScript (Node 20)</option>
              <option value="sql">SQL (PostgreSQL)</option>
            </select>
          </div>

          {/* Editor Workspace */}
          <div className="relative">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
              className="w-full bg-zinc-950 font-mono text-[11px] sm:text-xs text-emerald-400 p-5 rounded-2xl min-h-64 border border-zinc-900 focus:outline-none focus:border-zinc-800 leading-relaxed text-left"
            />
          </div>

          {/* Actions toolbar */}
          <div className="flex gap-3 justify-end mt-4 flex-wrap">
            <button
              onClick={handleAIExplain}
              disabled={loading}
              className="bg-zinc-900 border border-zinc-850 text-zinc-400 hover:text-blue-400 hover:border-blue-500/20 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
            >
              <Brain className="h-4 w-4" /> AI Explain
            </button>
            <button
              onClick={handleAIDebug}
              disabled={loading}
              className="bg-zinc-900 border border-zinc-850 text-zinc-400 hover:text-rose-400 hover:border-rose-500/20 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
            >
              <Wrench className="h-4 w-4" /> AI Debugger
            </button>
            <button
              onClick={handleRun}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg shadow-blue-600/10 disabled:opacity-50 cursor-pointer"
            >
              {loading && actionType === "run" ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Play className="h-4 w-4 fill-white" /> Run Code
                </>
              )}
            </button>
          </div>
        </GlassCard>

        {/* Console output Card */}
        <GlassCard glowColor="rgba(16, 185, 129, 0.02)" hoverEffect={false}>
          <div className="flex items-center gap-2 mb-3">
            <Terminal className="h-4 w-4 text-emerald-500" />
            <h4 className="font-extrabold text-xs uppercase text-zinc-400 tracking-wider">
              Compiler Output Console
            </h4>
          </div>
          <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4 font-mono text-[10px] sm:text-xs text-zinc-450 leading-relaxed text-left min-h-24 max-h-48 overflow-y-auto whitespace-pre-wrap select-text">
            {consoleOut}
          </div>
        </GlassCard>

        {/* AI Explainer / Debugger Console details */}
        {aiExplain && (
          <GlassCard glowColor="rgba(59, 130, 246, 0.05)" hoverEffect={false}>
            <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-zinc-900">
              <Brain className="h-5 w-5 text-blue-500 animate-pulse" />
              <div>
                <h3 className="font-extrabold text-sm text-zinc-150">
                  {actionType === "debug" ? "AI Compiler Debug Report" : "AI Line-by-Line Breakdown"}
                </h3>
                <p className="text-[10px] text-zinc-500">Deep review of the sandbox code structures</p>
              </div>
            </div>
            <div className="text-xs text-zinc-300 leading-relaxed text-left max-h-96 overflow-y-auto pr-1">
              <div className="prose prose-invert prose-xs">
                {aiExplain.split("\n").map((line, idx) => {
                  if (line.startsWith("###")) {
                    return <h4 key={idx} className="font-extrabold text-white mt-4 mb-2 text-sm">{line.replace("###", "").trim()}</h4>;
                  }
                  if (line.startsWith("####")) {
                    return <h5 key={idx} className="font-extrabold text-zinc-200 mt-3 mb-1 text-xs">{line.replace("####", "").trim()}</h5>;
                  }
                  if (line.startsWith("-") || line.startsWith("*")) {
                    return <li key={idx} className="ml-4 mt-1 font-medium">{line.substring(1).trim()}</li>;
                  }
                  return <p key={idx} className="mt-1.5 font-medium">{line}</p>;
                })}
              </div>
            </div>
          </GlassCard>
        )}
      </div>

      {/* Leaderboard & Stats Side Panel */}
      <div className="flex flex-col gap-6">
        {/* Daily Coding challenge preview */}
        <GlassCard glowColor="rgba(245, 158, 11, 0.03)" hoverEffect={false}>
          <div className="flex items-center gap-1.5 mb-3">
            <Award className="h-4.5 w-4.5 text-amber-500" />
            <h4 className="font-extrabold text-xs uppercase text-zinc-400 tracking-wider">
              Daily Code challenge
            </h4>
          </div>
          <h3 className="font-bold text-sm text-zinc-200">Reverse a Singly Linked List</h3>
          <p className="text-zinc-500 text-xs mt-2 leading-relaxed font-medium">
            Write an iterative algorithm in C++ to reverse a singly linked list. Focus on adjusting node pointers without copying data.
          </p>
          <div className="mt-4 pt-4 border-t border-zinc-900 flex justify-between items-center text-[10px] font-bold">
            <span className="text-zinc-500">Points: +30 XP</span>
            <span className="text-amber-500 uppercase">Solve on sandbox</span>
          </div>
        </GlassCard>

        {/* Coding Leaderboard */}
        <GlassCard glowColor="rgba(251, 191, 36, 0.05)" hoverEffect={false}>
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-5 w-5 text-amber-500" />
            <div>
              <h3 className="font-bold text-xs uppercase text-zinc-200 tracking-wider">
                CSE Coding Leaderboard
              </h3>
              <p className="text-[10px] text-zinc-500">Top coding scores this semester</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {leaderBoard.map((row) => (
              <div
                key={row.rank}
                className={`flex items-center justify-between p-3.5 rounded-xl border ${
                  row.name.includes("You")
                    ? "bg-blue-600/10 border-blue-500/20 text-blue-400"
                    : "bg-zinc-900/50 border-zinc-850/60 text-zinc-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-xs font-black ${
                    row.rank === 1 ? "text-amber-500" : row.rank === 2 ? "text-zinc-400" : "text-zinc-600"
                  }`}>
                    #{row.rank}
                  </span>
                  <div>
                    <h4 className="font-extrabold text-xs text-zinc-200 truncate max-w-[120px]">
                      {row.name}
                    </h4>
                    <span className="text-[9px] text-zinc-500 font-bold block mt-0.5">
                      Lvl {row.level} Student &bull; {row.badge}
                    </span>
                  </div>
                </div>
                <span className="font-bold text-xs text-zinc-200">{row.score} pts</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
