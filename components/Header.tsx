"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Film, Tv, TrendingUp, Menu, X } from "lucide-react";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-red-500">
          <Film className="w-7 h-7" />
          <span className="bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">
            CineStream
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-red-400 transition flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> Home
          </Link>
          <Link href="/movies" className="hover:text-red-400 transition flex items-center gap-1">
            <Film className="w-4 h-4" /> Movies
          </Link>
          <Link href="/tv" className="hover:text-red-400 transition flex items-center gap-1">
            <Tv className="w-4 h-4" /> TV Shows
          </Link>
        </nav>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative flex-1 max-w-sm hidden sm:block">
          <input
            type="text"
            placeholder="Search movies, TV shows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 text-sm pl-10 pr-4 py-2 rounded-full border border-slate-700 focus:outline-none focus:border-red-500 text-white placeholder-slate-400"
          />
          <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-slate-400" />
        </form>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-3">
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 text-sm pl-10 pr-4 py-2 rounded-full border border-slate-800 text-white"
            />
            <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-slate-400" />
          </form>
          <div className="flex flex-col gap-2 pt-2">
            <Link href="/" className="px-3 py-2 rounded hover:bg-slate-800">Home</Link>
            <Link href="/movies" className="px-3 py-2 rounded hover:bg-slate-800">Movies</Link>
            <Link href="/tv" className="px-3 py-2 rounded hover:bg-slate-800">TV Shows</Link>
          </div>
        </div>
      )}
    </header>
  );
}
