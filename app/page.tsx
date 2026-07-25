"use client";

import { useQuery } from "@tanstack/react-query";
import { getHome, getTrending } from "@/lib/movieApi";
import MediaCard from "@/components/MediaCard";
import { Loader2 } from "lucide-react";

export default function HomePage() {
  const { data: homeData, isLoading: homeLoading } = useQuery({
    queryKey: ["homeFeed"],
    queryFn: () => getHome(),
  });

  const { data: trendingData, isLoading: trendingLoading } = useQuery({
    queryKey: ["trendingFeed"],
    queryFn: () => getTrending({ page: 1, perPage: 18 }),
  });

  if (homeLoading || trendingLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <Loader2 className="w-8 h-8 animate-spin text-red-500" />
      </div>
    );
  }

  const items = trendingData?.data?.items || homeData?.data?.items || [];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 md:px-8 py-8 max-w-7xl mx-auto">
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-6 border-l-4 border-red-500 pl-3">
          Trending Now
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {items.map((item: any) => (
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
    </main>
  );
}
