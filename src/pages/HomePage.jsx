import React, { useState, useMemo } from 'react';
import { HeroBanner } from '../components/HeroBanner';
import { CategoryNav } from '../components/CategoryNav';
import { ProductCard } from '../components/ProductCard';
import { AboutSection } from '../components/AboutSection';
import { Search, SlidersHorizontal, Sparkles, AlertCircle, ArrowUpRight } from 'lucide-react';

export const HomePage = ({ products, activeCategory, setActiveCategory, loading, error }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Calculate category product counts
  const productCounts = useMemo(() => {
    const counts = { All: products.length };
    products.forEach((p) => {
      const cat = p.category;
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        const matchesCategory =
          activeCategory === 'All' ||
          (item.category && item.category.toLowerCase() === activeCategory.toLowerCase());

        const matchesSearch =
          !searchQuery.trim() ||
          item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category?.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return 0; // default featured order
      });
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <main className="min-h-screen">
      {/* 1. Hero Section with Autoplaying Light Background Video & Royal Colonial Title */}
      <HeroBanner />

      {/* 2. 9 Categories in 3 Rows Grid (Immediately below Hero - No Left-Scroll) */}
      <CategoryNav
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        productCounts={productCounts}
      />

      {/* 3. Products Section */}
      <section id="products" className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6">

        {/* Controls Bar: Active Category Heading, Search & Sort */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059]" />
              <h2 className="font-['Cinzel'] font-bold text-lg sm:text-2xl text-gray-900">
                {activeCategory === 'All' ? 'All Collections' : `${activeCategory} Models`}
              </h2>
              <span className="text-xs font-mono font-medium text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Model' : 'Models'}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Select any item to confirm order directly on WhatsApp with our artisans
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-60">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#C5A059] focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <SlidersHorizontal className="w-4 h-4 text-gray-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#C5A059] cursor-pointer text-gray-700"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading / Error States */}
        {loading && (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-3 border-[#C5A059] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="font-['Cinzel'] text-gray-700 font-semibold">Loading luxury collections...</p>
          </div>
        )}

        {/* Product Grid */}
        {!loading && (
          <>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => {
                      window.history.pushState({}, '', `/product/${p.id}`);
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300 p-8">
                <AlertCircle className="w-12 h-12 text-[#C5A059] mx-auto mb-3" />
                <h3 className="font-['Cinzel'] font-bold text-lg text-gray-800 mb-1">
                  No Models Found in "{activeCategory}"
                </h3>
                <p className="text-xs text-gray-500 mb-4 max-w-md mx-auto">
                  Try viewing all categories or clearing search filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('All');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#121417] text-white hover:bg-[#C5A059] hover:text-[#121417] transition-colors cursor-pointer"
                >
                  Show All 9 Categories
                </button>
              </div>
            )}
          </>
        )}

      </section>

      {/* 4. About G One Home Décors Story */}
      <AboutSection />

      {/* Quick View Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </main>
  );
};