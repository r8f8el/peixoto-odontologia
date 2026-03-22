import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
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
    <div className="min-h-screen flex items-center justify-center bg-primary relative overflow-hidden font-body">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px]" />
      <div className="absolute inset-0 marble-bg opacity-5 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-md w-full mx-4 z-10"
      >
        <div className="glass-card bg-white/10 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl space-y-10 relative">
          <div className="text-center space-y-4">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mx-auto h-20 w-20 bg-gradient-to-tr from-secondary/30 to-secondary/10 flex items-center justify-center rounded-3xl text-secondary shadow-lg shadow-secondary/20"
            >
              <Lock size={32} strokeWidth={1.5} />
            </motion.div>
            
            <div className="space-y-1">
              <h2 className="text-3xl font-display font-bold text-white tracking-tight uppercase italic">Acesso Restrito</h2>
              <p className="text-white/40 text-xs font-bold tracking-[0.2em] uppercase">Gestão Peixoto Odontologia</p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3 text-red-200 text-sm font-medium"
                >
                  <AlertCircle size={18} className="shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-5">
              <div className="group space-y-2">
                <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">E-mail de Acesso</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-white/20 group-focus-within:text-secondary transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    className="block w-full pl-14 pr-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all outline-none text-white font-medium placeholder:text-white/10"
                    placeholder="admin@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="group space-y-2">
                <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Senha de Segurança</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-white/20 group-focus-within:text-secondary transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    required
                    className="block w-full pl-14 pr-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all outline-none text-white font-medium placeholder:text-white/10"
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
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex justify-center py-5 px-4 rounded-2xl text-xs font-black tracking-[0.3em] uppercase text-primary bg-secondary hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-secondary/10 flex items-center gap-3"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  AUTENTICANDO...
                </div>
              ) : (
                <>
                  ENTRAR NO PAINEL <ArrowRight size={16} />
                </>
              )}
            </motion.button>
          </form>
          
          <div className="text-center pt-4">
            <p className="text-[10px] text-white/20 font-bold tracking-widest uppercase flex items-center justify-center gap-2">
               <Sparkles size={12} className="text-secondary" /> Cuidado de Mestres e Doutores
            </p>
          </div>
        </div>
        
        <p className="mt-8 text-center text-white/20 text-[10px] font-medium tracking-tight">
          © {new Date().getFullYear()} Peixoto Odontologia. Todos os direitos reservados.
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
