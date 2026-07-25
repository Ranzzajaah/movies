import Link from "next/link";
import { Play } from "lucide-react";

interface MediaCardProps {
  id: string;
  title: string;
  coverUrl: string;
  rating?: number;
  type?: string;
}

export default function MediaCard({ id, title, coverUrl, rating }: MediaCardProps) {
  return (
    <Link href={`/detail/${id}`} className="group relative block rounded-xl overflow-hidden bg-slate-900 transition hover:scale-105 hover:z-10 shadow-lg">
      <div className="aspect-[2/3] w-full bg-slate-800 relative">
        <img
          src={coverUrl || "/placeholder.jpg"}
          alt={title}
          className="w-full h-full object-cover group-hover:brightness-75 transition duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
          <div className="bg-red-600/90 p-3 rounded-full text-white shadow-xl">
            <Play className="w-6 h-6 fill-current" />
          </div>
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold text-slate-100 truncate">{title}</h3>
        {rating && (
          <p className="text-xs text-amber-400 font-medium mt-1">★ {rating.toFixed(1)}</p>
        )}
      </div>
    </Link>
  );
}
