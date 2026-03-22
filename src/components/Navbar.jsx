import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-50"
    >
      <div className="glass-card px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 group cursor-pointer">
          <img 
            src="/assets/logo.png" 
            alt="Peixoto Odontologia" 
            className="h-12 w-auto object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }} 
          />
          <span className="font-display font-bold text-xl tracking-tight hidden md:block" style={{display: 'none'}}>
            PEIXOTO <span className="text-secondary opacity-80">ODONTOLOGIA</span>
          </span>
        </div>
        
        <div className="flex items-center gap-8 text-sm font-medium tracking-wide">
          {['A Clínica', 'Equipe', 'Tratamentos', 'Contato'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="hover:text-secondary transition-colors duration-300"
            >
              {item}
            </a>
          ))}
          <motion.a
            href="https://wa.me/5564993184545"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-white px-6 py-2 rounded-xl text-sm font-semibold tracking-wider hover:bg-secondary transition-colors duration-500 shadow-xl cursor-pointer"
          >
            AGENDAR
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
