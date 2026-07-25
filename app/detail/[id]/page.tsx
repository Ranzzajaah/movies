"use client";

import { useQuery } from "@tanstack/react-query";
import { getDetail, getDetailRec } from "@/lib/movieApi";
import MediaCard from "@/components/MediaCard";
import { Star, Play, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function DetailPage() {
  const params = useParams();
  const subjectId = params.id as string;

  const { data: detailData, isLoading } = useQuery({
    queryKey: ["detail", subjectId],
    queryFn: () => getDetail(subjectId),
    enabled: !!subjectId,
  });

  const { data: recData } = useQuery({
    queryKey: ["recommendations", subjectId],
    queryFn: () => getDetailRec({ subjectId }),
    enabled: !!subjectId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-red-500" />
      </div>
    );
  }

  const detail = detailData?.data;
  const recommendations = recData?.data?.items || [];

  return (
    <main className="min-h-screen pb-16">
      {/* Hero Section Banner */}
      <div className="relative w-full h-[50vh] min-h-[350px] bg-slate-900 overflow-hidden">
        <img
          src={detail?.cover?.url || detail?.posterUrl || "/placeholder.jpg"}
          alt={detail?.title || "Movie Backdrop"}
          className="w-full h-full object-cover opacity-30 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 md:px-8 flex items-end pb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
            <img
              src={detail?.cover?.url || detail?.posterUrl}
              alt={detail?.title}
              className="w-36 md:w-52 rounded-xl shadow-2xl border border-slate-800 shrink-0"
            />
            <div className="space-y-3">
              <Link href="/" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white transition mb-2">
                <ArrowLeft className="w-4 h-4" /> Kembali
              </Link>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white">
                {detail?.title || detail?.name}
              </h1>
              <div className="flex items-center gap-4 text-sm text-slate-300">
                {detail?.score && (
                  <span className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-4 h-4 fill-current" /> {detail.score.toFixed(1)}
                  </span>
                )}
                <span>{detail?.releaseYear || detail?.year}</span>
                {detail?.duration && <span>{detail.duration} min</span>}
              </div>
              <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition shadow-lg">
                <Play className="w-5 h-5 fill-current" /> Putar Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8 space-y-12">
        <section className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-xl font-bold mb-3 text-slate-100">Sinopsis</h2>
          <p className="text-slate-300 leading-relaxed text-sm md:text-base">
            {detail?.description || detail?.introduction || "Tidak ada deskripsi yang tersedia."}
          </p>
        </section>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6 border-l-4 border-red-500 pl-3">
              Rekomendasi Serupa
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {recommendations.map((item: any) => (
                <MediaCard
                  key={item.id || item.subjectId}
                  id={item.id || item.subjectId}
                  title={item.title || item.name}
                  coverUrl={item.cover?.url || item.posterUrl}
                  rating={item.score}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
