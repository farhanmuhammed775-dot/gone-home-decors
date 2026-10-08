import React, { useState } from 'react';
import { MessageCircle, Eye, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const formatINR = (amount) => {
  if (typeof amount !== 'number') {
    amount = Number(amount) || 0;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const ProductCard = ({ product, onQuickView }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formattedPrice = formatINR(product.price);
  const formattedMRP = product.mrp ? formatINR(product.mrp) : null;
  const discountPercent = product.mrp && product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : null;

  // Exact WhatsApp confirmation URL specification:
  // https://wa.me/+918606854763?text=Hi%2C%20I%20would%20like%20to%20confirm%20an%20order%20for%20[Product_Title]%20priced%20at%20[Product_Price]
  const handleWhatsAppOrder = (e) => {
    e.stopPropagation();

    // Trigger subtle celebratory confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#25D366', '#C5A059', '#121417', '#FFFFFF']
      });
    } catch (err) {
      // Ignore if canvas-confetti fails
    }

    const message = `Hi, I would like to confirm an order for ${product.title} priced at ${formattedPrice}`;
    const url = `https://wa.me/+918606854763?text=${encodeURIComponent(message)}`;
    
    // Open in new window
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="group bg-white rounded-2xl overflow-hidden border border-[#E9E4DC] hover:border-[#C5A059]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        {/* Image Container with Badges */}
        <div 
          className="relative aspect-[4/3] bg-gray-100 overflow-hidden cursor-pointer"
          onClick={() => onQuickView(product)}
        >
          {/* Skeleton placeholder while loading */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse" />
          )}

          <img
            src={product.image_url || '/assets/logo.png'}
            alt={product.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Category Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wider uppercase bg-[#121417]/85 text-[#E8D3A2] backdrop-blur-md border border-[#C5A059]/40 shadow-sm">
              {product.category}
            </span>
          </div>

          {/* Discount Tag */}
          {discountPercent && (
            <div className="absolute top-3 right-3 z-10">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-[#C5A059] text-[#121417] shadow-sm">
                {discountPercent}% OFF
              </span>
            </div>
          )}

          {/* Quick View Hover Overlay Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="absolute inset-x-4 bottom-3 py-2 rounded-xl bg-black/75 hover:bg-black text-white text-xs font-semibold backdrop-blur-md flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md"
          >
            <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Quick View Specifications</span>
          </button>
        </div>

        {/* Product Details Section */}
        <div className="p-4 sm:p-5">
          {/* Rating & Reviews Bar */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <div className="flex items-center gap-1 text-[#C5A059]">
              <Star className="w-3.5 h-3.5 fill-[#C5A059]" />
              <span className="font-semibold text-gray-800">{product.rating || '4.9'}</span>
              <span className="text-gray-400">({product.reviewsCount || 24})</span>
            </div>
            <span className="text-[11px] text-[#88652D] font-medium bg-[#FCF9F0] px-2 py-0.5 rounded border border-[#EEDFA8]">
              Kerala Craft
            </span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-['Cinzel'] font-bold text-gray-900 text-base sm:text-lg leading-snug line-clamp-2 hover:text-[#C5A059] transition-colors cursor-pointer mb-2 min-h-[2.8rem]"
          >
            {product.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4">
            {product.description || 'Custom crafted luxury home decor element designed with premium materials and bespoke precision.'}
          </p>

          {/* Pricing Row */}
          <div className="pt-2 border-t border-gray-100 flex items-baseline gap-2 mb-4">
            <span className="text-lg sm:text-xl font-extrabold text-[#121417] tracking-tight">
              {formattedPrice}
            </span>
            {formattedMRP && (
              <span className="text-xs text-gray-400 line-through">
                {formattedMRP}
              </span>
            )}
            <span className="text-[10px] text-emerald-700 font-semibold uppercase tracking-wider ml-auto">
              Free Delivery
            </span>
          </div>
        </div>
      </div>

      {/* Prominent WhatsApp Action Button
          Title Requirement: "Confirm Order via WhatsApp"
          Color: Green CTA button
      */}
      <div className="p-4 sm:p-5 pt-0">
        <button
          type="button"
          onClick={handleWhatsAppOrder}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm text-white bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] shadow-md shadow-[#25D366]/25 hover:shadow-lg hover:shadow-[#25D366]/40 transition-all duration-200 border border-[#25D366]/30 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span className="tracking-wide">Confirm Order via WhatsApp</span>
        </button>
      </div>

    </div>
  );
};
