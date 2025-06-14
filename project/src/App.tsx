import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import HealthCardViewer from './components/HealthCardViewer';

interface User {
  email: string;
  role: 'patient' | 'doctor';
  name: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'app' | 'viewer'>('app');

  useEffect(() => {
    // Check if this is a QR code view
    const urlParams = new URLSearchParams(window.location.search);
    const qrData = urlParams.get('data');
    const mode = urlParams.get('mode');
    
    if (qrData && mode) {
      setViewMode('viewer');
      setLoading(false);
      return;
    }

    // Check if user is already logged in
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 animate-pulse">Loading HealthCard...</p>
        </div>
      </div>
    );
  }

  // QR Code viewer mode
  if (viewMode === 'viewer') {
    return <HealthCardViewer />;
  }

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {user.role === 'patient' ? (
        <PatientDashboard user={user} onLogout={handleLogout} />
      ) : (
        <DoctorDashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;