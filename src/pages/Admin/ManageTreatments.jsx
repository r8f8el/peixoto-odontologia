import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Edit2, Save, X, RefreshCw, Layers, Sliders, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

const availableIcons = [
  'Sparkles', 'Smile', 'Microchip', 'Snowflake', 'ShieldCheck', 'Award', 
  'HeartPulse', 'Stethoscope', 'Activity', 'Baby', 'Bot', 'Microscope'
];

const ManageTreatments = () => {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTreatment, setCurrentTreatment] = useState(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchTreatments();
  }, []);

  const fetchTreatments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('treatments')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) console.error('Error fetching:', error);
    else setTreatments(data || []);
    setLoading(false);
  };

  const handleEdit = (treat) => {
    setCurrentTreatment(treat);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentTreatment({ title: '', description: '', icon_name: 'Sparkles', order_index: treatments.length });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este tratamento?')) {
      const { error } = await supabase.from('treatments').delete().eq('id', id);
      if (error) alert('Erro ao excluir');
      else fetchTreatments();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    if (currentTreatment.id) {
      const { error } = await supabase
        .from('treatments')
        .update(currentTreatment)
        .eq('id', currentTreatment.id);
      if (error) alert('Erro ao atualizar');
    } else {
      const { error } = await supabase.from('treatments').insert([currentTreatment]);
      if (error) alert('Erro ao salvar');
    }

    setSaving(false);
    setIsEditing(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    fetchTreatments();
  };

  const IconPicker = ({ selected, onSelect }) => (
    <div className="grid grid-cols-6 gap-2 p-4 bg-gray-50 rounded-2xl border border-gray-100">
      {availableIcons.map(iconName => {
        const Icon = LucideIcons[iconName];
        return (
          <button
            key={iconName}
            type="button"
            onClick={() => onSelect(iconName)}
            className={`p-3 rounded-xl transition-all ${
              selected === iconName 
                ? 'bg-secondary text-white shadow-lg' 
                : 'bg-white text-gray-400 hover:text-primary hover:bg-gray-100'
            }`}
          >
            {Icon && <Icon size={20} />}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
        <div>
          <h2 className="text-3xl font-display font-bold text-primary italic">Tratamentos & Serviços</h2>
          <p className="text-gray-500">Gerencie o catálogo de soluções oferecidas pela clínica</p>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-secondary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary transition-all shadow-lg active:scale-95"
        >
          <Plus size={20} /> NOVO TRATAMENTO
        </button>
      </div>

      {success && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border-2 border-green-200 p-6 rounded-2xl flex items-center gap-4 text-green-700 font-bold"
        >
          <CheckCircle size={24} className="text-green-500" />
          Alterações salvas com sucesso!
        </motion.div>
      )}

      {loading && !isEditing ? (
        <div className="py-20 text-center text-gray-400 font-medium flex flex-col items-center gap-4">
           <RefreshCw size={32} className="animate-spin text-secondary" />
           Carregando catálogo...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((treat, idx) => {
            const IconComp = LucideIcons[treat.icon_name] || LucideIcons.Sparkles;
            return (
              <motion.div
                layoutId={treat.id}
                key={treat.id}
                className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="w-14 h-14 bg-accent/30 rounded-2xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                    <IconComp size={28} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-primary italic">{treat.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">{treat.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-50">
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">ORDEM: {idx + 1}</span>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(treat)} className="p-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-secondary hover:text-white transition-all">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(treat.id)} className="p-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
          {treatments.length === 0 && (
            <div className="col-span-full py-20 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200 text-center space-y-4">
              <Layers size={48} className="mx-auto text-gray-300" />
              <p className="text-gray-400 font-medium italic text-lg">Nenhum tratamento cadastrado no banco de dados.</p>
              <button 
                onClick={handleAddNew}
                className="text-secondary font-bold underline underline-offset-4"
              >
                Clique aqui para começar
              </button>
            </div>
          )}
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
              className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10 space-y-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-primary">
                      {currentTreatment?.id ? 'Editar Tratamento' : 'Novo Tratamento'}
                    </h3>
                    <p className="text-gray-500">Configure os detalhes do serviço exibido no site</p>
                  </div>
                  <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-all">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Título do Tratamento</label>
                      <input
                        required
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all text-primary font-medium"
                        placeholder="Ex: Lentes de Contato"
                        value={currentTreatment.title}
                        onChange={(e) => setCurrentTreatment({...currentTreatment, title: e.target.value})}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Escolha um Ícone</label>
                      <IconPicker 
                        selected={currentTreatment.icon_name} 
                        onSelect={(name) => setCurrentTreatment({...currentTreatment, icon_name: name})} 
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Descrição</label>
                      <textarea
                        required
                        rows="4"
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all text-primary font-medium resize-none"
                        placeholder="Descreva o tratamento..."
                        value={currentTreatment.description}
                        onChange={(e) => setCurrentTreatment({...currentTreatment, description: e.target.value})}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 flex items-center gap-2">
                         <Sliders size={14} /> Posicionamento (Ordem)
                      </label>
                      <input
                        type="number"
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all text-primary font-medium"
                        value={currentTreatment.order_index}
                        onChange={(e) => setCurrentTreatment({...currentTreatment, order_index: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button 
                      type="submit" 
                      disabled={saving}
                      className="flex-1 bg-primary text-secondary px-8 py-4 rounded-2xl font-bold tracking-widest hover:bg-secondary hover:text-white transition-all shadow-xl active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {saving ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />} 
                      {saving ? 'SALVANDO...' : 'SALVAR NO CATÁLOGO'}
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setIsEditing(false)}
                      className="px-8 py-4 rounded-2xl font-bold tracking-widest text-gray-400 hover:bg-gray-50 transition-all"
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

export default ManageTreatments;
