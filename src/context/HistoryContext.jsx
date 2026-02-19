import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "yt_clone_watch_history_v1";
const MAX_ITEMS = 200;

const HistoryContext = createContext(null);

function safeRead() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function HistoryProvider({ children }) {
  const [history, setHistory] = useState(() => safeRead());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch {
      // ignore storage quota / private mode issues
    }
  }, [history]);

  const addToHistory = (item) => {
    const id = item?.id;
    if (!id) return;

    setHistory((prev) => {
      const without = prev.filter((x) => x?.id !== id);
      const next = [{ ...item, watchedAt: Date.now() }, ...without];
      return next.slice(0, MAX_ITEMS);
    });
  };

  const clearHistory = () => setHistory([]);

  const value = useMemo(
    () => ({
      history,
      addToHistory,
      clearHistory,
    }),
    [history]
  );

  return (
    <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
  );
}

export function useWatchHistory() {
  const ctx = useContext(HistoryContext);
  if (!ctx) {
    throw new Error("useWatchHistory must be used within HistoryProvider");
  }
  return ctx;
}

