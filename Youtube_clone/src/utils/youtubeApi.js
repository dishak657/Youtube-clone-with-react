const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

const API_KEY =
  import.meta.env.VITE_YOUTUBE_API_KEY || import.meta.env.VITE_RAPID_API_KEY;

function buildUrl(path, params) {
  const url = new URL(`${YOUTUBE_API_BASE}${path}`);
  const sp = new URLSearchParams();

  Object.entries(params || {}).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return;
    sp.set(k, String(v));
  });

  if (API_KEY) sp.set("key", API_KEY);
  url.search = sp.toString();
  return url.toString();
}

async function youtubeGet(path, params) {
  if (!API_KEY) {
    throw new Error(
      "Missing API key. Set VITE_YOUTUBE_API_KEY (or VITE_RAPID_API_KEY) in a .env file."
    );
  }

  const url = buildUrl(path, params);
  const res = await fetch(url);
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = data?.error?.message || `YouTube API error (${res.status})`;
    throw new Error(msg);
  }

  return data;
}

export function normalizeVideoId(id) {
  return typeof id === "string" ? id : id?.videoId ?? id;
}

export function normalizeSearchItem(item) {
  return {
    id: item?.id?.videoId,
    snippet: item?.snippet,
  };
}

export async function getPopularVideos({ pageToken, maxResults = 20 } = {}) {
  return youtubeGet("/videos", {
    part: "snippet,statistics",
    chart: "mostPopular",
    regionCode: "US",
    maxResults,
    pageToken,
  });
}

export async function searchVideos({
  q,
  pageToken,
  maxResults = 20,
} = {}) {
  return youtubeGet("/search", {
    part: "snippet",
    q,
    type: "video",
    maxResults,
    pageToken,
  });
}

export async function getRelatedVideos({
  relatedToVideoId,
  pageToken,
  maxResults = 20,
} = {}) {
  return youtubeGet("/search", {
    part: "snippet",
    relatedToVideoId,
    type: "video",
    maxResults,
    pageToken,
  });
}

export async function getVideoById(id) {
  return youtubeGet("/videos", {
    part: "snippet,statistics,contentDetails",
    id,
  });
}

