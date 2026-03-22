import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  '/assets/clinic-1.png',
  '/assets/clinic-2.jpg',
  '/assets/clinic-3.jpg',
  '/assets/clinic-4.jpg',
  '/assets/clinic-5.jpg',
  '/assets/clinic-6.jpg',
];

const BackgroundSlideshow = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000); // Muda a cada 6 segundos
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }} // Transparência bem sutil para luxo
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-cover bg-center grayscale contrast-125"
          style={{ backgroundImage: `url(${images[index]})` }}
        />
      </AnimatePresence>
      
      {/* Overlay para garantir legibilidade e textura de mármore */}
      <div className="absolute inset-0 marble-bg opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white/90" />
    </div>
  );
};

export default BackgroundSlideshow;
