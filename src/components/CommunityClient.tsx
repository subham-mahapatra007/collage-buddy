"use client";

import { useState } from "react";
import { MessageSquare, ThumbsUp, Plus, Search, Brain, Send, Bookmark, AlertTriangle } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import { createCommunityPost, addComment } from "@/app/actions";

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  likes: number;
  comments: { author: string; content: string }[];
  author: string;
  liked: boolean;
}

export default function CommunityClient() {
  const [activeTab, setActiveTab] = useState<"All" | "Doubts" | "Career" | "Notes">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  // New post fields
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Doubts");
  const [newContent, setNewContent] = useState("");

  // New comment text
  const [commentText, setCommentText] = useState("");

  const [posts, setPosts] = useState<Post[]>([
    {
      id: "cp1",
      title: "Help needed with QuickSort worst-case dry run",
      content: "Can someone show how the arrays split when we pick the first element as pivot on an already sorted array? Struggling with BPUT Part-B numericals.",
      category: "Doubts",
      likes: 8,
      comments: [
        { author: "Rajesh Sekhar (Mentor)", content: "Since the array is sorted, if you pick the first element, one split has 0 elements and the other has N-1. This leads to O(N^2) complexity. Try drawing a tree diagram." },
      ],
      author: "Rahul Mohanty",
      liked: false,
    },
    {
      id: "cp2",
      title: "Normal-Form normalization cheat sheet uploaded",
      content: "I have uploaded a summary of normal forms from 1NF to BCNF in the Semester 5 DBMS section. Let me know if you find it helpful for semester tests.",
      category: "Notes",
      likes: 14,
      comments: [],
      author: "Ananya Mishra (Mentor)",
      liked: true,
    },
  ]);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPostItem: Post = {
      id: "post-" + Math.floor(Math.random() * 1000),
      title: newTitle,
      content: newContent,
      category: newCategory,
      likes: 0,
      comments: [],
      author: "Subham Kumar (You)",
      liked: false,
    };

    setPosts([newPostItem, ...posts]);
    setNewTitle("");
    setNewContent("");
    setShowAddForm(false);

    try {
      const formData = {
        title: newTitle,
        content: newContent,
        category: newCategory,
        tags: "[]",
      };
      await createCommunityPost(formData);
    } catch (err) {
      console.warn("Offline post completed.");
    }
  };

  const handleAddCommentSubmit = async (postId: string) => {
    if (!commentText.trim()) return;

    setPosts(
      posts.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [...p.comments, { author: "Subham Kumar (You)", content: commentText }],
          };
        }
        return p;
      })
    );

    const txt = commentText;
    setCommentText("");

    try {
      const formData = { postId, content: txt };
      await addComment(formData);
    } catch (err) {
      console.warn("Offline comment completed.");
    }
  };

  const handleLikeToggle = (postId: string) => {
    setPosts(
      posts.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            likes: p.liked ? p.likes - 1 : p.likes + 1,
            liked: !p.liked,
          };
        }
        return p;
      })
    );
  };

  const filteredPosts = posts.filter((p) => {
    const matchesTab = activeTab === "All" || p.category === activeTab;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-900/40 border border-zinc-850 p-6 rounded-3xl">
        <div>
          <span className="text-[10px] text-blue-500 font-extrabold uppercase tracking-widest block">
            Community Discussions
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            CSE Forum & Q&A Board
          </h2>
          <p className="text-zinc-500 text-xs mt-1">
            Post academic doubts, share study booklets, and collaborate with mentors.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-lg shadow-blue-500/10 cursor-pointer"
        >
          <Plus className="h-4 w-4" /> Start Discussion
        </button>
      </div>

      {/* Add Post Form */}
      {showAddForm && (
        <GlassCard glowColor="rgba(59, 130, 246, 0.05)" hoverEffect={false}>
          <h3 className="font-extrabold text-xs uppercase text-zinc-200 tracking-wider mb-4 pb-2 border-b border-zinc-900">
            Create Discussion Post
          </h3>
          <form onSubmit={handleCreatePost} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 flex flex-col gap-1">
                <label className="text-[9px] text-zinc-550 font-bold uppercase tracking-wider">Title *</label>
                <input
                  type="text"
                  required
                  placeholder="Summarize your doubt or file name..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="bg-zinc-900 border border-zinc-850 text-zinc-200 text-xs rounded-xl p-2.5 outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] text-zinc-550 font-bold uppercase tracking-wider">Category *</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="bg-zinc-900 border border-zinc-850 text-zinc-300 text-xs rounded-xl p-2.5 outline-none"
                >
                  <option value="Doubts">Doubts & Questions</option>
                  <option value="Notes">Share Notes/PDFs</option>
                  <option value="Career">Career & Placement</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[9px] text-zinc-550 font-bold uppercase tracking-wider">Discussion Details *</label>
              <textarea
                required
                rows={4}
                placeholder="Elaborate details so seniors or faculty can support you..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="bg-zinc-900 border border-zinc-850 text-zinc-200 text-xs rounded-xl p-3 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex gap-3 justify-end">
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
                Post Discussion
              </button>
            </div>
          </form>
        </GlassCard>
      )}

      {/* Filter and search */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 select-none">
          {["All", "Doubts", "Notes", "Career"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat as any)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                activeTab === cat
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-zinc-900 border border-zinc-850 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex items-center max-w-xs w-full">
          <input
            type="text"
            placeholder="Search discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/60 border border-zinc-850 text-zinc-200 placeholder-zinc-650 rounded-xl py-2 pl-9 pr-3 text-xs focus:outline-none"
          />
          <Search className="absolute left-3 h-4 w-4 text-zinc-650" />
        </div>
      </div>

      {/* Forum list */}
      <div className="flex flex-col gap-4">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 text-zinc-600 text-xs font-semibold italic">
            No discussion posts found.
          </div>
        ) : (
          filteredPosts.map((post) => {
            const isExpanded = expandedPostId === post.id;
            return (
              <GlassCard key={post.id} glowColor="rgba(255,255,255,0.01)" hoverEffect={false}>
                {/* Post Main Body */}
                <div className="text-left flex flex-col gap-3">
                  <div className="flex justify-between items-center gap-2 flex-wrap">
                    <span className="text-[9px] bg-zinc-900 text-zinc-405 border border-zinc-800 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-semibold">
                      Posted by {post.author}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-sm text-zinc-200">{post.title}</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed font-medium">
                    {post.content}
                  </p>

                  {/* Actions buttons */}
                  <div className="flex items-center gap-5 mt-2 pt-3 border-t border-zinc-900/80">
                    <button
                      onClick={() => handleLikeToggle(post.id)}
                      className={`flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer ${
                        post.liked ? "text-blue-500" : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      <ThumbsUp className={`h-4 w-4 ${post.liked ? "fill-blue-500/10" : ""}`} />
                      <span>{post.likes}</span>
                    </button>

                    <button
                      onClick={() => setExpandedPostId(isExpanded ? null : post.id)}
                      className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-300 cursor-pointer"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.comments.length} Reply{post.comments.length !== 1 ? "ies" : ""}</span>
                    </button>

                    <button className="text-zinc-500 hover:text-zinc-300 ml-auto cursor-pointer" title="Report Post">
                      <AlertTriangle className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Expanded Comment section */}
                {isExpanded && (
                  <div className="mt-5 pt-5 border-t border-zinc-900 flex flex-col gap-4 text-left">
                    <h4 className="font-bold text-[10px] uppercase text-zinc-500 tracking-wider">
                      Replies Summary
                    </h4>

                    {/* Replies list */}
                    <div className="flex flex-col gap-3">
                      {post.comments.length === 0 ? (
                        <p className="text-[11px] text-zinc-650 font-medium italic">
                          No replies yet. Be the first to help!
                        </p>
                      ) : (
                        post.comments.map((comment, cIdx) => (
                          <div
                            key={cIdx}
                            className="bg-zinc-950/30 border border-zinc-900 p-3 rounded-xl flex flex-col gap-1 text-xs"
                          >
                            <span className="font-bold text-[10px] text-zinc-450 block uppercase">
                              {comment.author}
                            </span>
                            <p className="text-zinc-400 font-medium leading-relaxed">
                              {comment.content}
                            </p>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Add reply form */}
                    <div className="flex gap-2 mt-2">
                      <input
                        type="text"
                        placeholder="Write a helpful answer..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="flex-1 bg-zinc-900 border border-zinc-850 text-zinc-200 placeholder-zinc-600 rounded-xl py-2 px-3 text-xs focus:outline-none"
                      />
                      <button
                        onClick={() => handleAddCommentSubmit(post.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-2 transition-all cursor-pointer"
                      >
                        <Send className="h-4 w-4" />
                      </button>
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
