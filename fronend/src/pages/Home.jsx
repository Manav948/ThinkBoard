import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimited from '../components/RateLimited'
import NoteCard from '../components/NoteCard'
import NotesNotFound from '../components/NotesNotFound'
import axios from 'axios'

function Home() {
  const [IsRateLimited, setIsRateLimited] = useState(true);
  const [notes, setNotes] = useState([]);
  const [isloading, setIsloading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/notes")
        setNotes(res.data.allNote)
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error in Fetching data");
        if (error.response && error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          console.error("Failed to load notes")
        }
      } finally {
        setIsloading(false)
      }
    }
    fetchNotes();
  }, [])

  return (
    <div className="relative min-h-screen">
      <Navbar />
      {IsRateLimited && <RateLimited />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {isloading && <div className="text-primary text-center py-10">loading notes...</div>}
        {notes.length === 0 && !IsRateLimited && <NotesNotFound />}
        {notes.length > 0 && !IsRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
