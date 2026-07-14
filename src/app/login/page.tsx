"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/navigation";
import { loginStudent } from "@/app/actions";
import { Sparkles, ArrowRight, Lock, Mail, AlertCircle, Loader } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await loginStudent(formData);
    setLoading(false);

    if (res.success) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setError(res.error || "An error occurred during sign-in.");
    }
  };

  const handleQuickLogin = async (email: string, pass: string) => {
    setError(null);
    setLoading(true);
    const res = await loginStudent({ email, password: pass });
    setLoading(false);

    if (res.success) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setError(res.error || "An error occurred during sign-in.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Decorative Orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md z-10">
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

        {/* Form Card */}
        <div className="glass-panel rounded-3xl p-8 border border-zinc-800/80 shadow-2xl relative">
          <h2 className="text-lg font-bold text-zinc-100 mb-6">Sign In</h2>

          {error && (
            <div className="flex items-start gap-2.5 bg-rose-500/10 border border-rose-500/25 text-rose-400 rounded-xl p-3 text-xs mb-5">
              <AlertCircle className="h-4.5 w-4.5 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative flex items-center">
                <input
                  type="email"
                  required
                  placeholder="name@college.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-zinc-900/60 border border-zinc-850 text-zinc-200 placeholder-zinc-650 rounded-xl py-3 pl-10 pr-4 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all"
                />
                <Mail className="absolute left-3.5 h-4 w-4 text-zinc-600" />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                  Password
                </label>
              </div>
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all text-xs w-full mt-4 disabled:opacity-50"
            >
              {loading ? (
                <Loader className="h-4.5 w-4.5 animate-spin" />
              ) : (
                <>
                  Access Student Portal <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Login Section for Review */}
          <div className="mt-8 pt-6 border-t border-zinc-900">
            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block mb-3 text-center">
              Testing Quick Login (Bypasses Database)
            </span>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin("student@bput.ac.in", "student123")}
                className="bg-zinc-900 hover:bg-zinc-850 border border-zinc-850 text-zinc-300 py-2.5 px-4 rounded-xl text-[10px] font-bold tracking-wide transition-all uppercase flex justify-between items-center"
              >
                <span>Log in as CSE Student</span>
                <span className="text-[9px] text-blue-400 font-extrabold font-mono">student@bput.ac.in</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin("admin@bput.ac.in", "admin123")}
                className="bg-zinc-900 hover:bg-zinc-850 border border-zinc-850 text-zinc-300 py-2.5 px-4 rounded-xl text-[10px] font-bold tracking-wide transition-all uppercase flex justify-between items-center"
              >
                <span>Log in as Admin</span>
                <span className="text-[9px] text-rose-400 font-extrabold font-mono">admin@bput.ac.in</span>
              </button>
            </div>
          </div>

          {/* Create Account Link */}
          <div className="mt-6 text-center text-xs text-zinc-500">
            Don't have an account?{" "}
            <a href="/register" className="font-semibold text-blue-400 hover:underline">
              Create an account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
