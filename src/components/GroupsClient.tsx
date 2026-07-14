"use client";

import { useState } from "react";
import { Users, Plus, Send, Paperclip, FileText, ArrowRight, Brain } from "lucide-react";
import GlassCard from "@/components/GlassCard";

interface Message {
  author: string;
  content: string;
  file?: { name: string; size: string };
  time: string;
}

interface Group {
  id: string;
  name: string;
  desc: string;
  messages: Message[];
}

export default function GroupsClient() {
  const [selectedGroupId, setSelectedGroupId] = useState("g1");
  const [typedMessage, setTypedMessage] = useState("");
  const [groups, setGroups] = useState<Group[]>([
    {
      id: "g1",
      name: "Discrete Math Prep",
      desc: "Group focusing on relations, functions, and graph theory topics for Sem 3 mid-sems.",
      messages: [
        { author: "Rajesh Sekhar", content: "Hey guys, has anyone solved the 2024 graph coloring problem?", time: "10:15 AM" },
        { author: "Ananya Mishra", content: "Yes! Uploading my step-by-step PDF file here.", file: { name: "discrete_math_coloring_sol.pdf", size: "1.2 MB" }, time: "10:17 AM" },
      ],
    },
    {
      id: "g2",
      name: "Mini Project Hub",
      desc: "Discussing geo-fencing frameworks, APIs, and PostgreSQL database migrations.",
      messages: [
        { author: "Rahul Mohanty", content: "Should we use Leaflet or Google Maps APIs for geofencing?", time: "Yesterday" },
        { author: "Subham Kumar", content: "Leaflet is open source and works beautifully for mini projects.", time: "Yesterday" },
      ],
    },
  ]);

  const activeGroup = groups.find((g) => g.id === selectedGroupId) || groups[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    const newMsg: Message = {
      author: "Subham Kumar (You)",
      content: typedMessage,
      time: "Just now",
    };

    const updatedGroups = groups.map((g) => {
      if (g.id === selectedGroupId) {
        return {
          ...g,
          messages: [...g.messages, newMsg],
        };
      }
      return g;
    });

    setGroups(updatedGroups);
    setTypedMessage("");

    // Simulate auto buddy reply
    setTimeout(() => {
      const responses = [
        "Good point, let's verify that with the syllabus booklet.",
        "Perfect! I will double-check the time complexity for this.",
        "Can we schedule a quick Pomodoro focus block on College Buddy for this today?",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const buddyMsg: Message = {
        author: "Ananya Mishra",
        content: randomResponse,
        time: "Just now",
      };

      setGroups(
        updatedGroups.map((g) => {
          if (g.id === selectedGroupId) {
            return {
              ...g,
              messages: [...g.messages, buddyMsg],
            };
          }
          return g;
        })
      );
    }, 1500);
  };

  const handleCreateGroup = () => {
    const name = prompt("Enter study group name:");
    if (!name) return;
    const desc = prompt("Enter group description:");

    const newGroup: Group = {
      id: "g-" + Math.floor(Math.random() * 1000),
      name,
      desc: desc || "Study collaboration group.",
      messages: [{ author: "System", content: `Study Group "${name}" created. Invite colleagues!`, time: "Just now" }],
    };

    setGroups([...groups, newGroup]);
    setSelectedGroupId(newGroup.id);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[80vh]">
      {/* Groups Navigation pane (1 col) */}
      <div className="flex flex-col gap-4 h-full overflow-y-auto">
        <GlassCard glowColor="rgba(59, 130, 246, 0.04)" hoverEffect={false} className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col gap-4 text-left">
            <div className="flex justify-between items-center pb-3 border-b border-zinc-900">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                <h3 className="font-extrabold text-sm text-zinc-150 uppercase tracking-wide">
                  Study Groups
                </h3>
              </div>
              <button
                onClick={handleCreateGroup}
                className="p-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-850 rounded-xl text-zinc-350 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* List of groups */}
            <div className="flex flex-col gap-2 mt-2">
              {groups.map((g) => {
                const isActive = g.id === selectedGroupId;
                return (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGroupId(g.id)}
                    className={`flex flex-col gap-1 p-3.5 rounded-2xl border text-left transition-all ${
                      isActive
                        ? "bg-blue-600/10 border-blue-500/25 text-blue-450 shadow-md shadow-blue-500/5"
                        : "bg-zinc-900/40 border-zinc-850/60 text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    <span className="font-extrabold text-xs text-zinc-200">{g.name}</span>
                    <span className="text-[10px] text-zinc-500 line-clamp-1">{g.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Group Chat Console Pane (2 cols) */}
      <div className="lg:col-span-2 flex flex-col gap-4 h-full">
        <GlassCard glowColor="rgba(59, 130, 246, 0.02)" hoverEffect={false} className="flex-1 flex flex-col justify-between h-full p-0">
          {/* Header */}
          <div className="px-5 py-4 border-b border-zinc-900 flex justify-between items-center text-left bg-zinc-900/20">
            <div>
              <h3 className="font-extrabold text-sm text-zinc-200">{activeGroup.name}</h3>
              <p className="text-[10px] text-zinc-500 mt-0.5 line-clamp-1">{activeGroup.desc}</p>
            </div>
          </div>

          {/* Chat message list area */}
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 max-h-[50vh] min-h-[40vh] text-left">
            {activeGroup.messages.map((msg, idx) => {
              const isMe = msg.author.includes("You");
              const isSystem = msg.author === "System";

              if (isSystem) {
                return (
                  <div key={idx} className="text-center py-2 text-zinc-650 text-[10px] font-bold uppercase tracking-wider">
                    {msg.content}
                  </div>
                );
              }

              return (
                <div
                  key={idx}
                  className={`flex flex-col gap-1 max-w-[70%] text-xs ${
                    isMe ? "ml-auto items-end" : "mr-auto items-start"
                  }`}
                >
                  <span className="text-[9px] text-zinc-550 font-bold uppercase">
                    {msg.author} &bull; {msg.time}
                  </span>
                  
                  {/* Text bubble */}
                  {msg.content && (
                    <div
                      className={`p-3 rounded-2xl leading-relaxed font-semibold ${
                        isMe
                          ? "bg-blue-600 text-white rounded-tr-none"
                          : "bg-zinc-900 border border-zinc-850 text-zinc-300 rounded-tl-none"
                      }`}
                    >
                      {msg.content}
                    </div>
                  )}

                  {/* File bubble */}
                  {msg.file && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-zinc-950 border border-zinc-900 text-[11px] font-mono">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <div className="text-left">
                        <span className="text-zinc-200 block truncate max-w-[120px]">
                          {msg.file.name}
                        </span>
                        <span className="text-zinc-550 text-[9px] block">
                          {msg.file.size}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Message input footer */}
          <div className="px-5 py-4 border-t border-zinc-900 bg-zinc-900/10">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  alert("File attachment: Select document from Supabase storage.");
                }}
                className="bg-zinc-900 border border-zinc-850 text-zinc-400 hover:text-zinc-200 rounded-xl p-3"
                title="Attach Syllabus notes"
              >
                <Paperclip className="h-4.5 w-4.5" />
              </button>
              <input
                type="text"
                placeholder={`Message in ${activeGroup.name}...`}
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
                className="flex-1 bg-zinc-955 border border-zinc-850 text-zinc-200 placeholder-zinc-650 rounded-xl py-3 px-4 text-xs focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-3 shadow-lg shadow-blue-500/10"
              >
                <Send className="h-4.5 w-4.5" />
              </button>
            </form>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
