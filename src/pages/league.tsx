import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Star, Send, Trophy, Clock } from "lucide-react";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experience: string;
  style: string;
  days: string[];
  groupSize: string;
  notes: string;
};

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function League() {
  const [form, setForm] = useState<FormState>({
    firstName: "", lastName: "", email: "", phone: "",
    experience: "", style: "", days: [], groupSize: "", notes: ""
  });
  const [submitted, setSubmitted] = useState(false);

  function toggleDay(day: string) {
    setForm(f => ({
      ...f,
      days: f.days.includes(day) ? f.days.filter(d => d !== day) : [...f.days, day]
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 pt-24">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card max-w-xl w-full rounded-[2rem] p-12 text-center shadow-2xl border border-border"
        >
          <div className="text-6xl mb-6">🀄</div>
          <h2 className="text-3xl font-bold mb-3">You're on the list!</h2>
          <p className="text-muted-foreground text-lg mb-6">
            Jenn will reach out soon to talk about scheduling and match you with the right group.
          </p>
          <a
            href="https://instagram.com/Mah.Jenn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
          >
            📸 Follow @Mah.Jenn for updates
          </a>
          <div className="mt-8">
            <a href="/" className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors inline-block">
              Return Home
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full pb-24">

      {/* Hero */}
      <div className="bg-primary pt-20 pb-24 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-5xl mb-6">🏆</div>
            <h1 className="text-4xl md:text-6xl font-black mb-4">Join a Mah Jongg League</h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Play regularly, sharpen your game, and build a community around the table. Jenn organizes ongoing leagues for all skill levels.
            </p>
          </motion.div>
        </div>
      </div>

      {/* What to expect */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: Calendar, title: "Regular Sessions", body: "Weekly or bi-weekly games at a consistent time that works for your group." },
            { icon: Users, title: "All Skill Levels", body: "Beginner leagues for new players, and competitive play for those ready to level up." },
            { icon: Trophy, title: "American & Chinese", body: "Both American Mah Jongg (NMJL rules) and Chinese Mahjong leagues available." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.2 }}
              className="bg-card rounded-2xl p-7 border border-border shadow-lg text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* League styles info */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-muted/50 rounded-2xl p-8 border border-border">
            <div className="text-3xl mb-3">🇺🇸</div>
            <h3 className="font-bold text-xl mb-3">American Mah Jongg League</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Played with the NMJL card, Jokers, and the Charleston. A new card is issued every April so the game stays fresh year-round. This is Jenn's specialty.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Star className="w-3 h-3 text-primary flex-shrink-0" /> 4 players · 152 tiles</li>
              <li className="flex items-center gap-2"><Star className="w-3 h-3 text-primary flex-shrink-0" /> NMJL rules + Jokers</li>
              <li className="flex items-center gap-2"><Star className="w-3 h-3 text-primary flex-shrink-0" /> Beginner & intermediate levels</li>
            </ul>
          </div>
          <div className="bg-muted/50 rounded-2xl p-8 border border-border">
            <div className="text-3xl mb-3">🀀</div>
            <h3 className="font-bold text-xl mb-3">Chinese Mahjong League</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The original version of the game — no Jokers, no card. Strategy-heavy and deeply satisfying. Jenn teaches several common Chinese rule sets including Hong Kong style.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Star className="w-3 h-3 text-primary flex-shrink-0" /> 4 players · 144 tiles</li>
              <li className="flex items-center gap-2"><Star className="w-3 h-3 text-primary flex-shrink-0" /> No Jokers — pure skill</li>
              <li className="flex items-center gap-2"><Star className="w-3 h-3 text-primary flex-shrink-0" /> Hong Kong & other rule sets</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sign-up form */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Sign Me Up!</h2>
          <p className="text-muted-foreground text-lg">Fill this out and Jenn will be in touch to find the right league for you.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-sm space-y-6">

          {/* Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold mb-2">First Name <span className="text-primary">*</span></label>
              <input
                type="text" required
                value={form.firstName}
                onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                placeholder="First name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Last Name <span className="text-primary">*</span></label>
              <input
                type="text" required
                value={form.lastName}
                onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                placeholder="Last name"
              />
            </div>
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold mb-2">Email <span className="text-primary">*</span></label>
              <input
                type="email" required
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Phone <span className="text-muted-foreground font-normal">(optional)</span></label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                placeholder="(555) 000-0000"
              />
            </div>
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-semibold mb-3">Your Experience Level <span className="text-primary">*</span></label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {["Beginner — never played", "Intermediate — know the basics", "Experienced — ready to compete"].map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, experience: level }))}
                  className={`px-4 py-3 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                    form.experience === level
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border bg-background hover:border-primary/30"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Style */}
          <div>
            <label className="block text-sm font-semibold mb-3">League Style Preference <span className="text-primary">*</span></label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { value: "american", label: "🇺🇸 American Mah Jongg" },
                { value: "chinese", label: "🀀 Chinese Mahjong" },
                { value: "both", label: "✨ Open to Both" },
              ].map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, style: opt.value }))}
                  className={`px-4 py-3 rounded-xl border-2 text-sm font-medium text-center transition-all ${
                    form.style === opt.value
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border bg-background hover:border-primary/30"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Days */}
          <div>
            <label className="block text-sm font-semibold mb-3">
              <Clock className="inline w-4 h-4 mr-1" />
              Preferred Day(s) <span className="text-muted-foreground font-normal">(select all that work)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {DAYS.map(day => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${
                    form.days.includes(day)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background hover:border-primary/30"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Group size */}
          <div>
            <label className="block text-sm font-semibold mb-3">
              <Users className="inline w-4 h-4 mr-1" />
              Are you joining solo or bringing friends?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { value: "solo", label: "Just me" },
                { value: "small", label: "Me + 1–2 friends" },
                { value: "group", label: "Bringing a full group (4+)" },
              ].map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, groupSize: opt.value }))}
                  className={`px-4 py-3 rounded-xl border-2 text-sm font-medium text-center transition-all ${
                    form.groupSize === opt.value
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border bg-background hover:border-primary/30"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold mb-2">Anything else? <span className="text-muted-foreground font-normal">(optional)</span></label>
            <textarea
              rows={4}
              value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition resize-none"
              placeholder="Questions, scheduling constraints, tile preferences, or anything else Jenn should know..."
            />
          </div>

          <button
            type="submit"
            disabled={!form.firstName || !form.email || !form.experience || !form.style}
            className="w-full py-5 bg-primary text-primary-foreground rounded-xl font-bold text-lg shadow-lg hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            Sign Me Up! <Send className="w-5 h-5" />
          </button>

          <p className="text-center text-sm text-muted-foreground">
            Jenn will reach out within a few days to discuss scheduling and next steps.
          </p>
        </form>
      </div>
    </div>
  );
}
