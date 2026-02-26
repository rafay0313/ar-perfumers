import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router';
import { formatPKR, getDiscountedPrice, hasDiscount } from '../../lib/pricing';
import { getProducts } from '../../lib/api';

export interface Product {
  id: string;
  name: string;
  price: number;
  discountPercent?: number;
  image: string;
  scent: string;
  category: string;
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group relative h-full flex flex-col items-center p-6 bg-zinc-900 border border-white/5 hover:border-primary/30 transition-all duration-500 overflow-hidden"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 pointer-events-none" />
      
      {/* Badges */}
      {product.isNew && (
        <span className="absolute top-4 left-4 bg-primary text-black text-[10px] uppercase font-bold px-3 py-1 tracking-widest z-20">New Arrival</span>
      )}
      
      {/* Quick Actions */}
      <div className="absolute top-4 right-4 flex flex-col gap-3 translate-x-12 group-hover:translate-x-0 transition-transform duration-500 z-20">
        <button className="w-10 h-10 bg-black/60 backdrop-blur-md text-white hover:text-primary border border-white/10 flex items-center justify-center transition-colors">
          <Heart size={18} />
        </button>
        <Link 
          to={`/product/${product.id}?popup=1`}
          className="w-10 h-10 bg-black/60 backdrop-blur-md text-white hover:text-primary border border-white/10 flex items-center justify-center transition-colors"
        >
          <Eye size={18} />
        </Link>
      </div>

      {/* Image Area */}
      <div className="w-full h-[300px] mb-8 relative overflow-hidden flex items-center justify-center">
        <motion.img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-2 bg-primary/20 blur-[15px] rounded-full group-hover:w-40 group-hover:h-3 transition-all duration-500" />
      </div>

      {/* Product Info */}
      <div className="text-center mt-auto w-full relative z-10">
        <p className="text-primary text-[10px] uppercase tracking-[0.3em] font-medium mb-3">{product.category}</p>
        <Link to={`/product/${product.id}?popup=1`}>
          <h3 className="font-serif text-2xl lg:text-3xl text-white mb-2 leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <p className="text-white/40 text-sm italic font-sans mb-6 font-light">{product.scent}</p>
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-12 h-[1px] bg-primary/30" />
          <div className="flex items-center gap-2">
            {hasDiscount(product.discountPercent) && (
              <span className="text-sm text-white/35 line-through">{formatPKR(product.price)}</span>
            )}
            <span className="text-xl font-medium text-white tracking-widest">
              {formatPKR(getDiscountedPrice(product.price, product.discountPercent))}
            </span>
          </div>
          <div className="w-12 h-[1px] bg-primary/30" />
        </div>

        <button 
          onClick={() => {
            addToCart(product);
            navigate('/cart');
          }}
          className="w-full py-4 border border-primary/40 text-primary uppercase tracking-[0.2em] font-bold text-xs flex items-center justify-center gap-3 transition-all duration-300 hover:bg-primary hover:text-black hover:border-primary active:scale-95 overflow-hidden relative group/btn"
        >
          <span className="relative z-10">Add To Cart</span>
          <ShoppingCart size={16} className="relative z-10 group-hover/btn:scale-110 transition-transform duration-300" />
          <div className="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
        </button>
      </div>
    </motion.div>
  );
};

export const Collections: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const apiProducts = await getProducts();
        setProducts(apiProducts as Product[]);
      } catch {
        setProducts([]);
      }
    };
    load();
  }, []);

  return (
    <section className="py-24 bg-[#0B0B0B] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary text-xs uppercase tracking-[0.5em] mb-4 font-medium"
          >
            The Signature Selection
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl lg:text-6xl text-white mb-6 font-serif"
          >
            Our Masterpieces
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-white/40 max-w-2xl text-lg font-light tracking-wide italic"
          >
            Every scent is a narrative. Discover our most prestigious fragrances, crafted with the finest ingredients from around the world.
          </motion.p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.08, 0.5), duration: 0.6 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="border border-white/10 bg-zinc-950 p-10 text-center">
            <p className="text-white/40 uppercase tracking-widest text-xs">No perfumes added yet</p>
          </div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 flex justify-center"
        >
          <Link 
            to="/shop"
            className="text-white/60 hover:text-primary uppercase tracking-[0.3em] text-xs font-bold border-b border-white/20 hover:border-primary pb-2 transition-all duration-300 flex items-center gap-3"
          >
            View All Fragrances
            <Eye size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
