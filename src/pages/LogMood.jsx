import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useMood } from '../context/MoodContext';
import { Save, Smile, Frown, Meh, Heart, CloudRain, ArrowRight } from 'lucide-react';

const MOODS = [
  { id: 'awful', icon: <CloudRain size={32} />, color: 'bg-blue-100', text: 'text-blue-600', label: 'Awful', score: 1 },
  { id: 'down', icon: <Frown size={32} />, color: 'bg-stone-100', text: 'text-stone-600', label: 'Down', score: 2 },
  { id: 'okay', icon: <Meh size={32} />, color: 'bg-emerald-50', text: 'text-emerald-600', label: 'Okay', score: 3 },
  { id: 'good', icon: <Smile size={32} />, color: 'bg-violet-100', text: 'text-violet-600', label: 'Good', score: 4 },
  { id: 'great', icon: <Heart size={32} />, color: 'bg-rose-100', text: 'text-rose-600', label: 'Great', score: 5 },
];

export default function LogMood() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const { addEntry } = useMood();
  const navigate = useNavigate();

  const handleSave = () => {
    if (!selectedMood) return;
    const newEntry = {
      id: uuidv4(),
      mood: selectedMood.label,
      score: selectedMood.score,
      note,
      date: new Date().toISOString(),
    };
    addEntry(newEntry);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[90vh] max-w-4xl mx-auto px-6 py-12 flex flex-col items-center justify-center">
      {/* Header Section */}
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <h1 className="text-5xl font-extrabold tracking-tight text-neutral-900 mb-4">
          How's your <span className="text-neutral-400">inner</span> flow?
        </h1>
        <p className="text-lg text-neutral-400 font-medium">Capture this moment in time.</p>
      </motion.header>

      {/* Mood Selection Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 w-full mb-12">
        {MOODS.map((m) => {
          const isSelected = selectedMood?.id === m.id;
          const isDimmed = selectedMood && selectedMood.id !== m.id;

          return (
            <motion.button
              key={m.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMood(m)}
              className={`relative flex flex-col items-center p-8 rounded-[2.5rem] transition-all duration-500 
                ${isSelected ? `${m.color} ${m.text} shadow-xl ring-2 ring-black/5` : 'bg-white text-neutral-400 hover:text-neutral-600'}
                ${isDimmed ? 'opacity-40 grayscale-[0.5]' : 'opacity-100'}
              `}
            >
              <div className={`mb-4 transition-transform duration-500 ${isSelected ? 'scale-125 rotate-12' : ''}`}>
                {m.icon}
              </div>
              <span className="text-xs font-black uppercase tracking-[0.2em]">{m.label}</span>
              
              {isSelected && (
                <motion.div 
                  layoutId="active-glow" 
                  className="absolute inset-0 rounded-[2.5rem] bg-current opacity-5 -z-10" 
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Reflection Area - Only shows when mood is selected or has content */}
      <AnimatePresence>
        {selectedMood && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full max-w-2xl overflow-hidden"
          >
            <div className="bg-neutral-50/50 backdrop-blur-sm p-8 rounded-[2rem] border border-neutral-200/50 mb-8">
              <label className="block text-xs font-bold text-neutral-400 uppercase mb-4 tracking-widest">
                The Reflection
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What's on your mind? (Optional)"
                className="w-full h-24 bg-transparent text-xl font-medium text-neutral-800 placeholder:text-neutral-300 outline-none resize-none"
              />
            </div>

            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={handleSave}
              className="group w-full py-6 bg-black text-white rounded-[2rem] font-bold text-lg flex items-center justify-center gap-3 hover:bg-neutral-800 transition-all shadow-2xl shadow-black/10"
            >
              Finish Reflection
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}