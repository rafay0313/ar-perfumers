import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import { createOrder, getAuthToken } from '../lib/api';
import { toast } from 'sonner';
import { formatPKR, getDiscountedPrice } from '../lib/pricing';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    addressLine: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
  });

  const hasCompleteAddress = Object.values(address).every((value) => String(value).trim().length > 0);

  const handleCheckout = async () => {
    const token = getAuthToken();
    if (!token) {
      toast.error('Please login before checkout');
      navigate('/login');
      return;
    }
    if (cart.length === 0) return;
    if (!hasCompleteAddress) {
      toast.error('Please enter full shipping address before checkout');
      return;
    }

    setIsPlacingOrder(true);
    try {
      await createOrder(
        cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: getDiscountedPrice(item.price, item.discountPercent),
          quantity: item.quantity,
        })),
        address,
      );
      clearCart();
      toast.success('Order placed successfully');
      navigate('/shop');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Checkout failed';
      toast.error(message);
      if (message.toLowerCase().includes('session expired') || message.toLowerCase().includes('unauthorized')) {
        navigate('/login');
      }
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <section className="pt-32 pb-24 bg-[#0B0B0B] min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-primary text-xs uppercase tracking-[0.4em] mb-3">Your Selection</p>
            <h1 className="text-4xl lg:text-5xl font-serif text-white">Add To Cart</h1>
          </div>
          <Link to="/shop" className="text-xs uppercase tracking-[0.2em] text-white/60 hover:text-primary">
            Continue Shopping
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="border border-white/10 bg-zinc-950 p-10 text-center">
            <p className="text-white/40 uppercase tracking-widest text-xs mb-4">Your cart is empty</p>
            <Link to="/shop" className="inline-flex items-center justify-center px-8 py-3 bg-primary text-black text-xs uppercase tracking-[0.2em] font-bold">
              Browse Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            <div className="xl:col-span-8 space-y-4">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-white/10 bg-zinc-950 p-4 sm:p-5 flex gap-4"
                >
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover bg-black border border-white/10 p-1" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-white font-serif text-xl">{item.name}</h3>
                        <p className="text-white/40 text-xs uppercase tracking-wider mt-1">{item.scent}</p>
                      </div>
                      <p className="text-primary font-medium">{formatPKR(getDiscountedPrice(item.price, item.discountPercent))}</p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="inline-flex items-center border border-white/15">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1.5 text-white/70 hover:text-primary">
                          -
                        </button>
                        <span className="px-4 text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1.5 text-white/70 hover:text-primary">
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-destructive"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="xl:col-span-4">
              <div className="border border-white/10 bg-zinc-950 p-6 sticky top-28">
                <h2 className="text-xl font-serif text-white mb-6">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <p className="text-white/60 text-xs uppercase tracking-[0.2em]">Shipping Address</p>
                  <input
                    value={address.fullName}
                    onChange={(event) => setAddress((prev) => ({ ...prev, fullName: event.target.value }))}
                    placeholder="Full Name"
                    className="w-full bg-black border border-white/15 px-3 py-2 text-sm text-white"
                  />
                  <input
                    value={address.phone}
                    onChange={(event) => setAddress((prev) => ({ ...prev, phone: event.target.value }))}
                    placeholder="Phone Number"
                    className="w-full bg-black border border-white/15 px-3 py-2 text-sm text-white"
                  />
                  <input
                    value={address.addressLine}
                    onChange={(event) => setAddress((prev) => ({ ...prev, addressLine: event.target.value }))}
                    placeholder="Address Line"
                    className="w-full bg-black border border-white/15 px-3 py-2 text-sm text-white"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      value={address.city}
                      onChange={(event) => setAddress((prev) => ({ ...prev, city: event.target.value }))}
                      placeholder="City"
                      className="w-full bg-black border border-white/15 px-3 py-2 text-sm text-white"
                    />
                    <input
                      value={address.state}
                      onChange={(event) => setAddress((prev) => ({ ...prev, state: event.target.value }))}
                      placeholder="State"
                      className="w-full bg-black border border-white/15 px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      value={address.zipCode}
                      onChange={(event) => setAddress((prev) => ({ ...prev, zipCode: event.target.value }))}
                      placeholder="ZIP Code"
                      className="w-full bg-black border border-white/15 px-3 py-2 text-sm text-white"
                    />
                    <input
                      value={address.country}
                      onChange={(event) => setAddress((prev) => ({ ...prev, country: event.target.value }))}
                      placeholder="Country"
                      className="w-full bg-black border border-white/15 px-3 py-2 text-sm text-white"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/50 uppercase tracking-widest text-xs">Subtotal</span>
                  <span className="text-2xl font-serif text-primary">{formatPKR(totalPrice)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isPlacingOrder}
                  className="w-full bg-primary text-black py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-primary/90 disabled:opacity-60"
                >
                  {isPlacingOrder ? 'Processing...' : 'Secure Checkout'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
