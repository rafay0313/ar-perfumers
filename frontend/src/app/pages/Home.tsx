import React from 'react';
import { Hero } from '../components/home/Hero';
import { Collections } from '../components/home/Collections';
import { NotesShowcase } from '../components/home/NotesShowcase';
import { About } from '../components/home/About';
import { Features, Testimonials, Newsletter } from '../components/home/Features';
import { motion } from 'motion/react';

export const Home: React.FC = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="bg-black"
    >
      <Hero />
      <Collections />
      <NotesShowcase />
      <About />
      <Features />
      <Testimonials />
      <Newsletter />
    </motion.main>
  );
};
