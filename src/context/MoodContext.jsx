

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const MoodContext = createContext(null);

export function MoodProvider({ children }) {
  const [entries, setEntries] = useState(() => {
    try {
      const stored = localStorage.getItem("moodflow-entries");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("moodflow-entries", JSON.stringify(entries));
  }, [entries]);

  const addEntry = useCallback((entry) => {
    setEntries((prev) => [entry, ...prev]);
  }, []);

  const deleteEntry = useCallback((id) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setEntries([]);
  }, []);

  return (
    <MoodContext.Provider value={{ entries, addEntry, deleteEntry, clearAll }}>
      {children}
    </MoodContext.Provider>
  );
}

export const useMood = () => {
  const context = useContext(MoodContext);
  if (!context) throw new Error("useMood must be used within a MoodProvider");
  return context;
};
