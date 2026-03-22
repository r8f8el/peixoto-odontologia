import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Diamond, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';

const heroImages = [
  '/assets/clinic-1.png',
  '/assets/clinic-2.jpg',
  '/assets/clinic-3.jpg',
  '/assets/clinic-5.jpg',
];

const Hero = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const [content, setContent] = useState({
    hero_title: 'Inovação e Arte em cada detalhe do seu sorriso.',
    hero_subtitle: 'Uma abordagem moderna e sofisticada onde a odontologia de alta performance se une ao conhecimento de mestres e doutores.',
    hero_badge: 'EXCELÊNCIA CLÍNICA & ACADÊMICA',
    hero_images: JSON.stringify(heroImages)
  });

  useEffect(() => {
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

    fetchContent();
  }, []);

  const activeImages = content.hero_images ? JSON.parse(content.hero_images) : heroImages;

  useEffect(() => {
    const timer = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % activeImages.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [activeImages.length]);

  return (
    <section id="a-clínica" className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Hero Text */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 px-4 py-1.5 rounded-full text-secondary text-sm font-semibold tracking-wider">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <Sparkles size={16} /> {content.hero_badge}
          </div>
          
          <h1 className="text-6xl md:text-8xl font-display leading-[1.1] text-primary whitespace-pre-line">
            {content.hero_title}
          </h1>
          
          <p className="text-lg md:text-xl text-primary/70 max-w-lg leading-relaxed font-body">
            {content.hero_subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-primary text-white border-2 border-primary px-10 py-5 rounded-2xl font-bold tracking-widest text-lg hover:bg-secondary hover:border-secondary transition-all duration-500 shadow-2xl flex items-center gap-3"
            >
              MARCAR CONSULTA <Diamond size={20} fill="currentColor" />
            </motion.button>
            <button className="px-10 py-5 rounded-2xl font-bold tracking-widest text-lg text-primary/80 hover:text-secondary transition-colors duration-300 underline underline-offset-8 decoration-secondary/30">
              CONHEÇA A EQUIPE
            </button>
          </div>
        </motion.div>
        
        {/* Dynamic Visual Element (Hero Image Area with Slideshow) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative aspect-[4/5] flex items-center justify-center"
        >
          <div className="w-full h-full bg-white border border-white shadow-lux rounded-[3rem] overflow-hidden relative z-10 p-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={imgIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1.5 }}
                className="w-full h-full rounded-[2.5rem] bg-cover bg-center overflow-hidden relative"
                style={{ backgroundImage: `url(${activeImages[imgIndex]})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="absolute -top-10 -right-10 w-60 h-60 bg-secondary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />

          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-8 lg:-right-8 glass-card p-6 flex items-center gap-4 z-20 max-w-[240px] shadow-2xl"
          >
            <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center text-secondary">
              <Diamond size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-secondary uppercase tracking-tighter">ESTRUTURA PREMIUM</p>
              <p className="text-sm font-body text-primary font-medium leading-tight">Tecnologia e Conforto em cada detalhe</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
