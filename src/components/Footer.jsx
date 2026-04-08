import React, { useEffect, useState } from 'react';
import { clinicInfo as staticClinicInfo } from '../data/professionals';
import { Instagram, MapPin, Phone, Mail, Diamond } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Footer = () => {
  const [clinicInfo, setClinicInfo] = useState({
    registration: staticClinicInfo.registration,
    responsible: staticClinicInfo.responsible,
    name: staticClinicInfo.name
  });

  useEffect(() => {
    const fetchClinicInfo = async () => {
      const { data, error } = await supabase.from('site_content').select('*').in('key', ['clinic_registration', 'clinic_responsible', 'clinic_name']);
      if (!error && data?.length > 0) {
        const info = {};
        data.forEach(item => {
           if (item.key === 'clinic_registration') info.registration = item.value;
           if (item.key === 'clinic_responsible') info.responsible = item.value;
           if (item.key === 'clinic_name') info.name = item.value;
        });
        setClinicInfo(prev => ({ ...prev, ...info }));
      }
    };
    fetchClinicInfo();
  }, []);

  return (
    <footer id="contato" className="bg-primary pt-32 pb-16 px-6 text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Main Grid */}
        <div className="grid md:grid-cols-4 gap-16 items-start relative z-10">
          
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left space-y-12">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="bg-white p-4 rounded-2xl shadow-lux mx-auto md:mx-0">
                <img 
                  src="/assets/logo.png" 
                  alt={clinicInfo.name} 
                  className="h-20 w-auto object-contain transition-all duration-700 group-hover:scale-105"
                  onError={(e) => e.target.style.display = 'none'}
                />
              </div>
            </div>
            

          </div>

          {/* Quick Links */}
          <div className="space-y-10 flex flex-col items-center md:items-start text-center md:text-left w-full">
            <h4 className="text-xs uppercase font-bold tracking-[0.3em] text-secondary">A Clínica</h4>
            <ul className="space-y-4 font-body text-lg text-slate-400">
              <li><a href="#a-clínica" className="hover:text-white transition-colors cursor-pointer capitalize">Sobre Nós</a></li>
              <li><a href="#equipe" className="hover:text-white transition-colors cursor-pointer capitalize">Nossa Equipe</a></li>
              <li><a href="https://blog.peixotoodontologia.com.br" className="hover:text-white transition-colors cursor-pointer capitalize">Blog</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-10 flex flex-col items-center md:items-start text-center md:text-left w-full">
            <h4 className="text-xs uppercase font-bold tracking-[0.3em] text-secondary">Contato</h4>
            <ul className="space-y-8 font-body text-lg text-slate-400 w-full max-w-xs md:max-w-none">
              <li className="w-full">
                <a 
                  href="https://wa.me/5564993184545" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center flex-col md:flex-row gap-4 group cursor-pointer w-full hover:translate-x-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 border border-white/10 rounded-2xl flex items-center justify-center bg-white/5 group-hover:bg-secondary group-hover:border-secondary transition-all duration-500 shrink-0">
                    <Phone size={24} className="group-hover:text-white" />
                  </div>
                  <div className="flex flex-col flex-1 overflow-hidden">
                    <span className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">WhatsApp</span>
                    <span className="text-slate-300 group-hover:text-white transition-colors text-base md:text-lg">(64) 99318-4545</span>
                  </div>
                </a>
              </li>
              <li className="w-full">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Av.+do+F%C3%B3rum,+Qd.+33,+Lt.+27,+Sala+B+Itagua%C3%AD+II,+Caldas+Novas+-+GO" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center flex-col md:flex-row gap-4 group cursor-pointer w-full hover:translate-x-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 border border-white/10 rounded-2xl flex items-center justify-center bg-white/5 group-hover:bg-secondary group-hover:border-secondary transition-all duration-500 shrink-0">
                    <MapPin size={24} className="group-hover:text-white" />
                  </div>
                  <div className="flex flex-col flex-1 overflow-hidden">
                    <span className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">Localização</span>
                    <span className="text-slate-300 group-hover:text-white transition-colors text-sm leading-relaxed">Av. do Fórum, Qd. 33, Lt. 27, Sala B<br/>Itaguaí II, Caldas Novas - GO</span>
                  </div>
                </a>
              </li>
              <li className="w-full">
                <a 
                  href="https://www.instagram.com/peixotodonto/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center flex-col md:flex-row gap-4 group cursor-pointer w-full hover:translate-x-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 border border-white/10 rounded-2xl flex items-center justify-center bg-white/5 group-hover:bg-secondary group-hover:border-secondary transition-all duration-500 shrink-0">
                    <Instagram size={24} className="group-hover:text-white" />
                  </div>
                  <div className="flex flex-col flex-1 overflow-hidden">
                    <span className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">Clínica</span>
                    <span className="text-slate-300 group-hover:text-white transition-colors text-base md:text-lg">@peixotodonto</span>
                  </div>
                </a>
              </li>
              <li className="w-full">
                <a 
                  href="https://www.instagram.com/dr.lucaspeixoto/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center flex-col md:flex-row gap-4 group cursor-pointer w-full hover:translate-x-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 border border-white/10 rounded-2xl flex items-center justify-center bg-white/5 group-hover:bg-secondary group-hover:border-secondary transition-all duration-500 shrink-0">
                    <Instagram size={24} className="group-hover:text-white" />
                  </div>
                  <div className="flex flex-col flex-1 overflow-hidden">
                    <span className="text-[10px] font-black uppercase tracking-widest text-secondary opacity-60">Instagram</span>
                    <span className="text-slate-300 group-hover:text-white transition-colors text-base md:text-lg">@dr.lucaspeixoto</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Clinic Info Bottom Bar */}
        <div className="pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-xs font-bold tracking-[0.2em] uppercase text-slate-500">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <p className="flex items-center gap-2">
              <span className="text-secondary opacity-60 px-2 py-0.5 border border-secondary/20 rounded">
                 CLÍNICA
              </span> 
              {clinicInfo.registration}
            </p>
            <p className="flex items-center gap-2">
              <span className="text-slate-400 opacity-60 px-2 py-0.5 border border-slate-700 rounded">
                 RT
              </span> 
              {clinicInfo.responsible}
            </p>
          </div>
          
          <p className="opacity-40">
            © {new Date().getFullYear()} {clinicInfo.name.toUpperCase()}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
