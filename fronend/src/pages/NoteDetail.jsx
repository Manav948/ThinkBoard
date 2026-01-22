import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import api from "../lib/axios";
import toast from "react-hot-toast";
import {
  Loader2Icon,
  ArrowLeftIcon,
  Trash2Icon,
} from "lucide-react";

function NoteDetail() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Failed to fetch note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this note permanently?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated");
      navigate("/");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };


  if (loading || !note) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2Icon className="size-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeftIcon className="size-4" />
            Back to notes
          </Link>

          <button
            onClick={handleDelete}
            className="p-2 rounded-lg hover:bg-red-50 transition-colors text-red-500"
          >
            <Trash2Icon className="size-4" />
            Delete
          </button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="rounded-2xl border border-gray-200 bg-white shadow-xl"
        >
          <div className="border-b border-gray-200 px-6 py-6 bg-gradient-to-r from-blue-50 to-purple-50">
            <h1 className="text-2xl font-bold text-gray-900">Edit note</h1>
            <p className="text-sm text-gray-600 mt-1">
              Make changes and save when you’re done
            </p>
          </div>

          <div className="flex flex-col gap-6 px-6 py-6">
            <input
              type="text"
              className="w-full bg-transparent text-3xl font-bold outline-none
                         placeholder:text-gray-300 focus:ring-0"
              placeholder="Untitled note"
              value={note.title}
              onChange={(e) =>
                setNote({ ...note, title: e.target.value })
              }
            />

            <textarea
              className="min-h-[300px] w-full resize-none bg-transparent
                         text-base leading-relaxed outline-none
                         placeholder:text-gray-400 focus:ring-0"
              placeholder="Start writing..."
              value={note.content}
              onChange={(e) =>
                setNote({ ...note, content: e.target.value })
              }
            />
          </div>
          <div className="flex items-center justify-end gap-4 border-t border-gray-200 px-6 py-6 bg-gray-50">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl px-8 py-3 font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2Icon className="size-5 animate-spin mr-2" />
                  Saving…
                </>
              ) : (
                "Save changes"
              )}
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default NoteDetail;
