"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { search } from "@/lib/movieApi";
import MediaCard from "@/components/MediaCard";
import MediaGrid from "@/components/MediaGrid";
import { Loader2, SearchX } from "lucide-react";
import { ApiResponse, ListResponse, MediaItem } from "@/types/api";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const { data, isLoading } = useQuery<ApiResponse<ListResponse<MediaItem>>>({
    queryKey: ["search", query],
    queryFn: () => search({ keyword: query }) as Promise<ApiResponse<ListResponse<MediaItem>>>,
    enabled: !!query,
  });

  const results = data?.data?.items || [];

  return (
    <main className="min-h-screen max-w-7xl mx-auto px-4 md:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Hasil Pencarian untuk: <span className="text-red-500">"{query}"</span>
      </h1>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-red-500" />
        </div>
      ) : results.length > 0 ? (
        <MediaGrid>
          {results.map((item) => (
            <MediaCard
              key={item.id || item.subjectId}
              id={item.id || item.subjectId || ""}
              title={item.title || item.name || ""}
              coverUrl={item.cover?.url || item.posterUrl || ""}
              rating={item.score}
            />
          ))}
        </MediaGrid>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
          <SearchX className="w-12 h-12 text-slate-600" />
          <p>Tidak ditemukan hasil untuk "{query}".</p>
        </div>
      )}
    </main>
  );
}
