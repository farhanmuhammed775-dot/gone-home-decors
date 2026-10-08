import React from 'react';
import { 
  Sparkles, 
  Footprints, 
  UtensilsCrossed, 
  BedDouble, 
  Sofa, 
  Palette, 
  Layers, 
  SunMedium, 
  Lamp 
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';

const iconMap = {
  Sparkles: Sparkles,
  Footprints: Footprints,
  UtensilsCrossed: UtensilsCrossed,
  BedDouble: BedDouble,
  Sofa: Sofa,
  Palette: Palette,
  Layers: Layers,
  SunMedium: SunMedium,
  Lamp: Lamp
};

export const CategoryNav = ({ activeCategory, onSelectCategory, productCounts }) => {
  return (
    <div className="bg-white border-b border-[#EADDCA]/60 sticky top-[72px] sm:top-[76px] z-30 shadow-xs backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
            <h2 className="text-xs uppercase font-['Cinzel'] tracking-wider font-bold text-gray-800">
              Curated Collections
            </h2>
          </div>
          <span className="text-[11px] text-gray-500 hidden sm:inline">
            Select category to filter
          </span>
        </div>

        {/* Categories Bar in exact requested order:
            1. All
            2. Staircase
            3. Dining
            4. Bedroom
            5. Living
            6. Decor
            7. Mattress
            8. Outdoor
            9. Lamps & Lighting
        */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#C5A059]/40 scrollbar-track-gray-100 no-scrollbar">
          {CATEGORIES.map((cat, index) => {
            const IconComponent = iconMap[cat.icon] || Sparkles;
            const isSelected = (cat.name === 'All' && activeCategory === 'All') || (activeCategory.toLowerCase() === cat.name.toLowerCase());
            const count = productCounts[cat.name] || 0;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.name)}
                className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 border cursor-pointer ${
                  isSelected
                    ? 'bg-[#121417] text-white border-[#121417] shadow-md ring-2 ring-[#C5A059]/50'
                    : 'bg-[#FDFBF7] text-gray-700 border-gray-200 hover:border-[#C5A059] hover:bg-white hover:text-[#121417]'
                }`}
              >
                <span className={`p-1 rounded-md transition-colors ${
                  isSelected 
                    ? 'bg-[#C5A059] text-[#121417]' 
                    : 'bg-gray-100 text-[#88652D] group-hover:bg-[#C5A059]/20'
                }`}>
                  <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </span>

                <span className="tracking-wide">{cat.name}</span>

                {count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    isSelected 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gray-200/80 text-gray-600 group-hover:bg-[#C5A059]/20 group-hover:text-[#88652D]'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
