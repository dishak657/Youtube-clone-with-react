import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./components/Feed";
import WatchPage from "./components/WatchPage";
import SearchFeed from "./components/SearchFeed";
import HistoryPage from "./components/HistoryPage";
import Navbar from "./components/Navbar";
import { HistoryProvider } from "./context/HistoryContext";

export default function App() {
  return (
    <HistoryProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/search/:searchTerm" element={<SearchFeed />} />
          <Route path="/watch/:id" element={<WatchPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </BrowserRouter>
    </HistoryProvider>
  );
}