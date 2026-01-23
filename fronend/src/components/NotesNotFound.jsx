import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-8 max-w-md mx-auto text-center">
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-full p-10 shadow-lg">
        <NotebookIcon className="size-12 text-blue-600" />
      </div>
      <div>
        <h3 className="text-3xl font-bold text-gray-100 mb-2">No notes yet</h3>
        <p className="text-gray-200 leading-relaxed">
          Ready to organize your thoughts? Create your first note to get started on your journey.
        </p>
      </div>
      <Link to="/create" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105">
        Create Your First Note
      </Link>
    </div>
  );
};
export default NotesNotFound;
