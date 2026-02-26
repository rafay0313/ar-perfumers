import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, Search, User, Shield } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useCart } from '../../context/CartContext';
import { createOrder, getAuthToken } from '../../lib/api';
import { toast } from 'sonner';
import { formatPKR, getDiscountedPrice } from '../../lib/pricing';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Collection', path: '/shop' },
    { name: 'Our Story', path: '#story' },
    { name: 'Fragrance Notes', path: '#notes' },
    { name: 'Boutiques', path: '#boutiques' },
  ];

  const handleCheckout = async () => {
    const token = getAuthToken();
    if (!token) {
      toast.error('Please login before checkout');
      return;
    }
    if (cart.length === 0) return;

    try {
      await createOrder(
        cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: getDiscountedPrice(item.price, item.discountPercent),
          quantity: item.quantity,
        })),
      );
      clearCart();
      setIsCartOpen(false);
      toast.success('Order placed successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Checkout failed';
      toast.error(message);
      if (message.toLowerCase().includes('session expired') || message.toLowerCase().includes('unauthorized')) {
        navigate('/login');
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-black/90 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-8'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 grid grid-cols-[auto_1fr_auto] items-center gap-3">
          <div className="flex items-center justify-start space-x-4 sm:space-x-8">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden text-white hover:text-primary transition-colors"
            >
              <Menu size={24} />
            </button>
            <nav className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-xs uppercase tracking-[0.2em] font-medium text-white/70 hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <Link to="/" className="flex items-center justify-center lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            <img
              src="/ar-perfumers-logo.png"
              alt="AR Perfumers"
              className="h-8 w-auto object-contain sm:h-12 lg:h-14"
            />
          </Link>

          <div className="flex items-center justify-end space-x-3 sm:space-x-6 lg:space-x-8">
            <button className="hidden md:block text-white/70 hover:text-primary transition-colors">
              <Search size={20} />
            </button>
            <Link to="/login" className="text-white/70 hover:text-primary transition-colors">
              <User size={18} />
            </Link>
            <Link to="/admin" className="hidden sm:block text-white/70 hover:text-primary transition-colors">
              <Shield size={18} />
            </Link>
            <Link to="/cart" className="relative text-white/70 hover:text-primary transition-colors">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-black p-8 lg:hidden"
          >
            <div className="flex justify-end mb-12">
              <button onClick={() => setIsMenuOpen(false)} className="text-white">
                <X size={32} />
              </button>
            </div>
            <nav className="flex flex-col space-y-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-2xl font-serif text-white hover:text-primary"
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/login" className="text-2xl font-serif text-white hover:text-primary">
                Login
              </Link>
              <Link to="/admin" className="text-2xl font-serif text-white hover:text-primary">
                Admin
              </Link>
              <Link to="/cart" className="text-2xl font-serif text-white hover:text-primary">
                Cart
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-zinc-950 z-[70] p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl uppercase tracking-widest font-serif">Your Collection</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-white hover:text-primary transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <ShoppingBag size={48} className="text-white/10 mb-4" />
                    <p className="text-white/40 uppercase tracking-widest text-sm italic">The collection is currently empty</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex space-x-4 border-b border-white/5 pb-6">
                      <div className="w-24 h-24 bg-zinc-900 border border-white/10 p-2">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-serif text-lg leading-tight">{item.name}</h3>
                            <p className="text-white/40 text-xs uppercase tracking-wider mt-1">{item.scent}</p>
                          </div>
                          <span className="font-medium text-primary">{formatPKR(getDiscountedPrice(item.price, item.discountPercent))}</span>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-white/10">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 hover:text-primary transition-colors"
                            >-</button>
                            <span className="px-4 text-xs">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 hover:text-primary transition-colors"
                            >+</button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-[10px] uppercase tracking-widest text-white/40 hover:text-destructive transition-colors underline underline-offset-4"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="mt-8 pt-8 border-t border-white/10">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-white/50 uppercase tracking-widest text-sm font-medium">Subtotal</span>
                    <span className="text-2xl font-serif text-primary">{formatPKR(totalPrice)}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-primary hover:bg-primary/90 text-black uppercase tracking-[0.2em] py-5 font-bold text-sm transition-all gold-glow"
                  >
                    Secure Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
