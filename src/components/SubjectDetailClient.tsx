"use client";

import { useState } from "react";
import {
  Sparkles,
  BookOpen,
  FileText,
  FileCode,
  GraduationCap,
  HelpCircle,
  HelpCircle as QuestionIcon,
  ChevronDown,
  ChevronUp,
  Brain,
  CheckCircle,
  XCircle,
  Loader,
} from "lucide-react";
import GlassCard from "@/components/GlassCard";
import { askAI } from "@/lib/ai";

interface SubjectData {
  id: string;
  code: string;
  name: string;
  semester: number;
  chapters: { title: string; content: string }[];
  pyqs: { year: number; question: string; answer: string }[];
  mcqs: { question: string; options: string[]; correctIdx: number; explanation: string }[];
  viva: { question: string; answer: string }[];
  important: string[];
  labManual?: { title: string; steps: string[]; codeSnippet?: string }[];
}

interface SubjectDetailClientProps {
  subject: SubjectData;
}

export default function SubjectDetailClient({ subject }: SubjectDetailClientProps) {
  const [activeTab, setActiveTab] = useState<"notes" | "materials" | "exam" | "ai">("notes");

  // Notes explanation
  const [explainingChapter, setExplainingChapter] = useState<string | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  // MCQ State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showMcqExplanations, setShowMcqExplanations] = useState<Record<number, boolean>>({});

  // Viva Accordion State
  const [openViva, setOpenViva] = useState<Record<number, boolean>>({});
  const [aiQuery, setAiQuery] = useState("");

  const handleExplainChapter = async (chapterTitle: string, initialContent: string) => {
    setExplainingChapter(chapterTitle);
    setAiLoading(true);
    setAiExplanation(null);

    const prompt = `Please provide a highly detailed academic explanation of this topic for BPUT CSE exam prep:
Subject: ${subject.name} (${subject.code})
Topic: ${chapterTitle}
Core Concept: ${initialContent}
Include key definitions, standard textbook explanations, bullet points, and a tip on what questions are asked in university exams.`;

    const res = await askAI(prompt, "You are a senior computer science professor from BPUT.");
    setAiLoading(false);
    if (res.success) {
      setAiExplanation(res.content);
    } else {
      setAiExplanation("Failed to generate explanation. Please try again.");
    }
  };

  const handleAnswerMcq = (idx: number, optIdx: number) => {
    if (selectedAnswers[idx] !== undefined) return; // already answered
    setSelectedAnswers({ ...selectedAnswers, [idx]: optIdx });
    setShowMcqExplanations({ ...showMcqExplanations, [idx]: true });
  };

  const toggleViva = (idx: number) => {
    setOpenViva({ ...openViva, [idx]: !openViva[idx] });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-900/40 border border-zinc-850 p-6 rounded-3xl">
        <div>
          <span className="text-[10px] text-blue-400 font-extrabold uppercase tracking-widest block">
            Semester {subject.semester} &bull; CSE Subject
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            {subject.name}
          </h2>
          <p className="text-zinc-550 text-xs mt-1 uppercase font-semibold">
            BPUT Subject Code: {subject.code}
          </p>
        </div>

        {/* AI Action shortcut */}
        <button
          onClick={() => {
            setActiveTab("ai");
            setAiExplanation(null);
          }}
          className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-lg shadow-blue-500/10 transition-all cursor-pointer"
        >
          <Brain className="h-4 w-4" /> Explain Subject with AI
        </button>
      </div>

      {/* Tabs list */}
      <div className="flex border-b border-zinc-850 gap-4 overflow-x-auto pb-px">
        {[
          { id: "notes", name: "Chapters & Notes", icon: BookOpen },
          { id: "materials", name: "Syllabus & Lab Manuals", icon: FileCode },
          { id: "exam", name: "Q&A Bank & MCQs", icon: GraduationCap },
          { id: "ai", name: "AI Study Coach", icon: Brain },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setExplainingChapter(null);
                setAiExplanation(null);
              }}
              className={`flex items-center gap-2 pb-3.5 px-2 text-xs font-bold transition-all relative border-b-2 whitespace-nowrap cursor-pointer ${
                isActive
                  ? "text-blue-400 border-blue-500"
                  : "text-zinc-500 border-transparent hover:text-zinc-300"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="mt-4">
        {/* 1. NOTES & CHAPTERS */}
        {activeTab === "notes" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-6">
              {subject.chapters.map((ch, idx) => (
                <GlassCard key={idx} hoverEffect={false}>
                  <div className="flex justify-between items-start gap-4 flex-wrap">
                    <h3 className="font-extrabold text-sm text-zinc-100">{ch.title}</h3>
                    <button
                      onClick={() => handleExplainChapter(ch.title, ch.content)}
                      className="text-[10px] bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/20 py-1.5 px-3 rounded-lg font-bold flex items-center gap-1 transition-all"
                    >
                      <Sparkles className="h-3 w-3" /> Explain Concept
                    </button>
                  </div>
                  <p className="text-xs text-zinc-400 mt-3 leading-relaxed font-medium">
                    {ch.content}
                  </p>
                </GlassCard>
              ))}
            </div>

            {/* AI Explanation panel side bar */}
            <div className="flex flex-col gap-4">
              <GlassCard glowColor="rgba(59, 130, 246, 0.04)" hoverEffect={false} className="sticky top-24">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="h-5 w-5 text-blue-500" />
                  <h3 className="font-bold text-xs uppercase text-zinc-200 tracking-wider">
                    AI Explanation Panel
                  </h3>
                </div>

                {explainingChapter ? (
                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] text-zinc-500 font-bold block truncate max-w-[200px]">
                      Topic: {explainingChapter}
                    </span>
                    {aiLoading ? (
                      <div className="flex flex-col items-center justify-center py-10 gap-3">
                        <Loader className="h-6 w-6 text-blue-500 animate-spin" />
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                          Analyzing concept...
                        </span>
                      </div>
                    ) : (
                      <div className="bg-zinc-950/50 border border-zinc-900 rounded-xl p-4 max-h-[50vh] overflow-y-auto text-xs leading-relaxed text-zinc-350 text-left">
                        {aiExplanation?.split("\n").map((line, lIdx) => (
                          <p key={lIdx} className="mt-1.5">
                            {line}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-zinc-550 text-xs text-center py-12 leading-relaxed">
                    Click "Explain Concept" on any chapter to get a detailed AI-generated lecture summary.
                  </p>
                )}
              </GlassCard>
            </div>
          </div>
        )}

        {/* 2. SYLLABUS & LAB MANUALS */}
        {activeTab === "materials" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GlassCard hoverEffect={false}>
              <h3 className="font-bold text-sm text-zinc-100 flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-blue-400" /> Recommended Books & Syllabus
              </h3>
              <ul className="divide-y divide-zinc-900 text-xs">
                <li className="py-3 flex justify-between">
                  <span className="font-semibold text-zinc-300">Standard Textbooks</span>
                  <span className="text-zinc-500">Galvin (OS), Korth (DBMS), CLRS (Algorithms)</span>
                </li>
                <li className="py-3 flex justify-between">
                  <span className="font-semibold text-zinc-300">Internal Weights</span>
                  <span className="text-zinc-500">Mid-Sem: 20 marks, Lab: 30 marks, End-Sem: 100 marks</span>
                </li>
                <li className="py-3 flex justify-between">
                  <span className="font-semibold text-zinc-300">Important Chapter Links</span>
                  <span className="text-blue-400 hover:underline cursor-pointer">Syllabus PDF</span>
                </li>
              </ul>
            </GlassCard>

            {subject.labManual ? (
              subject.labManual.map((lab, lIdx) => (
                <GlassCard key={lIdx} hoverEffect={false}>
                  <h3 className="font-bold text-sm text-zinc-100 flex items-center gap-2 mb-4">
                    <FileCode className="h-5 w-5 text-emerald-400" /> Lab Manual: {lab.title}
                  </h3>
                  <div className="flex flex-col gap-3 text-xs">
                    <div className="bg-zinc-950/40 p-3 rounded-xl border border-zinc-900">
                      <h4 className="font-semibold text-zinc-350 mb-2">Experiment Steps:</h4>
                      <ol className="list-decimal pl-5 text-zinc-400 flex flex-col gap-1.5 font-medium leading-relaxed">
                        {lab.steps.map((st, sIdx) => (
                          <li key={sIdx}>{st}</li>
                        ))}
                      </ol>
                    </div>

                    {lab.codeSnippet && (
                      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 max-h-56 overflow-y-auto">
                        <pre className="text-[10px] font-mono text-emerald-400 leading-normal text-left">
                          {lab.codeSnippet}
                        </pre>
                      </div>
                    )}
                  </div>
                </GlassCard>
              ))
            ) : (
              <GlassCard hoverEffect={false}>
                <h3 className="font-bold text-sm text-zinc-100 flex items-center gap-2 mb-4">
                  <FileCode className="h-5 w-5 text-zinc-500" /> Lab Manuals
                </h3>
                <p className="text-zinc-550 text-xs text-center py-10 leading-relaxed">
                  No standard code experiments uploaded for this theoretical subject. Check with faculty.
                </p>
              </GlassCard>
            )}
          </div>
        )}

        {/* 3. EXAM PREP / MCQs */}
        {activeTab === "exam" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Previous Year Questions Accordion */}
            <GlassCard hoverEffect={false}>
              <h3 className="font-bold text-sm text-zinc-100 flex items-center gap-2 mb-4">
                <GraduationCap className="h-5 w-5 text-amber-500" /> BPUT Previous Year Questions
              </h3>
              <div className="flex flex-col gap-4">
                {subject.pyqs.map((q, idx) => (
                  <div key={idx} className="border-b border-zinc-900 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-start gap-3">
                      <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded font-extrabold flex-shrink-0 mt-0.5">
                        BPUT {q.year}
                      </span>
                      <h4 className="text-xs font-bold text-zinc-200 leading-snug flex-1">
                        {q.question}
                      </h4>
                    </div>
                    <div className="bg-zinc-950/40 border border-zinc-900/60 rounded-xl p-3.5 mt-2.5 text-xs text-zinc-400 leading-relaxed font-medium text-left">
                      <span className="text-[9px] uppercase font-bold text-zinc-500 block mb-1">
                        Suggested Answer Layout
                      </span>
                      {q.answer}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* MCQ Panel */}
            <div className="flex flex-col gap-6">
              {/* Important questions list */}
              <GlassCard hoverEffect={false}>
                <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-450 mb-3">
                  Highly Important Concepts (Part-B Focus)
                </h3>
                <ul className="list-disc pl-5 text-xs text-zinc-400 flex flex-col gap-2 font-medium leading-relaxed">
                  {subject.important.map((imp, idx) => (
                    <li key={idx}>{imp}</li>
                  ))}
                </ul>
              </GlassCard>

              {/* MCQs */}
              <GlassCard hoverEffect={false}>
                <h3 className="font-bold text-sm text-zinc-100 flex items-center gap-2 mb-4">
                  <QuestionIcon className="h-5 w-5 text-blue-400" /> Concept Quick MCQs
                </h3>
                <div className="flex flex-col gap-5">
                  {subject.mcqs.map((m, idx) => {
                    const answeredIdx = selectedAnswers[idx];
                    const isAnswered = answeredIdx !== undefined;

                    return (
                      <div key={idx} className="flex flex-col gap-3">
                        <h4 className="text-xs font-bold text-zinc-200 leading-snug">
                          {idx + 1}. {m.question}
                        </h4>
                        <div className="flex flex-col gap-2">
                          {m.options.map((opt, oIdx) => {
                            const isCorrect = oIdx === m.correctIdx;
                            const isUserSelection = answeredIdx === oIdx;

                            let btnStyle = "bg-zinc-900 border-zinc-850 hover:bg-zinc-850 text-zinc-300";
                            if (isAnswered) {
                              if (isCorrect) {
                                btnStyle = "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
                              } else if (isUserSelection) {
                                btnStyle = "bg-rose-500/10 border-rose-500/30 text-rose-400";
                              } else {
                                btnStyle = "bg-zinc-950/40 border-zinc-900 text-zinc-600";
                              }
                            }

                            return (
                              <button
                                key={oIdx}
                                onClick={() => handleAnswerMcq(idx, oIdx)}
                                disabled={isAnswered}
                                className={`text-left p-3 rounded-xl border text-xs font-semibold flex justify-between items-center transition-all ${btnStyle}`}
                              >
                                <span>{opt}</span>
                                {isAnswered && isCorrect && <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />}
                                {isAnswered && isUserSelection && !isCorrect && <XCircle className="h-4 w-4 text-rose-500 flex-shrink-0" />}
                              </button>
                            );
                          })}
                        </div>

                        {showMcqExplanations[idx] && (
                          <div className="bg-blue-600/5 border border-blue-500/10 p-3 rounded-xl text-[11px] text-zinc-400 leading-normal text-left">
                            <span className="font-bold text-blue-400 block mb-0.5">Explanation:</span>
                            {m.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </GlassCard>

              {/* Viva Section */}
              <GlassCard hoverEffect={false}>
                <h3 className="font-bold text-sm text-zinc-100 flex items-center gap-2 mb-4">
                  <HelpCircle className="h-5 w-5 text-indigo-400" /> Exam Viva Prep
                </h3>
                <div className="flex flex-col gap-2.5">
                  {subject.viva.map((v, vIdx) => {
                    const isOpen = openViva[vIdx] || false;
                    return (
                      <div key={vIdx} className="bg-zinc-900/50 border border-zinc-850 rounded-xl overflow-hidden">
                        <button
                          onClick={() => toggleViva(vIdx)}
                          className="w-full flex justify-between items-center p-3 text-xs font-bold text-zinc-200 text-left hover:bg-zinc-900"
                        >
                          <span>{v.question}</span>
                          {isOpen ? <ChevronUp className="h-4 w-4 text-zinc-500" /> : <ChevronDown className="h-4 w-4 text-zinc-500" />}
                        </button>
                        {isOpen && (
                          <div className="p-3.5 bg-zinc-950/20 text-xs text-zinc-400 leading-relaxed font-medium text-left border-t border-zinc-900">
                            {v.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </GlassCard>
            </div>
          </div>
        )}

        {/* 4. AI STUDY COACH CHAT */}
        {activeTab === "ai" && (
          <div className="max-w-3xl mx-auto flex flex-col gap-6">
            <GlassCard glowColor="rgba(59, 130, 246, 0.05)" hoverEffect={false}>
              <div className="flex items-center gap-2.5 mb-6">
                <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-xl text-white">
                  <Brain className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-zinc-100">AI Subject Coach</h3>
                  <p className="text-[10px] text-zinc-500">Discuss syllabus, explain algorithms step-by-step, or request mock viva quizzes.</p>
                </div>
              </div>

              {/* Chat Interface */}
              <div className="bg-zinc-950/50 border border-zinc-900 rounded-2xl p-4 min-h-64 max-h-[50vh] overflow-y-auto mb-4 flex flex-col gap-4 text-left">
                {aiExplanation ? (
                  <div className="flex gap-3 items-start">
                    <div className="bg-blue-600/10 border border-blue-500/20 p-2 rounded-lg text-blue-400 mt-0.5">
                      <Brain className="h-4 w-4" />
                    </div>
                    <div className="flex-1 bg-zinc-900 border border-zinc-850 rounded-2xl p-4 text-xs text-zinc-300 leading-relaxed font-medium font-sans">
                      <h4 className="font-extrabold text-white mb-2 uppercase text-[10px] tracking-wider text-blue-400">
                        AI Coach Response
                      </h4>
                      {aiExplanation.split("\n").map((line, idx) => (
                        <p key={idx} className="mt-1">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-20 text-zinc-650 text-xs font-semibold italic flex flex-col items-center gap-2">
                    <span>Ask a doubt below to start.</span>
                    <span className="text-[10px] font-normal text-zinc-500 not-italic">
                      "Explain QuickSort partition logic" &bull; "Create a 3-question MCQ quiz on Semaphores"
                    </span>
                  </div>
                )}
              </div>

              {/* Query form */}
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!aiQuery.trim()) return;
                  setAiLoading(true);
                  setAiExplanation(null);
                  const res = await askAI(
                    aiQuery,
                    `You are a CSE tutor for BPUT subject ${subject.name} (${subject.code}).`
                  );
                  setAiLoading(false);
                  if (res.success) {
                    setAiExplanation(res.content);
                  } else {
                    setAiExplanation("Could not get a response. Please try again.");
                  }
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask a doubt for this subject..."
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  className="flex-1 bg-zinc-900/60 border border-zinc-850 text-zinc-200 placeholder-zinc-600 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  disabled={aiLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-1.5 transition-all disabled:opacity-50"
                >
                  {aiLoading ? <Loader className="h-4.5 w-4.5 animate-spin" /> : "Submit"}
                </button>
              </form>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  );
}
