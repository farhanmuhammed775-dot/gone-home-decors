import React from 'react';
import { ShieldCheck, Sparkles, Truck, HeartHandshake, Award, Clock } from 'lucide-react';

export const TrustFeatures = () => {
  const features = [
    {
      icon: Award,
      title: 'Heritage Craftsmanship',
      desc: 'Hand-carved solid teak, rosewood, and sheesham crafted by seasoned master artisans in Kerala.'
    },
    {
      icon: Sparkles,
      title: 'Dreamy Bespoke Designs',
      desc: 'From custom floating staircases to luxury dining setups, custom tailored to your floor dimensions.'
    },
    {
      icon: Truck,
      title: 'White-Glove Delivery',
      desc: 'Careful protective transit with expert doorstep assembly across Malappuram, Kerala & Pan-India.'
    },
    {
      icon: HeartHandshake,
      title: 'Direct WhatsApp Concierge',
      desc: 'No confusing shopping carts. Connect directly with our design consultants for immediate quotes.'
    }
  ];

  return (
    <section className="py-14 bg-[#F8F5EE] border-y border-[#EADBCA]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-['Cinzel'] uppercase tracking-widest text-[#9A7B2C] font-bold mb-1">
            Why Choose G One Home Décors
          </p>
          <h2 className="text-2xl sm:text-3xl font-['Cinzel'] font-bold text-gray-900">
            Luxury Furniture Built for Generations
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-3" />
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div 
                key={index} 
                className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md hover:border-[#C5A059]/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FCF9F0] border border-[#EEDFA8] flex items-center justify-center mb-4 text-[#88652D]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-['Cinzel'] font-bold text-base text-gray-900 mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
