import React from 'react';
import { Sparkles, MapPin, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';

export const AboutSection = () => {
  const whatsappUrl = "https://wa.me/+918606854763?text=Hi%2C%20I%20would%20like%20to%20visit%20G%20One%20Home%20D%C3%A9cors%20showroom%20in%20Manjeri.";

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Showcase (5 columns) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#EADDCA]">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop"
                alt="G One Home Decors Workshop & Showroom"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#C5A059]/40 shadow-xl flex items-center gap-4">
                <img 
                  src="/assets/logo.png" 
                  alt="G One Logo" 
                  className="w-14 h-14 object-contain rounded-full border border-[#C5A059]"
                />
                <div>
                  <h4 className="font-['Cinzel'] font-bold text-gray-900 text-sm">G ONE HOME DÉCORS</h4>
                  <p className="text-[11px] text-[#9A7B2C] font-semibold tracking-wide uppercase">Leads to dreamy world</p>
                  <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#C5A059]" /> Manjeri, Malappuram
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative Gold Accent Box */}
            <div className="hidden sm:block absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#C5A059] rounded-tl-3xl pointer-events-none" />
            <div className="hidden sm:block absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[#C5A059] rounded-br-3xl pointer-events-none" />
          </div>

          {/* Narrative Content (7 columns) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCF9F0] border border-[#EEDFA8] text-xs font-semibold text-[#88652D] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespoke Interior Craftsmanship</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-['Cinzel'] font-bold text-gray-900 leading-tight mb-4">
              Where Kerala’s Finest Timber Meets Modern Luxury Living
            </h2>

            <p className="text-base text-gray-600 leading-relaxed mb-6">
              Welcome to <strong className="text-gray-900">G One Home Décors</strong>. Located in the heart of Manjeri, Malappuram, we specialize in curating living spaces that inspire and soothe. With a motto that <span className="text-[#88652D] font-semibold italic">"Leads to Dreamy World"</span>, our team transforms spaces using seasoned Nilambur teak, royal rosewood, and contemporary Italian marble.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-[#FDFBF7] border border-gray-100">
                <h4 className="font-['Cinzel'] font-bold text-gray-900 text-sm mb-1">Architectural Staircases</h4>
                <p className="text-xs text-gray-500">Floating treads, curved spirals, brass railings, and glass balconies.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#FDFBF7] border border-gray-100">
                <h4 className="font-['Cinzel'] font-bold text-gray-900 text-sm mb-1">Complete Home Suites</h4>
                <p className="text-xs text-gray-500">Dining, Bedroom, Living, Decor, Mattress, Outdoor & Lighting.</p>
              </div>
            </div>

            {/* Contact Direct Action */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm shadow-md shadow-[#25D366]/20 transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Plan a Visit or Consultation</span>
              </a>

              <a
                href="tel:+918606854763"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-sm transition-all"
              >
                <Phone className="w-4 h-4 text-[#88652D]" />
                <span>Call Showroom</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};