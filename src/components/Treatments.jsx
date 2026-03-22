import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { supabase } from '../lib/supabase';

const staticTreatments = [
  {
    title: "Reabilitação Oral & Estética",
    description: "Lentes de contato dental, facetas em porcelana e coroas personalizadas para um sorriso harmônico.",
    icon_name: "Sparkles"
  },
  {
    title: "Ortodontia Moderna",
    description: "Especialista em Alinhadores Invisíveis e aparelhos fixos de última geração para todas as idades.",
    icon_name: "Smile"
  },
  {
    title: "Implantodontia",
    description: "Implantes dentários e próteses fixas com planejamento digital e alta precisão clínica.",
    icon_name: "Microchip"
  },
  {
    title: "Odontopediatria",
    description: "Cuidado especializado para crianças com Sedação de Óxido Nitroso, garantindo conforto e zero trauma.",
    icon_name: "Snowflake"
  },
  {
    title: "Endodontia Avançada",
    description: "Tratamentos de canal com tecnologia de ponta para a preservação funcional e saúde do elemento dental.",
    icon_name: "ShieldCheck"
  },
  {
    title: "Estomatologia",
    description: "Diagnóstico e tratamento de doenças bucais por doutores especialistas e professores universitários.",
    icon_name: "Award"
  }
];

const Treatments = () => {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const { data, error } = await supabase
          .from('treatments')
          .select('*')
          .order('order_index', { ascending: true });

        if (error || !data || data.length === 0) {
          setTreatments(staticTreatments);
        } else {
          setTreatments(data);
        }
      } catch (err) {
        setTreatments(staticTreatments);
      } finally {
        setLoading(false);
      }
    };

    fetchTreatments();
  }, []);

  if (loading) return null;

  return (
    <section id="tratamentos" className="py-32 px-6 relative bg-white/50">
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-display text-primary uppercase leading-tight">
              Soluções Completas <br />
              de <span className="text-secondary opacity-70 italic">Alta Performance.</span>
            </h2>
            <p className="text-primary/70 text-lg font-body">
              Unindo ciência e tecnologia para oferecer os melhores resultados em Caldas Novas.
            </p>
          </div>
          <motion.button 
             whileHover={{ scale: 1.05 }}
             className="px-8 py-4 border-2 border-primary text-primary font-bold tracking-widest text-sm rounded-2xl hover:bg-primary hover:text-white transition-all duration-500"
          >
            VER TODOS OS SERVIÇOS
          </motion.button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {treatments.map((t, idx) => {
            const IconComp = LucideIcons[t.icon_name] || LucideIcons.Sparkles;
            return (
              <motion.div
                key={t.id || t.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-card p-10 space-y-6 group cursor-pointer hover:border-secondary/30 transition-all duration-500"
              >
                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-white transition-all duration-700 shadow-sm group-hover:shadow-secondary/50">
                  <IconComp size={32} />
                </div>
                <h3 className="text-2xl font-display text-primary">{t.title}</h3>
                <p className="text-primary/60 font-body leading-relaxed">
                  {t.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Treatments;
