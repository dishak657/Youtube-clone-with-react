import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import VideoCard from "./VideoCard";

export default function Feed() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=US&maxResults=20&key=${import.meta.env.VITE_RAPID_API_KEY}`
        );
        const data = await response.json();
        setVideos(data.items || []);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  return (
    <div className="flex bg-black min-h-screen text-white">
      <Sidebar />
      <div className="flex-1 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-800 h-48 rounded-xl mb-2"></div>
                <div className="h-4 bg-gray-800 rounded w-3/4 mb-1"></div>
                <div className="h-3 bg-gray-800 rounded w-1/2"></div>
              </div>
            ))
            : videos.map((video) => <VideoCard key={video.id} video={video} />)}
        </div>
      </div>
    </div>
  );
}
