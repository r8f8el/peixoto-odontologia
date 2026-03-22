import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { uploadImage } from '../../lib/storage';
import { Plus, Trash2, Edit2, Save, X, Camera, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ManageProfessionals = () => {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProfessional, setCurrentProfessional] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const fetchProfessionals = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('professionals')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) console.error('Error fetching:', error);
    else setProfessionals(data);
    setLoading(false);
  };

  const handleEdit = (prof) => {
    setCurrentProfessional(prof);
    setPreview(prof.image_url);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentProfessional({ name: '', specialty: '', registration: '', image_url: '', status: 'Ativo' });
    setPreview(null);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este profissional?')) {
      const { error } = await supabase.from('professionals').delete().eq('id', id);
      if (error) alert('Erro ao excluir');
      else fetchProfessionals();
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      try {
        const publicUrl = await uploadImage(file);
        setPreview(publicUrl);
        setCurrentProfessional({ ...currentProfessional, image_url: publicUrl });
      } catch (err) {
        alert('Erro no upload: ' + err.message);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (currentProfessional.id) {
      const { error } = await supabase
        .from('professionals')
        .update(currentProfessional)
        .eq('id', currentProfessional.id);
      if (error) alert('Erro ao atualizar');
    } else {
      const { error } = await supabase.from('professionals').insert([currentProfessional]);
      if (error) alert('Erro ao salvar');
    }

    setIsEditing(false);
    fetchProfessionals();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-display font-bold text-primary italic">Equipe & Profissionais</h2>
          <p className="text-gray-500">Gerencie a rotação de dentistas e colaboradores</p>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-secondary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary transition-all shadow-lg active:scale-95"
        >
          <Plus size={20} /> ADICIONAR NOVO
        </button>
      </div>

      {loading && !isEditing ? (
        <div className="py-20 text-center text-gray-400 font-medium flex flex-col items-center gap-4">
           <RefreshCw size={32} className="animate-spin text-secondary" />
           Carregando dados da equipe...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {professionals.map((prof) => (
            <motion.div
              layoutId={prof.id}
              key={prof.id}
              className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="aspect-[4/5] relative bg-gray-100">
                {prof.image_url ? (
                  <img src={prof.image_url} alt={prof.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">Sem foto</div>
                )}
                <div className="absolute top-4 right-4 flex gap-1 items-center bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest text-primary shadow-sm">
                   <div className={`w-2 h-2 rounded-full ${prof.status === 'Ativo' ? 'bg-green-500' : 'bg-gray-400'}`} />
                   {prof.status.toUpperCase()}
                </div>
              </div>

              <div className="p-8 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-primary leading-tight line-clamp-1">{prof.name}</h3>
                  <p className="text-secondary font-medium text-sm">{prof.specialty}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <span className="text-xs text-gray-400 font-mono">{prof.registration}</span>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(prof)} className="p-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-secondary hover:text-white transition-all">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(prof.id)} className="p-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm overflow-y-auto pt-20 pb-10">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden shadow-secondary/20 border border-white/20"
            >
              <div className="p-10 space-y-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-primary">
                      {currentProfessional?.id ? 'Editar Profissional' : 'Novo Profissional'}
                    </h3>
                    <p className="text-gray-500">Preencha as informações para o site</p>
                  </div>
                  <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-all">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Photo Upload Area */}
                  <div className="flex flex-col items-center gap-4 py-4">
                    <div className="w-40 h-52 bg-gray-100 rounded-3xl overflow-hidden relative group border-2 border-dashed border-gray-200">
                      {preview ? (
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                          <Camera size={32} />
                          <span className="text-[10px] mt-2 font-bold uppercase tracking-tight">SEM FOTO</span>
                        </div>
                      )}
                      
                      <label className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white cursor-pointer transition-all duration-300 backdrop-blur-sm">
                        <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
                        <div className="flex flex-col items-center gap-1">
                           <Plus size={24} />
                           <span className="text-[10px] font-bold uppercase tracking-widest">{uploading ? 'ENVIANDO...' : 'TROCAR FOTO'}</span>
                        </div>
                      </label>
                    </div>
                    {uploading && <p className="text-xs text-secondary animate-pulse font-bold tracking-widest">ENVIANDO PARA O SERVIDOR...</p>}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Nome Completo</label>
                      <input
                        required
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all text-primary font-medium"
                        placeholder="Dr. Nome Exemplo"
                        value={currentProfessional.name}
                        onChange={(e) => setCurrentProfessional({...currentProfessional, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">CRO / Registro</label>
                      <input
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all text-primary font-medium"
                        placeholder="CRO/GO 00.000"
                        value={currentProfessional.registration}
                        onChange={(e) => setCurrentProfessional({...currentProfessional, registration: e.target.value})}
                      />
                    </div>
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Especialidade / Títulos</label>
                      <input
                        required
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all text-primary font-medium"
                        placeholder="Ex: Especialista em Implantodontia"
                        value={currentProfessional.specialty}
                        onChange={(e) => setCurrentProfessional({...currentProfessional, specialty: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Status</label>
                      <select
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all text-primary font-medium"
                        value={currentProfessional.status}
                        onChange={(e) => setCurrentProfessional({...currentProfessional, status: e.target.value})}
                      >
                        <option value="Ativo">Ativo</option>
                        <option value="Inativo">Inativo</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button 
                      type="submit" 
                      disabled={loading || uploading}
                      className="flex-1 bg-primary text-secondary px-8 py-4 rounded-2xl font-bold tracking-widest hover:bg-secondary hover:text-white transition-all shadow-xl active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <Save size={18} /> SALVAR ALTERAÇÕES
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setIsEditing(false)}
                      className="px-8 py-4 rounded-2xl font-bold tracking-widest text-gray-400 hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
                    >
                      CANCELAR
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageProfessionals;
