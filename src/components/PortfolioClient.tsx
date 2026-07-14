"use client";

import { useState } from "react";
import { Layers, Sparkles, Layout, Eye, Globe, ExternalLink, Check } from "lucide-react";
import GlassCard from "@/components/GlassCard";

export default function PortfolioClient() {
  const [theme, setTheme] = useState("glass");
  const [tagline, setTagline] = useState("Building Scalable Solutions & AI Integrations");
  const [bio, setBio] = useState("Computer Science Student at BPUT, passionate about Full-stack Engineering, DBMS, and competitive programming.");
  const [showPreview, setShowPreview] = useState(false);
  const [deployedUrl, setDeployedUrl] = useState<string | null>(null);
  const [deploying, setDeploying] = useState(false);

  const handleDeploy = () => {
    setDeploying(true);
    setTimeout(() => {
      setDeploying(false);
      setDeployedUrl("https://subham-kumar.collegebuddy.dev");
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
      {/* Configuration panel */}
      <div className="flex flex-col gap-6">
        <GlassCard glowColor="rgba(59, 130, 246, 0.04)" hoverEffect={false}>
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-900">
            <Layers className="h-5 w-5 text-blue-500 animate-pulse" />
            <div>
              <h3 className="font-extrabold text-sm text-zinc-150 uppercase tracking-wide">
                Portfolio Wizard
              </h3>
              <p className="text-[10px] text-zinc-550">Create your recruiter-facing personal portfolio site</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* Theme Select */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">
                Select Visual Style
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "glass", name: "Glassmorphism" },
                  { id: "minimal", name: "Clean Light" },
                  { id: "cyber", name: "Cyberpunk" },
                ].map((th) => (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => setTheme(th.id)}
                    className={`p-2.5 rounded-xl border text-[10px] font-bold text-center transition-all cursor-pointer ${
                      theme === th.id
                        ? "bg-blue-600/10 border-blue-500/30 text-blue-400"
                        : "bg-zinc-900 border-zinc-850 text-zinc-500"
                    }`}
                  >
                    {th.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Slogan Tagline */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">
                Hero Tagline
              </label>
              <input
                type="text"
                placeholder="E.g. Building Scalable Systems"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-850 text-zinc-200 text-xs rounded-xl py-2.5 px-3 outline-none"
              />
            </div>

            {/* About Bio */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">
                About Me Bio
              </label>
              <textarea
                rows={3}
                placeholder="Describe your goals and coding competencies..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-850 text-zinc-200 text-xs rounded-xl py-2.5 px-3 outline-none"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end mt-2">
              <button
                type="button"
                onClick={handleDeploy}
                disabled={deploying}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-blue-500/10 disabled:opacity-50 cursor-pointer"
              >
                {deploying ? "Deploying..." : "Deploy Portfolio"}
              </button>
            </div>
          </div>
        </GlassCard>

        {/* Deployment Status */}
        {deployedUrl && (
          <GlassCard glowColor="rgba(16, 185, 129, 0.05)" hoverEffect={false}>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-2">
              <Check className="h-4.5 w-4.5" />
              <span>Portfolio Deployed Successfully!</span>
            </div>
            <p className="text-[11px] text-zinc-500 leading-normal">
              Your personal website is live and hosted. Link it on your resume to showcase to recruiters.
            </p>
            <a
              href={deployedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3.5 flex items-center gap-1.5 text-xs text-blue-400 hover:underline font-bold"
            >
              <Globe className="h-4 w-4" /> Visit {deployedUrl} <ExternalLink className="h-3 w-3" />
            </a>
          </GlassCard>
        )}
      </div>

      {/* Live Preview Display frame */}
      <div className="flex flex-col gap-3">
        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1.5 pl-2">
          <Eye className="h-4 w-4 text-blue-500" /> Live Website Frame Preview
        </span>

        {/* The generated portfolio page simulated preview */}
        <div
          className={`border rounded-2xl p-8 flex flex-col gap-6 min-h-[400px] text-left select-text relative transition-all ${
            theme === "glass"
              ? "bg-zinc-950 text-white border-zinc-800"
              : theme === "minimal"
              ? "bg-zinc-50 text-zinc-900 border-zinc-200"
              : "bg-black text-emerald-400 border-emerald-500/20 font-mono"
          }`}
        >
          {theme === "glass" && (
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-blue-500/5 blur-[50px] pointer-events-none" />
          )}

          {/* Navigation Bar */}
          <div className="flex justify-between items-center border-b pb-4 border-current opacity-30 text-[10px] uppercase font-bold tracking-wider">
            <span>Portfolio</span>
            <div className="flex gap-4">
              <span>About</span>
              <span>Projects</span>
              <span>Contact</span>
            </div>
          </div>

          {/* Slogan */}
          <div className="flex flex-col gap-3 my-4">
            <h1 className={`text-xl sm:text-2xl font-black ${theme === "minimal" ? "text-zinc-900" : "text-white"}`}>
              {tagline}
            </h1>
            <p className={`text-xs leading-relaxed ${theme === "minimal" ? "text-zinc-650" : "text-zinc-400"}`}>
              {bio}
            </p>
          </div>

          {/* Featured projects section */}
          <div className="flex flex-col gap-3 mt-2">
            <h3 className="text-[10px] uppercase tracking-wider font-bold">Featured Projects</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border p-4 rounded-xl border-current opacity-70 flex flex-col gap-1 text-[11px] leading-relaxed">
                <span className="font-bold text-xs">Student E-Governance Portal</span>
                <span>Next.js app resolving student grading algorithms and notes.</span>
              </div>
              <div className="border p-4 rounded-xl border-current opacity-70 flex flex-col gap-1 text-[11px] leading-relaxed">
                <span className="font-bold text-xs">Geo-fencing Classroom Attendance</span>
                <span>Coordinates tracker mapping geolocation constraints.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
