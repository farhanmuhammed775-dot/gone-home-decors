import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  MapPin,
  Search,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';

export const Header = ({ onOpenAdminLogin, onCategorySelect, currentView }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  // Secret 3-clicks logo trigger for Admin Login
  const clickCountRef = useRef(0);
  const resetTimerRef = useRef(null);

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    clickCountRef.current += 1;
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);

    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      if (onOpenAdminLogin) onOpenAdminLogin();
      return;
    }

    // Reset count if user stops clicking within 1.5 seconds
    resetTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 1500);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 30);

      // Auto-hide logic for professional look
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true); // Scrolling down past 100px: Hide header
      } else if (currentScrollY < lastScrollY.current || currentScrollY < 50) {
        setHidden(false); // Scrolling up: Show header
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappUrl = "https://wa.me/+918606854763";
  const instagramUrl = "https://www.instagram.com/gonehomedecors?stkn=MWt3NnF4b2hhbm5scw==";

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);

    if (currentView !== 'home') {
      // If we are not on the homepage (e.g. on a Product Page), first route back to home
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
      // Wait for React to render the homepage, then scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (id === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (currentView !== 'home') {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-in-out ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>


      {/* Main Glassmorphic Navigation Bar */}
      <div className={`transition-all duration-300 ${scrolled ? 'bg-[#121417]/95 shadow-xl border-b border-[#C5A059]/30' : 'bg-[#121417]/75 backdrop-blur-md border-b border-white/10'}`}>
        <div className="max-w-7xl mx-auto px-[15px] py-[8px] min-h-[75px] flex items-center justify-between w-full">

          {/* Left/Center Content: Logo and Typography (navbar-left-group) */}
          <div className="flex items-center gap-[12px] flex-1">
            {/* Logo: Left-to-Center spanning (navbar-logo) */}
            <div
              onClick={handleLogoClick}
              role="button"
              tabIndex={0}
              title="G One Home Décors"
              className="group cursor-pointer shrink-0"
            >
              <img
                src="/assets/logo.png"
                alt="G One Logo"
                className="h-[48px] w-auto min-w-[120px] max-w-[160px] object-contain block transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Typography: Stacked Two-Line Text (navbar-brand-text) */}
            <div className="flex flex-col justify-center leading-[1.15]">
              <span className="font-['Cinzel'] text-[0.95rem] font-bold text-[#ffffff]">
                G ONE
              </span>
              <span className="font-['Cinzel'] text-[0.75rem] font-medium text-[#e5c158]">
                HOME DÉCORS
              </span>
            </div>
          </div>

          {/* Right: Navigation & Mobile Hamburger */}
          <div className="flex items-center justify-end shrink-0 pl-4 z-10">
            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-200">
              <a
                href="/"
                onClick={handleHomeClick}
                className="hover:text-[#C5A059] transition-colors tracking-wide py-1 border-b-2 border-transparent hover:border-[#C5A059]"
              >
                Home
              </a>
              <a
                href="#products"
                onClick={(e) => { e.preventDefault(); scrollToSection('products'); }}
                className="hover:text-[#C5A059] transition-colors tracking-wide py-1 border-b-2 border-transparent hover:border-[#C5A059]"
              >
                Shop
              </a>
              <a
                href="#about"
                onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
                className="hover:text-[#C5A059] transition-colors tracking-wide py-1 border-b-2 border-transparent hover:border-[#C5A059]"
              >
                Our Craft
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                className="hover:text-[#C5A059] transition-colors tracking-wide py-1 border-b-2 border-transparent hover:border-[#C5A059]"
              >
                Contact Us
              </a>

              {/* Quick Chat WhatsApp Link */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all text-xs font-semibold border border-[#25D366]/40"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Quick Chat</span>
              </a>
            </nav>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white focus:outline-none transition-colors cursor-pointer ml-3 sm:ml-4 drop-shadow-lg"
              aria-label="Toggle Hamburger Menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7 text-white" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Hamburger Mobile Drawer */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-md transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`w-[82%] max-w-sm h-full bg-[#121417] text-white p-6 shadow-2xl flex flex-col justify-between border-r border-[#C5A059]/30 transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            {/* Drawer Header with 3-clicks logo trigger */}
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <div
                onClick={handleLogoClick}
                className="cursor-pointer"
              >
                <img src="/assets/logo.png" alt="G One Home Decors" className="max-h-[40px] w-auto object-contain" />
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Navigation List */}
            <nav className="mt-6 flex flex-col gap-2 relative z-50">
              <button
                type="button"
                onClick={() => { if (currentView !== 'home') { window.history.pushState({}, '', '/'); window.dispatchEvent(new PopStateEvent('popstate')); } setMobileMenuOpen(false); }}
                className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-white/10 text-left text-gray-50 font-bold tracking-wide transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-3 drop-shadow-md">
                  <svg className="w-5 h-5 text-[#C5A059]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                  <span>Home</span>
                </span>
                <span className="text-xs text-gray-300">Main Page</span>
              </button>

              <button
                type="button"
                onClick={() => { scrollToSection('products'); setMobileMenuOpen(false); }}
                className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-white/10 text-left text-gray-50 font-bold tracking-wide transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-3 drop-shadow-md">
                  <ShoppingBag className="w-5 h-5 text-[#C5A059]" />
                  <span>Shop Collections</span>
                </span>
                <span className="text-xs text-gray-300">Browse All</span>
              </button>

              <button
                type="button"
                onClick={() => { scrollToSection('contact'); setMobileMenuOpen(false); }}
                className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-white/10 text-left text-gray-50 font-bold tracking-wide transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#C5A059]" />
                  <span>Contact Us</span>
                </span>
                <span className="text-xs text-gray-400">Manjeri, Kerala</span>
              </button>

              {/* Quick Chat - WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between w-full p-3.5 mt-2 rounded-xl bg-[#25D366] text-white font-semibold shadow-lg shadow-[#25D366]/20 transition-transform active:scale-98"
              >
                <span className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Quick Chat</span>
                </span>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-mono">WhatsApp</span>
              </a>

              <hr className="my-4 border-white/10" />

              {/* Categories Shortcut */}
              <div className="px-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2">Explore Collections</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['Staircase', 'Dining', 'Bedroom', 'Living', 'Decor', 'Mattress', 'Outdoor', 'Lamps & Lighting'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        if (onCategorySelect) onCategorySelect(cat);
                        scrollToSection('products');
                      }}
                      className="text-left py-1.5 px-2.5 rounded-lg bg-white/5 hover:bg-[#C5A059]/20 hover:text-[#C5A059] text-gray-300 transition-colors truncate cursor-pointer"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </div>

          {/* Drawer Footer */}
          <div className="pt-6 border-t border-white/10">
            <p className="text-center text-[10px] text-gray-500">
              G One Home Décors © 2026. Manjeri, Kerala.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};