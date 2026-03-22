import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminLogin from './pages/Admin/Login';
import ManageProfessionals from './pages/Admin/ManageProfessionals';
import ManageContent from './pages/Admin/ManageContent';
import ManageTreatments from './pages/Admin/ManageTreatments';

function App() {
  return (
    <Router>
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
