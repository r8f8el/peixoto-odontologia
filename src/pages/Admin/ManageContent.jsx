import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, RefreshCw, FileText, CheckCircle, Image as ImageIcon, Trash2, Palette, Type, Layout } from 'lucide-react';

const defaultHeroImages = [
  '/assets/clinic-1.png',
  '/assets/clinic-2.jpg',
  '/assets/clinic-3.jpg',
  '/assets/clinic-5.jpg',
];

const fontOptions = [
  { name: 'Luxo (Cormorant / Montserrat)', heading: 'Cormorant', body: 'Montserrat' },
  { name: 'Moderno (Outfit / Inter)', heading: 'Outfit', body: 'Inter' },
  { name: 'Clássico (Playfair / Lato)', heading: 'Playfair Display', body: 'Lato' },
  { name: 'Minimalista (Plus Jakarta Sans)', heading: 'Plus Jakarta Sans', body: 'Plus Jakarta Sans' },
];

const colorPresets = [
  { name: 'Marinho & Azul (Padrão)', primary: '#0F172A', secondary: '#0369A1' },
  { name: 'Ouro & Preto', primary: '#000000', secondary: '#C5A059' },
  { name: 'Clean (Teal)', primary: '#0D9488', secondary: '#0F172A' },
  { name: 'Elegante (Vinho)', primary: '#450A0A', secondary: '#DC2626' },
];

