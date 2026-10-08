import React, { useEffect, useState } from 'react';
import { ArrowLeft, MessageCircle, Star, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { formatINR } from '../components/ProductCard';

export const ProductPage = ({ products, onBack }) => {
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [productImages, setProductImages] = useState([]);

    useEffect(() => {
        // Extract the ID from the path: /product/:id
        const pathParts = window.location.pathname.split('/');
        if (pathParts.length >= 3 && pathParts[1] === 'product') {
            const id = pathParts[2];
            const found = products.find(p => p.id === id);
            setProduct(found);

            if (found) {
                document.title = `${found.title} - G One Home Décors`;
                const imgs = (found.images && found.images.length > 0) ? found.images : (found.image_url ? [found.image_url] : ['/assets/logo.png']);
                setProductImages(imgs);
                setSelectedImage(imgs[0]);
            }
        }
    }, [products]);

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
                <h2 className="font-['Cinzel'] text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#121417] text-white hover:bg-[#C5A059] transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Storefront</span>
                </button>
            </div>
        );
    }

    const formattedPrice = formatINR(product.price);
    const formattedMRP = product.mrp ? formatINR(product.mrp) : null;

    const handleWhatsAppOrder = () => {
        const message = `Hi, I would like to confirm an order for ${product.title} priced at ${formattedPrice}`;
        const url = `https://wa.me/+918606854763?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] pt-28 pb-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* Breadcrumb Navigation */}
                <button
                    onClick={onBack}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-gray-600 bg-white border border-gray-200 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.1)] hover:border-[#C5A059] hover:text-[#C5A059] hover:shadow-[0_4px_12px_-4px_rgba(197,160,89,0.3)] hover:-translate-y-0.5 cursor-pointer transition-all duration-300 mb-8"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Collections</span>
                </button>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row mb-12">

                    {/* Left Column: Image Gallery */}
                    <div className="w-full md:w-1/2 flex flex-col p-4 md:p-6 pb-0">
                        <div className="bg-gray-100 relative rounded-2xl overflow-hidden aspect-[4/3] w-full mb-3 shadow-inner">
                            <img
                                src={selectedImage}
                                alt={product.title}
                                className="w-full h-full object-cover transition-opacity duration-300"
                            />
                            <div className="absolute top-4 left-4 z-10">
                                <span className="px-3 md:px-4 py-1 sm:py-1.5 rounded-lg text-xs md:text-sm font-semibold uppercase tracking-wider bg-[#121417]/85 text-[#E8D3A2] backdrop-blur-md border border-[#C5A059]/40 shadow-sm">
                                    {product.category}
                                </span>
                            </div>
                        </div>

                        {/* Thumbnail Gallery (Only render if >1 images) */}
                        {productImages.length > 1 && (
                            <div className="flex gap-2.5 pb-2 overflow-x-auto scrollbar-hide py-1">
                                {productImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => setSelectedImage(img)}
                                        className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${selectedImage === img ? 'border-[#C5A059] shadow-md scale-95 opacity-100' : 'border-transparent opacity-60 hover:opacity-100 hover:scale-[0.98]'
                                            }`}
                                    >
                                        <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Details */}
                    <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="flex items-center gap-1 text-sm text-[#C5A059] font-bold">
                                    <Star className="w-4 h-4 md:w-5 md:h-5 fill-[#C5A059]" />
                                    {product.rating || '4.9'}
                                </span>
                                <span className="text-sm md:text-base text-gray-400">
                                    ({product.reviewsCount || 24} Verified Kerala Customers)
                                </span>
                            </div>

                            <h1 className="font-['Cinzel'] font-bold text-2xl sm:text-3xl md:text-4xl text-gray-900 leading-tight mb-4">
                                {product.title}
                            </h1>

                            {/* Price section */}
                            <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-gray-100">
                                <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#121417]">
                                    {formattedPrice}
                                </span>
                                {formattedMRP && (
                                    <span className="text-lg md:text-xl text-gray-400 line-through">
                                        {formattedMRP}
                                    </span>
                                )}
                                <span className="text-xs md:text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full hidden sm:inline-block">
                                    Inclusive of all taxes
                                </span>
                            </div>

                            {/* Description */}
                            <div className="mb-8">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 font-['Cinzel']">
                                    Overview
                                </h4>
                                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Specifications Grid */}
                            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-[#FCF9F0] border border-[#EEDFA8]/70 mb-8 text-xs md:text-sm">
                                <div>
                                    <p className="text-gray-500 font-medium mb-0.5">Material / Finish</p>
                                    <p className="font-semibold text-gray-800">{product.material || 'Premium Solid Hardwood'}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 font-medium mb-0.5">Dimensions / Size</p>
                                    <p className="font-semibold text-gray-800">{product.dimensions || 'Standard / Custom Sizing'}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 font-medium mb-0.5">Delivery Location</p>
                                    <p className="font-semibold text-gray-800">Manjeri & All India</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 font-medium mb-0.5">Customization</p>
                                    <p className="font-semibold text-emerald-700">Available on WhatsApp</p>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="flex items-center flex-wrap gap-4 md:gap-6 text-xs md:text-sm text-gray-500 mb-8">
                                <div className="flex items-center gap-1.5 md:gap-2">
                                    <Truck className="w-4 h-4 md:w-5 md:h-5 text-[#C5A059]" />
                                    <span>Careful Transit</span>
                                </div>
                                <div className="flex items-center gap-1.5 md:gap-2">
                                    <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-[#C5A059]" />
                                    <span>Wood Warranty</span>
                                </div>
                                <div className="flex items-center gap-1.5 md:gap-2">
                                    <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-[#C5A059]" />
                                    <span>Artisan Finish</span>
                                </div>
                            </div>
                        </div>

                        {/* Action CTA Button */}
                        <div className="pt-2 md:pt-4">
                            <button
                                onClick={handleWhatsAppOrder}
                                className="w-full flex items-center justify-center gap-2.5 py-4 md:py-5 px-6 rounded-2xl font-bold text-sm md:text-base text-white bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] shadow-xl shadow-[#25D366]/30 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                            >
                                <MessageCircle className="w-5 h-5 md:w-6 md:h-6 fill-white" />
                                <span className="tracking-wide">Confirm Order via WhatsApp</span>
                            </button>
                            <p className="text-center text-[11px] md:text-xs text-gray-400 mt-4">
                                Instant quote confirmation directly with our master craftsmen on WhatsApp.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
