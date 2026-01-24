import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/note/${note._id}`);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      toast.success("Note deleted");
    } catch {
      toast.error("Failed to delete note");
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.025 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group relative overflow-hidden rounded-3xl
                 bg-gradient-to-br from-white/[0.06] to-white/[0.02]
                 border border-white/10
                 backdrop-blur-xl
                 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.8)]
                 hover:shadow-[0_35px_80px_-30px_rgba(0,0,0,0.95)]
                 transition-all duration-500"
    >
      {/* Neon gradient glow */}
      <div
        className="absolute -inset-1 rounded-3xl
                   bg-gradient-to-br from-purple-500/20 via-cyan-500/20 to-pink-500/20
                   opacity-0 group-hover:opacity-100
                   blur-2xl transition-opacity duration-500"
      />

      {/* Animated border */}
      <div
        className="absolute inset-0 rounded-3xl
                   ring-1 ring-inset ring-white/10
                   group-hover:ring-cyan-400/40 transition-all"
      />

      <Link to={`/note/${note._id}`} className="relative z-10 block p-6">
        <h3
          className="mb-3 line-clamp-1 text-lg font-semibold
                     text-white/90
                     group-hover:text-cyan-300 transition-colors"
        >
          {note.title}
        </h3>

        <p className="line-clamp-3 text-sm leading-relaxed text-white/60">
          {note.content}
        </p>
      </Link>

      <div className="relative z-10 flex items-center justify-between px-6 pb-5">
        <span className="text-xs text-white/40">
          {new Date(note.createdAt).toLocaleDateString()}
        </span>

        {/* Actions */}
        <div
          className="flex items-center gap-2
                     opacity-0 translate-y-2
                     group-hover:opacity-100 group-hover:translate-y-0
                     transition-all duration-300"
        >
          <button
            onClick={handleEdit}
            className="rounded-xl p-2
                       bg-cyan-500/10 hover:bg-cyan-500/20"
          >
            <PenSquareIcon className="size-4 text-cyan-400" />
          </button>

          <button
            onClick={(e) => handleDelete(e, note._id)}
            className="rounded-xl p-2
                       bg-pink-500/10 hover:bg-pink-500/20"
          >
            <Trash2Icon className="size-4 text-pink-400" />
          </button>
        </div>
      </div>

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-full
                   bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500
                   scale-x-0 group-hover:scale-x-100
                   origin-left transition-transform duration-500"
      />
    </motion.div>
  );
};

export default NoteCard;
