import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
    // Supports multiple shapes:
    // - YouTube "videos" API: { id, snippet: { title, description, channelTitle, thumbnails }, statistics }
    // - YouTube "search" API (after mapping): { id, snippet: { ... } }
    // - Custom history items: { id, title, description, channelTitle/channel, thumbnails/thumbnail, statistics? }
    const rawId = video?.id;
    const id = typeof rawId === "string" ? rawId : rawId?.videoId ?? rawId;

    const snippet = video?.snippet ?? video ?? {};
    const title = snippet?.title ?? "";
    const description = snippet?.description ?? video?.description ?? "";
    const channelTitle = snippet?.channelTitle ?? video?.channelTitle ?? video?.channel ?? "";

    const thumbnails =
        snippet?.thumbnails ??
        (video?.thumbnail
            ? {
                  medium: { url: video.thumbnail },
                  high: { url: video.thumbnail },
                  default: { url: video.thumbnail },
              }
            : null);

    const thumbUrl =
        thumbnails?.medium?.url ?? thumbnails?.high?.url ?? thumbnails?.default?.url ?? "";

    const viewCount = video?.statistics?.viewCount;

    return (
        <Link to={`/watch/${id}`} className="flex flex-col gap-2 group">
            <div className="relative">
                <img
                    src={thumbUrl}
                    alt={title}
                    className="w-full h-auto rounded-xl object-cover hover:rounded-none transition-all duration-200"
                />
            </div>
            <div className="flex flex-col">
                <h3 className="text-white text-sm font-bold line-clamp-2 group-hover:text-blue-400">
                    {title}
                </h3>
                {description ? (
                    <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                        {description}
                    </p>
                ) : null}
                <p className="text-gray-400 text-xs mt-1">{channelTitle}</p>
                {viewCount ? (
                    <div className="flex gap-2 text-gray-400 text-xs">
                        <span>{Number(viewCount).toLocaleString()} views</span>
                    </div>
                ) : null}
            </div>
        </Link>
    );
}
