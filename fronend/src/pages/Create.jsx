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
    <div className="min-h-screen">
      <main className="mx-auto max-w-3xl px-4 py-8">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
        >
          <ArrowLeftIcon className="size-4" />
          Back to notes
        </Link>

        
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="rounded-2xl border border-gray-200 bg-white shadow-xl"
        >
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="border-b border-gray-200 px-6 py-6 bg-gradient-to-r from-blue-50 to-purple-50">
              <h1 className="text-2xl font-bold text-gray-900">
                Create new note
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Capture your thoughts clearly and quickly
              </p>
            </div>

            <div className="flex flex-col gap-6 px-6 py-6">
              <input
                type="text"
                placeholder="Untitled note"
                className="w-full border-none bg-transparent text-3xl font-bold 
                           outline-none placeholder:text-gray-300 focus:ring-0"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                placeholder="Start writing your note..."
                className="min-h-[300px] w-full resize-none border-none bg-transparent 
                           text-base leading-relaxed outline-none 
                           placeholder:text-gray-400 focus:ring-0"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-end gap-4 border-t border-gray-200 px-6 py-6 bg-gray-50">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl px-8 py-3 font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2Icon className="size-5 animate-spin mr-2" />
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
