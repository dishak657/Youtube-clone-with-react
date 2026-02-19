import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import {
  getRelatedVideos,
  getVideoById,
  normalizeSearchItem,
} from "../utils/youtubeApi";
import { useWatchHistory } from "../context/HistoryContext";

function formatCompactNumber(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "";
  return Intl.NumberFormat("en", { notation: "compact" }).format(n);
}

function RelatedVideoRow({ video }) {
  const id = video?.id;
  const snippet = video?.snippet;
  const thumb =
    snippet?.thumbnails?.medium?.url ??
    snippet?.thumbnails?.high?.url ??
    snippet?.thumbnails?.default?.url;

  return (
    <Link
      to={`/watch/${id}`}
      className="flex gap-3 rounded-lg p-2 hover:bg-[#1f1f1f] transition-colors"
    >
      <img
        src={thumb}
        alt={snippet?.title}
        className="w-44 aspect-video rounded-lg object-cover bg-[#222]"
      />
      <div className="min-w-0">
        <div className="text-sm font-semibold text-white line-clamp-2">
          {snippet?.title}
        </div>
        <div className="mt-1 text-xs text-gray-400 line-clamp-1">
          {snippet?.channelTitle}
        </div>
      </div>
    </Link>
  );
}

export default function WatchPage() {
  const { id } = useParams();
  const { addToHistory } = useWatchHistory();

  const [video, setVideo] = useState(null);
  const [related, setRelated] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showFullDesc, setShowFullDesc] = useState(false);

  const embedUrl = useMemo(() => `https://www.youtube.com/embed/${id}`, [id]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");
      setVideo(null);
      setRelated([]);
      setShowFullDesc(false);

      try {
        const [videoRes, relatedRes] = await Promise.all([
          getVideoById(id),
          getRelatedVideos({ relatedToVideoId: id, maxResults: 20 }),
        ]);

        if (cancelled) return;

        const videoItem = videoRes?.items?.[0] || null;
        setVideo(videoItem);
        
        // Add to watch history
        if (videoItem) {
          addToHistory({
            id: videoItem.id,
            snippet: videoItem.snippet,
            statistics: videoItem.statistics,
          });
        }
        
        setRelated((relatedRes?.items || []).map(normalizeSearchItem));
      } catch (e) {
        console.error("Watch page error:", e);
        if (cancelled) return;
        setError(e?.message || "Failed to load video");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (id) load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="p-4 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6">
        <div>
          <div className="w-full aspect-video rounded-xl bg-gray-800 animate-pulse" />
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Shimmer />
            <Shimmer />
          </div>
        </div>
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-20 rounded-xl bg-gray-800 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black min-h-screen text-white p-4">
        <div className="rounded-lg border border-red-700 bg-red-950/40 p-3 text-sm text-red-200">
          {error}
        </div>
      </div>
    );
  }

  const title = video?.snippet?.title || "";
  const description = video?.snippet?.description || "";
  const channelTitle = video?.snippet?.channelTitle || "";
  const publishedAt = video?.snippet?.publishedAt
    ? new Date(video.snippet.publishedAt).toLocaleDateString()
    : "";

  const views = video?.statistics?.viewCount;
  const likes = video?.statistics?.likeCount;

  return (
    <div className="bg-black min-h-screen text-white p-4 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6">
      {/* Main */}
      <div>
        <div className="w-full aspect-video rounded-xl overflow-hidden bg-black">
          <iframe
            className="w-full h-full"
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <h1 className="mt-4 text-lg sm:text-xl font-bold text-white">
          {title}
        </h1>

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-300">
          <div className="font-semibold text-white">{channelTitle}</div>
          {views ? <div>{formatCompactNumber(views)} views</div> : null}
          {publishedAt ? <div>{publishedAt}</div> : null}
          {likes ? <div>{formatCompactNumber(likes)} likes</div> : null}
        </div>

        {description ? (
          <div className="mt-4 rounded-xl bg-[#1a1a1a] p-4">
            <div
              className={
                showFullDesc
                  ? "text-sm text-gray-200 whitespace-pre-line"
                  : "text-sm text-gray-200 whitespace-pre-line line-clamp-4"
              }
            >
              {description}
            </div>
            <button
              onClick={() => setShowFullDesc((s) => !s)}
              className="mt-2 text-xs font-semibold text-gray-300 hover:text-white"
            >
              {showFullDesc ? "Show less" : "Show more"}
            </button>
          </div>
        ) : null}
      </div>

      {/* Related */}
      <aside className="space-y-1">
        <div className="text-sm font-semibold text-gray-200 mb-2">
          Up next
        </div>
        {related.map((v) => (
          <RelatedVideoRow key={v.id} video={v} />
        ))}
      </aside>
    </div>
  );
}

