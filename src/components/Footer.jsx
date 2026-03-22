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
          <div className="col-span-2 space-y-12">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="bg-white p-4 rounded-2xl shadow-lux">
                <img 
                  src="/assets/logo.png" 
                  alt={clinicInfo.name} 
                  className="h-20 w-auto object-contain transition-all duration-700 group-hover:scale-105"
                  onError={(e) => e.target.style.display = 'none'}
                />
              </div>
            </div>
            
            <p className="font-body text-xl lg:text-3xl leading-snug tracking-tight text-slate-300 max-w-sm">
              Inovação tecnológica e conhecimento acadêmico <span className="italic">lapidando</span> a sua saúde.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-10">
            <h4 className="text-xs uppercase font-bold tracking-[0.3em] text-secondary">A Clínica</h4>
            <ul className="space-y-4 font-body text-lg text-slate-400">
              <li className="hover:text-white transition-colors cursor-pointer capitalize">Sobre Nós</li>
              <li className="hover:text-white transition-colors cursor-pointer capitalize">Nossa Equipe</li>
              <li className="hover:text-white transition-colors cursor-pointer capitalize">Unidade Goiânia</li>
              <li className="hover:text-white transition-colors cursor-pointer capitalize">Blog</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-10">
            <h4 className="text-xs uppercase font-bold tracking-[0.3em] text-secondary">Contato</h4>
            <ul className="space-y-6 font-body text-lg text-slate-400">
              <li className="flex items-center gap-4 hover:text-white transition-colors cursor-pointer">
                <div className="w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center bg-white/5">
                  <Phone size={18} />
                </div>
                (64) 99318-4545
              </li>
              <li className="flex items-start gap-4 hover:text-white transition-colors cursor-pointer">
                <div className="w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center bg-white/5 mt-1">
                  <MapPin size={18} />
                </div>
                <span>Av. do Fórum, Qd. 33, Lt. 27, Sala B<br/>Itaguaí II, Caldas Novas - GO</span>
              </li>
              <li className="flex items-center gap-4 hover:text-white transition-colors cursor-pointer">
                <div className="w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center bg-white/5">
                  <Instagram size={18} />
                </div>
                @peixotoodonto
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
