"use client";

import { useState } from "react";
import { Bell, Search, Flame, Sparkles, LogOut, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  read: boolean;
}

interface TopNavbarProps {
  user: {
    name: string;
    semester: number;
    studyStreak: number;
    role: string;
  } | null;
  onLogout: () => void;
}

export default function TopNavbar({ user, onLogout }: TopNavbarProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "n1",
      title: "Placement Alert: TCS Hiring",
      desc: "TCS is hiring CSE graduates. Register by tomorrow night.",
      time: "2h ago",
      read: false,
    },
    {
      id: "n2",
      title: "Community Answer",
      desc: "Senior Mentor Rajesh answered your doubt on QuickSort.",
      time: "4h ago",
      read: false,
    },
    {
      id: "n3",
      title: "New Note Uploaded",
      desc: "Faculty Dr. Mishra uploaded DBMS Normalization cheat sheet.",
      time: "1d ago",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/community?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <header className="bg-zinc-950/40 backdrop-blur-md border-b border-zinc-800/80 sticky top-0 z-20 px-6 py-4 flex items-center justify-between">
      {/* Search Input Section */}
      <form onSubmit={handleSearchSubmit} className="hidden sm:flex items-center w-full max-w-sm relative">
        <input
          type="text"
          placeholder="Search subjects, notes, placement, community posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-zinc-900/60 border border-zinc-800 text-zinc-200 placeholder-zinc-500 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all"
        />
        <Search className="absolute left-3.5 h-4 w-4 text-zinc-500" />
      </form>

      {/* Right Side Stats & Actions */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Streak Counter */}
        {user && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-semibold select-none">
            <Flame className="h-4.5 w-4.5 animate-pulse" />
            <span>🔥 {user.studyStreak} Day Streak</span>
          </div>
        )}

        {/* Level Banner */}
        {user && (
          <div className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Sem {user.semester} BPUT CSE</span>
          </div>
        )}

        {/* Notifications Icon with Popup */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/70 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 transition-all"
          >
            <Bell className="h-4.5 w-4.5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white font-bold text-[9px] h-5 w-5 rounded-full flex items-center justify-center border-2 border-zinc-950">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-50">
              <div className="px-4 py-3 bg-zinc-850 border-b border-zinc-800 flex items-center justify-between">
                <span className="font-bold text-xs text-zinc-200">Notifications</span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[10px] font-bold text-blue-400 hover:text-blue-300"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="divide-y divide-zinc-800 max-h-64 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3.5 transition-all text-left ${
                      notif.read ? "bg-transparent" : "bg-blue-600/5 hover:bg-blue-600/10"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-semibold text-xs text-zinc-200 leading-tight">
                        {notif.title}
                      </h4>
                      <span className="text-[9px] text-zinc-500 whitespace-nowrap">
                        {notif.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                      {notif.desc}
                    </p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-zinc-850 text-center bg-zinc-950/20">
                <Link
                  href="/placement"
                  onClick={() => setShowNotifications(false)}
                  className="text-[10px] font-bold text-zinc-500 hover:text-zinc-300"
                >
                  View placement alerts
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Mini Profile / Logout */}
        {user ? (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-zinc-200">{user.name}</p>
              <p className="text-[9px] text-zinc-500 tracking-wide uppercase font-semibold">
                {user.role}
              </p>
            </div>
            <button
              onClick={onLogout}
              title="Log Out"
              className="p-2 rounded-xl bg-zinc-900/60 hover:bg-rose-500/10 border border-zinc-800 hover:border-rose-500/30 text-zinc-400 hover:text-rose-400 transition-all"
            >
              <LogOut className="h-4.5 w-4.5" />
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition-all"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
