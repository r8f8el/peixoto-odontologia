import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Stethoscope, PhoneCall, Calendar } from 'lucide-react';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-50 font-body"
    >
      <div className="glass-card px-4 md:px-10 py-4 flex items-center justify-between shadow-[0_20px_50px_rgba(15,23,42,0.15)] border-white/20">
        {/* Brand / Logo Section */}
        <div className="flex items-center gap-3 group cursor-pointer shrink-0">
          <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-50">
            <img 
              src="/assets/logo.png" 
              alt="Peixoto Odontologia" 
              className="h-8 md:h-12 w-auto object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }} 
            />
            <div style={{display: 'none'}} className="w-8 h-8 md:w-12 md:h-12 bg-secondary rounded flex items-center justify-center text-white font-black text-xl">
               P
            </div>
          </div>
          <span className="font-display font-black text-lg md:text-xl tracking-tighter text-primary hidden lg:block">
            PEIXOTO <span className="text-secondary opacity-80 uppercase">Odontologia</span>
          </span>
        </div>
        
        {/* Navigation Links - Improved spacing and mobile visibility */}
        <div className="flex items-center gap-4 md:gap-8 text-[10px] md:text-sm font-bold tracking-widest uppercase">
          {['Equipe', 'Tratamentos', 'Contato'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="hover:text-secondary transition-all duration-300 text-primary/70 hover:scale-105 active:scale-95"
            >
              {item}
            </a>
          ))}
          
          {/* Action Button - Visible on all devices now */}
          <motion.a
            href="https://wa.me/5564993184545"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-white px-5 py-2.5 rounded-2xl text-[10px] md:text-xs font-black tracking-widest hover:bg-secondary transition-all duration-500 shadow-xl flex items-center gap-2"
          >
            <Calendar size={14} className="hidden xs:block" />
            AGENDAR
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
