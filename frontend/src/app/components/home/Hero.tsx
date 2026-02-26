import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

export const Hero: React.FC = () => {
  const heroImage =
    "https://images.unsplash.com/photo-1758871993077-e084cc7eca86?auto=format&fit=crop&w=900&q=80";

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-[#0B0B0B] pt-24 sm:pt-20">
      {/* Cinematic Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-[#0B0B0B] to-[#0B0B0B]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Luxury Particles */}
      <div className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: Math.random() * 1000 }}
            animate={{ 
              opacity: [0, 0.5, 0],
              y: -200,
              x: Math.random() * 200 - 100
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-primary rounded-full blur-[1px]"
            style={{ 
              left: `${Math.random() * 100}%`,
              top: '100%'
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 lg:gap-24">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex-1 text-center lg:text-left pt-8 lg:pt-0"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs lg:text-sm uppercase tracking-[0.5em] text-primary mb-6 block font-medium"
          >
            L'ESSENCE DE L'ÉLÉGANCE
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-4xl sm:text-5xl lg:text-8xl font-serif text-white mb-6 sm:mb-8 leading-[1.1] tracking-tight"
          >
            Crafted to <span className="text-primary italic">Captivate</span>. <br />
            Designed to <span className="font-cinzel text-4xl lg:text-7xl">Define.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-white/60 text-base sm:text-lg max-w-lg mb-8 sm:mb-12 font-sans tracking-wide leading-relaxed mx-auto lg:mx-0"
          >
            Discover AR Perfumers — where tradition meets modern prestige to craft scents that leave an eternal impression.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-6"
          >
            <Link 
              to="/shop" 
              className="group relative inline-flex items-center justify-center min-h-12 sm:min-h-14 px-6 sm:px-10 bg-primary text-black font-bold uppercase tracking-[0.2em] text-xs sm:text-sm overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 gold-glow whitespace-nowrap"
            >
              <span className="relative z-10">Shop Collection</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12" />
            </Link>
            
            <button className="group inline-flex items-center justify-center min-h-12 sm:min-h-14 px-6 sm:px-10 border border-primary/40 text-white font-bold uppercase tracking-[0.2em] text-xs sm:text-sm gap-3 transition-all duration-300 hover:border-primary hover:bg-primary/5 whitespace-nowrap">
              <span>Discover the Story</span>
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </motion.div>
        </motion.div>

        {/* Perfume Bottle Image (Hero Image) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="flex-1 relative"
        >
          <div className="relative w-[240px] h-[340px] sm:w-[300px] sm:h-[450px] lg:w-[450px] lg:h-[650px] mx-auto group">
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-[100px] animate-pulse" />
            <img 
              src={heroImage}
              alt="AR Royal Oud Perfume" 
              className="w-full h-full object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(200,164,93,0.3)] group-hover:scale-105 transition-transform duration-700"
            />
            {/* Subtle floating animation */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-4 bg-primary/20 blur-[20px] rounded-full pointer-events-none"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="hidden sm:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-4"
      >
        <span className="text-[10px] uppercase tracking-[0.5em] text-white/30 rotate-90 origin-left mb-8">SCROLL</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-primary/60 to-transparent" />
      </motion.div>
    </section>
  );
};
