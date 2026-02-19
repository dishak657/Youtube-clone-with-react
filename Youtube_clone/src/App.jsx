// import React, { useEffect, useState } from "react";

// function App() {
//   const [videos, setVideos] = useState([]);
//   const [loading,setLoading] = useState(true)
//   const [selectedVideo, setSelectedVideo] = useState(null);

//   useEffect(() => {
//     async function fetchVideos() {
//       try {
//         const response = await fetch(
//           `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=US&maxResults=12&key=${import.meta.env.VITE_RAPID_API_KEY}`
//         );

//         const data = await response.json();
//         console.log("API Response:", data);
//         const formattedVideos = data.items.map((video) => ({
//           id: video.id,
//           title: video.snippet.title,
//           channel: video.snippet.channelTitle,
//           thumbnail: video.snippet.thumbnails.high.url,
//         }));

//         setVideos(formattedVideos);
//       } catch (error) {
//         console.error("API Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchVideos();
//   }, []);

//   return (
    
//   <div className="video-container">
//     {loading ? (
//       // Skeleton UI
//       Array.from({ length: 12 }).map((_, index) => (
//         <div key={index} className="video-card">
//           <div className="thumbnail skeleton"></div>
//           <div className="text skeleton"></div>
//           <div className="text small skeleton"></div>
//         </div>
//       ))
//     ) : (
//       videos.map((video) => (
//         <div key={video.id} className="video-card">
//           <img src={video.thumbnail} alt={video.title} />
//           <h3>{video.title}</h3>
//           <p>{video.channel}</p>
//         </div>
//       ))
//     )}
//   </div>
// );

// }

// export default App;

// import React, { useEffect, useState } from "react";
// import "./App.css";

// function App() {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedVideo, setSelectedVideo] = useState(null);

//   useEffect(() => {
//     async function fetchVideos() {
//       try {
//         const response = await fetch(
//           `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=US&maxResults=12&key=${import.meta.env.VITE_RAPID_API_KEY}`
//         );
//         console.log("API Response:", data);


//         const data = await response.json();

//         const formattedVideos = data.items.map((video) => ({
//           id: video.id,
//           title: video.snippet.title,
//           channel: video.snippet.channelTitle,
//           thumbnail: video.snippet.thumbnails.high.url,
//         }));

//         setVideos(formattedVideos);
//       } catch (error) {
//         console.error("API Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchVideos();
//   }, []);

//   return (
//     <div className="app">

//       {/* 🔴 Navbar */}
//       <header className="navbar">
//         <div className="logo">YouTube</div>

//         <div className="search-bar">
//           <input type="text" placeholder="Search" />
//           <button>🔍</button>
//         </div>

//         <div className="user-icon">👤</div>
//       </header>

//       {/* 🎬 Video Player */}
//       {selectedVideo && (
//         <div className="video-player">
//           <iframe
//             src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
//             title="YouTube Player"
//             allow="autoplay; encrypted-media"
//             allowFullScreen
//           ></iframe>
//         </div>
//       )}

//       {/* 📺 Video Grid */}
//       <div className="video-grid">
//         {loading
//           ? Array.from({ length: 12 }).map((_, i) => (
//               <div key={i} className="skeleton-card">
//                 <div className="skeleton-thumbnail"></div>
//                 <div className="skeleton-text"></div>
//                 <div className="skeleton-text small"></div>
//               </div>
//             ))
//           : videos.map((video) => (
//               <div
//                 key={video.id}
//                 className="video-card"
//                 onClick={() => setSelectedVideo(video.id)}
//               >
//                 <img src={video.thumbnail} alt={video.title} />
//                 <div className="video-info">
//                   <h3>{video.title}</h3>
//                   <p>{video.channel}</p>
//                 </div>
//               </div>
//             ))}
//       </div>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./components/Feed";
import WatchPage from "./components/WatchPage";
import SearchFeed from "./components/SearchFeed";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/seasep/: searchTerm" element={<SearchFeed />} />
        <Route path="/wateh :id" efowent={<WatchPage />} />
      </Routes>
    </BrowserRouter>
  );

}