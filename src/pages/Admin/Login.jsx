import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message === 'Invalid login credentials' ? 'E-mail ou senha incorretos.' : error.message);
    } else {
      navigate('/admin');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden font-body">
      {/* Subtle Background marble Texture */}
      <div className="absolute inset-0 marble-bg opacity-[0.03] pointer-events-none" />
      
      {/* Decorative side element */}
      <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-soft-blue/30 hidden lg:block -skew-x-6 -translate-x-20" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full mx-4 z-10"
      >
        {/* Main Card */}
        <div className="bg-white p-12 rounded-[3rem] shadow-lux border border-gray-100 space-y-10">
          <div className="text-center space-y-6">
            <div className="mx-auto h-16 w-16 bg-soft-blue flex items-center justify-center rounded-2xl text-secondary">
              <ShieldCheck size={32} />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-4xl font-display font-bold text-primary tracking-tight">Portal Administrativo</h2>
              <p className="text-gray-400 text-xs font-bold tracking-[0.2em] uppercase">Peixoto Odontologia</p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-medium"
                >
                  <AlertCircle size={18} className="shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Usuário / E-mail</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-300">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    className="block w-full pl-14 pr-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all outline-none text-primary font-medium placeholder:text-gray-300"
                    placeholder="exemplo@clinica.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Senha de Acesso</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-300">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    required
                    className="block w-full pl-14 pr-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all outline-none text-primary font-medium placeholder:text-gray-300"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full flex justify-center py-5 px-4 rounded-2xl text-sm font-bold tracking-widest uppercase text-white bg-secondary hover:bg-primary transition-all duration-300 disabled:opacity-50 shadow-lg shadow-secondary/20 flex items-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  ACESSO SEGURO <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>
          
          <div className="pt-6 border-t border-gray-50 text-center">
             <button type="button" className="text-[10px] font-bold text-gray-300 hover:text-secondary transition-colors tracking-widest uppercase">
               Esqueceu sua senha? Entre em contato com o suporte
             </button>
          </div>
        </div>

        {/* Branding Footer */}
        <div className="mt-8 text-center space-y-4">
           <p className="text-gray-300 text-[10px] font-bold tracking-tighter flex items-center justify-center gap-2">
              PLATAFORMA DE GESTÃO DE CONTEÚDO v2.0
           </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
