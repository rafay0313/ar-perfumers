import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export const About: React.FC = () => {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Brand Story Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative group"
          >
            <div className="absolute -top-10 -left-10 w-40 h-40 border-t border-l border-primary/20 pointer-events-none group-hover:border-primary/50 transition-colors duration-700" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 border-b border-r border-primary/20 pointer-events-none group-hover:border-primary/50 transition-colors duration-700" />
            
            <div className="aspect-[4/5] relative overflow-hidden">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lJTIwbWFraW5nfGVufDF8fHx8MTc3MTcxMjAwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                alt="The Craftsmanship"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000" />
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute -bottom-8 -left-8 bg-zinc-900 border border-primary/20 p-8 hidden md:block"
            >
              <p className="text-primary text-4xl font-serif mb-1">1994</p>
              <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">ESTABLISHED IN PARIS</p>
            </motion.div>
          </motion.div>

          {/* Brand Story Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <span className="text-primary text-xs uppercase tracking-[0.5em] mb-6 block font-bold">Our Heritage</span>
            <h2 className="text-4xl lg:text-7xl text-white mb-10 font-serif leading-tight">Crafting the <br/><span className="italic text-primary/80">Invisible Identity</span></h2>
            
            <div className="space-y-8">
              <p className="text-white/60 text-lg font-light leading-relaxed">
                AR Perfumers was born from a singular vision: to create fragrances that don't just linger in the air, but settle in the soul. Founded in the heart of Paris, we blend centuries-old Middle Eastern traditions with contemporary Western elegance.
              </p>
              
              <p className="text-white/40 text-base font-light leading-relaxed italic">
                “A fragrance is the most intense form of memory. It is a signature that precedes your arrival and remains long after you have departed. At AR, we don’t just make perfume; we bottle the essence of prestige.”
              </p>
              
              <div className="pt-10 flex items-center gap-12">
                <div className="flex flex-col">
                  <span className="text-white text-3xl font-serif mb-1 tracking-widest">100+</span>
                  <span className="text-primary text-[10px] uppercase tracking-widest font-bold">Master Blends</span>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-white text-3xl font-serif mb-1 tracking-widest">25</span>
                  <span className="text-primary text-[10px] uppercase tracking-widest font-bold">Global Boutiques</span>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-white text-3xl font-serif mb-1 tracking-widest">0%</span>
                  <span className="text-primary text-[10px] uppercase tracking-widest font-bold">Synthetics</span>
                </div>
              </div>
              
              <motion.button 
                whileHover={{ gap: '2rem' }}
                className="mt-12 flex items-center gap-6 group"
              >
                <span className="text-white text-xs uppercase tracking-[0.4em] font-bold border-b border-primary/40 pb-2 group-hover:border-primary transition-all duration-300">Discover Our Philosophy</span>
                <div className="w-12 h-[1px] bg-primary group-hover:w-20 transition-all duration-500" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
