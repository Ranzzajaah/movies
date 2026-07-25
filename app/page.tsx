"use client";

import { useQuery } from "@tanstack/react-query";
import { getHome, getTrending } from "@/lib/movieApi";
import MediaCard from "@/components/MediaCard";
import MediaGrid from "@/components/MediaGrid";
import MovieHero from "@/components/MovieHero";
import { Loader2 } from "lucide-react";
import { ApiResponse, ListResponse, MediaItem } from "@/types/api";

export default function HomePage() {
  const { data: homeData, isLoading: homeLoading } = useQuery<ApiResponse<ListResponse<MediaItem>>>({
    queryKey: ["homeFeed"],
    queryFn: () => getHome() as Promise<ApiResponse<ListResponse<MediaItem>>>,
  });

  const { data: trendingData, isLoading: trendingLoading } = useQuery<ApiResponse<ListResponse<MediaItem>>>({
    queryKey: ["trendingFeed"],
    queryFn: () => getTrending({ page: 1, perPage: 18 }) as Promise<ApiResponse<ListResponse<MediaItem>>>,
  });

  if (homeLoading || trendingLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <Loader2 className="w-8 h-8 animate-spin text-red-500" />
      </div>
    );
  }

  const items = trendingData?.data?.items || homeData?.data?.items || [];
  const heroMovie = items[0];
  const gridItems = items.slice(1);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 md:px-8 py-8 max-w-7xl mx-auto">
      {heroMovie && <MovieHero movie={heroMovie} />}

      <MediaGrid title="Trending Sekarang">
        {gridItems.map((item) => (
          <MediaCard
            key={item.id || item.subjectId}
            id={item.id || item.subjectId || ""}
            title={item.title || item.name || ""}
            coverUrl={item.cover?.url || item.posterUrl || ""}
            rating={item.score}
          />
        ))}
      </MediaGrid>
    </main>
  );
}
