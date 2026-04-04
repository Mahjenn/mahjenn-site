import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, BookOpen, Smile, Instagram, Send } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="w-full pb-24">

      {/* Hero — personal, photo-first */}
      <div className="relative pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative order-2 lg:order-1"
            >
              <div className="aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl border border-border/50">
                <img
                  src={`${import.meta.env.BASE_URL}photos/corporate-3.jpg`}
                  alt="Jennifer Palmieri — Mah Jenn"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-56 h-56 bg-secondary/30 rounded-full blur-3xl -z-10"></div>
              <a
                href="https://instagram.com/Mah.Jenn"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-6 left-6 z-20 flex items-center gap-2 bg-background/90 backdrop-blur border border-border rounded-full px-4 py-2 shadow-lg text-sm font-semibold hover:border-primary/40 transition-colors"
              >
                <Instagram className="w-4 h-4 text-primary" />
                @Mah.Jenn
              </a>
            </motion.div>

            {/* Personal intro */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="order-1 lg:order-2 space-y-6"
            >
              <div>
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">American & Chinese Mahjong Instructor</p>
                <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight">Hi, I'm Jenn!</h1>
                <p className="text-xl text-muted-foreground font-medium italic mb-6">fun · social · welcoming · obsessed with mahjong</p>
                <div className="w-16 h-1 bg-primary rounded-full mb-8"></div>
              </div>

              <p className="text-lg text-foreground/80 leading-relaxed">
                Welcome — I'd love to teach you how to play American Mah Jongg! I'm a registered nurse by profession, but mahjong is my passion. What started as a game at a friend's house turned into a full-on obsession, and before long I had taught so many people that starting a business just made sense.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                I love mahjong for the same reason I love nursing: it brings people together. There's something magical about sitting down around a table, learning something new, and walking away with new friends (and maybe a winning hand).
              </p>

              {/* Brand name story */}
              <div className="bg-muted/60 rounded-2xl p-6 border border-border">
                <p className="font-bold text-foreground mb-2">Why "Mah Jenn"?</p>
                <p className="text-muted-foreground leading-relaxed">
                  It's a pun — Mah <em>Jongg</em> + <em>Jenn</em>. Simple, a little cheeky, and honestly impossible to forget once you hear it. That's kind of my teaching style too.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href="/booking"
                  className="flex-1 text-center px-6 py-4 bg-primary text-primary-foreground rounded-xl font-bold shadow-lg hover:bg-primary/90 transition-all"
                >
                  Book a Session
                </Link>
                <a
                  href="https://calendly.com/jenniferlpalmieri1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-6 py-4 bg-card text-foreground border border-border rounded-xl font-bold shadow hover:border-primary/30 transition-all"
                >
                  📅 View Calendly
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-muted/40 py-20 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">The Mah Jenn Approach</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "American & Chinese Mahjong",
                desc: "I teach American Mah Jongg (NMJL card, Jokers, the Charleston) and Chinese Mahjong (Hong Kong style, no Jokers). Two great games — Jenn does both."
              },
              {
                icon: Heart,
                title: "Patient & Clear",
                desc: "No one learns by being rushed or overwhelmed. My nursing background means I'm wired to explain things at your pace, simply and without judgment, until it clicks."
              },
              {
                icon: Smile,
                title: "Social First",
                desc: "Mah Jongg is a social game — it should feel like a party. Every session is warm, welcoming, and full of laughs. You'll leave smiling whether you won or not."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-3xl p-8 border border-border shadow-sm hover:shadow-lg hover:border-primary/20 transition-all text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Photo row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-3 gap-4 rounded-3xl overflow-hidden">
          {[
            `${import.meta.env.BASE_URL}photos/lessons-2.jpg`,
            `${import.meta.env.BASE_URL}photos/lessons-5.jpg`,
            `${import.meta.env.BASE_URL}photos/lessons-3.jpg`,
          ].map((src, i) => (
            <div key={i} className="aspect-square overflow-hidden">
              <img src={src} alt="Mah Jenn session" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </div>

      {/* American Mah Jongg overview */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card border border-border rounded-3xl p-10 shadow-sm">
          <h2 className="text-2xl font-bold mb-2">What Makes American Mah Jongg Special</h2>
          <p className="text-muted-foreground mb-8">A quick overview so you know what to expect.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "The NMJL Card", body: "A new set of valid hands is published by the National Mah Jongg League every April. Learning the card is half the game — and it changes every year." },
              { title: "The Charleston", body: "Before gameplay begins, players pass tiles around the table in a mandatory exchange. It's your chance to set up your hand and shed what you don't need." },
              { title: "152 Tiles", body: "7 categories: Craks, Dots, Bams, Winds, Dragons, Flowers, and the all-powerful Jokers — the true wildcards of the game." },
              { title: "Calling & Exposures", body: "Call a discarded tile to complete a Pung (3), Kong (4), or Quint (5). Or play it concealed for a bigger score — your call." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="flex-shrink-0 w-2 bg-primary/30 rounded-full mt-1"></div>
                <div>
                  <h4 className="font-bold mb-1">{item.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Say hello — contact section */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Say hello!</h2>
          <p className="text-muted-foreground text-lg">
            Interested in a lesson or event? Send me a note and I'll get back to you.
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-3xl p-12 text-center shadow-sm"
          >
            <div className="text-5xl mb-4">🀄</div>
            <h3 className="text-2xl font-bold mb-2">Thanks for reaching out!</h3>
            <p className="text-muted-foreground">Jenn will be in touch soon. In the meantime, follow along on Instagram.</p>
            <a
              href="https://instagram.com/Mah.Jenn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              <Instagram className="w-4 h-4" /> @Mah.Jenn
            </a>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-sm space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold mb-2">First Name</label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Message</label>
              <textarea
                required
                rows={5}
                value={formState.message}
                onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition resize-none"
                placeholder="Tell Jenn about your group, what you're looking for, or any questions..."
              />
            </div>
            <div className="flex items-center justify-between pt-2 flex-wrap gap-4">
              <a
                href="https://instagram.com/Mah.Jenn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                <Instagram className="w-4 h-4" /> Follow @Mah.Jenn
              </a>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold shadow-lg hover:bg-primary/90 transition-all"
              >
                Send <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
}
