import React from "react";
import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
    const {
        id,
        snippet: { title, channelTitle, thumbnails },
        statistics,
    } = video;

    return (
        <Link to={`/watch/${id}`} className="flex flex-col gap-2 group">
            <div className="relative">
                <img
                    src={thumbnails.medium.url}
                    alt={title}
                    className="w-full h-auto rounded-xl object-cover hover:rounded-none transition-all duration-200"
                />
            </div>
            <div className="flex flex-col">
                <h3 className="text-white text-sm font-bold line-clamp-2 group-hover:text-blue-400">
                    {title}
                </h3>
                <p className="text-gray-400 text-xs mt-1">{channelTitle}</p>
                <div className="flex gap-2 text-gray-400 text-xs">
                    <span>{Number(statistics.viewCount).toLocaleString()} views</span>
                </div>
            </div>
        </Link>
    );
}
