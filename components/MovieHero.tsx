import Link from "next/link";
import { Play, Info, Star } from "lucide-react";
import { MediaItem } from "@/types/api";

interface MovieHeroProps {
  movie?: MediaItem;
}

export default function MovieHero({ movie }: MovieHeroProps) {
  if (!movie) return null;

  const id = movie.id || movie.subjectId || "";
  const title = movie.title || movie.name || "Featured Movie";
  const coverUrl = movie.cover?.url || movie.posterUrl || "";

  return (
    <div className="relative w-full h-[60vh] min-h-[400px] rounded-2xl overflow-hidden bg-slate-900 mb-8 border border-slate-800 shadow-xl">
      <img
        src={coverUrl}
        alt={title}
        className="w-full h-full object-cover opacity-40 scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />

      <div className="absolute bottom-0 left-0 p-6 md:p-12 max-w-2xl space-y-4">
        {movie.score !== undefined && movie.score > 0 && (
          <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-500/30">
            <Star className="w-3.5 h-3.5 fill-current" /> {movie.score.toFixed(1)}
          </span>
        )}
        <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-md">
          {title}
        </h1>
        <p className="text-slate-300 text-sm md:text-base line-clamp-3 leading-relaxed">
          {movie.description || movie.introduction || "Saksikan tontonan populer terbaru dengan kualitas terbaik di CineStream."}
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          <Link
            href={`/detail/${id}`}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full transition shadow-lg hover:scale-105"
          >
            <Play className="w-5 h-5 fill-current" /> Tonton Sekarang
          </Link>
          <Link
            href={`/detail/${id}`}
            className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold px-6 py-3 rounded-full backdrop-blur-sm transition border border-slate-700 hover:scale-105"
          >
            <Info className="w-5 h-5" /> Detail
          </Link>
        </div>
      </div>
    </div>
  );
}
