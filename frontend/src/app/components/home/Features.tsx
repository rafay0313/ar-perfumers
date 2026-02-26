import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Truck, Gem, Clock, Star, Quote } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const Features: React.FC = () => {
  const features = [
    {
      id: '1',
      title: 'Long Lasting Formula',
      icon: <Clock size={32} />,
      description: 'Extraits de Parfum concentrated for 24+ hour wear.',
      delay: 0.1
    },
    {
      id: '2',
      title: 'Imported Premium Oils',
      icon: <Gem size={32} />,
      description: 'Sourced directly from the fields of Grasse and the East.',
      delay: 0.2
    },
    {
      id: '3',
      title: 'Elegant Packaging',
      icon: <ShieldCheck size={32} />,
      description: 'Handcrafted glass and gold-etched magnetic closures.',
      delay: 0.3
    },
    {
      id: '4',
      title: 'Nationwide Delivery',
      icon: <Truck size={32} />,
      description: 'Discreet, secure, and white-glove shipping experience.',
      delay: 0.4
    }
  ];

  return (
    <section className="py-24 bg-zinc-950 border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay, duration: 0.8 }}
              className="group text-center flex flex-col items-center"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="w-20 h-20 border border-primary/20 flex items-center justify-center text-primary mb-8 transition-colors duration-500 group-hover:bg-primary/5 group-hover:border-primary gold-glow"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-white text-lg uppercase tracking-widest font-serif mb-4 group-hover:text-primary transition-colors">{feature.title}</h3>
              <p className="text-white/40 text-sm font-light leading-relaxed max-w-[220px]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: '1',
      name: 'Isabella V.',
      role: 'Fashion Consultant',
      text: '“AR Royal Oud is more than a scent; it’s an invisible accessory. The depth and complexity are unlike anything I’ve ever experienced in mainstream luxury brands.”',
      rating: 5
    },
    {
      id: '2',
      name: 'Marcus Thorne',
      role: 'Luxury Lifestyle Influencer',
      text: '“Finally, a fragrance house that respects the tradition of perfumery while delivering modern sophistication. Midnight Desire is my signature for every evening event.”',
      rating: 5
    },
    {
      id: '3',
      name: 'Elena Rossi',
      role: 'Global Creative Director',
      text: '“The attention to detail in the packaging is just as impressive as the scent itself. It feels truly premium from the moment you hold the bottle.”',
      rating: 5
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    dotsClass: "slick-dots luxury-dots"
  };

  return (
    <section className="py-32 bg-[#0B0B0B] border-y border-white/5 relative overflow-hidden">
      {/* Decorative Shimmer */}
      <div className="absolute inset-0 shimmer-bg pointer-events-none opacity-20" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-16 text-center">
          <Quote size={48} className="text-primary/20 mb-8" />
          <span className="text-primary text-xs uppercase tracking-[0.5em] mb-4 font-medium">Voices of Prestige</span>
          <h2 className="text-4xl lg:text-6xl text-white font-serif">The Elite Circle</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <Slider {...settings}>
            {testimonials.map((t) => (
              <div key={t.id} className="px-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 lg:p-20 text-center relative overflow-hidden group"
                >
                  {/* Glassmorphism Shine */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                  
                  <div className="flex justify-center gap-1 mb-8">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#C8A45D" className="text-primary" />
                    ))}
                  </div>
                  <p className="text-white/80 text-xl lg:text-3xl font-serif leading-relaxed mb-10 italic">
                    {t.text}
                  </p>
                  <div className="flex flex-col items-center">
                    <span className="text-white text-lg uppercase tracking-widest font-bold mb-1">{t.name}</span>
                    <span className="text-primary text-xs uppercase tracking-[0.3em] font-medium">{t.role}</span>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      
      <style>{`
        .luxury-dots {
          bottom: -60px !important;
        }
        .luxury-dots li button:before {
          color: #C8A45D !important;
          opacity: 0.2 !important;
          font-size: 10px !important;
        }
        .luxury-dots li.slick-active button:before {
          opacity: 1 !important;
          color: #C8A45D !important;
        }
      `}</style>
    </section>
  );
};

export const Newsletter: React.FC = () => {
  return (
    <section className="py-24 bg-black border-t border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto"
        >
          <span className="text-primary text-xs uppercase tracking-[0.5em] mb-6 block font-medium">Privileged Access</span>
          <h2 className="text-4xl lg:text-7xl text-white mb-8 font-serif">Join the Elite Circle</h2>
          <p className="text-white/40 text-lg mb-12 font-light tracking-wide leading-relaxed">
            Subscribe to receive exclusive invitations to new collection previews, limited edition releases, and private concierge services.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <div className="flex-1 relative group">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-zinc-900 border border-primary/20 text-white px-8 py-5 text-xs tracking-widest uppercase focus:outline-none focus:border-primary transition-all duration-300 placeholder:text-white/20"
              />
              <div className="absolute bottom-0 left-0 h-[2px] bg-primary w-0 group-focus-within:w-full transition-all duration-700" />
            </div>
            <button className="px-12 py-5 bg-primary text-black font-bold uppercase tracking-[0.2em] text-sm hover:bg-primary/90 transition-all gold-glow active:scale-95">
              Subscribe
            </button>
          </form>
          
          <p className="mt-8 text-white/20 text-[10px] uppercase tracking-widest">
            By subscribing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
