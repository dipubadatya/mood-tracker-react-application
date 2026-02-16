import { useMood } from '../context/MoodContext';
import { Trash2, Calendar, MessageCircle, Quote, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function History() {
  const { entries, deleteEntry } = useMood();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      {/* Header with Stats Summary */}
      <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-6xl font-extrabold tracking-tighter text-neutral-900">
            Timeline
          </h1>
          <p className="text-neutral-400 font-medium mt-2 text-lg">
            {entries.length} reflections captured so far.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-full text-sm font-bold text-neutral-600 hover:bg-neutral-200 transition-colors">
          <Filter size={16} />
          Filter
        </button>
      </header>

      <div className="relative border-l-2 border-neutral-100 ml-4 md:ml-0 pl-8 space-y-12">
        <AnimatePresence mode='popLayout'>
          {entries.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center bg-neutral-50 rounded-[2.5rem] border border-dashed border-neutral-200"
            >
              <p className="text-lg font-semibold text-neutral-400">No memories recorded yet.</p>
            </motion.div>
          ) : (
            // Sorting entries by date (newest first)
            [...entries].sort((a, b) => new Date(b.date) - new Date(a.date)).map((entry, index) => (
              <motion.div
                key={entry.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                className="group relative"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[41px] top-2 w-4 h-4 bg-white border-4 border-black rounded-full z-10 group-hover:scale-125 transition-transform" />

                <div className="bg-white hover:bg-neutral-50/50 p-6 md:p-8 rounded-[2.5rem] border border-neutral-100 hover:border-neutral-200 transition-all duration-300 hover:shadow-xl hover:shadow-neutral-200/40">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    
                    <div className="space-y-3 flex-grow">
                      {/* Meta Info */}
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black uppercase tracking-widest text-neutral-400">
                          {formatDate(entry.date)}
                        </span>
                        <span className="w-1 h-1 bg-neutral-200 rounded-full" />
                        <span className="text-xs font-bold text-neutral-400 italic">
                          {getTime(entry.date)}
                        </span>
                      </div>

                      {/* Mood Badge */}
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1 bg-neutral-900 text-white rounded-full text-[10px] font-black uppercase tracking-tighter">
                          {entry.mood}
                        </div>
                        <div className="text-sm font-bold text-neutral-300">
                          Score: {entry.score}/5
                        </div>
                      </div>

                      {/* Note */}
                      <div className="relative pt-2">
                        {entry.note ? (
                          <p className="text-xl font-medium text-neutral-800 leading-relaxed max-w-xl">
                            "{entry.note}"
                          </p>
                        ) : (
                          <p className="text-neutral-300 italic">Quiet moment, no notes taken.</p>
                        )}
                      </div>
                    </div>

                    {/* Action Panel */}
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => deleteEntry(entry.id)}
                        className="p-3 bg-white border border-neutral-100 text-neutral-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all rounded-2xl shadow-sm"
                        title="Remove from memory"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}