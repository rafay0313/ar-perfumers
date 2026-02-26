import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Droplets, Wind, Sparkles } from 'lucide-react';

export const NotesShowcase: React.FC = () => {
  const notes = [
    {
      title: 'Top Notes',
      icon: <Wind size={24} className="text-primary" />,
      description: 'The initial impression. Fresh Bergamot, Sparkling Citrus, and Pink Pepper. These notes are fleeting but essential to the first encounter.',
      ingredients: ['Bergamot', 'Saffron', 'Grapefruit'],
      delay: 0.2
    },
    {
      title: 'Heart Notes',
      icon: <Droplets size={24} className="text-primary" />,
      description: 'The soul of the fragrance. Damask Rose, Royal Jasmine, and Midnight Iris. These notes emerge as the top notes dissipate.',
      ingredients: ['Rose', 'Patchouli', 'Jasmine'],
      delay: 0.4
    },
    {
      title: 'Base Notes',
      icon: <Leaf size={24} className="text-primary" />,
      description: 'The lasting signature. Smoked Oud, Warm Sandalwood, and Deep Amber. These provide depth and longevity to the scent.',
      ingredients: ['Oud Wood', 'Sandalwood', 'Musk'],
      delay: 0.6
    }
  ];

  return (
    <section id="notes" className="py-24 bg-zinc-950 border-t border-white/5 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] -mr-64 -mt-32 pointer-events-none" />
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-primary text-xs uppercase tracking-[0.5em] mb-4 block font-medium">The Olfactory Journey</span>
            <h2 className="text-4xl lg:text-7xl text-white mb-8 font-serif leading-tight">Mastering the <span className="italic">Alchemy</span> of Scents</h2>
            <p className="text-white/50 text-lg mb-12 font-light leading-relaxed max-w-xl">
              We meticulously balance rare botanical extracts and precious oils to create complex, multi-layered experiences that evolve on your skin.
            </p>
            
            <div className="relative w-full h-[400px] overflow-hidden border border-white/10 group">
              <img 
                src="https://images.unsplash.com/photo-1713998525908-69c60daae07d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwaW5ncmVkaWVudHMlMjBvdWQlMjB3b29kJTIwcm9zZSUyMHNhbmRhbHdvb2QlMjB2YW5pbGxhJTIwcG9kcyUyMGx1eHVyeSUyMGxpZ2h0aW5nfGVufDF8fHx8MTc3MTcxMjAwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                alt="Perfume Ingredients"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-1000" />
              <div className="absolute inset-0 border-[20px] border-black/50" />
            </div>
          </motion.div>

          <div className="space-y-12">
            {notes.map((note, index) => (
              <motion.div
                key={note.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: note.delay, duration: 0.8 }}
                className="group border-b border-white/10 pb-12 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-16 h-16 border border-primary/20 flex items-center justify-center group-hover:border-primary transition-colors duration-500">
                    {note.icon}
                  </div>
                  <h3 className="text-3xl font-serif text-white tracking-wide">{note.title}</h3>
                </div>
                <p className="text-white/40 text-sm mb-6 font-sans tracking-wide leading-relaxed group-hover:text-white/60 transition-colors">
                  {note.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {note.ingredients.map((ing) => (
                    <span key={ing} className="px-4 py-2 bg-white/5 border border-white/5 text-[10px] uppercase tracking-widest text-primary/70 font-bold group-hover:border-primary/20 transition-colors">
                      {ing}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const About: React.FC = () => {
  return (
    <section id="story" className="py-24 bg-[#0B0B0B] border-t border-white/5 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="flex-1 relative order-2 lg:order-1"
          >
            <div className="relative z-10 p-4 border border-primary/20">
               <img 
                src="https://images.unsplash.com/photo-1741816219237-28a9dd1d7bde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaWZlc3R5bGUlMjBmYXNoaW9uJTIwbW9kZWwlMjBlbGVnYW50JTIwYmxhY2slMjBkcmVzcyUyMGdvbGQlMjBqZXdlbHJ5fGVufDF8fHx8MTc3MTcxMjAwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                alt="AR Perfumers Brand Story"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 border-t border-r border-primary/30 z-0" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 border-b border-l border-primary/30 z-0" />
            
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-20 -left-20 w-64 h-64 border border-primary/5 rounded-full pointer-events-none"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex-1 order-1 lg:order-2"
          >
            <span className="text-primary text-xs uppercase tracking-[0.5em] mb-4 block font-medium">Legacy of Prestige</span>
            <h2 className="text-4xl lg:text-7xl text-white mb-8 font-serif leading-tight">Beyond <span className="italic text-primary font-medium">Fragrance</span>, A Statement.</h2>
            <div className="w-24 h-[1px] bg-primary mb-12" />
            
            <div className="space-y-8 text-white/50 text-lg font-light leading-relaxed">
              <p>
                Founded on the principles of absolute luxury and uncompromising quality, AR Perfumers has redefined the art of olfactory creation. We don't just blend scents; we curate emotions.
              </p>
              <p>
                “At AR Perfumers, we blend tradition with modern elegance to craft fragrances that embody power, passion, and prestige. Our heritage is rooted in the pursuit of perfection.”
              </p>
              <p>
                Each bottle is hand-assembled, numbered, and sealed, representing the pinnacle of artisanal craftsmanship in the modern era.
              </p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <button className="group relative text-white uppercase tracking-[0.3em] text-xs font-bold border-b border-white/20 hover:border-primary pb-3 transition-all duration-300">
                Explore Our Heritage
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ delay: 1, duration: 1.5 }}
                  className="absolute bottom-0 left-0 h-[1px] bg-primary"
                />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