const ManageContent = () => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('site_content').select('*');
    if (error) {
      console.error('Error fetching content:', error);
    } else {
      const contentMap = {};
      data.forEach(item => {
        contentMap[item.key] = item.value;
      });
      
      // Auto-initialize hero images if empty
      if (!contentMap.hero_images || JSON.parse(contentMap.hero_images).length === 0) {
        contentMap.hero_images = JSON.stringify(defaultHeroImages);
      }
      
      setContent(contentMap);
    }
    setLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    const updates = Object.entries(content).map(([key, value]) => ({
      key,
      value,
      updated_at: new Date().toISOString()
    }));

    const { error } = await supabase.from('site_content').upsert(updates);

    if (error) {
      alert('Erro ao salvar conteúdo: ' + error.message);
    } else {
      // Dispatch a storage event so other components know to update if needed
      window.dispatchEvent(new Event('site-content-updated'));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
    setSaving(false);
  };

  const handleChange = (key, value) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  if (loading) return (
    <div className="py-20 flex flex-col items-center justify-center text-gray-400 gap-4 font-medium">
      <RefreshCw size={32} className="animate-spin text-secondary" />
      Carregando conteúdos do site...
    </div>
  );

  return (
    <div className="space-y-8 pb-20 font-body">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 border-l-secondary border-l-4 gap-6">
        <div className="space-y-2">
           <h2 className="text-3xl font-display font-bold text-primary italic flex items-center gap-3">
             <FileText size={32} strokeWidth={1.5} className="text-secondary" />
             Personalização do Site
           </h2>
           <p className="text-gray-500 font-medium text-sm">Gerencie a identidade visual e os textos da página inicial</p>
        </div>
        
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary text-secondary px-10 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-secondary hover:text-white transition-all shadow-xl active:scale-95 disabled:opacity-50 w-full md:w-auto justify-center"
        >
          {saving ? <RefreshCw size={20} className="animate-spin" /> : <Save size={20} />}
          {saving ? 'SALVANDO...' : 'SALVAR ALTERAÇÕES'}
        </button>
      </div>

      {success && (
        <div className="bg-green-50 border-2 border-green-200 p-6 rounded-[1.5rem] flex items-center gap-4 text-green-700 font-bold animate-in fade-in slide-in-from-top-4">
          <CheckCircle size={24} className="text-green-500" />
          Configurações aplicadas com sucesso! Seu site já está de cara nova.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-body">
        {/* Visual Identity Section */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm space-y-10 group hover:shadow-xl transition-all duration-500 col-span-full">
           <div className="flex items-center gap-4 text-secondary">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                 <Palette size={24} />
              </div>
              <h3 className="text-xl font-display font-bold text-primary uppercase tracking-wider">Identidade Visual (Cores e Fontes)</h3>
           </div>
           
           <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Esquema de Cores</label>
                <div className="grid grid-cols-1 gap-4">
                   {colorPresets.map((preset, idx) => (
                     <button
                      key={idx}
                      onClick={() => {
                        handleChange('theme_primary', preset.primary);
                        handleChange('theme_secondary', preset.secondary);
                      }}
                      className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                        content.theme_primary === preset.primary ? 'border-secondary bg-secondary/5' : 'border-gray-100 hover:border-gray-200'
                      }`}
                     >
                        <span className="font-bold text-sm text-primary">{preset.name}</span>
                        <div className="flex gap-2">
                           <div className="w-8 h-8 rounded-full shadow-inner border border-white" style={{ backgroundColor: preset.primary }} />
                           <div className="w-8 h-8 rounded-full shadow-inner border border-white" style={{ backgroundColor: preset.secondary }} />
                        </div>
                     </button>
                   ))}
                </div>
                
                <div className="pt-4 grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <span className="text-[10px] font-bold text-gray-400">COR PRIMÁRIA</span>
                      <input 
                        type="color" 
                        value={content.theme_primary || '#0F172A'} 
                        onChange={(e) => handleChange('theme_primary', e.target.value)}
                        className="w-full h-12 rounded-xl border border-gray-100 cursor-pointer p-1"
                      />
                   </div>
                   <div className="space-y-2">
                      <span className="text-[10px] font-bold text-gray-400">COR SECUNDÁRIA</span>
                      <input 
                        type="color" 
                        value={content.theme_secondary || '#0369A1'} 
                        onChange={(e) => handleChange('theme_secondary', e.target.value)}
                        className="w-full h-12 rounded-xl border border-gray-100 cursor-pointer p-1"
                      />
                   </div>
                </div>
              </div>

              <div className="space-y-6">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Estilo de Fontes</label>
                <div className="grid grid-cols-1 gap-4">
                   {fontOptions.map((font, idx) => (
                     <button
                      key={idx}
                      onClick={() => {
                        handleChange('font_heading', font.heading);
                        handleChange('font_body', font.body);
                      }}
                      className={`flex flex-col items-start p-4 rounded-2xl border-2 transition-all text-left ${
                        content.font_heading === font.heading ? 'border-secondary bg-secondary/5' : 'border-gray-100 hover:border-gray-200'
                      }`}
                     >
                        <span className="font-black text-xs text-secondary mb-1 uppercase tracking-tighter">{font.name}</span>
                        <span className="text-xl font-bold text-primary" style={{ fontFamily: font.heading }}>Título de Exemplo</span>
                        <span className="text-xs text-gray-400" style={{ fontFamily: font.body }}>Este é um exemplo de como o texto do corpo ficará.</span>
                     </button>
                   ))}
                </div>
              </div>
           </div>
        </div>

        {/* Hero Section Editing */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm space-y-10 group hover:shadow-xl transition-all duration-500">
           <div className="flex items-center gap-4 text-secondary">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                 <Layout size={24} />
              </div>
              <h3 className="text-xl font-display font-bold text-primary uppercase tracking-wider">Textos do Banner Principal</h3>
           </div>
           
           <div className="grid grid-cols-1 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Título Grande</label>
                <textarea
                  rows="2"
                  className="w-full px-8 py-6 bg-gray-50 border border-gray-200 rounded-3xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all text-primary font-bold text-2xl leading-tight resize-none"
                  value={content.hero_title || ''}
                  onChange={(e) => handleChange('hero_title', e.target.value)}
                  placeholder="Inovação e Arte..."
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Subtítulo Descritivo</label>
                <textarea
                  rows="3"
                  className="w-full px-8 py-6 bg-gray-50 border border-gray-200 rounded-3xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all text-primary font-body text-sm leading-relaxed resize-none"
                  value={content.hero_subtitle || ''}
                  onChange={(e) => handleChange('hero_subtitle', e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Etiqueta (Badge)</label>
                <input
                  type="text"
                  className="w-full px-8 py-5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all text-secondary font-bold text-sm tracking-widest uppercase"
                  value={content.hero_badge || ''}
                  onChange={(e) => handleChange('hero_badge', e.target.value)}
                />
              </div>
           </div>
        </div>

        {/* Banner Images (Hero Slideshow) */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm space-y-10 group hover:shadow-xl transition-all duration-500">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-secondary">
                 <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                    <ImageIcon size={24} />
                 </div>
                 <h3 className="text-xl font-display font-bold text-primary uppercase tracking-wider">Imagens do Carrossel</h3>
              </div>
              <label className="bg-secondary/10 text-secondary px-6 py-2 rounded-xl font-bold text-sm cursor-pointer hover:bg-secondary hover:text-white transition-all">
                + UPLOAD
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      try {
                        const { uploadImage } = await import('../../lib/storage');
                        const url = await uploadImage(file);
                        const currentImages = content.hero_images ? JSON.parse(content.hero_images) : [];
                        handleChange('hero_images', JSON.stringify([...currentImages, url]));
                      } catch (err) {
                        alert('Erro no upload: ' + err.message);
                      }
                    }
                  }} 
                />
              </label>
           </div>
           
           <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {(content.hero_images ? JSON.parse(content.hero_images) : []).map((url, idx) => (
                <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group/img shadow-md border border-gray-100">
                   <img src={url} className="w-full h-full object-cover" alt={`Hero ${idx}`} />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-all flex items-center justify-center">
                      <button 
                        onClick={() => {
                          const imgs = JSON.parse(content.hero_images);
                          imgs.splice(idx, 1);
                          handleChange('hero_images', JSON.stringify(imgs));
                        }}
                        className="bg-red-500 text-white p-3 rounded-xl hover:scale-110 transition-transform shadow-xl"
                      >
                        <Trash2 size={20} />
                      </button>
                   </div>
                   {defaultHeroImages.includes(url) && (
                     <div className="absolute bottom-2 left-2 bg-secondary/90 text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">
                        Padrão
                     </div>
                   )}
                </div>
              ))}
           </div>
           <p className="text-[10px] text-gray-400 italic font-medium leading-tight">Mova o cursor sobre a imagem para excluir. Imagens "Padrão" são as que já acompanham o layout original.</p>
        </div>

        {/* Informações de Contato / Footer */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm space-y-10 group hover:shadow-xl transition-all duration-500 col-span-full">
           <div className="flex items-center gap-4 text-secondary">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                 <FileText size={24} />
              </div>
              <h3 className="text-xl font-display font-bold text-primary uppercase tracking-wider">Rodapé (Footer) e Identificação</h3>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Nome da Clínica</label>
                <input
                  className="w-full px-8 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all text-primary font-bold"
                  value={content.clinic_name || 'Peixoto Odontologia'}
                  onChange={(e) => handleChange('clinic_name', e.target.value)}
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Registro Profissional</label>
                <input
                  className="w-full px-8 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all text-primary font-bold"
                  value={content.clinic_registration || 'CRO/GO - EPAO: 18394'}
                  onChange={(e) => handleChange('clinic_registration', e.target.value)}
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Rede Social Principal</label>
                <input
                  className="w-full px-8 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all text-primary font-bold"
                  value={content.clinic_social || '@peixoto.odontologia'}
                  onChange={(e) => handleChange('clinic_social', e.target.value)}
                  placeholder="@instagram"
                />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ManageContent;
