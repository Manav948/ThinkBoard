import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeftIcon, Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";

function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", { title, content });
      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {
      console.error("Error creating note", error);
      toast.error("Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[160px]" />
        <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[160px]" />
      </div>

      <main className="relative z-10 mx-auto max-w-3xl px-4 py-10">
    
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition"
        >
          <ArrowLeftIcon className="size-4" />
          Back to notes
        </Link>

        
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="
            rounded-3xl border border-white/10
            bg-white/5 backdrop-blur-xl
            shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]
          "
        >
          <form onSubmit={handleSubmit} className="flex flex-col">
           
            <div className="border-b border-white/10 px-6 py-6">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create new note
              </h1>
              <p className="mt-1 text-sm text-white/60">
                Capture your thoughts clearly and quickly
              </p>
            </div>

         
            <div className="flex flex-col gap-6 px-6 py-6">
              <input
                type="text"
                placeholder="Untitled note"
                className="
                  w-full bg-transparent text-3xl font-bold outline-none
                  placeholder:text-white/30
                "
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                placeholder="Start writing your note..."
                className="
                  min-h-[320px] w-full resize-none bg-transparent
                  text-base leading-relaxed outline-none
                  placeholder:text-white/40
                "
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-end gap-4 border-t border-white/10 px-6 py-6">
              <button
                type="submit"
                disabled={loading}
                className="
                  inline-flex items-center justify-center gap-2
                  rounded-xl px-8 py-3 text-sm font-medium
                  bg-gradient-to-r from-purple-500 to-cyan-500
                  text-white shadow-lg hover:shadow-xl
                  transition-all hover:scale-[1.04]
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                {loading ? (
                  <>
                    <Loader2Icon className="size-5 animate-spin" />
                    Creating…
                  </>
                ) : (
                  "Create Note"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}

export default Create;
