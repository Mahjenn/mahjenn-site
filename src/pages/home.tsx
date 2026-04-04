import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Users, BookOpen, Sparkles, Smile, Trophy } from "lucide-react";
const BASE = import.meta.env.BASE_URL;

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const photos = {
  corporate1: `${BASE}photos/corporate-1.jpg`,
  corporate2: `${BASE}photos/corporate-2.jpg`,
  corporate3: `${BASE}photos/corporate-3.jpg`,
  corporate4: `${BASE}photos/corporate-4.jpg`,
  lessons1:   `${BASE}photos/lessons-1.jpg`,
  lessons2:   `${BASE}photos/lessons-2.jpg`,
  lessons3:   `${BASE}photos/lessons-3.jpg`,
  lessons4:   `${BASE}photos/lessons-4.jpg`,
  lessons5:   `${BASE}photos/lessons-5.jpg`,
};

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={`${BASE}photos/lessons-4.jpg`}
            alt="Mahjong session with Jenn"
            className="w-full h-full object-cover object-center scale-105"
          />
          {/* Soft warm wash — lets the photo breathe while keeping text readable */}
          <div className="absolute inset-0 bg-background/55"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto space-y-8"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur border border-primary/20 text-primary font-medium text-sm mb-4 shadow-sm">
              <Sparkles className="w-4 h-4" /> American Mah Jongg · Taught with Patience & Heart
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground drop-shadow-sm leading-tight">
                Learn Mah Jongg<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">with Jenn</span>
              </h1>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-foreground/80 font-medium max-w-2xl mx-auto leading-relaxed">
              Expert-led American Mah Jongg lessons, parties, and events — taught with patience, clarity, and a whole lot of fun.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link
                href="/booking"
                className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold shadow-xl shadow-primary/25 hover:shadow-2xl hover:bg-primary/95 hover:-translate-y-0.5 transition-all text-lg flex items-center justify-center gap-2"
              >
                Book a Session <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/store"
                className="w-full sm:w-auto px-8 py-4 bg-card text-foreground border border-border rounded-xl font-bold shadow-lg hover:shadow-xl hover:border-primary/30 transition-all text-lg text-center"
              >
                Shop Collection
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery Strip */}
      <section className="py-0 overflow-hidden">
        <div className="flex gap-2 h-52 md:h-72">
          {[photos.lessons1, photos.corporate2, photos.lessons5, photos.lessons2, photos.corporate4].map((src, i) => (
            <div key={i} className="flex-1 min-w-0 overflow-hidden">
              <img
                src={src}
                alt="Mah Jenn event"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ways to Learn with Jenn</h2>
            <p className="text-lg text-muted-foreground">Whether you've never touched a tile or want to sharpen your strategy, there's a session for you.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BookOpen,
                title: "Beginner's Lessons",
                desc: "Learn the rules, tile names, the NMJL card, and basic gameplay. You'll walk away knowing how to play a full game — guaranteed.",
                tag: "Most Popular",
                photo: photos.lessons1,
              },
              {
                icon: Users,
                title: "Mahjong Parties",
                desc: "We bring the tiles, you bring the guests. Perfect for birthdays, girls' nights, and team events. Instruction included for newcomers.",
                tag: "Groups up to 16",
                photo: photos.lessons3,
              },
              {
                icon: Smile,
                title: "Corporate Events",
                desc: "A unique team-building experience everyone actually enjoys. Jenn brings the tiles, the instruction, and the energy — you just show up.",
                tag: "Custom events",
                photo: photos.corporate1,
              },
              {
                icon: Trophy,
                title: "Chinese Mahjong",
                desc: "The original game — no Jokers, no card. Deep strategy, pure skill. Jenn teaches Hong Kong style and other popular Chinese rule sets.",
                tag: "Now available",
                photo: photos.lessons2,
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-3xl overflow-hidden border border-border shadow-lg hover:shadow-xl hover:border-primary/20 transition-all group"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={service.photo}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider text-primary bg-background/90 backdrop-blur px-2 py-1 rounded-full">
                    {service.tag}
                  </div>
                </div>
                <div className="p-7">
                  <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-4 text-primary`}>
                    <service.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{service.desc}</p>
                  <Link href="/booking" className="inline-flex items-center gap-1 text-primary font-semibold text-sm mt-5 hover:gap-2 transition-all">
                    Book now <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Event Photos — 2-up feature */}
      <section className="py-24 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">From Jenn's Table</h2>
            <p className="text-lg text-muted-foreground">Real sessions, real laughs, real tiles.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden aspect-[4/3] shadow-lg"
            >
              <img src={photos.lessons3} alt="Lesson in action" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
            <div className="grid grid-cols-1 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="rounded-3xl overflow-hidden aspect-video shadow-lg"
              >
                <img src={photos.lessons4} alt="Mahjong board close-up" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="rounded-3xl overflow-hidden aspect-video shadow-lg"
              >
                <img src={photos.corporate3} alt="Jenn at a corporate event" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </motion.div>
            </div>
          </div>

          <div className="text-center mt-10">
            <a
              href="https://instagram.com/Mah.Jenn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Follow @Mah.Jenn for more <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Why Jenn Callout */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-3xl p-10 md:p-14 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Why Learn with Jenn</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Beginner-friendly, always welcoming</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: "Zero experience? Perfect.", tip: "Jenn's sessions are built for true beginners. You'll learn the rules, the card, and play a real game — all in one sitting." },
                { label: "Small groups, big fun", tip: "Every session is intimate and unhurried. Jenn goes at your group's pace so nobody feels left behind." },
                { label: "You'll actually remember it", tip: "As a nurse, Jenn knows how to break complex things into simple steps. Her teaching method sticks." },
                { label: "Just show up and laugh", tip: "Mah Jongg is a social game first. Laughter is guaranteed — and a winning hand is just a bonus." },
              ].map((item) => (
                <div key={item.label} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mt-0.5">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold mb-1">{item.label}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Curated Collection — Coming Soon */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Curated Collection</h2>
            <p className="text-lg text-muted-foreground">Premium sets and accessories for the discerning player.</p>
          </div>
          <div className="bg-card border border-border rounded-3xl py-16 px-8 text-center shadow-sm">
            <div className="text-5xl mb-5">🀄</div>
            <h3 className="text-2xl font-bold mb-3">Coming Soon</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Jenn's shop is almost ready. Follow on Instagram to be the first to know when it launches.
            </p>
            <a
              href="https://instagram.com/Mah.Jenn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              📸 Follow @Mah.Jenn
            </a>
          </div>
        </div>
      </section>

      {/* League Banner */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-muted/60 border border-border rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Trophy className="w-6 h-6 text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Now Forming</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Join a Regular League</h2>
              <p className="text-muted-foreground leading-relaxed max-w-lg">
                Play weekly or bi-weekly with a consistent group. Leagues available for American Mah Jongg and Chinese Mahjong — beginner to competitive levels. It's the best way to actually get good.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="/league"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold shadow-lg hover:bg-primary/90 transition-all text-lg whitespace-nowrap"
              >
                Sign Up <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto bg-foreground rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-[100px]"></div>
          </div>
          <div className="relative z-10">
            <div className="text-5xl mb-6">🀄</div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-background mb-4">Let's Play!</h2>
            <p className="text-xl text-background/80 mb-4 max-w-2xl mx-auto font-medium">
              Remember: the best way to learn is by playing.
            </p>
            <p className="text-background/60 mb-10 max-w-xl mx-auto">
              Your first game won't be perfect — and that's completely fine. Jenn will guide you through every step.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/booking"
                className="inline-flex px-10 py-5 bg-secondary text-secondary-foreground rounded-xl font-bold shadow-xl shadow-secondary/20 hover:scale-105 transition-transform text-lg"
              >
                Schedule Your Session
              </Link>
              <a
                href="https://instagram.com/Mah.Jenn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex px-8 py-5 bg-background/10 text-background border border-background/20 rounded-xl font-bold hover:bg-background/20 transition-all text-lg"
              >
                Follow @Mah.Jenn
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
