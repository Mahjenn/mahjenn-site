import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { motion, AnimatePresence } from "framer-motion";
import CartDrawer from "./cart-drawer";

export default function Layout({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [location] = useLocation();
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Jenn" },
    { href: "/booking", label: "Book a Session" },
    { href: "/league", label: "Join a League" },
    { href: "/store", label: "Shop" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background relative selection:bg-primary/20 selection:text-primary">
      {/* Navbar */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <span className="text-2xl leading-none select-none">🀄</span>
            <span className="font-serif text-2xl font-bold tracking-tight">Mah Jenn</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold tracking-wide transition-colors ${
                  location === link.href
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-foreground/80 hover:text-primary transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-secondary text-secondary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center translate-x-1 -translate-y-1">
                  {itemCount}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-foreground/80 hover:text-primary transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-secondary text-secondary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center translate-x-1 -translate-y-1">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-foreground/80"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[72px] bg-background border-b border-border z-40 p-4 shadow-lg md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`p-3 rounded-lg text-base font-semibold ${
                    location === link.href
                      ? "bg-primary/5 text-primary"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 w-full pt-[72px]">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl leading-none">🀄</span>
              <span className="font-serif text-2xl font-bold text-white">Mah Jenn</span>
            </div>
            <p className="text-background/70 leading-relaxed max-w-sm">
              American & Chinese Mahjong lessons, parties, leagues, and accessories — taught with patience, clarity, and a whole lot of fun.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-background/70 hover:text-secondary transition-colors">About Jenn</Link></li>
              <li><Link href="/booking" className="text-background/70 hover:text-secondary transition-colors">Book a Session</Link></li>
              <li><Link href="/league" className="text-background/70 hover:text-secondary transition-colors">Join a League</Link></li>
              <li><Link href="/store" className="text-background/70 hover:text-secondary transition-colors">Shop Collection</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-6">Connect</h4>
            <ul className="space-y-4 text-background/70">
              <li>
                <a
                  href="https://calendly.com/jenniferlpalmieri1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-secondary transition-colors"
                >
                  📅 Book via Calendly
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/Mah.Jenn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-secondary transition-colors"
                >
                  📸 @Mah.Jenn on Instagram
                </a>
              </li>
              <li className="text-background/50 text-sm">Available for private events & parties</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-background/10 text-center text-sm text-background/50">
          &copy; {new Date().getFullYear()} Jennifer Palmieri · Mah Jenn. All rights reserved.
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
