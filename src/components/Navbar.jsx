import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl z-50 font-body"
    >
      <div className="glass-card px-4 md:px-10 py-3 md:py-4 flex items-center justify-between shadow-[0_20px_50px_rgba(15,23,42,0.15)] border-white/20">
        
        {/* Simplified Navigation Links - Centered/Proportional spacing */}
        <div className="flex items-center justify-between w-full md:w-auto md:gap-12 text-[10px] md:text-sm font-bold tracking-widest uppercase">
          
          <div className="flex items-center gap-4 sm:gap-6 md:gap-12">
            {['Equipe', 'Tratamentos', 'Contato'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="hover:text-secondary transition-all duration-300 text-primary/70 hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                {item}
              </a>
            ))}
          </div>
          
          {/* Action Button - Robust and inside the box on mobile */}
          <motion.a
            href="https://wa.me/5564993184545"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ml-4 bg-primary text-white px-4 md:px-6 py-2 md:py-2.5 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-black tracking-widest hover:bg-secondary transition-all duration-500 shadow-xl flex items-center gap-2 whitespace-nowrap"
          >
            AGENDAR
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
