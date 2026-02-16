import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, TrendingUp, Zap, Sparkles } from "lucide-react";

const FloatingEmoji = ({ emoji, delay, x, y }) => (
  <motion.span
    className="absolute text-5xl select-none pointer-events-none filter blur-[1px]"
    style={{ left: x, top: y }}
    animate={{ 
      y: [0, -20, 0], 
      rotate: [0, 5, -5, 0],
      opacity: [0.2, 0.5, 0.2] 
    }}
    transition={{ duration: 6, repeat: Infinity, delay, ease: "easeInOut" }}
  >
    {emoji}
  </motion.span>
);

const features = [
  {
    icon: <Zap size={22} />,
    title: "Quick Logging",
    desc: "Capture your emotional state in seconds with our frictionless flow.",
  },
  {
    icon: <TrendingUp size={22} />,
    title: "Visual Insights",
    desc: "Sophisticated analytics that translate feelings into actionable data.",
  },
  {
    icon: <Shield size={22} />,
    title: "Local Privacy",
    desc: "Your data never leaves your device. No cloud, no tracking, total peace.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Ambient Elements */}
        <div className="absolute inset-0 z-0">
          <FloatingEmoji emoji="✨" delay={0} x="12%" y="25%" />
          <FloatingEmoji emoji="🌊" delay={1} x="82%" y="18%" />
          <FloatingEmoji emoji="☁️" delay={0.5} x="78%" y="75%" />
          <FloatingEmoji emoji="🌿" delay={1.5} x="18%" y="70%" />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-50 border border-neutral-100 mb-10"
          >
            <Sparkles size={14} className="text-neutral-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
              The Future of Self-Awareness
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-[120px] font-black leading-[0.85] tracking-tighter mb-10"
          >
            Mindful <br />
            <span className="text-neutral-300 italic font-serif font-light">tracking.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-neutral-400 max-w-2xl mx-auto font-medium leading-relaxed mb-12"
          >
            A minimalist space designed to help you navigate your inner world with clarity and intention.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/log">
              <button className="group relative bg-black text-white px-12 py-6 rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-black/20">
                <span className="relative z-10 flex items-center gap-3">
                  Start your journey
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="w-14 h-14 rounded-2xl bg-neutral-50 flex items-center justify-center text-black mb-8 group-hover:bg-black group-hover:text-white transition-all duration-500 group-hover:rotate-6">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 tracking-tight">{f.title}</h3>
              <p className="text-neutral-400 leading-relaxed font-medium">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-12 border-t border-neutral-100 text-center">
        <span className="font-black text-sm tracking-widest uppercase opacity-20">
          moodflow © 2026
        </span>
      </footer>
    </div>
  );
}