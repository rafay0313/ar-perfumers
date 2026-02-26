import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import { ProductCard, Product } from '../components/home/Collections';
import { getProducts } from '../lib/api';

export const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Recommended');
  const [isSortOpen, setIsSortOpen] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const apiProducts = await getProducts();
        setProducts(apiProducts);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const categories = ['All', ...new Set(products.map((product) => product.category))];

  const filteredProducts = useMemo(() => {
    let result = activeCategory === 'All' 
      ? products 
      : products.filter((p) => p.category === activeCategory);
    
    if (sortBy === 'Price: Low to High') return [...result].sort((a, b) => a.price - b.price);
    if (sortBy === 'Price: High to Low') return [...result].sort((a, b) => b.price - a.price);
    if (sortBy === 'Newest') return [...result].sort((a) => a.isNew ? -1 : 1);
    
    return result;
  }, [activeCategory, products, sortBy]);

  return (
    <section className="pt-28 sm:pt-32 pb-20 sm:pb-24 bg-[#0B0B0B] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary text-xs uppercase tracking-[0.5em] mb-4 font-bold"
          >
            MAISON DE LUXE
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl lg:text-7xl text-white font-serif mb-6"
          >
            The Collection
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 100 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-[1px] bg-primary mb-8"
          />
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 mb-12 sm:mb-16 border-b border-white/10 pb-8 sm:pb-12">
          {/* Categories */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 lg:gap-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] uppercase tracking-[0.3em] font-bold pb-2 border-b-2 transition-all duration-300 ${
                  activeCategory === cat ? 'text-primary border-primary' : 'text-white/40 border-transparent hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 sm:gap-8 w-full lg:w-auto justify-end">
            <div className="hidden sm:flex items-center gap-2 text-white/40">
              <SlidersHorizontal size={14} />
              <span className="text-[10px] uppercase tracking-widest font-bold">Filter By</span>
            </div>
            
            {/* Sort Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-4 bg-zinc-950 border border-white/10 px-4 sm:px-6 py-3 min-w-[180px] sm:min-w-[200px] justify-between group"
              >
                <span className="text-[10px] uppercase tracking-widest text-white/60">Sort: {sortBy}</span>
                <ChevronDown size={14} className={`text-primary transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isSortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 left-0 mt-2 bg-zinc-950 border border-white/10 z-40 overflow-hidden"
                  >
                    {['Recommended', 'Price: Low to High', 'Price: High to Low', 'Newest'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setSortBy(opt);
                          setIsSortOpen(false);
                        }}
                        className="w-full text-left px-6 py-4 text-[10px] uppercase tracking-widest hover:bg-white/5 flex items-center justify-between group"
                      >
                        <span className={`${sortBy === opt ? 'text-primary' : 'text-white/40'}`}>{opt}</span>
                        {sortBy === opt && <Check size={12} className="text-primary" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {loading && (
          <div className="py-40 text-center">
            <p className="text-white/40 uppercase tracking-widest text-xs">Loading collection...</p>
          </div>
        )}

        {error && !loading && (
          <div className="py-40 text-center">
            <h3 className="text-3xl font-serif text-white mb-4">Unable to load products</h3>
            <p className="text-white/40 uppercase tracking-widest text-xs">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <div className="py-40 text-center">
            <h3 className="text-3xl font-serif text-white mb-4">No results found</h3>
            <p className="text-white/40 uppercase tracking-widest text-xs">Try selecting a different category or filter</p>
          </div>
        )}

        {!loading && !error && (
          <div className="mt-32 flex items-center justify-center gap-10">
            <div className="w-20 h-px bg-white/10" />
            <div className="flex items-center gap-8">
              <span className="text-primary text-[10px] font-bold border-b border-primary pb-1">01</span>
              <span className="text-white/20 text-[10px] font-bold hover:text-white transition-colors cursor-pointer">02</span>
              <span className="text-white/20 text-[10px] font-bold hover:text-white transition-colors cursor-pointer">03</span>
            </div>
            <div className="w-20 h-px bg-white/10" />
          </div>
        )}
      </div>
    </section>
  );
};
