import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/note/${note._id}`);

  }
  const handleDelete = async (e, id) => {
    e.stopPropagation(); // prevent parent click

    // if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      const res = await api.delete(`/notes/${id}`);
      console.log("Delete Response:", res);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <div
      className="card bg-base-100 hover:shadow-lg transition-transform duration-150 
      hover:border-2 border-solid border-[#433aeb]"
    >
      <div className="card-body">
        <Link to={`/note/${note._id}`}>
          <h3 className="card-title text-base-content">{note.title}</h3>
          <p className="text-white line-clamp-3">{note.content}</p>
        </Link>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {/* Format date here if needed */}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon onClick={() => handleEdit()} className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
