import { PlusIcon, SearchIcon } from "lucide-react"
import { Link } from "react-router"

function Navbar() {
    return (
        <header className="sticky top-0 z-50 bg-gradient-to-br from-cyan-500 to-fuchsia-500 backdrop-blur-xl shadow-sm">
            <div className="mx-auto max-w-6xl px-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-mono font-bold shadow-lg">
                            TB
                        </div>
                        <div className="leading-tight">
                            <h1 className="text-lg font-bold tracking-tight text-gray-900">
                                Think-Board
                            </h1>
                            <p className="text-xs text-gray-500">
                                Organize your thoughts
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">

                        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                            <SearchIcon className="size-4 text-gray-600" />
                        </button>

                        <Link
                            to="/create"
                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl gap-2 flex items-center text-sm font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105"
                        >
                            <PlusIcon className="size-4" />
                            <span className="hidden sm:inline">New Note</span>
                        </Link>
                        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white text-sm font-semibold shadow-lg">
                            U
                        </div>
                    </div>
                </div>
            </div>
            </header>
    )
}

export default Navbar
