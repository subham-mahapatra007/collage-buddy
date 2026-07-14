"use client";

import { useState } from "react";
import { FolderOpen, Search, FileText, Database, Plus, ChevronDown, ChevronUp } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import { mockProjects, ProjectMock } from "@/lib/mockData";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function ProjectClient() {
  const [activeTab, setActiveTab] = useState<"All" | "Mini" | "Major">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<ProjectMock[]>(mockProjects);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Add project fields
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newType, setNewType] = useState("Mini");
  const [newSchema, setNewSchema] = useState("");
  const [newGithub, setNewGithub] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc) return;

    const newItem: ProjectMock = {
      id: "proj-" + Math.floor(Math.random() * 1000),
      title: newTitle,
      description: newDesc,
      type: newType as any,
      schema: newSchema || undefined,
      githubUrl: newGithub || undefined,
      reportSummary: "Project uploaded successfully. Review details in directory.",
    };

    setProjects([newItem, ...projects]);
    setNewTitle("");
    setNewDesc("");
    setNewSchema("");
    setNewGithub("");
    setShowAddForm(false);
  };

  const filteredItems = projects.filter((item) => {
    const matchesTab = activeTab === "All" || item.type === activeTab;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-900/40 border border-zinc-850 p-6 rounded-3xl">
        <div>
          <span className="text-[10px] text-blue-500 font-extrabold uppercase tracking-widest block">
            Academic Project Hub
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            Browse Mini & Major Projects
          </h2>
          <p className="text-zinc-500 text-xs mt-1">
            Reference database schemas, PPT layouts, and GitHub links submitted by seniors.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-lg shadow-blue-500/10 cursor-pointer"
        >
          <Plus className="h-4 w-4" /> Upload My Project
        </button>
      </div>

      {/* Add Project Form */}
      {showAddForm && (
        <GlassCard glowColor="rgba(59, 130, 246, 0.05)" hoverEffect={false}>
          <h3 className="font-extrabold text-xs uppercase text-zinc-200 tracking-wider mb-4 pb-2 border-b border-zinc-900">
            Submit Project Details
          </h3>
          <form onSubmit={handleAddProjectSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[9px] text-zinc-550 font-bold uppercase tracking-wider">Title *</label>
              <input
                type="text"
                required
                placeholder="E.g. Geo-fencing Attendance Tracker"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="bg-zinc-900 border border-zinc-850 text-zinc-200 text-xs rounded-xl p-2.5 outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[9px] text-zinc-550 font-bold uppercase tracking-wider">Type *</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="bg-zinc-900 border border-zinc-850 text-zinc-300 text-xs rounded-xl p-2.5 outline-none"
              >
                <option value="Mini">Mini Project (Sem 5/6)</option>
                <option value="Major">Major Project (Sem 7/8)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 col-span-2">
              <label className="text-[9px] text-zinc-550 font-bold uppercase tracking-wider">Description *</label>
              <input
                type="text"
                required
                placeholder="Summarize features and implementation..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="bg-zinc-900 border border-zinc-850 text-zinc-200 text-xs rounded-xl p-2.5 outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[9px] text-zinc-550 font-bold uppercase tracking-wider">Database Schema (Optional)</label>
              <input
                type="text"
                placeholder="E.g. Users(id, name, email)"
                value={newSchema}
                onChange={(e) => setNewSchema(e.target.value)}
                className="bg-zinc-900 border border-zinc-850 text-zinc-200 text-xs rounded-xl p-2.5 outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[9px] text-zinc-550 font-bold uppercase tracking-wider">GitHub Repository (Optional)</label>
              <input
                type="text"
                placeholder="https://github.com/..."
                value={newGithub}
                onChange={(e) => setNewGithub(e.target.value)}
                className="bg-zinc-900 border border-zinc-850 text-zinc-200 text-xs rounded-xl p-2.5 outline-none"
              />
            </div>

            <div className="col-span-2 flex gap-3 justify-end mt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-zinc-900 border border-zinc-850 text-zinc-400 py-2.5 px-4 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs"
              >
                Submit Project
              </button>
            </div>
          </form>
        </GlassCard>
      )}

      {/* Filter and search */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        {/* Pills */}
        <div className="flex gap-2 border border-zinc-900 p-1 rounded-xl bg-zinc-950/40 w-fit select-none">
          {["All", "Mini", "Major"].map((type) => (
            <button
              key={type}
              onClick={() => setActiveTab(type as any)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                activeTab === type
                  ? "bg-blue-600 text-white"
                  : "text-zinc-500 hover:text-zinc-350"
              }`}
            >
              {type} Projects
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex items-center max-w-xs w-full">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/60 border border-zinc-850 text-zinc-200 placeholder-zinc-650 rounded-xl py-2 pl-9 pr-3 text-xs focus:outline-none"
          />
          <Search className="absolute left-3 h-4 w-4 text-zinc-600" />
        </div>
      </div>

      {/* Projects List */}
      <div className="flex flex-col gap-4">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 text-zinc-600 text-xs font-semibold italic">
            No projects found matching selection.
          </div>
        ) : (
          filteredItems.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <GlassCard key={item.id} glowColor="rgba(59, 130, 246, 0.01)" hoverEffect={false}>
                <div
                  onClick={() => toggleExpand(item.id)}
                  className="flex justify-between items-start gap-4 cursor-pointer"
                >
                  <div className="flex-1 text-left">
                    <span className="text-[9px] bg-zinc-900 text-zinc-450 border border-zinc-800 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      {item.type} Project
                    </span>
                    <h3 className="font-extrabold text-sm text-zinc-150 mt-3">{item.title}</h3>
                    <p className="text-zinc-400 text-xs mt-1.5 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                  <button className="text-zinc-500 p-1.5 hover:bg-zinc-900 rounded-xl">
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="mt-5 pt-5 border-t border-zinc-900 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                    {/* Database Schema */}
                    {item.schema && (
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                          <Database className="h-4 w-4 text-blue-500" /> Database Schema
                        </span>
                        <pre className="bg-zinc-950 border border-zinc-900 p-3 rounded-xl font-mono text-[10px] text-zinc-450 leading-relaxed whitespace-pre-wrap">
                          {item.schema}
                        </pre>
                      </div>
                    )}

                    {/* Links and Report Summary */}
                    <div className="flex flex-col gap-3">
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                        <FileText className="h-4 w-4 text-emerald-500" /> Report Summary
                      </span>
                      <p className="text-xs text-zinc-400 leading-relaxed font-medium bg-zinc-950/20 p-3 border border-zinc-900 rounded-xl">
                        {item.reportSummary}
                      </p>

                      {item.githubUrl && (
                        <a
                          href={item.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-blue-400 hover:underline font-bold mt-1 w-fit"
                        >
                          <GithubIcon className="h-4 w-4" /> View GitHub Repository
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </GlassCard>
            );
          })
        )}
      </div>
    </div>
  );
}
