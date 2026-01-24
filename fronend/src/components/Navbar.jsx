import { PlusIcon, SearchIcon } from "lucide-react";
import { Link } from "react-router";

function Navbar() {
  return (
    <header className="sticky top-4 z-50">
      <div className="mx-auto max-w-6xl px-4">
        <div
          className="
            relative flex h-14 md:h-16 items-center justify-between
            rounded-2xl border border-white/10
            bg-white/5 backdrop-blur-xl
            shadow-[0_20px_60px_-25px_rgba(0,0,0,0.8)]
            px-3 md:px-4
          "
        >
          <div className="pointer-events-none absolute inset-0 hidden md:block rounded-2xl">
            <div className="absolute -top-6 left-1/3 h-24 w-24 rounded-full bg-purple-500/30 blur-[60px]" />
            <div className="absolute -bottom-6 right-1/3 h-24 w-24 rounded-full bg-cyan-500/30 blur-[60px]" />
          </div>

          <div className="relative z-10 flex items-center gap-2">
            <button
              className="
                hidden md:flex h-10 w-10 items-center justify-center rounded-xl
                border border-white/10 bg-white/5
                hover:bg-white/10 transition
              "
            >
              <SearchIcon className="size-4 text-white/70" />
            </button>

            <div className="flex md:hidden items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-sm font-bold text-white">
                TB
              </div>
              <span className="text-sm font-semibold text-white">
                Think-Board
              </span>
            </div>
          </div>

          <div className="absolute hidden md:flex items-center gap-3 z-10">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg">
              TB
            </div>
            <div className="leading-tight">
              <h1 className="text-sm font-semibold tracking-wide text-white">
                Think-Board
              </h1>
              <p className="text-[11px] text-white/50">
                Organize your thoughts
              </p>
            </div>
          </div>

    
          <div className="relative z-10 flex items-center gap-2 md:gap-3">
            <Link
              to="/create"
              className="
                flex items-center gap-2 rounded-xl
                bg-gradient-to-r from-purple-500 to-cyan-500
                px-3 py-2 md:px-4
                text-sm font-medium text-white
                shadow-lg hover:shadow-xl
                transition-all active:scale-95
              "
            >
              <PlusIcon className="size-4" />
              <span className="hidden sm:inline">New</span>
            </Link>

            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-xs font-semibold text-white shadow-lg">
              U
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

