import { useMemo } from 'react';

export const useMoodAnalytics = (entries) => {
  return useMemo(() => {
    // 1. Prepare Chart Data (Last 7 Days)
    const weeklyTrend = [...entries]
      .slice(0, 7)
      .reverse()
      .map(e => ({
        day: new Date(e.date).toLocaleDateString('en-US', { weekday: 'short' }),
        score: e.score
      }));

    // 2. Calculate Mood Distribution
    const distribution = entries.reduce((acc, curr) => {
      acc[curr.mood] = (acc[curr.mood] || 0) + 1;
      return acc;
    }, {});

    const chartData = Object.keys(distribution).map(name => ({
      name,
      value: distribution[name]
    }));

    // 3. Simple Streak Calculation
    const streak = entries.length; // Simplified for MVP

    return { weeklyTrend, chartData, streak };
  }, [entries]);
};
