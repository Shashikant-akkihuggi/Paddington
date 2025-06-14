import React, { useState, useEffect } from 'react';
import { LogOut, User, Heart, FileText, QrCode, Download, Plus, Calendar, Pill, AlertTriangle, Phone, MapPin, Activity, TrendingUp, Shield, Clock, Users } from 'lucide-react';
import HealthCard from './HealthCard';
import MedicalHistory from './MedicalHistory';
import QRGenerator from './QRGenerator';

interface User {
  email: string;
  role: 'patient' | 'doctor';
  name: string;
}

interface PatientData {
  personalInfo: {
    name: string;
    dateOfBirth: string;
    bloodGroup: string;
    gender: string;
    phone: string;
    address: string;
  };
  medicalInfo: {
    allergies: string[];
    conditions: string[];
    medications: { name: string; dosage: string; date: string }[];
    emergencyContact: {
      name: string;
      phone: string;
      relation: string;
    };
  };
  visits: { doctor: string; date: string; notes: string }[];
  tests: { name: string; date: string; file?: string }[];
}

const PatientDashboard: React.FC<{ user: User; onLogout: () => void }> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [patientData, setPatientData] = useState<PatientData>({
    personalInfo: {
      name: user.name,
      dateOfBirth: '',
      bloodGroup: '',
      gender: '',
      phone: '',
      address: ''
    },
    medicalInfo: {
      allergies: [],
      conditions: [],
      medications: [],
      emergencyContact: {
        name: '',
        phone: '',
        relation: ''
      }
    },
    visits: [],
    tests: []
  });

  useEffect(() => {
    // Load patient data from localStorage using email as key
    const savedData = localStorage.getItem(`patient_${user.email}`);
    if (savedData) {
      setPatientData(JSON.parse(savedData));
    }
  }, [user.email]);

  const savePatientData = (newData: PatientData) => {
    setPatientData(newData);
    localStorage.setItem(`patient_${user.email}`, JSON.stringify(newData));
  };

  const callEmergency = (service: string) => {
    const emergencyNumbers = {
      ambulance: '911',
      police: '911',
      fire: '911',
      poison: '1-800-222-1222'
    };
    
    // In a real app, this would integrate with actual emergency services
    alert(`Calling ${service}: ${emergencyNumbers[service as keyof typeof emergencyNumbers]}`);
    setShowEmergencyModal(false);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Heart },
    { id: 'health-card', label: 'Health Card', icon: User },
    { id: 'history', label: 'Medical History', icon: FileText },
    { id: 'qr-code', label: 'QR Code', icon: QrCode }
  ];

  const healthMetrics = [
    { label: 'Health Score', value: '85%', color: 'text-green-600', bgColor: 'bg-green-50', icon: Activity },
    { label: 'Last Checkup', value: patientData.visits.length > 0 ? new Date(patientData.visits[patientData.visits.length - 1].date).toLocaleDateString() : 'None', color: 'text-blue-600', bgColor: 'bg-blue-50', icon: Calendar },
    { label: 'Active Medications', value: patientData.medicalInfo.medications.length.toString(), color: 'text-purple-600', bgColor: 'bg-purple-50', icon: Pill },
    { label: 'Risk Level', value: patientData.medicalInfo.allergies.length > 2 ? 'Medium' : 'Low', color: patientData.medicalInfo.allergies.length > 2 ? 'text-orange-600' : 'text-green-600', bgColor: patientData.medicalInfo.allergies.length > 2 ? 'bg-orange-50' : 'bg-green-50', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Medical Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-green-500 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-purple-500 rounded-full animate-ping"></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-pink-500 rounded-full animate-pulse"></div>
      </div>

      {/* Medical Pattern Overlay */}
      <div className="absolute inset-0 opacity-3">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="medical-cross" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="8" y="2" width="4" height="16" fill="#3b82f6" opacity="0.1"/>
              <rect x="2" y="8" width="16" height="4" fill="#3b82f6" opacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#medical-cross)"/>
        </svg>
      </div>

      {/* Emergency Button - Fixed Position */}
      <button
        onClick={() => setShowEmergencyModal(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-full shadow-2xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-110 animate-pulse"
      >
        <Phone className="w-6 h-6" />
      </button>

      {/* Emergency Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 transform animate-scale-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Emergency Services</h3>
              <p className="text-gray-600">Select the emergency service you need</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => callEmergency('ambulance')}
                className="p-4 bg-red-50 hover:bg-red-100 rounded-xl border-2 border-red-200 hover:border-red-300 transition-all duration-300 transform hover:scale-105"
              >
                <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <div className="font-semibold text-red-700">Ambulance</div>
                <div className="text-sm text-red-600">Medical Emergency</div>
              </button>

              <button
                onClick={() => callEmergency('police')}
                className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 transform hover:scale-105"
              >
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold text-blue-700">Police</div>
                <div className="text-sm text-blue-600">Security Emergency</div>
              </button>

              <button
                onClick={() => callEmergency('fire')}
                className="p-4 bg-orange-50 hover:bg-orange-100 rounded-xl border-2 border-orange-200 hover:border-orange-300 transition-all duration-300 transform hover:scale-105"
              >
                <AlertTriangle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <div className="font-semibold text-orange-700">Fire Dept</div>
                <div className="text-sm text-orange-600">Fire Emergency</div>
              </button>

              <button
                onClick={() => callEmergency('poison')}
                className="p-4 bg-purple-50 hover:bg-purple-100 rounded-xl border-2 border-purple-200 hover:border-purple-300 transition-all duration-300 transform hover:scale-105"
              >
                <Pill className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="font-semibold text-purple-700">Poison Control</div>
                <div className="text-sm text-purple-600">Poison Emergency</div>
              </button>
            </div>

            <button
              onClick={() => setShowEmergencyModal(false)}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-lg shadow-xl border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <Heart className="w-8 h-8 text-white animate-pulse" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  HealthCard Pro
                </h1>
                <p className="text-sm text-gray-600">Welcome back, <span className="font-semibold text-blue-600">{user.name}</span></p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700 font-medium">Health Status: Good</span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-2 mb-8 border border-white/20">
          <nav className="flex space-x-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:scale-102'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* 3D Health Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {healthMetrics.map((metric, index) => {
                  const Icon = metric.icon;
                  return (
                    <div
                      key={index}
                      className="group relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1 border border-white/20"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative">
                        <div className={`w-12 h-12 ${metric.bgColor} rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className={`w-6 h-6 ${metric.color}`} />
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                        <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 3D Medical Visualization */}
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                  <Activity className="w-7 h-7 text-blue-600" />
                  <span>Health Overview</span>
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* 3D Health Visualization */}
                  <div className="relative">
                    <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 flex items-center justify-center relative overflow-hidden">
                      {/* 3D Medical Icons */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-48 h-48">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
                          <div className="absolute inset-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-30 animate-ping"></div>
                          <div className="absolute inset-8 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-40 animate-bounce"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Heart className="w-16 h-16 text-red-500 animate-pulse" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Floating Medical Elements */}
                      <div className="absolute top-4 left-4 w-8 h-8 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                      <div className="absolute top-8 right-8 w-6 h-6 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                      <div className="absolute bottom-8 left-8 w-10 h-10 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
                      <div className="absolute bottom-4 right-4 w-7 h-7 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
                    </div>
                  </div>

                  {/* Health Summary */}
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 border-green-500">
                      <h4 className="font-semibold text-green-800 mb-2">Overall Health Status</h4>
                      <p className="text-green-700">Your health metrics are looking good! Keep up the great work with regular checkups and medication adherence.</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-blue-600" />
                          <span className="font-medium text-blue-800">Next Appointment</span>
                        </div>
                        <span className="text-blue-600">Schedule Now</span>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <Pill className="w-5 h-5 text-purple-600" />
                          <span className="font-medium text-purple-800">Medication Reminder</span>
                        </div>
                        <span className="text-purple-600">Set Alerts</span>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <TrendingUp className="w-5 h-5 text-orange-600" />
                          <span className="font-medium text-orange-800">Health Trends</span>
                        </div>
                        <span className="text-orange-600">View Report</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity with Medical Imagery */}
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
                <h3 className="text-xl font-semibold mb-6 flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <span>Recent Medical Activity</span>
                </h3>
                
                {patientData.visits.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-12 h-12 text-blue-500" />
                    </div>
                    <p className="text-gray-500 text-lg">No recent visits recorded</p>
                    <p className="text-gray-400">Start by adding your first medical visit</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {patientData.visits.slice(-3).map((visit, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:from-blue-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-102">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">Visit to Dr. {visit.doctor}</p>
                          <p className="text-sm text-gray-600">{new Date(visit.date).toLocaleDateString()}</p>
                          {visit.notes && <p className="text-sm text-gray-500 mt-1">{visit.notes}</p>}
                        </div>
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'health-card' && (
            <HealthCard patientData={patientData} onSave={savePatientData} />
          )}

          {activeTab === 'history' && (
            <MedicalHistory patientData={patientData} onSave={savePatientData} />
          )}

          {activeTab === 'qr-code' && (
            <QRGenerator patientData={patientData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;