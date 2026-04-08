import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Diamond, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';

const defaultHeroImages = [
  '/assets/clinic-1.png',
  '/assets/clinic-2.jpg',
  '/assets/clinic-3.jpg',
  '/assets/clinic-5.jpg',
];

const Hero = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const [content, setContent] = useState({
    hero_title: 'Carinho em cada detalhe,\narte em cada sorriso.',
    hero_subtitle: 'Odontologia que une sofisticação, cuidado e excelência! Com equipe de mestres e especialistas, utilizamos tecnologia de ponta e alta precisão para oferecer tratamentos personalizados, seguros e uma experiência acolhedora em cada etapa.',
    hero_badge: 'Excelência em Odontologia Clínica',
    hero_images: JSON.stringify(defaultHeroImages)
  });

  const fetchContent = async () => {
    const { data, error } = await supabase.from('site_content').select('*');
    if (!error && data?.length > 0) {
      const contentMap = {};
      data.forEach(item => {
        contentMap[item.key] = item.value;
      });
      setContent(prev => ({ ...prev, ...contentMap }));
    }
  };

  useEffect(() => {
    fetchContent();
    
    // Listen for updates from Admin
    window.addEventListener('site-content-updated', fetchContent);
    return () => window.removeEventListener('site-content-updated', fetchContent);
  }, []);

  const activeImages = (() => {
    try {
      const parsed = JSON.parse(content.hero_images || '[]');
      return parsed.length > 0 ? parsed : defaultHeroImages;
    } catch {
      return defaultHeroImages;
    }
  })();

  useEffect(() => {
    const timer = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % activeImages.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [activeImages.length]);

  // Função para renderizar o título com o detalhe colorido (palavra 'sorriso')
  const renderTitle = (text) => {
    if (!text) return null;
    
    // Converte literais '\n' para quebras de linha reais
    const cleanText = text.replace(/\\n/g, '\n');
    const lines = cleanText.split('\n');
    
    return lines.map((line, idx) => (
      <div key={idx} className="block leading-[1.05]">
        {line.split(/(sorriso)/i).map((part, i) => 
          part.toLowerCase() === 'sorriso' 
            ? <span key={i} className="text-secondary italic font-bold">{part}</span> 
            : part
        )}
      </div>
    ));
  };

  return (
    <section id="a-clínica" className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-6 font-body overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
        {/* Hero Text */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center md:items-start text-center md:text-left space-y-10"
        >
          <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 px-5 py-2 rounded-full text-secondary text-xs font-black tracking-[0.2em] mx-auto md:mx-0">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <Sparkles size={14} /> {content.hero_badge}
          </div>
          
          <h1 className="text-5xl md:text-8xl font-display font-medium leading-[1.05] text-primary whitespace-pre-line tracking-tight max-w-2xl md:max-w-none mx-auto md:mx-0">
            {renderTitle(content.hero_title)}
          </h1>
          
          <p className="text-lg md:text-xl text-primary/60 max-w-lg leading-relaxed font-body font-medium mx-auto md:mx-0">
            {content.hero_subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 pt-6 w-full md:w-auto">
            <motion.a
              href="https://wa.me/5564993184545"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-primary text-secondary border-2 border-primary px-10 py-5 rounded-2xl font-black tracking-[0.2em] text-sm hover:bg-secondary hover:text-white hover:border-secondary transition-all duration-500 shadow-2xl flex items-center justify-center gap-3 cursor-pointer w-full sm:w-auto"
            >
              MARCAR CONSULTA <Diamond size={18} fill="currentColor" />
            </motion.a>
            <a 
              href="#equipe"
              className="px-10 py-5 rounded-2xl font-bold tracking-widest text-sm text-primary/40 hover:text-secondary transition-colors duration-300 underline underline-offset-8 decoration-secondary/30 text-center w-full sm:w-auto"
            >
              CONHEÇA A EQUIPE
            </a>
          </div>
        </motion.div>
        
        {/* Dynamic Visual Element (Hero Image Area with Slideshow) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative aspect-[4/5] flex items-center justify-center"
        >
          <div className="w-full h-full bg-white border-8 border-white shadow-lux rounded-[4rem] overflow-hidden relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={imgIndex}
                initial={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
                animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                exit={{ opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="w-full h-full bg-cover bg-center overflow-hidden relative"
                style={{ backgroundImage: `url(${activeImages[imgIndex]})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl opacity-60" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl opacity-60" />

          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 lg:-right-10 bg-white/90 backdrop-blur-md p-8 rounded-[2.5rem] flex items-center gap-5 z-20 max-w-[280px] shadow-lux border border-white"
          >
            <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
              <Diamond size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] mb-1">SOFISTICAÇÃO</p>
              <p className="text-sm font-body text-primary font-bold leading-tight">Tecnologia e Conforto em cada detalhe</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
