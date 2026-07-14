"use client";

import { useState } from "react";
import { Briefcase, Search, Award, FileText, CheckCircle, ChevronRight, HelpCircle } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import { mockPlacement } from "@/lib/mockData";

export default function PlacementClient() {
  const [activeTab, setActiveTab] = useState<"All" | "Aptitude" | "Technical" | "HR" | "Coding" | "Experiences">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCompany, setActiveCompany] = useState<string>("All");

  const companiesList = ["All", "TCS", "Infosys", "Wipro", "Cognizant"];

  const filteredItems = mockPlacement.filter((item) => {
    const matchesTab = activeTab === "All" || item.category === activeTab;
    const matchesCompany = activeCompany === "All" || item.company === activeCompany;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesCompany && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-900/40 border border-zinc-850 p-6 rounded-3xl">
        <div>
          <span className="text-[10px] text-amber-500 font-extrabold uppercase tracking-widest block">
            Placement Prep Hub
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            Crack Campus Recruitments
          </h2>
          <p className="text-zinc-500 text-xs mt-1">
            Materials, aptitude formulas, coding questions, and logs for TCS, Wipro, and Infosys.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        {/* Company Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1.5 select-none">
          {companiesList.map((comp) => (
            <button
              key={comp}
              onClick={() => setActiveCompany(comp)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                activeCompany === comp
                  ? "bg-amber-500 text-black shadow-lg shadow-amber-500/10"
                  : "bg-zinc-900 border border-zinc-850 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {comp}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex items-center max-w-xs w-full">
          <input
            type="text"
            placeholder="Search questions or logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/60 border border-zinc-850 text-zinc-200 placeholder-zinc-600 rounded-xl py-2 pl-9 pr-3 text-xs focus:outline-none focus:border-amber-500"
          />
          <Search className="absolute left-3 h-4 w-4 text-zinc-650" />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex border-b border-zinc-850 gap-4 overflow-x-auto pb-px">
        {["All", "Aptitude", "Technical", "HR", "Coding", "Experiences"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`pb-3 px-1 text-xs font-bold transition-all relative border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === tab
                ? "text-amber-500 border-amber-500"
                : "text-zinc-500 border-transparent hover:text-zinc-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Results grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.length === 0 ? (
          <div className="md:col-span-2 text-center py-20 text-zinc-600 text-xs font-semibold italic">
            No placement questions found matching your filter selection.
          </div>
        ) : (
          filteredItems.map((item) => (
            <GlassCard key={item.id} glowColor="rgba(245, 158, 11, 0.02)" hoverEffect={false}>
              <div className="flex justify-between items-start gap-4 flex-wrap">
                <div>
                  <span className="text-[9px] bg-zinc-900 text-zinc-405 border border-zinc-800 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    {item.company} &bull; {item.category}
                  </span>
                  <h3 className="font-extrabold text-sm text-zinc-150 mt-3">{item.title}</h3>
                </div>
                <span className={`text-[8px] px-2 py-0.5 rounded font-extrabold uppercase border ${
                  item.difficulty === "Easy"
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                    : item.difficulty === "Medium"
                    ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                    : "bg-rose-500/10 border-rose-500/20 text-rose-400"
                }`}>
                  {item.difficulty}
                </span>
              </div>

              <div className="bg-zinc-950/40 p-4 border border-zinc-900 rounded-2xl mt-4 text-xs leading-relaxed text-zinc-400 font-medium text-left">
                {item.content.split("\n").map((line, idx) => (
                  <p key={idx} className="mt-1">
                    {line}
                  </p>
                ))}
              </div>
            </GlassCard>
          ))
        )}
      </div>
    </div>
  );
}
