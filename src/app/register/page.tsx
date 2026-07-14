"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerStudent } from "@/app/actions";
import { Sparkles, ArrowRight, User, Mail, Lock, Phone, Book, Hash, AlertCircle, Loader } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    college: "",
    branch: "Computer Science & Engineering",
    semester: "3",
    rollNumber: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await registerStudent(formData);
    setLoading(false);

    if (res.success) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setError(res.error || "An error occurred during account creation.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Decorative Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-lg z-10 py-10">
        {/* Brand */}
        <div className="flex flex-col items-center gap-2 mb-8 text-center">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-500/25">
            <Sparkles className="h-6 w-6" />
          </div>
          <h1 className="font-extrabold text-xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-200 uppercase mt-1">
            College Buddy
          </h1>
          <p className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">
            BPUT CSE Academic Portal
          </p>
        </div>

        {/* Card */}
        <div className="glass-panel rounded-3xl p-8 border border-zinc-800/80 shadow-2xl">
          <h2 className="text-lg font-bold text-zinc-100 mb-6">Create Student Account</h2>

          {error && (
            <div className="flex items-start gap-2.5 bg-rose-500/10 border border-rose-500/25 text-rose-400 rounded-xl p-3 text-xs mb-5">
              <AlertCircle className="h-4.5 w-4.5 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
              <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                Full Name *
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  required
                  placeholder="Rahul Mohanty"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-zinc-900/60 border border-zinc-850 text-zinc-200 placeholder-zinc-650 rounded-xl py-3 pl-10 pr-4 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all"
                />
                <User className="absolute left-3.5 h-4 w-4 text-zinc-600" />
              </div>
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
              <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                Email Address *
              </label>
              <div className="relative flex items-center">
                <input
                  type="email"
                  required
                  placeholder="rahul.cse@outr.ac.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-zinc-900/60 border border-zinc-850 text-zinc-200 placeholder-zinc-650 rounded-xl py-3 pl-10 pr-4 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all"
                />
                <Mail className="absolute left-3.5 h-4 w-4 text-zinc-600" />
              </div>
            </div>

            {/* Mobile Number */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                Mobile Number
              </label>
              <div className="relative flex items-center">
                <input
                  type="tel"
                  placeholder="+91 9876543210"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full bg-zinc-900/60 border border-zinc-850 text-zinc-200 placeholder-zinc-650 rounded-xl py-3 pl-10 pr-4 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all"
                />
                <Phone className="absolute left-3.5 h-4 w-4 text-zinc-600" />
              </div>
            </div>

            {/* College Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                College / Institute
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="CET Bhubaneswar / GITA"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className="w-full bg-zinc-900/60 border border-zinc-850 text-zinc-200 placeholder-zinc-650 rounded-xl py-3 pl-10 pr-4 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all"
                />
                <Book className="absolute left-3.5 h-4 w-4 text-zinc-600" />
              </div>
            </div>

            {/* Branch */}
            <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
              <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                Academic Branch
              </label>
              <input
                type="text"
                disabled
                value={formData.branch}
                className="w-full bg-zinc-950/40 border border-zinc-850 text-zinc-500 rounded-xl py-3 px-4 text-xs select-none"
              />
            </div>

            {/* Semester Select */}
            <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
              <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                Current Semester *
              </label>
              <select
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                className="w-full bg-zinc-900/60 border border-zinc-850 text-zinc-200 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <option key={sem} value={sem} className="bg-zinc-955 text-zinc-250">
                    Semester {sem}
                  </option>
                ))}
              </select>
            </div>

            {/* Roll Number */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                BPUT Roll Number *
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  required
                  placeholder="2201201045"
                  value={formData.rollNumber}
                  onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                  className="w-full bg-zinc-900/60 border border-zinc-850 text-zinc-200 placeholder-zinc-650 rounded-xl py-3 pl-10 pr-4 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all"
                />
                <Hash className="absolute left-3.5 h-4 w-4 text-zinc-600" />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                Choose Password *
              </label>
              <div className="relative flex items-center">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-zinc-900/60 border border-zinc-850 text-zinc-200 placeholder-zinc-650 rounded-xl py-3 pl-10 pr-4 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all"
                />
                <Lock className="absolute left-3.5 h-4 w-4 text-zinc-600" />
              </div>
            </div>

            {/* Submit */}
            <div className="col-span-2 mt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all text-xs w-full disabled:opacity-50"
              >
                {loading ? (
                  <Loader className="h-4.5 w-4.5 animate-spin" />
                ) : (
                  <>
                    Create My Student Profile <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Already have account */}
          <div className="mt-6 text-center text-xs text-zinc-500">
            Already have an account?{" "}
            <a href="/login" className="font-semibold text-blue-400 hover:underline">
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
