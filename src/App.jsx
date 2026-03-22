import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminLogin from './pages/Admin/Login';
import ManageProfessionals from './pages/Admin/ManageProfessionals';
import ManageContent from './pages/Admin/ManageContent';
import ManageTreatments from './pages/Admin/ManageTreatments';
import { supabase } from './lib/supabase';

const ThemeSync = () => {
  useEffect(() => {
    const applyTheme = async () => {
      const { data } = await supabase.from('site_content').select('*');
      if (data) {
        const settings = {};
        data.forEach(item => settings[item.key] = item.value);

        if (settings.theme_primary) document.documentElement.style.setProperty('--color-primary', settings.theme_primary);
        if (settings.theme_secondary) document.documentElement.style.setProperty('--color-secondary', settings.theme_secondary);
        if (settings.font_heading) document.documentElement.style.setProperty('--font-display', `"${settings.font_heading}", serif`);
        if (settings.font_body) document.documentElement.style.setProperty('--font-body', `"${settings.font_body}", sans-serif`);
      }
    };

    applyTheme();
    
    // Listen for custom event from admin panel updates
    window.addEventListener('site-content-updated', applyTheme);
    return () => window.removeEventListener('site-content-updated', applyTheme);
  }, []);

  return null;
};

function App() {
  return (
    <Router>
      <ThemeSync />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<ManageContent />} />
          <Route path="professionals" element={<ManageProfessionals />} />
          <Route path="treatments" element={<ManageTreatments />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
