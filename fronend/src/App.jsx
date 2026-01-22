import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Create from "./pages/Create";
import NoteDetail from "./pages/NoteDetail";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-blue-500 to-purple-500 ">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,107,107,0.1),transparent_50%)]" />
      </div>

      <div className="relative z-10 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/note/:id" element={<NoteDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
