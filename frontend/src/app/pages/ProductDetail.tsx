import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Truck, ShieldCheck, Heart, ShoppingBag, Plus, Minus, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product, getProductById } from '../lib/api';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { useEffect } from 'react';
import { formatPKR, getDiscountedPrice, hasDiscount } from '../lib/pricing';

export const ProductDetail: React.FC = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isPopup = searchParams.get('popup') === '1';
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const result = await getProductById(id);
        setProduct(result);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <section className="pt-32 pb-24 bg-[#0B0B0B] min-h-screen">
        <div className="container mx-auto px-6 py-40 text-center">
          <p className="text-white/40 uppercase tracking-widest text-xs">Loading product...</p>
        </div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="pt-32 pb-24 bg-[#0B0B0B] min-h-screen">
        <div className="container mx-auto px-6 py-40 text-center">
          <h2 className="text-4xl font-serif text-white mb-4">Product unavailable</h2>
          <p className="text-white/40 uppercase tracking-widest text-xs">{error || 'Not found'}</p>
        </div>
      </section>
    );
  }

  return (
    <section className={isPopup ? 'fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm overflow-y-auto py-6 sm:py-10' : 'pt-28 sm:pt-32 pb-20 sm:pb-24 bg-[#0B0B0B]'}>
      <div className={`${isPopup ? 'max-w-6xl mx-auto px-4 sm:px-6' : 'container mx-auto px-6'}`}>
        {isPopup && (
          <div className="flex justify-end mb-4">
            <button
              onClick={() => navigate(-1)}
              className="w-11 h-11 border border-white/20 bg-black/60 text-white hover:text-primary hover:border-primary flex items-center justify-center"
            >
              <X size={18} />
            </button>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-20 items-center">
          {/* Image Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative bg-zinc-950 border border-white/5 p-6 sm:p-12 lg:p-24 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-primary/5 blur-[100px] pointer-events-none" />
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(200,164,93,0.3)] transition-transform duration-700 group-hover:scale-110"
            />
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="text-primary text-xs uppercase tracking-[0.5em] mb-4 block font-bold">Maison de Luxe</span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl text-white font-serif mb-6">{product.name}</h1>
            <div className="flex items-center gap-6 mb-8">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#C8A45D" className="text-primary" />)}
              </div>
              <span className="text-white/40 text-xs uppercase tracking-widest border-l border-white/10 pl-6">48 Reviews</span>
              <span className="text-primary text-xs uppercase tracking-widest border-l border-white/10 pl-6 font-bold">In Stock</span>
            </div>

            <div className="mb-10 flex items-end gap-3">
              {hasDiscount(product.discountPercent) && (
                <p className="text-lg text-white/35 line-through tracking-widest">{formatPKR(product.price)}</p>
              )}
              <p className="text-3xl font-serif text-white tracking-widest">
                {formatPKR(getDiscountedPrice(product.price, product.discountPercent))}
              </p>
              {hasDiscount(product.discountPercent) && (
                <span className="text-xs uppercase tracking-[0.2em] text-primary">
                  {product.discountPercent}% off
                </span>
              )}
            </div>
            
            <p className="text-white/50 text-lg mb-12 font-light leading-relaxed max-w-xl">
              An olfactory masterpiece designed for the discerning individual. Royal Oud blends the richness of aged agarwood with sparkling top notes of bergamot and a heart of damask rose.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12">
              <div className="text-center p-6 border border-white/5 bg-white/5">
                <p className="text-primary text-[10px] uppercase tracking-widest mb-2 font-bold">Top</p>
                <p className="text-white text-xs uppercase">Bergamot</p>
              </div>
              <div className="text-center p-6 border border-white/5 bg-white/5">
                <p className="text-primary text-[10px] uppercase tracking-widest mb-2 font-bold">Heart</p>
                <p className="text-white text-xs uppercase">Rose</p>
              </div>
              <div className="text-center p-6 border border-white/5 bg-white/5">
                <p className="text-primary text-[10px] uppercase tracking-widest mb-2 font-bold">Base</p>
                <p className="text-white text-xs uppercase">Oud Wood</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <div className="flex items-center border border-white/10 px-6 py-5">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-white hover:text-primary transition-colors"><Minus size={16}/></button>
                <span className="px-10 text-lg font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="text-white hover:text-primary transition-colors"><Plus size={16}/></button>
              </div>
              <button 
                onClick={() => {
                  for (let i = 0; i < quantity; i += 1) {
                    addToCart(product);
                  }
                  navigate('/cart');
                }}
                className="flex-1 bg-primary text-black py-5 uppercase tracking-[0.3em] font-bold text-sm gold-glow hover:bg-primary/90 transition-all flex items-center justify-center gap-4"
              >
                <ShoppingBag size={18} />
                Add to Cart
              </button>
              <button className="w-20 border border-white/10 flex items-center justify-center text-white hover:text-primary hover:border-primary transition-all">
                <Heart size={20} />
              </button>
            </div>

            <div className="space-y-4 pt-10 border-t border-white/10">
              <div className="flex items-center gap-4 text-white/40">
                <Truck size={18} className="text-primary/60" />
                <span className="text-[10px] uppercase tracking-widest">Complimentary White-Glove Shipping</span>
              </div>
              <div className="flex items-center gap-4 text-white/40">
                <ShieldCheck size={18} className="text-primary/60" />
                <span className="text-[10px] uppercase tracking-widest">2-Year Authenticity Guarantee</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
