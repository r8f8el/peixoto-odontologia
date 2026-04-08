import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const reviews = [
  {
    name: "Rafael Gontijo",
    stars: 5,
    review: "Dr Lucas é muito didático e passou confiança durante todo tratamento, tenho somente a agradecer toda atenção e hospitalidade, profissional de muito respeito, indico à todos!!!",
    date: "1 mês atrás"
  },
  {
    name: "Marly Candida Lima",
    stars: 5,
    review: "Fiz o tratamento na Odontologia Peixoto, me senti bem, ótimo atendimento, uma experiência nota 1.000. Dr. Lucas me ajudou em tudo, muito educado. o que ele pode fazer de melhor ele fez. Muito obrigada por tudo 🙏",
    date: "2 meses atrás"
  },
  {
    name: "Maria Teresinha",
    stars: 5,
    review: "Termino do tratamento, bastante longo, graças à Deus chegamos no fim, o resultado foi maravilhoso, superou minhas expectativas, muito obrigada Dr. Lucas e toda sua equipe as meninas da recepção também são maravilhosas, sou muito grata a todos Deus os abençoe sempre",
    date: "11 meses atrás"
  },
  {
    name: "Roberta Nascimento",
    stars: 5,
    review: "Atendimento excelente! Dr. Lucas é muito cuidadoso e atencioso. Recomendo muito!",
    date: "6 meses atrás"
  },
  {
    name: "Nilton Alves",
    stars: 5,
    review: "Sou da cidade de Luz - MG, quero deixar meus agradecimentos ao Dr Lucas e equipe pela presteza, profissionalismo e atenção em me atender no sábado 16/11/24. Obrigado, resolveram o meu problema rapidamente e por isso sou grato.",
    date: "1 ano atrás"
  },
  {
    name: "Neilton Mendes Telles",
    stars: 5,
    review: "Olá Dr. Lucas tudo bem estou passando por aqui para te agradecer o excelente tratamento que você fez aos meus dentes fiquei muito encantado impressionado com a sua forma de trabalhar foi muito bom...",
    date: "5 anos atrás"
  },
  {
    name: "Vania Carvalho Vania",
    stars: 5,
    review: "Amei o atendimento super recomendo um profissional competente, carismático muito educado o tratamento que fiz ficou perfeito e sem enrolação muito rápido e tem mais ainda canta muito...",
    date: "5 anos atrás"
  },
  {
    name: "Munir José Calaça",
    stars: 5,
    review: "Profissional Exemplar, passa muita segurança. Fiz um tratamento recente fiquei muito impressionado com os cuidados e a forma de tratamento",
    date: "5 anos atrás"
  },
  {
    name: "Pedro Henrique Gomes Cardoso d'Avila",
    stars: 5,
    review: "Excelente atendimento e profissionais de extrema qualidade.",
    date: "2 anos atrás"
  },
  {
    name: "Pedro Henrique",
    stars: 5,
    review: "Melhor clínica de Caldas Novas! Dr. Lucas é um excelente profissional.",
    date: "1 mês atrás"
  },
  {
    name: "Cleiton Dias",
    stars: 5,
    review: "Top demais! Atendimento de primeira e resultados excelentes.",
    date: "1 mês atrás"
  },
  {
    name: "Luana",
    stars: 5,
    review: "Fiquei muito feliz com meu novo sorriso. Recomendo a todos!",
    date: "1 mês atrás"
  },
  {
    name: "Mayra",
    stars: 5,
    review: "Trabalho impecável e equipe muito atenciosa. Nota 10!",
    date: "2 meses atrás"
  },
  {
    name: "Leandra Araujo",
    stars: 5,
    review: "Muito grata por todo o cuidado e profissionalismo da equipe Peixoto Odontologia.",
    date: "3 meses atrás"
  },
  {
    name: "Lilian Rosa",
    stars: 5,
    review: "Atendimento diferenciado e ambiente muito acolhedor. Amei o resultado!",
    date: "4 meses atrás"
  }
];

const ReviewCard = ({ name, review, stars, date }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="bg-white p-8 md:p-12 rounded-3xl shadow-lux border border-slate-100 flex flex-col justify-between h-full relative min-h-[350px]"
  >
    <div className="absolute -top-4 -right-4 bg-secondary/10 p-4 rounded-2xl">
      <Quote className="text-secondary opacity-50" size={28} />
    </div>
    
    {/* Tempo de transição barra de progresso */}
    <div className="absolute bottom-0 left-0 h-1 bg-secondary/20 w-full overflow-hidden rounded-b-3xl">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        key={name}
        transition={{ duration: 5, ease: "linear" }}
        className="h-full bg-secondary"
      />
    </div>
    
    <div className="space-y-8">
      <div className="flex gap-1.5">
        {[...Array(stars)].map((_, i) => (
          <Star key={i} size={18} className="fill-secondary text-secondary" />
        ))}
      </div>
      
      <p className="text-primary/80 font-body text-xl md:text-2xl leading-relaxed italic font-light">
        "{review}"
      </p>
    </div>
    
    <div className="mt-10 pt-8 border-t border-slate-50 flex justify-between items-center">
      <div className="flex flex-col">
        <span className="font-display font-bold text-primary text-lg tracking-tight">{name}</span>
        <span className="text-secondary text-xs font-bold uppercase tracking-widest mt-1">Paciente Satisfeito</span>
      </div>
      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">{date}</span>
    </div>
  </motion.div>
);

const Reviews = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % reviews.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [index]);

  return (
    <section className="py-32 px-6 bg-soft-blue relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        <div className="flex flex-col items-center text-center gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-display text-primary uppercase tracking-tight">
              O que dizem nossos <span className="text-secondary italic font-black">Pacientes.</span>
            </h2>
            <p className="text-primary/70 font-body text-xl max-w-2xl mx-auto">
              A satisfação de quem confia em nosso trabalho é a motivação diária da nossa equipe.
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={prev}
              className="w-14 h-14 rounded-2xl border border-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all group"
              title="Anterior"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={next}
              className="px-6 h-14 rounded-2xl bg-primary text-white flex items-center justify-center gap-2 hover:bg-secondary transition-all group"
            >
              <span className="text-sm font-bold uppercase tracking-widest hidden md:block">Próxima</span>
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="relative h-full min-h-[400px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full max-w-4xl mx-auto"
            >
              <ReviewCard {...reviews[index]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress dots - Limited to show fewer if many reviews */}
        <div className="flex justify-center gap-3 overflow-x-auto py-4">
          {reviews.map((_, i) => (
            <button 
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`h-2 rounded-full transition-all duration-500 shrink-0 ${index === i ? 'w-12 bg-secondary' : 'w-2 bg-primary/10'}`}
            />
          ))}
        </div>

        <div className="text-center pt-8">
          <a 
            href="https://www.google.com/search?q=peixoto+odontologia+caldas+novas#lrd=0x94065f49e45f06e5:0x8fd62ca933ae3ca,1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white border border-slate-200 px-8 py-4 rounded-2xl shadow-sm hover:shadow-md transition-all group"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            <span className="text-primary font-bold text-sm uppercase tracking-widest group-hover:text-secondary transition-colors">
              Ver todas as avaliações no Google
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
