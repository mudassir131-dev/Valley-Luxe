import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, Grid, RotateCcw } from 'lucide-react';
import { products } from '../data/products';
import { ProductCard } from '../components/UI/ProductCard';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(85000);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // View States
  const [gridCols, setGridCols] = useState<number>(3); // 3-column grid default
  const [visibleCount, setVisibleCount] = useState<number>(8); // Pagination count

  // Synchronize filters with URL search parameters
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    const urlSearch = searchParams.get('search');
    const urlDeals = searchParams.get('deals');
    const urlNew = searchParams.get('new');
    const urlBestseller = searchParams.get('bestseller');

    if (urlCategory) {
      setSelectedCategories([urlCategory]);
    } else {
      setSelectedCategories([]);
    }

    if (urlSearch) {
      setSearchQuery(urlSearch);
    } else {
      setSearchQuery('');
    }

    if (urlDeals) {
      setSortBy('deals');
    } else if (urlNew) {
      setSortBy('new');
    } else if (urlBestseller) {
      setSortBy('best-seller');
    } else {
      setSortBy('featured');
    }
  }, [searchParams]);

  const materialsList = useMemo(() => {
    return ['Cashmere', 'Silk', 'Saffron', 'Almonds', 'Apricots', 'Wood', 'Copper', 'Wool'];
  }, []);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search Query Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Category Filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Price Filter
    result = result.filter((p) => p.price <= maxPrice);

    // Material Filter
    if (selectedMaterials.length > 0) {
      result = result.filter((p) =>
        selectedMaterials.some((m) => p.materials.toLowerCase().includes(m.toLowerCase()))
      );
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'best-seller') {
      result = result.filter((p) => p.rating >= 4.8);
      result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    } else if (sortBy === 'deals') {
      result = result.filter((p) => p.isDeal);
    } else if (sortBy === 'new') {
      result = result.filter((p) => p.isRecommended || p.id === 'kani-shawl');
    }

    return result;
  }, [selectedCategories, maxPrice, selectedMaterials, sortBy, searchQuery]);

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedCategories([]);
    setMaxPrice(85000);
    setSelectedMaterials([]);
    setSortBy('featured');
    setSearchQuery('');
    setSearchParams({});
  };

  const handleCategoryCheckbox = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleMaterialCheckbox = (mat: string) => {
    if (selectedMaterials.includes(mat)) {
      setSelectedMaterials(selectedMaterials.filter((m) => m !== mat));
    } else {
      setSelectedMaterials([...selectedMaterials, mat]);
    }
  };

  const removeCategoryChip = (cat: string) => {
    setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    if (searchParams.get('category') === cat) {
      const copy = new URLSearchParams(searchParams);
      copy.delete('category');
      setSearchParams(copy);
    }
  };

  const removeMaterialChip = (mat: string) => {
    setSelectedMaterials(selectedMaterials.filter((m) => m !== mat));
  };

  return (
    <div className="w-full bg-[#FAFAF8] dark:bg-[#0D0500] text-[#1A0A00] dark:text-ivory-cream min-h-screen pt-4 pb-16 transition-colors duration-300">
      
      {/* Search Header Banner */}
      <section className="relative w-full bg-white dark:bg-[#1A0A00] border-b border-[#F0EDE8] dark:border-saffron-gold/10 py-10 px-6 text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-saffron-gold mb-1.5 block font-bold">
              Atelier Collections
            </span>
            <h1 className="font-display font-light text-3xl sm:text-4xl uppercase tracking-wider text-[#1A0A00] dark:text-ivory-cream">
              {selectedCategories.length === 1 ? selectedCategories[0] : 'The Catalogue'}
            </h1>
            <p className="font-ui text-xs text-[#6B5E52] dark:text-ivory-cream/50 mt-1 max-w-xl font-medium leading-relaxed">
              Browse our curated portfolio of rare handloom shawls, grade-A Pampore saffron, hand-carved wood products, and silk rugs.
            </p>
          </div>
        </div>
      </section>

      {/* Main Catalog Workspace */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* 1. FILTER SIDEBAR (Left panel) */}
          <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-24 h-fit flex flex-col gap-6 text-left border border-[#F0EDE8] dark:border-saffron-gold/10 p-5 rounded-2xl bg-white dark:bg-white/2 shadow-xs">
            <div className="flex justify-between items-center pb-3 border-b border-[#F0EDE8] dark:border-saffron-gold/5">
              <span className="font-ui text-[11px] tracking-widest uppercase font-bold text-saffron-gold flex items-center gap-1.5">
                <Filter size={12} /> Filter Products
              </span>
              {(selectedCategories.length > 0 || selectedMaterials.length > 0 || maxPrice < 85000 || searchQuery) && (
                <button
                  onClick={handleResetFilters}
                  className="font-mono text-[9px] tracking-widest uppercase text-[#6B5E52] hover:text-[#C8860A] flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw size={10} /> Reset
                </button>
              )}
            </div>

            {/* Keyword Search */}
            <div className="flex flex-col gap-2">
              <label className="font-ui text-[9px] tracking-widest uppercase font-bold text-[#6B5E52]/80 dark:text-ivory-cream/50">Atelier Search</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type keyword..."
                className="bg-[#FAFAF8] dark:bg-white/5 border border-[#F0EDE8] dark:border-saffron-gold/15 outline-none px-3.5 py-2 font-ui text-xs text-[#1A0A00] dark:text-ivory-cream rounded-xl w-full focus:border-saffron-gold transition-colors"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-col gap-3">
              <h4 className="font-ui text-[9px] tracking-widest uppercase font-bold text-[#6B5E52]/80 dark:text-ivory-cream/50">Categories</h4>
              <div className="flex flex-col gap-2">
                {['Pashmina', 'Saffron', 'Dry Fruits', 'Handicrafts', 'Carpets', 'More'].map((cat) => (
                  <label key={cat} className="flex items-center gap-3 font-ui text-xs text-[#6B5E52] dark:text-ivory-cream/70 hover:text-saffron-gold transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryCheckbox(cat)}
                      className="accent-saffron-gold rounded cursor-pointer"
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div className="flex flex-col gap-3">
              <h4 className="font-ui text-[9px] tracking-widest uppercase font-bold text-[#6B5E52]/80 dark:text-ivory-cream/50">Limit Price (INR)</h4>
              <div className="flex flex-col gap-2">
                <input
                  type="range"
                  min="500"
                  max="85000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="accent-saffron-gold w-full bg-[#F0EDE8] dark:bg-white/10 cursor-pointer h-1.5 rounded-lg appearance-none"
                />
                <div className="flex justify-between font-mono text-[9px] text-saffron-gold font-bold">
                  <span>₹500</span>
                  <span>₹{maxPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Materials */}
            <div className="flex flex-col gap-3">
              <h4 className="font-ui text-[9px] tracking-widest uppercase font-bold text-[#6B5E52]/80 dark:text-ivory-cream/50">Materials</h4>
              <div className="flex flex-col gap-2">
                {materialsList.map((mat) => (
                  <label key={mat} className="flex items-center gap-3 font-ui text-xs text-[#6B5E52] dark:text-ivory-cream/70 hover:text-saffron-gold transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedMaterials.includes(mat)}
                      onChange={() => handleMaterialCheckbox(mat)}
                      className="accent-saffron-gold rounded cursor-pointer"
                    />
                    <span>{mat}</span>
                  </label>
                ))}
              </div>
            </div>

          </aside>

          {/* 2. PRODUCTS GRID */}
          <main className="flex-grow flex flex-col gap-6 text-left">
            
            {/* Sorting header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#F0EDE8] dark:border-saffron-gold/5">
              <div className="font-ui text-xs text-[#6B5E52] dark:text-ivory-cream/50 font-medium">
                Presenting <span className="text-saffron-gold font-bold font-mono">{filteredProducts.length}</span> luxury craft items
              </div>
              
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                {/* Columns toggle */}
                <div className="hidden sm:flex items-center gap-1 border border-[#F0EDE8] dark:border-saffron-gold/10 p-1 rounded-xl bg-white dark:bg-white/5">
                  <button
                    onClick={() => setGridCols(2)}
                    className={`p-1 hover:text-saffron-gold cursor-pointer transition-colors ${gridCols === 2 ? 'text-saffron-gold' : 'text-[#6B5E52]/40'}`}
                    title="2 Column Grid"
                  >
                    <Grid size={14} className="rotate-45" />
                  </button>
                  <button
                    onClick={() => setGridCols(3)}
                    className={`p-1 hover:text-saffron-gold cursor-pointer transition-colors ${gridCols === 3 ? 'text-saffron-gold' : 'text-[#6B5E52]/40'}`}
                    title="3 Column Grid"
                  >
                    <Grid size={14} />
                  </button>
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2">
                  <label className="font-ui text-[9px] tracking-widest uppercase font-bold text-[#6B5E52]/65 hidden md:inline">Sort Order</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white dark:bg-[#1A0A00] border border-[#F0EDE8] dark:border-saffron-gold/15 outline-none px-3 py-1.5 font-ui text-[10px] uppercase font-bold tracking-wider text-[#1A0A00] dark:text-ivory-cream rounded-xl cursor-pointer"
                  >
                    <option value="featured">Featured Catalog</option>
                    <option value="best-seller">Best Sellers</option>
                    <option value="deals">Deals & Offers</option>
                    <option value="new">New Loom Sets</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating score</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Chips filters display */}
            {(selectedCategories.length > 0 || selectedMaterials.length > 0 || maxPrice < 85000 || searchQuery) && (
              <div className="flex flex-wrap gap-2 text-left">
                {searchQuery && (
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-saffron-gold/10 border border-saffron-gold/20 rounded-full font-mono text-[9px] tracking-widest text-[#C8860A] uppercase font-bold">
                    Key: {searchQuery}
                    <button onClick={() => setSearchQuery('')} className="hover:text-[#1A0A00] cursor-pointer"><X size={10} /></button>
                  </span>
                )}
                {selectedCategories.map((cat) => (
                  <span key={cat} className="flex items-center gap-1.5 px-3 py-1 bg-saffron-gold/10 border border-saffron-gold/20 rounded-full font-mono text-[9px] tracking-widest text-[#C8860A] uppercase font-bold">
                    {cat}
                    <button onClick={() => removeCategoryChip(cat)} className="hover:text-[#1A0A00] cursor-pointer"><X size={10} /></button>
                  </span>
                ))}
                {selectedMaterials.map((mat) => (
                  <span key={mat} className="flex items-center gap-1.5 px-3 py-1 bg-saffron-gold/10 border border-saffron-gold/20 rounded-full font-mono text-[9px] tracking-widest text-[#C8860A] uppercase font-bold">
                    Material: {mat}
                    <button onClick={() => removeMaterialChip(mat)} className="hover:text-[#1A0A00] cursor-pointer"><X size={10} /></button>
                  </span>
                ))}
                {maxPrice < 85000 && (
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-saffron-gold/10 border border-saffron-gold/20 rounded-full font-mono text-[9px] tracking-widest text-[#C8860A] uppercase font-bold">
                    Under ₹{maxPrice.toLocaleString('en-IN')}
                    <button onClick={() => setMaxPrice(85000)} className="hover:text-[#1A0A00] cursor-pointer"><X size={10} /></button>
                  </span>
                )}
              </div>
            )}

            {/* Product Cards layout */}
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center border border-[#F0EDE8] dark:border-saffron-gold/10 rounded-2xl bg-white dark:bg-white/2 shadow-xs">
                <p className="font-display text-base text-saffron-gold font-light tracking-wide">No Kashmiri masterworks match your active filters.</p>
                <button
                  onClick={handleResetFilters}
                  className="mt-5 px-6 py-2.5 bg-[#C8860A] text-white hover:bg-[#8B5E00] font-ui text-[10px] tracking-[0.2em] uppercase rounded-xl transition-all duration-300 cursor-pointer shadow-md"
                >
                  Reset Active Filters
                </button>
              </div>
            ) : (
              <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-6`}>
                {filteredProducts.slice(0, visibleCount).map((product) => (
                  <div key={product.id} className="h-full">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}

            {/* Pagination stepper */}
            {visibleCount < filteredProducts.length && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="px-8 py-3 bg-[#1A0A00] dark:bg-saffron-gold hover:bg-[#C8860A] dark:hover:bg-deep-gold text-white dark:text-[#1A0A00] font-ui text-[10px] tracking-[0.2em] uppercase transition-all duration-300 rounded-xl cursor-pointer shadow-md"
                >
                  Load More Masterpieces
                </button>
              </div>
            )}

          </main>

        </div>
      </section>

    </div>
  );
};

export default Shop;
