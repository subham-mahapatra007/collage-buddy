"use client";

import { useState } from "react";
import {
  FileText,
  Sparkles,
  Download,
  AlertCircle,
  CheckCircle,
  Plus,
  Trash,
  Check,
  Loader,
} from "lucide-react";
import GlassCard from "@/components/GlassCard";

interface ProjectItem {
  title: string;
  tech: string;
  desc: string;
}

export default function ResumeBuilderClient() {
  // Resume details state
  const [personal, setPersonal] = useState({
    name: "Subham Kumar",
    email: "subham.cse@outr.ac.in",
    phone: "+91 9876543210",
    github: "github.com/subham-bput",
    linkedin: "linkedin.com/in/subham-bput",
  });

  const [education, setEducation] = useState({
    college: "Odisha University of Technology and Research (OUTR)",
    degree: "B.Tech in Computer Science & Engineering",
    cgpa: "8.4",
    timeline: "2022 - 2026",
  });

  const [skills, setSkills] = useState("C++, Java, Python, SQL, React, Node.js, Next.js, Prisma, Git");

  const [projects, setProjects] = useState<ProjectItem[]>([
    {
      title: "Student E-Governance Portal",
      tech: "Next.js, Tailwind CSS, PostgreSQL",
      desc: "Developed an academic management application resolving student attendance calculations and note sharing.",
    },
    {
      title: "Smart Classroom Geo-attendance",
      tech: "React Native, Node.js, Geolocation APIs",
      desc: "Built a geofencing tracker that verifies coordinates before logging attendance to prevent proxy check-ins.",
    },
  ]);

  const [newProject, setNewProject] = useState<ProjectItem>({ title: "", tech: "", desc: "" });

  // ATS Checker State
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [atsFeedback, setAtsFeedback] = useState<string[]>([]);
  const [scanning, setScanning] = useState(false);

  const handleAddProject = () => {
    if (!newProject.title) return;
    setProjects([...projects, newProject]);
    setNewProject({ title: "", tech: "", desc: "" });
  };

  const handleRemoveProject = (idx: number) => {
    setProjects(projects.filter((_, i) => i !== idx));
  };

  const handleRunATSScan = () => {
    setScanning(true);
    setAtsScore(null);

    setTimeout(() => {
      setScanning(false);
      const feedback: string[] = [];
      let score = 65; // base

      // Checks
      if (personal.github.includes("github.com/")) {
        score += 10;
      } else {
        feedback.push("Add a valid GitHub profile URL for engineering portfolios.");
      }

      if (personal.linkedin.includes("linkedin.com/")) {
        score += 10;
      } else {
        feedback.push("Add a LinkedIn profile URL for recruiter checks.");
      }

      if (projects.length >= 2) {
        score += 10;
      } else {
        feedback.push("Add at least 2 distinct academic projects.");
      }

      if (skills.split(",").length >= 6) {
        score += 5;
      }

      // Check for action verbs in project descriptions
      const hasActionVerbs = projects.some((p) =>
        /developed|built|designed|implemented|created|engineered/i.test(p.desc)
      );
      if (hasActionVerbs) {
        score += 10;
      } else {
        feedback.push("Start project bullet points with strong action verbs (e.g. Developed, Engineered).");
      }

      setAtsScore(score);
      setAtsFeedback(feedback);
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 print:block">
      {/* Configuration panel (hidden in print) */}
      <div className="flex flex-col gap-6 print:hidden">
        <GlassCard glowColor="rgba(59, 130, 246, 0.04)" hoverEffect={false}>
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-900">
            <FileText className="h-5 w-5 text-blue-500" />
            <div>
              <h3 className="font-extrabold text-sm text-zinc-150 uppercase tracking-wide">
                Resume Editor
              </h3>
              <p className="text-[10px] text-zinc-500">Edit fields to build your recruiter template</p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {/* Personal Details */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold text-zinc-350 uppercase">Personal Details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={personal.name}
                  onChange={(e) => setPersonal({ ...personal, name: e.target.value })}
                  className="bg-zinc-900 border border-zinc-850 text-zinc-200 text-xs rounded-xl p-2.5 outline-none"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={personal.email}
                  onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
                  className="bg-zinc-900 border border-zinc-850 text-zinc-200 text-xs rounded-xl p-2.5 outline-none"
                />
                <input
                  type="text"
                  placeholder="GitHub Link"
                  value={personal.github}
                  onChange={(e) => setPersonal({ ...personal, github: e.target.value })}
                  className="bg-zinc-900 border border-zinc-850 text-zinc-200 text-xs rounded-xl p-2.5 outline-none"
                />
                <input
                  type="text"
                  placeholder="LinkedIn Link"
                  value={personal.linkedin}
                  onChange={(e) => setPersonal({ ...personal, linkedin: e.target.value })}
                  className="bg-zinc-900 border border-zinc-850 text-zinc-200 text-xs rounded-xl p-2.5 outline-none"
                />
              </div>
            </div>

            {/* Education */}
            <div className="flex flex-col gap-3 pt-3 border-t border-zinc-900">
              <h4 className="text-xs font-bold text-zinc-350 uppercase">Education</h4>
              <div className="grid grid-cols-1 gap-3">
                <input
                  type="text"
                  placeholder="College / Institute Name"
                  value={education.college}
                  onChange={(e) => setEducation({ ...education, college: e.target.value })}
                  className="bg-zinc-900 border border-zinc-850 text-zinc-200 text-xs rounded-xl p-2.5 outline-none"
                />
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Degree Name"
                    value={education.degree}
                    onChange={(e) => setEducation({ ...education, degree: e.target.value })}
                    className="col-span-2 bg-zinc-900 border border-zinc-850 text-zinc-200 text-xs rounded-xl p-2.5 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="CGPA"
                    value={education.cgpa}
                    onChange={(e) => setEducation({ ...education, cgpa: e.target.value })}
                    className="bg-zinc-900 border border-zinc-850 text-zinc-200 text-xs rounded-xl p-2.5 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-col gap-3 pt-3 border-t border-zinc-900">
              <h4 className="text-xs font-bold text-zinc-350 uppercase">Skills (Comma separated)</h4>
              <input
                type="text"
                placeholder="Languages, frameworks, tools..."
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="bg-zinc-900 border border-zinc-850 text-zinc-200 text-xs rounded-xl p-2.5 outline-none"
              />
            </div>

            {/* Projects */}
            <div className="flex flex-col gap-3 pt-3 border-t border-zinc-900">
              <h4 className="text-xs font-bold text-zinc-350 uppercase">Projects</h4>
              <div className="flex flex-col gap-2.5 mb-2">
                {projects.map((p, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-zinc-900/40 border border-zinc-850 p-3 rounded-xl"
                  >
                    <div>
                      <h5 className="text-xs font-bold text-zinc-200">{p.title}</h5>
                      <span className="text-[10px] text-zinc-500 font-medium">{p.tech}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveProject(idx)}
                      className="text-rose-500 p-2 hover:bg-rose-500/10 rounded-xl transition-all"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Project Form */}
              <div className="bg-zinc-950/40 p-3 rounded-2xl border border-zinc-900 flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Project Title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="bg-zinc-900 border border-zinc-850 text-zinc-200 text-xs rounded-xl p-2"
                  />
                  <input
                    type="text"
                    placeholder="Technologies (React...)"
                    value={newProject.tech}
                    onChange={(e) => setNewProject({ ...newProject, tech: e.target.value })}
                    className="bg-zinc-900 border border-zinc-850 text-zinc-200 text-xs rounded-xl p-2"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Project Description (Action verbs)"
                  value={newProject.desc}
                  onChange={(e) => setNewProject({ ...newProject, desc: e.target.value })}
                  className="bg-zinc-900 border border-zinc-850 text-zinc-200 text-xs rounded-xl p-2"
                />
                <button
                  type="button"
                  onClick={handleAddProject}
                  className="bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-350 py-2 rounded-xl text-[10px] font-bold uppercase transition-all flex justify-center items-center gap-1.5"
                >
                  <Plus className="h-3.5 w-3.5" /> Append Project
                </button>
              </div>
            </div>

            {/* Actions bar */}
            <div className="flex gap-3 mt-4 flex-wrap">
              <button
                type="button"
                onClick={handleRunATSScan}
                disabled={scanning}
                className="bg-zinc-900 border border-zinc-850 text-zinc-300 hover:text-blue-400 hover:border-blue-500/20 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
              >
                {scanning ? <Loader className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                Scan ATS Score
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center gap-1.5 ml-auto shadow-lg shadow-blue-600/10 cursor-pointer"
              >
                <Download className="h-4 w-4" /> Download PDF / Print
              </button>
            </div>
          </div>
        </GlassCard>

        {/* ATS score checker results */}
        {atsScore !== null && (
          <GlassCard glowColor="rgba(59, 130, 246, 0.05)" hoverEffect={false}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-zinc-400">
                ATS Checker Feedback
              </h3>
              <span className={`text-xs font-black px-2.5 py-1 rounded-xl border ${
                atsScore >= 80
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                  : "bg-amber-500/10 border-amber-500/20 text-amber-400"
              }`}>
                ATS Score: {atsScore}%
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {atsFeedback.length === 0 ? (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                  <CheckCircle className="h-4 w-4" />
                  <span>Excellent resume details! Formatted perfectly for BPUT placements.</span>
                </div>
              ) : (
                atsFeedback.map((fb, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-zinc-400 text-xs font-medium">
                    <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>{fb}</span>
                  </div>
                ))
              )}
            </div>
          </GlassCard>
        )}
      </div>

      {/* Resume Live Preview (Right column, displayed in print!) */}
      <div className="bg-white text-zinc-900 border border-zinc-300 p-8 sm:p-12 rounded-2xl shadow-xl flex flex-col gap-6 text-left max-w-[850px] mx-auto min-h-[900px] font-serif print:border-0 print:shadow-none print:p-0 print:rounded-none">
        {/* Title Header */}
        <div className="text-center border-b pb-4">
          <h1 className="text-2xl font-bold tracking-wide uppercase">{personal.name}</h1>
          <div className="flex justify-center items-center gap-4 text-[10px] text-zinc-650 flex-wrap mt-2 select-text font-sans">
            <span>📞 {personal.phone}</span>
            <span>✉️ {personal.email}</span>
            <span>🔗 {personal.github}</span>
            <span>🔗 {personal.linkedin}</span>
          </div>
        </div>

        {/* Education Section */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xs uppercase tracking-widest font-bold border-b border-zinc-300 pb-1 text-zinc-800">
            Education
          </h3>
          <div className="flex justify-between text-xs flex-wrap font-sans">
            <span className="font-bold text-zinc-850">{education.college}</span>
            <span className="text-zinc-600">{education.timeline}</span>
          </div>
          <div className="flex justify-between text-xs text-zinc-600 italic mt-0.5">
            <span>{education.degree}</span>
            <span>Cumulative CGPA: {education.cgpa} / 10.0</span>
          </div>
        </div>

        {/* Technical Skills */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xs uppercase tracking-widest font-bold border-b border-zinc-300 pb-1 text-zinc-800">
            Technical Skills
          </h3>
          <p className="text-xs font-sans leading-relaxed text-zinc-800 font-medium">
            {skills}
          </p>
        </div>

        {/* Projects */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs uppercase tracking-widest font-bold border-b border-zinc-300 pb-1 text-zinc-800">
            Academic Projects
          </h3>
          {projects.map((p, idx) => (
            <div key={idx} className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs flex-wrap font-sans">
                <span className="font-bold text-zinc-850">{p.title}</span>
                <span className="text-zinc-550 italic">{p.tech}</span>
              </div>
              <p className="text-xs text-zinc-700 leading-relaxed pl-3 border-l-2 border-zinc-200">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Extra certifications / achievements */}
        <div className="flex flex-col gap-2 mt-2">
          <h3 className="text-xs uppercase tracking-widest font-bold border-b border-zinc-300 pb-1 text-zinc-800">
            Certifications & Extracurriculars
          </h3>
          <ul className="list-disc pl-5 text-xs text-zinc-700 flex flex-col gap-1.5 font-medium leading-relaxed font-sans">
            <li>NPTEL Certified in Design and Analysis of Algorithms (Elite Silver Rank).</li>
            <li>Completed 30+ coding problem sets in College Buddy Sandbox.</li>
            <li>Active volunteer, Computer Science student forum.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
