import React from 'react';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Mail, 
  Clock, 
  ArrowUp, 
  Heart, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { CATEGORIES } from '../data/categories';

export const Footer = ({ onSelectCategory }) => {
  const whatsappUrl = "https://wa.me/+918606854763";
  const instagramUrl = "https://www.instagram.com/gonehomedecors?stkn=MWt3NnF4b2hhbm5scw==";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#121417] text-white pt-16 pb-8 border-t border-[#C5A059]/30 relative">
      
      {/* Top Gold Gradient Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 gold-gradient-bg" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main Grid: 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-gray-800">
          
          {/* Brand & Slogan Column (4 columns) */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-1 rounded-full bg-white/10 border border-[#C5A059]">
                <img 
                  src="/assets/logo.png" 
                  alt="G One Home Décors Logo" 
                  className="w-12 h-12 object-contain rounded-full"
                />
              </div>
              <div>
                <span className="font-['Cinzel'] text-xl font-bold tracking-wider text-white">
                  G ONE
                </span>
                <span className="text-[#C5A059] font-['Cinzel'] text-xs font-semibold tracking-widest block uppercase">
                  HOME DÉCORS
                </span>
              </div>
            </div>

            <p className="font-['Cinzel'] text-xs uppercase tracking-widest text-[#E8D3A2] font-semibold mb-3">
              Leads to dreamy world
            </p>

            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Handcrafting bespoke luxury furniture, architectural staircases, and royal home decors. Transforming Kerala homes with eternal elegance and certified master woodcraft.
            </p>

            {/* Social Direct Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Instagram Redirect Button */}
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white text-xs font-semibold shadow-md transition-transform hover:scale-105"
                title="Follow G One Home Décors on Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Instagram</span>
              </a>

              {/* WhatsApp Direct Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold shadow-md shadow-[#25D366]/20 transition-transform hover:scale-105"
                title="Chat with G One on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp Direct</span>
              </a>
            </div>
          </div>

          {/* Quick Categories Column (3 columns) */}
          <div className="lg:col-span-3">
            <h3 className="font-['Cinzel'] font-bold text-sm tracking-wider uppercase text-[#E8D3A2] mb-4 pb-2 border-b border-gray-800">
              Product Collections
            </h3>
            <ul className="space-y-2 text-xs text-gray-400">
              {CATEGORIES.slice(1).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      if (onSelectCategory) onSelectCategory(cat.name);
                      const el = document.getElementById('products');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-[#C5A059] flex items-center gap-1.5 transition-colors group cursor-pointer text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
                    <span>{cat.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details & Showroom Address (5 columns) */}
          <div className="lg:col-span-5">
            <h3 className="font-['Cinzel'] font-bold text-sm tracking-wider uppercase text-[#E8D3A2] mb-4 pb-2 border-b border-gray-800">
              Showroom & Contacts
            </h3>

            <div className="space-y-4 text-xs text-gray-300">
              
              {/* Business Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white text-sm mb-0.5 font-['Cinzel']">
                    G One Home Décors
                  </strong>
                  <p className="text-gray-400 leading-relaxed">
                    Manjeri, Malappuram, Kerala - 676122
                  </p>
                  <a 
                    href="https://maps.google.com/?q=Manjeri,Malappuram,Kerala"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-1 text-[11px] text-[#C5A059] hover:underline"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>

              {/* Contact Numbers */}
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white text-xs mb-0.5 font-semibold">
                    Customer & Order Hotline:
                  </strong>
                  <div className="flex flex-wrap items-center gap-3">
                    <a 
                      href="tel:+918606854763"
                      className="text-gray-300 hover:text-[#C5A059] font-mono text-sm font-semibold transition-colors"
                    >
                      +91 8606854763
                    </a>
                    <span className="text-gray-600">/</span>
                    <a 
                      href="tel:+919526785319"
                      className="text-gray-300 hover:text-[#C5A059] font-mono text-sm font-semibold transition-colors"
                    >
                      +91 9526785319
                    </a>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="text-gray-400">Monday - Saturday:</span>
                  <span className="text-white ml-1 font-medium">9:30 AM – 8:00 PM</span>
                  <p className="text-[11px] text-gray-500">Sunday by appointment</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            <p>
              © {new Date().getFullYear()} <strong className="text-gray-300">G One Home Décors</strong>. All rights reserved. Manjeri, Malappuram, Kerala - 676122.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#C5A059] tracking-wider uppercase text-[10px] font-semibold">
              Leads to dreamy world
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-gray-800 hover:bg-[#C5A059] hover:text-[#121417] text-gray-400 transition-colors cursor-pointer"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};