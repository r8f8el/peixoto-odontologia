import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { professionals as staticProfessionals } from '../data/professionals';
import { supabase } from '../lib/supabase';
import { Award, GraduationCap, RefreshCw } from 'lucide-react';

const Team = () => {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const { data, error } = await supabase
          .from('professionals')
          .select('*')
          .eq('status', 'Ativo')
          .order('order_index', { ascending: true });

        if (error || !data || data.length === 0) {
          // Fallback para dados estáticos se o banco estiver vazio ou falhar
          setProfessionals(staticProfessionals.map(p => ({
            ...p,
            image_url: p.image // mapear o campo local para o esperado do banco
          })));
        } else {
          setProfessionals(data);
        }
      } catch (err) {
        setProfessionals(staticProfessionals);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionals();
  }, []);

  if (loading) return (
    <div className="py-40 flex justify-center items-center text-secondary">
      <RefreshCw size={40} className="animate-spin" />
    </div>
  );

  return (
    <section id="equipe" className="py-32 px-6 overflow-hidden bg-accent-glow">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-display text-primary uppercase tracking-tight"
          >
            Mestres e Doutores a seu <span className="opacity-40 italic">Cuidado.</span>
          </motion.h2>
          <p className="text-primary/70 font-body text-xl max-w-xl mx-auto">
            Uma equipe altamente qualificada, formada por professores e especialistas, pronta para oferecer tratamentos com excelência científica.
          </p>
        </div>

        {/* Dynamic CMS Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-20 items-stretch font-body">
          {professionals.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.98 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className={`group flex flex-col items-center cursor-pointer ${idx % 2 !== 0 ? 'md:translate-y-12' : ''}`}
            >
              {/* Image with Desktop Hover Detail */}
              <div className="relative w-full aspect-[3/4] rounded-[3rem] overflow-hidden shadow-lux group-hover:shadow-[0_40px_80px_rgba(15,23,42,0.15)] transition-all duration-700 bg-slate-100 border-4 border-white">
                <div 
                   className="absolute inset-0 bg-center bg-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 contrast-110" 
                   style={{ backgroundImage: `url(${p.image_url})` }}
                />
                
                {/* Desktop Layer Only (Hover) */}
                <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent flex flex-col justify-end p-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 hidden md:flex">
                   <div className="space-y-4 translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
                     <GraduationCap className="text-secondary w-8 h-8" />
                     <p className="font-body text-sm leading-relaxed text-slate-200">
                       {p.specialty}
                     </p>
                  </div>
                </div>
              </div>

              {/* Title & Info Section */}
              <div className="mt-8 text-center space-y-3 px-4">
                <h3 className="text-2xl md:text-3xl font-display text-primary tracking-tight leading-none">{p.name}</h3>
                <div className="flex items-center justify-center gap-2 text-[10px] font-black tracking-widest text-secondary uppercase bg-secondary/5 py-1 px-4 rounded-full w-fit mx-auto">
                   <Award size={14} /> {p.registration}
                </div>
                
                {/* Mobile/Tablet Exclusive Detail (Visible by default) */}
                <div className="md:hidden pt-4 space-y-3 bg-soft-blue/50 p-6 rounded-3xl border border-secondary/5">
                   <div className="flex justify-center text-secondary">
                      <GraduationCap size={24} />
                   </div>
                   <p className="text-sm font-body text-primary/70 leading-relaxed font-medium">
                      {p.specialty}
                   </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
