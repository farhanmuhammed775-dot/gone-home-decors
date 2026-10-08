import React from 'react';
import { X, MessageCircle, Star, ShieldCheck, Truck, RefreshCw, Sparkles, MapPin } from 'lucide-react';
import { formatINR } from './ProductCard';

export const ProductDetailModal = ({ product, onClose }) => {
  if (!product) return null;

  const formattedPrice = formatINR(product.price);
  const formattedMRP = product.mrp ? formatINR(product.mrp) : null;

  const handleWhatsAppOrder = () => {
    const message = `Hi, I would like to confirm an order for ${product.title} priced at ${formattedPrice}`;
    const url = `https://wa.me/+918606854763?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#C5A059]/40 max-h-[92vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 shadow-md transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Media Column */}
        <div className="w-full md:w-1/2 bg-gray-900 relative min-h-[300px] md:min-h-full">
          <img
            src={product.image_url || '/assets/logo.png'}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider bg-[#121417]/80 text-[#E8D3A2] backdrop-blur-md border border-[#C5A059]/30">
              {product.category}
            </span>
          </div>
        </div>

        {/* Product Details & Actions Column */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center gap-1 text-xs text-[#C5A059] font-bold">
                <Star className="w-4 h-4 fill-[#C5A059]" />
                {product.rating || '4.9'}
              </span>
              <span className="text-xs text-gray-400">
                ({product.reviewsCount || 24} Verified Kerala Customers)
              </span>
            </div>

            <h2 className="font-['Cinzel'] font-bold text-xl sm:text-2xl text-gray-900 leading-tight mb-3">
              {product.title}
            </h2>

            {/* Price section */}
            <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-gray-100">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#121417]">
                {formattedPrice}
              </span>
              {formattedMRP && (
                <span className="text-sm text-gray-400 line-through">
                  {formattedMRP}
                </span>
              )}
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                Inclusive of all taxes
              </span>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 font-['Cinzel']">
                Product Description
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#FCF9F0] border border-[#EEDFA8]/70 mb-6 text-xs">
              <div>
                <p className="text-gray-500 font-medium">Material / Finish</p>
                <p className="font-semibold text-gray-800">{product.material || 'Premium Solid Hardwood'}</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">Dimensions / Size</p>
                <p className="font-semibold text-gray-800">{product.dimensions || 'Standard / Custom Sizing'}</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">Delivery Location</p>
                <p className="font-semibold text-gray-800">Manjeri & All India</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">Customization</p>
                <p className="font-semibold text-emerald-700">100% Available on WhatsApp</p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#C5A059]" />
                <span>Careful Transit</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span>Wood Warranty</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>Artisan Finish</span>
              </div>
            </div>
          </div>

          {/* Action CTA Button */}
          <div className="pt-4 border-t border-gray-100">
            <button
              onClick={handleWhatsAppOrder}
              className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-bold text-sm text-white bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] shadow-lg shadow-[#25D366]/30 transition-all duration-200 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Confirm Order via WhatsApp</span>
            </button>
            <p className="text-center text-[11px] text-gray-400 mt-2">
              Instant quote confirmation directly with our master craftsmen on WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
