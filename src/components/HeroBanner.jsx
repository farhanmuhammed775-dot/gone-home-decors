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

  const scrollToCategories = () => {
    const el = document.getElementById('categories');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[80vh] sm:min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#121417]">
      
      {/* Autoplaying, Muted, Looped Background Video from Cloudinary */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1920&auto=format&fit=crop"
          className="w-full h-full object-cover scale-105 filter brightness-[0.70] contrast-[1.05]"
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#121417] via-[#121417]/60 to-[#121417]/75" />
        <div className="absolute inset-0 bg-[#C5A059]/10 mix-blend-overlay" />
      </div>

      {/* Floating Video Controls */}
      <div className="absolute bottom-5 right-5 z-20 hidden sm:flex items-center gap-2 bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/10 text-white/80 hover:text-white transition-all text-xs">
        <button 
          onClick={togglePlay}
          className="p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          title={isPlaying ? "Pause Video" : "Play Video"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <button 
          onClick={toggleMute}
          className="p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          title={isMuted ? "Unmute Video" : "Mute Video"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-12 sm:pb-16 text-center text-white">
        
        {/* Brand Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-[#C5A059]/40 mb-5 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-[#E8D3A2] uppercase font-['Cinzel']">
            G One Home Décors · Manjeri, Kerala
          </span>
        </div>

        {/* Replaced Headline with Customer-Aesthetic, Realistic Title */}
        <h1 className="font-['Cinzel'] font-bold tracking-wide text-2xl sm:text-4xl md:text-5xl leading-tight sm:leading-snug mb-4 sm:mb-5 drop-shadow-xl">
          <span className="text-white block sm:inline">Royal Colonial</span>{' '}
          <span className="text-[#C5A059] font-serif italic font-normal">&amp;</span>{' '}
          <span className="gold-gradient-text block sm:inline">Modern Custom Furniture</span>
        </h1>

        {/* Narrative Description */}
        <p className="max-w-xl mx-auto text-xs sm:text-sm md:text-base text-gray-200 font-light leading-relaxed mb-8 drop-shadow">
          Handcrafted wooden living sets, architectural staircases, and bespoke luxury interior decor designed to elevate your home.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
          {/* Explore Collection Button */}
          <button
            type="button"
            onClick={scrollToCategories}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-['Cinzel'] font-bold text-xs sm:text-sm tracking-wider uppercase bg-gradient-to-r from-[#ECC872] via-[#C5A059] to-[#9A7B2C] text-[#121417] shadow-lg shadow-[#C5A059]/30 hover:shadow-xl hover:shadow-[#C5A059]/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Direct WhatsApp Ordering */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm tracking-wide bg-[#25D366] hover:bg-[#20ba59] text-white shadow-lg shadow-[#25D366]/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-white/20"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Order via WhatsApp</span>
          </a>
        </div>

      </div>

    </section>
  );
};