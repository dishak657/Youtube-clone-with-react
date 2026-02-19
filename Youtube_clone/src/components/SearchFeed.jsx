import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import VideoCard from "./VideoCard";
import Shimmer from "./Shimmer";
import Sidebar from "./Sidebar";
import { normalizeSearchItem, searchVideos } from "../utils/youtubeApi";

export default function SearchFeed() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [error, setError] = useState("");
  const { searchTerm } = useParams();

  const sentinelRef = useRef(null);

  useEffect(() => {
    async function fetchSearchResults() {
      setLoading(true);
      setError("");
      setVideos([]);
      setNextPageToken(null);

      try {
        const data = await searchVideos({ q: searchTerm, maxResults: 20 });
        setVideos((data.items || []).map(normalizeSearchItem));
        setNextPageToken(data.nextPageToken || null);
      } catch (error) {
        console.error("Search API Error:", error);
        setError(error?.message || "Failed to load search results");
      } finally {
        setLoading(false);
      }
    }

    if (searchTerm) {
      fetchSearchResults();
    }
  }, [searchTerm]);

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
            const data = await searchVideos({
              q: searchTerm,
              maxResults: 20,
              pageToken: nextPageToken,
            });
            setVideos((prev) => [
              ...prev,
              ...(data.items || []).map(normalizeSearchItem),
            ]);
            setNextPageToken(data.nextPageToken || null);
          } catch (e) {
            console.error("Search load more error:", e);
            setError(e?.message || "Failed to load more results");
          } finally {
            setLoadingMore(false);
          }
        })();
      },
      { root: null, rootMargin: "800px 0px", threshold: 0 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [loading, loadingMore, nextPageToken, searchTerm]);

  return (
    <div className="flex bg-black min-h-screen text-white">
      <Sidebar />
      <div className="flex-1 p-4">
        <div className="mb-4 text-sm text-gray-300">
          Search results for:{" "}
          <span className="font-semibold text-white">{searchTerm}</span>
        </div>

        {error ? (
          <div className="mb-4 rounded-lg border border-red-700 bg-red-950/40 p-3 text-sm text-red-200">
            {error}
          </div>
        ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading
            ? Array(8)
                .fill(0)
                .map((_, i) => <Shimmer key={i} />)
            : videos.map((v) => <VideoCard key={v.id} video={v} />)}
        </div>

        {/* Infinite scroll sentinel */}
        <div ref={sentinelRef} className="h-10" />

        {loadingMore ? (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array(8)
              .fill(0)
              .map((_, i) => <Shimmer key={`more-${i}`} />)}
          </div>
        ) : null}
      </div>
    </div>
  );
}


