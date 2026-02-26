import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Instagram, Twitter, Youtube, Facebook, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10 pt-24 pb-12 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/2 rounded-full blur-[200px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-20">
          {/* Brand Identity Column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="flex flex-col items-center md:items-start mb-10">
              <img
                src="/ar-perfumers-logo.png"
                alt="AR Perfumers"
                className="h-24 w-auto object-contain"
              />
            </Link>
            <p className="text-white/40 text-sm italic font-light leading-relaxed max-w-[280px] mb-12">
              “Crafted to Captivate. Designed to Define. Our heritage is rooted in the pursuit of perfection since 1994.”
            </p>
            <div className="flex items-center space-x-6">
              {[Instagram, Twitter, Youtube, Facebook].map((Icon, i) => (
                <Link key={i} to="#" className="text-white/40 hover:text-primary transition-all hover:scale-110">
                  <Icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* Boutique Services Column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left lg:ml-8">
            <h4 className="text-primary text-xs uppercase tracking-[0.4em] font-bold mb-10">Boutique Services</h4>
            <ul className="space-y-6 text-white/50 text-xs uppercase tracking-widest font-medium">
              <li><Link to="#" className="hover:text-white transition-colors">Exclusive Bespoke Scenting</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Personal Fragrance Concierge</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Corporate Gifting Elite</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Sample Set Experience</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">VIP Member Privileges</Link></li>
            </ul>
          </div>

          {/* Legal & Explore Column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left lg:ml-8">
            <h4 className="text-primary text-xs uppercase tracking-[0.4em] font-bold mb-10">Legal & Explore</h4>
            <ul className="space-y-6 text-white/50 text-xs uppercase tracking-widest font-medium">
              <li><Link to="#" className="hover:text-white transition-colors">Our Global Heritage</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Sustainability Ethics</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Shipping & Global Concierge</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Secure Returns & Exchange</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Privacy Policy Elite</Link></li>
            </ul>
          </div>

          {/* Contact & Location Column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left lg:ml-8">
            <h4 className="text-primary text-xs uppercase tracking-[0.4em] font-bold mb-10">Contact Elite</h4>
            <ul className="space-y-6 text-white/50 text-xs uppercase tracking-widest font-medium">
              <li className="flex items-center gap-4 group cursor-pointer hover:text-white transition-colors">
                <MapPin size={16} className="text-primary/60 group-hover:text-primary" />
                <span>Paris | London | New York | Dubai</span>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer hover:text-white transition-colors">
                <Phone size={16} className="text-primary/60 group-hover:text-primary" />
                <span>+1 (800) AR-PRESTIGE</span>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer hover:text-white transition-colors">
                <Mail size={16} className="text-primary/60 group-hover:text-primary" />
                <span>concierge@arperfumers.com</span>
              </li>
            </ul>
            <div className="mt-12 w-full h-[1px] bg-white/5" />
            <p className="mt-8 text-white/30 text-[10px] uppercase tracking-[0.3em] font-bold">24/7 Global Concierge Support</p>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-white/20 text-[10px] uppercase tracking-[0.3em] font-bold text-center md:text-left">
            &copy; {currentYear} AR PERFUMERS INTERNATIONAL. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-8">
             <div className="w-12 h-px bg-white/10" />
             <span className="text-[10px] uppercase tracking-[0.5em] text-white/40 font-bold">MAISON DE LUXE</span>
             <div className="w-12 h-px bg-white/10" />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-widest text-white/20">Secure Payments</span>
              <div className="flex gap-2 mt-2 opacity-30 grayscale hover:grayscale-0 transition-all cursor-pointer">
                {/* Mock Payment Icons */}
                <div className="w-8 h-5 bg-white/10 rounded-sm" />
                <div className="w-8 h-5 bg-white/10 rounded-sm" />
                <div className="w-8 h-5 bg-white/10 rounded-sm" />
                <div className="w-8 h-5 bg-white/10 rounded-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const LuxuryLoader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = 'auto';
    }, 2600);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2, duration: 1 }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative mb-8"
        >
          <img
            src="/ar-perfumers-logo.png"
            alt="AR Perfumers"
            className="h-36 w-auto object-contain"
          />
          {/* Shimmer overlay */}
          <motion.div
            animate={{ left: ['100%', '-100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
            className="absolute top-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-30deg]"
          />
        </motion.div>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="h-[1px] bg-primary relative overflow-hidden"
        >
          <motion.div 
            animate={{ x: [-120, 120] }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-white/40"
          />
        </motion.div>
        
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-[10px] uppercase tracking-[0.8em] text-white/30 mt-6 font-bold"
        >
          MAISON DE PARFUM
        </motion.span>
      </div>
    </motion.div>
  );
};
