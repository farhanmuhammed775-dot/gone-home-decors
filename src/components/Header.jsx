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
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappUrl = "https://wa.me/+918606854763";
  const instagramUrl = "https://www.instagram.com/gonehomedecors?stkn=MWt3NnF4b2hhbm5scw==";

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Announcement & Quick Contact Bar */}
      <div className="bg-[#121417]/90 text-white text-xs border-b border-[#C5A059]/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-gray-300">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="hidden md:inline">Showroom:</span> Manjeri, Malappuram, Kerala
            </span>
            <span className="hidden sm:inline text-gray-500">|</span>
            <a 
              href="tel:+918606854763" 
              className="flex items-center gap-1.5 hover:text-[#C5A059] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
              +91 8606854763
            </a>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#E8D3A2] tracking-wider uppercase text-[10px] sm:text-xs font-semibold">
              ✦ Leads to Dreamy World ✦
            </span>
            <div className="flex items-center gap-2 pl-2 border-l border-gray-700">
              <a 
                href={instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#C5A059] transition-colors p-1"
                title="Follow on Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#25D366] transition-colors p-1"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navigation Bar */}
      <div className={`transition-all duration-300 ${scrolled ? 'bg-[#121417]/95 shadow-xl py-2.5 border-b border-[#C5A059]/30' : 'bg-[#121417]/75 backdrop-blur-md py-3.5 border-b border-white/10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Mobile Hamburger Button */}
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-[#C5A059] focus:outline-none transition-colors cursor-pointer"
            aria-label="Toggle Hamburger Menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>

          {/* Brand Logo with 3-Clicks Secret Admin Trigger */}
          <div className="flex items-center select-none">
            <div 
              onClick={handleLogoClick}
              role="button"
              tabIndex={0}
              title="G One Home Décors"
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-full p-1 bg-white/10 border border-[#C5A059]/40 shadow-md group-hover:border-[#C5A059] transition-all">
                <img 
                  src="/assets/logo.png" 
                  alt="G One Home Décors Logo" 
                  className="h-11 w-11 sm:h-13 sm:w-13 object-contain rounded-full transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-['Cinzel'] text-lg sm:text-2xl font-bold tracking-wider text-white">
                    G ONE
                  </span>
                  <span className="text-[#C5A059] font-['Cinzel'] text-xs sm:text-sm font-semibold tracking-widest uppercase">
                    HOME DÉCORS
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-[#E8D3A2] tracking-widest uppercase font-medium">
                  Leads to dreamy world
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-200">
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

          {/* Right Action Button: Search */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToSection('products')}
              className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl border border-white/10 transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Hamburger Mobile Drawer */}
      <div 
        className={`md:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-lg transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div 
          className={`w-[82%] max-w-sm h-full bg-[#171A1E] text-white p-6 shadow-2xl flex flex-col justify-between border-r border-[#C5A059]/30 transform transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            {/* Drawer Header with 3-clicks logo trigger */}
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <div 
                onClick={handleLogoClick}
                className="flex items-center gap-2.5 cursor-pointer"
              >
                <img src="/assets/logo.png" alt="G One Home Decors" className="w-9 h-9 object-contain rounded-full" />
                <div>
                  <h3 className="font-['Cinzel'] font-bold text-white text-base">G ONE</h3>
                  <p className="text-[10px] text-[#C5A059] tracking-wider uppercase font-medium">Leads to dreamy world</p>
                </div>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Navigation List */}
            <nav className="mt-6 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => scrollToSection('products')}
                className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-white/5 text-left text-gray-100 font-medium transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-[#C5A059]" />
                  <span>Shop</span>
                </span>
                <span className="text-xs text-gray-400">Browse All</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-white/5 text-left text-gray-100 font-medium transition-colors cursor-pointer"
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