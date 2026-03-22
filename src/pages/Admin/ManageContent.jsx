import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, RefreshCw, FileText, CheckCircle, Image as ImageIcon, Trash2 } from 'lucide-react';

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
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 border-l-secondary border-l-4">
        <div className="space-y-2">
           <h2 className="text-3xl font-display font-bold text-primary italic flex items-center gap-3">
             <FileText size={32} strokeWidth={1.5} className="text-secondary" />
             Conteúdo do Site
           </h2>
           <p className="text-gray-500 font-medium">Altere os principais textos da página inicial em tempo real</p>
        </div>
        
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary text-secondary px-10 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-secondary hover:text-white transition-all shadow-xl active:scale-95 disabled:opacity-50"
        >
          {saving ? <RefreshCw size={20} className="animate-spin" /> : <Save size={20} />}
          {saving ? 'SALVANDO...' : 'SALVAR ALTERAÇÕES'}
        </button>
      </div>

      {success && (
        <div className="bg-green-50 border-2 border-green-200 p-6 rounded-[1.5rem] flex items-center gap-4 text-green-700 font-bold animate-in fade-in slide-in-from-top-4">
          <CheckCircle size={24} className="text-green-500" />
          Conteúdo atualizado com sucesso! Seu site já está refletindo as mudanças.
        </div>
      )}

      <div className="grid grid-cols-1 gap-8">
        {/* Hero Section Editing */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm space-y-10 group hover:shadow-xl transition-all duration-500">
           <div className="flex items-center gap-4 text-secondary">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                 <FileText size={24} />
              </div>
              <h3 className="text-xl font-display font-bold text-primary uppercase tracking-wider">Seção Hero (Topo do Site)</h3>
           </div>
           
           <div className="grid grid-cols-1 gap-10">
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-1">Título de Destaque (Título 1)</label>
                <textarea
                  rows="2"
                  className="w-full px-8 py-6 bg-gray-50 border border-gray-200 rounded-3xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all text-primary font-display text-4xl leading-tight resize-none"
                  value={content.hero_title || ''}
                  onChange={(e) => handleChange('hero_title', e.target.value)}
                  placeholder="Inovação e Arte em cada detalhe do seu sorriso."
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-1">Subtítulo (História/Abordagem)</label>
                <textarea
                  rows="4"
                  className="w-full px-8 py-6 bg-gray-50 border border-gray-200 rounded-3xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all text-primary font-body text-xl leading-relaxed resize-none"
                  value={content.hero_subtitle || ''}
                  onChange={(e) => handleChange('hero_subtitle', e.target.value)}
                  placeholder="Uma abordagem moderna e sofisticada..."
                />
              </div>

              <div className="space-y-3 max-w-sm">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-1">Etiqueta de Destaque (Badge)</label>
                <input
                  type="text"
                  className="w-full px-8 py-5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all text-secondary font-bold text-sm tracking-widest uppercase"
                  value={content.hero_badge || ''}
                  onChange={(e) => handleChange('hero_badge', e.target.value)}
                  placeholder="EXCELÊNCIA CLÍNICA & ACADÊMICA"
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
                 <h3 className="text-xl font-display font-bold text-primary uppercase tracking-wider">Imagens do Banner (Slideshow)</h3>
              </div>
              <label className="bg-secondary/10 text-secondary px-6 py-2 rounded-xl font-bold text-sm cursor-pointer hover:bg-secondary hover:text-white transition-all">
                + ADICIONAR FOTO
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
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {(content.hero_images ? JSON.parse(content.hero_images) : []).map((url, idx) => (
                <div key={idx} className="relative aspect-[4/5] rounded-2xl overflow-hidden group/img shadow-md">
                   <img src={url} className="w-full h-full object-cover" alt={`Hero ${idx}`} />
                   <button 
                    onClick={() => {
                      const imgs = JSON.parse(content.hero_images);
                      imgs.splice(idx, 1);
                      handleChange('hero_images', JSON.stringify(imgs));
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg opacity-0 group-hover/img:opacity-100 transition-all shadow-lg"
                   >
                     <Trash2 size={16} />
                   </button>
                </div>
              ))}
              {(!content.hero_images || JSON.parse(content.hero_images).length === 0) && (
                <div className="col-span-full py-10 text-center border-2 border-dashed border-gray-100 rounded-3xl text-gray-300 font-medium italic">
                  Nenhuma imagem personalizada. Usando imagens padrão do código.
                </div>
              )}
           </div>
           <p className="text-xs text-gray-400 italic font-medium">* Recomenda-se fotos verticais ou com foco central para melhor visualização em dispositivos móveis e desktop.</p>
        </div>

        {/* Informações de Contato / Footer */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm space-y-10 group hover:shadow-xl transition-all duration-500">
           <div className="flex items-center gap-4 text-secondary">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                 <FileText size={24} />
              </div>
              <h3 className="text-xl font-display font-bold text-primary uppercase tracking-wider">Informações da Clínica</h3>
           </div>
           
           <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-1">Nome da Clínica</label>
                <input
                  className="w-full px-8 py-5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all text-primary font-bold"
                  value={content.clinic_name || 'Peixoto Odontologia'}
                  onChange={(e) => handleChange('clinic_name', e.target.value)}
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-1">Registro EPAO</label>
                <input
                  className="w-full px-8 py-5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all text-primary font-bold"
                  value={content.clinic_registration || 'CRO/GO - EPAO: 18394'}
                  onChange={(e) => handleChange('clinic_registration', e.target.value)}
                />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ManageContent;
