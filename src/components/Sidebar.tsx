"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Code,
  Calendar,
  Percent,
  Clock,
  FileText,
  Briefcase,
  Users,
  MessageSquare,
  FolderOpen,
  User,
  ShieldAlert,
  LogOut,
  Menu,
  X,
  Sparkles,
  Trophy,
} from "lucide-react";

interface SidebarProps {
  user: {
    name: string;
    role: string;
    xp: number;
    level: number;
    studyStreak: number;
  } | null;
  onLogout: () => void;
}

export default function Sidebar({ user, onLogout }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Semesters", href: "/semester", icon: BookOpen },
    { name: "Coding Hub", href: "/coding", icon: Code },
    { name: "Attendance", href: "/attendance", icon: Calendar },
    { name: "CGPA Calculator", href: "/cgpa", icon: Percent },
    { name: "Study Planner", href: "/planner", icon: Clock },
    { name: "Resume Builder", href: "/resume", icon: FileText },
    { name: "Placement Hub", href: "/placement", icon: Briefcase },
    { name: "Projects Hub", href: "/projects", icon: FolderOpen },
    { name: "Community Forum", href: "/community", icon: MessageSquare },
    { name: "Study Groups", href: "/groups", icon: Users },
    { name: "My Profile", href: "/profile", icon: User },
  ];

  const adminItems = [
    { name: "Admin Dashboard", href: "/admin", icon: ShieldAlert },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  const SidebarContent = () => (
    <div className="flex flex-col h-full glass-panel text-zinc-100 p-4 border-r border-zinc-800 shadow-2xl justify-between w-64 md:w-72">
      <div className="flex flex-col gap-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-blue-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-200">
              COLLEGE BUDDY
            </h1>
            <p className="text-[10px] text-zinc-400 font-semibold tracking-widest uppercase">
              BPUT CSE Portal
            </p>
          </div>
        </div>

        {/* User Quick Progress (Gamification widget) */}
        {user && (
          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400 flex items-center gap-1 font-medium">
                <Trophy className="h-3.5 w-3.5 text-amber-500" /> Lvl {user.level} Student
              </span>
              <span className="text-blue-400 font-bold">{user.xp} XP</span>
            </div>
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${(user.xp % 100)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-zinc-500 mt-1">
              <span>Streak: 🔥 {user.studyStreak} Days</span>
              <span className="capitalize px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20">
                {user.role.toLowerCase()}
              </span>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1 overflow-y-auto max-h-[50vh] pr-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 font-medium ${
                  isActive
                    ? "bg-blue-600/20 text-blue-400 border-l-2 border-blue-500 shadow-md shadow-blue-500/5"
                    : "hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
                {item.name}
              </Link>
            );
          })}

          {/* Admin panel conditionally rendered */}
          {user && (user.role === "ADMIN" || user.role === "MENTOR") && (
            <>
              <div className="border-t border-zinc-800/80 my-3 pt-3">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 px-3 font-semibold">
                  Management
                </span>
              </div>
              {adminItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 font-medium ${
                      isActive
                        ? "bg-rose-600/20 text-rose-400 border-l-2 border-rose-500 shadow-md shadow-rose-500/5"
                        : "hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5" />
                    {item.name}
                  </Link>
                );
              })}
            </>
          )}
        </nav>
      </div>

      {/* Logout / Bottom Actions */}
      <button
        onClick={onLogout}
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all duration-200"
      >
        <LogOut className="h-4.5 w-4.5" />
        Log Out
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-850 sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-1.5 rounded-lg text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-bold text-sm tracking-wider text-white">
            COLLEGE BUDDY
          </span>
        </Link>
        <button
          onClick={toggleSidebar}
          className="text-zinc-300 p-1 hover:bg-zinc-800 rounded-lg"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Sidebar overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={toggleSidebar}
          />
          <div className="relative z-50 h-full w-64">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 lg:w-72 h-screen sticky top-0 flex-shrink-0 z-30">
        <SidebarContent />
      </div>
    </>
  );
}
