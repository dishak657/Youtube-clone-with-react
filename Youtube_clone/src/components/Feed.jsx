import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import VideoCard from "./VideoCard";
import Shimmer from "./Shimmer";
import {
  getPopularVideos,
  normalizeSearchItem,
  searchVideos,
} from "../utils/youtubeApi";

export default function Feed() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();
  const category = useMemo(
    () => searchParams.get("category") || "All",
    [searchParams]
  );

  const sentinelRef = useRef(null);

  useEffect(() => {
    async function fetchInitial() {
      setLoading(true);
      setError("");
      setVideos([]);
      setNextPageToken(null);

      try {
        if (category === "All") {
          const data = await getPopularVideos({ maxResults: 20 });
          setVideos(data.items || []);
          setNextPageToken(data.nextPageToken || null);
        } else {
          const data = await searchVideos({ q: category, maxResults: 20 });
          setVideos((data.items || []).map(normalizeSearchItem));
          setNextPageToken(data.nextPageToken || null);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        setError(error?.message || "Failed to load videos");
      } finally {
        setLoading(false);
      }
    }

    fetchInitial();
  }, [category]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    if (loading) return;

    const el = sentinelRef.current;
    const obs = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0]?.isIntersecting;
        if (!isVisible) return;
        if (loadingMore) return;
        if (!nextPageToken) return;

        (async () => {
          setLoadingMore(true);
          setError("");
          try {
            if (category === "All") {
              const data = await getPopularVideos({
                maxResults: 20,
                pageToken: nextPageToken,
              });
              setVideos((prev) => [...prev, ...(data.items || [])]);
              setNextPageToken(data.nextPageToken || null);
            } else {
              const data = await searchVideos({
                q: category,
                maxResults: 20,
                pageToken: nextPageToken,
              });
              setVideos((prev) => [
                ...prev,
                ...(data.items || []).map(normalizeSearchItem),
              ]);
              setNextPageToken(data.nextPageToken || null);
            }
          } catch (e) {
            console.error("Error loading more videos:", e);
            setError(e?.message || "Failed to load more videos");
          } finally {
            setLoadingMore(false);
          }
        })();
      },
      { root: null, rootMargin: "800px 0px", threshold: 0 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [category, loading, loadingMore, nextPageToken]);

  return (
    <div className="flex bg-black min-h-screen text-white">
      <Sidebar />
      <div className="flex-1 p-4">
        {category !== "All" ? (
          <div className="mb-4 text-sm text-gray-300">
            Showing results for:{" "}
            <span className="font-semibold text-white">{category}</span>
          </div>
        ) : null}

        {error ? (
          <div className="mb-4 rounded-lg border border-red-700 bg-red-950/40 p-3 text-sm text-red-200">
            {error}
          </div>
        ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 12 }).map((_, i) => <Shimmer key={i} />)
            : videos.map((video) => <VideoCard key={video.id} video={video} />)}
        </div>

        {/* Infinite scroll sentinel */}
        <div ref={sentinelRef} className="h-10" />

        {loadingMore ? (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Shimmer key={`more-${i}`} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
