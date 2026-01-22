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
    } catch (error) {
      console.error("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative rounded-2xl border border-gray-200 
                 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <Link to={`/note/${note._id}`} className="block p-6 relative z-10">
        <h3 className="mb-3 line-clamp-1 text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {note.title}
        </h3>

        <p className="line-clamp-3 text-sm text-gray-600 leading-relaxed">
          {note.content}
        </p>
      </Link>

      <div className="flex items-center justify-between px-6 pb-4 relative z-10">
        <span className="text-xs text-gray-400">
          {new Date(note.createdAt).toLocaleDateString()}
        </span>
       <div
          className="flex items-center gap-2 opacity-0 
                     transition-opacity duration-200 group-hover:opacity-100"
        >
          <button
            onClick={handleEdit}
            className="p-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <PenSquareIcon className="size-4 text-blue-600" />
          </button>

          <button
            onClick={(e) => handleDelete(e, note._id)}
            className="p-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2Icon className="size-4 text-red-500" />
          </button>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 rounded-2xl 
                   ring-1 ring-transparent group-hover:ring-blue-400/40 
                   transition-all duration-300"
      />
    </motion.div>
  );
};

export default NoteCard;
