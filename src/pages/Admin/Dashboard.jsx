import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut, FileText, ChevronRight, Activity } from 'lucide-react';

const AdminDashboard = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) navigate('/admin/login');
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) navigate('/admin/login');
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
    </div>
  );

  if (!session) return null;

  return (
    <div className="min-h-screen flex bg-gray-50 font-body">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col fixed h-full z-20 transition-all duration-300">
        <div className="p-8 border-b border-white/10">
          <h1 className="text-xl font-display font-bold tracking-wider text-secondary">ADMIN PANEL</h1>
          <p className="text-xs text-white/50 mt-1 uppercase tracking-tighter">Peixoto Odontologia</p>
        </div>

        <nav className="flex-1 p-4 mt-4 space-y-2">
          <Link
            to="/admin"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              location.pathname === '/admin' ? 'bg-secondary text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <LayoutDashboard size={20} />
            <span className="font-medium">Conteúdo Geral</span>
          </Link>

          <Link
            to="/admin/professionals"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              location.pathname === '/admin/professionals' ? 'bg-secondary text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Users size={20} />
            <span className="font-medium">Profissionais</span>
          </Link>

          <Link
            to="/admin/treatments"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              location.pathname === '/admin/treatments' ? 'bg-secondary text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Activity size={20} />
            <span className="font-medium">Tratamentos</span>
          </Link>

          <Link
             to="/"
             target="_blank"
             className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 hover:text-white transition-all border-t border-white/5 pt-6 mt-6"
          >
            <FileText size={20} />
            <span className="font-medium">Ver Site</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-white/70 hover:text-white hover:bg-red-500/20 rounded-xl transition-all group"
          >
            <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-10 min-h-screen overflow-y-auto w-full">
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
           {/* Breadcrumbs */}
           <div className="flex items-center gap-2 text-sm text-gray-500">
             <span>Admin</span>
             <ChevronRight size={14} />
              <span className="text-primary font-medium">
                {location.pathname === '/admin' ? 'Conteúdo Geral' : 
                 location.pathname === '/admin/professionals' ? 'Profissionais' : 'Tratamentos'}
              </span>
           </div>
           
           <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
