import React, { useState, useRef } from 'react';
import { Sparkles, MessageCircle, ArrowRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';

export const HeroBanner = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const whatsappUrl = "https://wa.me/+918606854763?text=Hi%2C%20I%20would%20like%20to%20explore%20luxury%20custom%20furniture%20from%20G%20One%20Home%20D%C3%A9cors.";

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const scrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#121417]">
      
      {/* Autoplaying, Muted, Looped Background Video from Cloudinary */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1920&auto=format&fit=crop"
          className="w-full h-full object-cover scale-105 filter brightness-[0.75] contrast-[1.05]"
        >
          {/* Cloudinary high-definition interior design & luxury furniture video streams */}
          <source 
            src="https://res.cloudinary.com/demo/video/upload/q_auto,vc_h264/interior_design_luxury.mp4" 
            type="video/mp4" 
          />
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-modern-living-room-with-a-comfortable-sofa-42583-large.mp4" 
            type="video/mp4" 
          />
        </video>

        {/* Soft, Light Background Video Overlay: Warm amber gradient + soft charcoal tint */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121417] via-[#121417]/55 to-[#121417]/70" />
        <div className="absolute inset-0 bg-[#C5A059]/10 mix-blend-overlay" />
      </div>

      {/* Floating Video Controls (Subtle in Bottom Right Corner) */}
      <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-2 bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/10 text-white/80 hover:text-white transition-all text-xs">
        <button 
          onClick={togglePlay}
          className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
          title={isPlaying ? "Pause Video" : "Play Video"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <button 
          onClick={toggleMute}
          className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
          title={isMuted ? "Unmute Video" : "Mute Video"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
        <span className="px-2 text-[10px] tracking-wider uppercase text-[#C5A059] font-medium">
          Aesthetic Ambient
        </span>
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-16 text-center text-white">
        
        {/* Brand Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#C5A059]/40 mb-6 shadow-xl animate-fade-in">
          <Sparkles className="w-4 h-4 text-[#C5A059]" />
          <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#E8D3A2] uppercase font-['Cinzel']">
            G One Home Décors · Manjeri, Kerala
          </span>
        </div>

        {/* The Requested Main Title: 'LEADS TO DREAMY WORLD' */}
        <h1 className="font-['Cinzel'] font-extrabold tracking-tight text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.15] mb-6 drop-shadow-2xl">
          <span className="block text-white">TRANSFORM YOUR HOME</span>
          <span className="block mt-2 gold-gradient-text drop-shadow-[0_5px_20px_rgba(197,160,89,0.4)]">
            LEADS TO DREAMY WORLD
          </span>
        </h1>

        {/* Narrative Description inspired by WoodenStreet luxury aesthetic */}
        <p className="max-w-2xl mx-auto text-sm sm:text-lg text-gray-200 font-light leading-relaxed mb-10 drop-shadow">
          Immerse your space in handcrafted wooden masterpieces, bespoke staircases, and royal interior collections designed to elevate your lifestyle.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          {/* Explore Collection Button */}
          <button
            type="button"
            onClick={scrollToProducts}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-['Cinzel'] font-bold text-sm tracking-wider uppercase bg-gradient-to-r from-[#ECC872] via-[#C5A059] to-[#9A7B2C] text-[#121417] shadow-lg shadow-[#C5A059]/30 hover:shadow-xl hover:shadow-[#C5A059]/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Direct WhatsApp Ordering / Inquiry */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide bg-[#25D366] hover:bg-[#20ba59] text-white shadow-lg shadow-[#25D366]/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-white/20"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Order via WhatsApp</span>
          </a>
        </div>

        {/* Micro-Features Bar beneath Hero */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-4xl mx-auto">
          <div className="p-3 rounded-lg bg-black/25 backdrop-blur-sm border border-white/5">
            <p className="text-[#C5A059] font-['Cinzel'] font-bold text-base sm:text-lg">100% Solid Wood</p>
            <p className="text-xs text-gray-300">Grade-A Teak & Rosewood</p>
          </div>
          <div className="p-3 rounded-lg bg-black/25 backdrop-blur-sm border border-white/5">
            <p className="text-[#C5A059] font-['Cinzel'] font-bold text-base sm:text-lg">Custom Staircases</p>
            <p className="text-xs text-gray-300">Architectural Precision</p>
          </div>
          <div className="p-3 rounded-lg bg-black/25 backdrop-blur-sm border border-white/5">
            <p className="text-[#C5A059] font-['Cinzel'] font-bold text-base sm:text-lg">Direct WhatsApp</p>
            <p className="text-xs text-gray-300">Instant Quotes & Orders</p>
          </div>
          <div className="p-3 rounded-lg bg-black/25 backdrop-blur-sm border border-white/5">
            <p className="text-[#C5A059] font-['Cinzel'] font-bold text-base sm:text-lg">Kerala Wide Delivery</p>
            <p className="text-xs text-gray-300">White-Glove Installation</p>
          </div>
        </div>

      </div>

    </section>
  );
};
