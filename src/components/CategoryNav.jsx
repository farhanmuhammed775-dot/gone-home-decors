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
  Lamp,
  Wind,
  ChevronRight,
  Check
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
  Lamp: Lamp,
  Wind: Wind
};

export const CategoryNav = ({ activeCategory, onSelectCategory, productCounts }) => {
  const handleCategoryClick = (categoryName) => {
    onSelectCategory(categoryName);
    // Use rAF to defer scroll until after React re-render, preventing scroll-jank
    requestAnimationFrame(() => {
      const productsSection = document.getElementById('products');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  return (
    <section id="categories" className="py-10 sm:py-14 bg-[#FDFBF7] border-b border-[#EADDCA]/60">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-9">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCF9F0] border border-[#EEDFA8] text-[11px] font-semibold text-[#88652D] uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Select Collection</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-['Cinzel'] font-bold text-gray-900">
            Explore By Categories
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Tap any category below to view models &amp; confirm orders
          </p>
        </div>

        {/* 10 Categories: 2 cols on mobile, 5 cols on tablet/desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-4 md:gap-4" style={{ touchAction: 'pan-y' }}>
          {CATEGORIES.map((cat, index) => {
            const IconComponent = iconMap[cat.icon] || Sparkles;
            const isSelected = 
              (cat.name === 'All' && activeCategory === 'All') || 
              (activeCategory.toLowerCase() === cat.name.toLowerCase());
            const count = productCounts[cat.name] || 0;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(cat.name)}
                className={`group relative overflow-hidden rounded-xl sm:rounded-2xl text-left border cursor-pointer flex flex-col justify-between aspect-[1/1] sm:aspect-[4/3] md:aspect-[16/10] p-2.5 sm:p-4 ${
                  isSelected
                    ? 'border-[#C5A059] ring-2 ring-[#C5A059] shadow-lg shadow-[#C5A059]/20'
                    : 'border-gray-200'
                }`}
                style={{ contain: 'layout paint' }}
              >
                {/* Background Image — NO css filter (too expensive on mobile GPUs).
                    Darkness is achieved by a plain div overlay instead. */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                    style={{ transform: 'translateZ(0)' }}
                  />
                  {/* Static dark base — no transition, no filter, no repaint */}
                  <div className="absolute inset-0 bg-black/55" />
                  {/* Gradient vignette — static, no transition */}
                  <div className={`absolute inset-0 ${
                    isSelected
                      ? 'bg-gradient-to-t from-black/70 via-transparent to-[#C5A059]/20'
                      : 'bg-gradient-to-t from-black/65 via-transparent to-transparent'
                  }`} />
                </div>

                {/* Top Badge: Active / Count */}
                <div className="relative z-10 flex items-center justify-between w-full">
                  {/* Replace backdrop-blur with solid bg — blur is GPU-killer on mobile */}
                  <span className={`p-1 sm:p-1.5 rounded-lg transition-colors ${
                    isSelected
                      ? 'bg-[#C5A059] text-[#121417]'
                      : 'bg-black/60 text-[#E8D3A2] border border-white/10 group-hover:bg-[#C5A059] group-hover:text-[#121417]'
                  }`}>
                    <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
                  </span>

                  {isSelected ? (
                    <span className="hidden xs:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-[#C5A059] text-[#121417] shadow-xs">
                      <Check className="w-2.5 h-2.5" />
                      <span>Active</span>
                    </span>
                  ) : count > 0 ? (
                    <span className="px-1.5 py-0.5 rounded-md text-[9px] sm:text-[10px] font-mono font-medium bg-black/60 text-gray-200 border border-white/10">
                      {count}
                    </span>
                  ) : null}
                </div>

                {/* Bottom Content: Category Name & Arrow */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-['Cinzel'] font-bold text-xs sm:text-base md:text-lg leading-tight line-clamp-1 transition-colors ${
                      isSelected ? 'text-[#E8D3A2]' : 'text-white group-hover:text-[#E8D3A2]'
                    }`}>
                      {cat.name}
                    </h3>
                    <ChevronRight className={`w-3 h-3 sm:w-4 sm:h-4 text-[#C5A059] transition-transform ${
                      isSelected ? 'translate-x-0.5' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5'
                    }`} />
                  </div>
                  <p className="hidden md:block text-[11px] text-gray-300 line-clamp-1 mt-0.5 font-light">
                    {cat.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};