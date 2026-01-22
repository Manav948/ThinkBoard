import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import RateLimited from "../components/RateLimited";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import api from "../lib/axios";

function Home() {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data.allNote);
        setIsRateLimited(false);
      } catch (error) {
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          console.error("Failed to load notes", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="relative min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimited />}

      <main className="mx-auto max-w-7xl px-4 py-6">
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-40 animate-pulse rounded-2xl bg-gradient-to-r from-gray-200 to-gray-300 shadow-lg"
              />
            ))}
          </div>
        )}

        {!isLoading && notes.length === 0 && !isRateLimited && (
          <NotesNotFound />
        )}

        {!isLoading && notes.length > 0 && !isRateLimited && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {notes.map((note) => (
              <motion.div key={note._id} variants={itemVariants}>
                <NoteCard note={note} setNotes={setNotes} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}

export default Home;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};
