import Sidebar from "./Sidebar";
import VideoCard from "./VideoCard";
import { useWatchHistory } from "../context/HistoryContext";

export default function HistoryPage() {
  const { history, clearHistory } = useWatchHistory();

  return (
    <div className="flex bg-black min-h-screen text-white">
      <Sidebar />
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h1 className="text-lg font-bold">Watch history</h1>
          <button
            onClick={clearHistory}
            disabled={history.length === 0}
            className="text-sm px-3 py-2 rounded-lg bg-[#222] hover:bg-[#2f2f2f] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear history
          </button>
        </div>

        {history.length === 0 ? (
          <div className="text-sm text-gray-400">
            No videos yet. Open a video to start building your history.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {history.map((v) => (
              <VideoCard key={`${v.id}-${v.watchedAt || 0}`} video={v} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

