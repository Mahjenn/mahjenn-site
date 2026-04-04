import { motion } from "framer-motion";
import { Link } from "wouter";
import { Instagram } from "lucide-react";

export default function Store() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg"
      >
        <div className="text-6xl mb-6">🎴</div>
        <h1 className="text-4xl md:text-5xl font-black mb-4">Coming Soon</h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Jenn's shop is almost ready — curated mahjong sets, accessories, and more are on the way. Check back soon or follow on Instagram to be the first to know.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://instagram.com/Mah.Jenn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground rounded-xl font-bold shadow-lg hover:bg-primary/90 transition-all"
          >
            <Instagram className="w-4 h-4" /> Follow @Mah.Jenn
          </a>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-card text-foreground border border-border rounded-xl font-bold hover:border-primary/30 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
