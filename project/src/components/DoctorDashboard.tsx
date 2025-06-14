import React, { useState } from 'react';
import { LogOut, Users, Calendar, FileText, Search, Stethoscope, Clock, UserPlus, Activity, Bell, Settings, BarChart3, MessageSquare, Phone, Heart, TrendingUp, Shield, Award } from 'lucide-react';

interface User {
  email: string;
  role: 'patient' | 'doctor';
  name: string;
}

const DoctorDashboard: React.FC<{ user: User; onLogout: () => void }> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  // Mock data for demonstration
  const patients = [
    { id: 1, name: 'John Doe', email: 'john@example.com', lastVisit: '2024-01-15', condition: 'Hypertension', status: 'stable', age: 45, phone: '+1-555-0123' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', lastVisit: '2024-01-12', condition: 'Diabetes', status: 'monitoring', age: 38, phone: '+1-555-0124' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', lastVisit: '2024-01-10', condition: 'Asthma', status: 'stable', age: 29, phone: '+1-555-0125' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', lastVisit: '2024-01-08', condition: 'Migraine', status: 'improving', age: 34, phone: '+1-555-0126' }
  ];

  const appointments = [
    { id: 1, patient: 'John Doe', time: '10:00 AM', date: '2024-01-20', type: 'Follow-up', status: 'confirmed' },
    { id: 2, patient: 'Jane Smith', time: '2:30 PM', date: '2024-01-20', type: 'Consultation', status: 'confirmed' },
    { id: 3, patient: 'Mike Johnson', time: '4:00 PM', date: '2024-01-21', type: 'Check-up', status: 'pending' },
    { id: 4, patient: 'Sarah Wilson', time: '11:30 AM', date: '2024-01-22', type: 'Treatment', status: 'confirmed' }
  ];

  const recentActivity = [
    { type: 'appointment', message: 'New appointment scheduled with John Doe', time: '2 hours ago' },
    { type: 'patient', message: 'Jane Smith updated medical history', time: '4 hours ago' },
    { type: 'prescription', message: 'Prescription sent to Mike Johnson', time: '6 hours ago' },
    { type: 'report', message: 'Lab results received for Sarah Wilson', time: '1 day ago' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'appointments', label: 'Schedule', icon: Calendar },
    { id: 'records', label: 'Medical Records', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'messages', label: 'Messages', icon: MessageSquare }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return 'bg-green-100 text-green-800';
      case 'monitoring': return 'bg-yellow-100 text-yellow-800';
      case 'improving': return 'bg-blue-100 text-blue-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAppointmentStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const callEmergency = () => {
    alert('Calling Emergency Services: 911');
    setShowEmergencyModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 relative overflow-hidden">
      {/* Animated Medical Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 bg-green-500 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/3 left-1/4 w-28 h-28 bg-purple-500 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-20 w-36 h-36 bg-teal-500 rounded-full animate-pulse"></div>
      </div>

      {/* Medical Pattern Overlay */}
      <div className="absolute inset-0 opacity-3">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="stethoscope-pattern" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
              <circle cx="12.5" cy="12.5" r="2" fill="#10b981" opacity="0.1"/>
              <path d="M8 12.5 L17 12.5 M12.5 8 L12.5 17" stroke="#10b981" strokeWidth="0.5" opacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stethoscope-pattern)"/>
        </svg>
      </div>

      {/* Emergency Button */}
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
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Emergency Call</h3>
              <p className="text-gray-600">Call emergency services immediately?</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={callEmergency}
                className="flex-1 bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition-colors duration-300 font-semibold"
              >
                Call 911
              </button>
              <button
                onClick={() => setShowEmergencyModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-lg shadow-xl border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                  <Stethoscope className="w-9 h-9 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  MedPro Dashboard
                </h1>
                <p className="text-sm text-gray-600">Dr. <span className="font-semibold text-green-600">{user.name}</span> • Medical Professional</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full">
                <Award className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700 font-medium">Certified Practitioner</span>
              </div>
              <button className="relative p-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-300 transform hover:scale-110">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <button className="p-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-300 transform hover:scale-110">
                <Settings className="w-5 h-5" />
              </button>
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
                      ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:scale-102'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* 3D Dashboard Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="group bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:rotate-1 border border-white/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Patients</p>
                      <p className="text-3xl font-bold text-blue-600">{patients.length}</p>
                      <p className="text-xs text-green-600 mt-1 flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        ↑ 12% from last month
                      </p>
                    </div>
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="group bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1 border border-white/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Today's Appointments</p>
                      <p className="text-3xl font-bold text-green-600">{appointments.filter(apt => apt.date === '2024-01-20').length}</p>
                      <p className="text-xs text-green-600 mt-1">2 confirmed, 0 pending</p>
                    </div>
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                      <Calendar className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="group bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:rotate-1 border border-white/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">This Week</p>
                      <p className="text-3xl font-bold text-purple-600">18</p>
                      <p className="text-xs text-gray-600 mt-1">Appointments scheduled</p>
                    </div>
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                      <Clock className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>
                </div>

                <div className="group bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1 border border-white/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-red-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Cases</p>
                      <p className="text-3xl font-bold text-orange-600">7</p>
                      <p className="text-xs text-orange-600 mt-1">Requiring follow-up</p>
                    </div>
                    <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                      <Activity className="w-8 h-8 text-orange-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3D Medical Visualization Dashboard */}
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                  <Heart className="w-7 h-7 text-red-500 animate-pulse" />
                  <span>Practice Overview</span>
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* 3D Medical Visualization */}
                  <div className="relative">
                    <div className="aspect-square bg-gradient-to-br from-green-100 via-teal-100 to-blue-100 rounded-2xl p-8 flex items-center justify-center relative overflow-hidden">
                      {/* 3D Medical Hub */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-56 h-56">
                          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-600 rounded-full opacity-20 animate-pulse"></div>
                          <div className="absolute inset-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-30 animate-ping"></div>
                          <div className="absolute inset-12 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-40 animate-bounce"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Stethoscope className="w-20 h-20 text-green-600 animate-pulse" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Floating Medical Icons */}
                      <div className="absolute top-6 left-6 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '0s' }}>
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div className="absolute top-12 right-12 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '0.5s' }}>
                        <Calendar className="w-4 h-4 text-white" />
                      </div>
                      <div className="absolute bottom-12 left-12 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '1s' }}>
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute bottom-6 right-6 w-9 h-9 bg-pink-500 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '1.5s' }}>
                        <Activity className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Practice Statistics */}
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-800 mb-2 flex items-center space-x-2">
                        <Shield className="w-5 h-5" />
                        <span>Practice Performance</span>
                      </h4>
                      <p className="text-blue-700">Your practice is performing excellently with high patient satisfaction and efficient scheduling.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">98%</div>
                        <div className="text-sm text-green-700">Patient Satisfaction</div>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">24</div>
                        <div className="text-sm text-blue-700">Avg Weekly Patients</div>
                      </div>
                      <div className="bg-purple-50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">4.9</div>
                        <div className="text-sm text-purple-700">Average Rating</div>
                      </div>
                      <div className="bg-orange-50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-orange-600">156</div>
                        <div className="text-sm text-orange-700">Total Consultations</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity & Upcoming Appointments */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
                  <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-green-600" />
                    <span>Recent Activity</span>
                  </h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-gradient-to-r from-gray-50 to-green-50 rounded-lg hover:from-green-50 hover:to-emerald-50 transition-all duration-300 transform hover:scale-102">
                        <div className="w-3 h-3 bg-green-500 rounded-full mt-2 animate-pulse"></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.message}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Today's Schedule */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
                  <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span>Today's Schedule</span>
                  </h3>
                  <div className="space-y-4">
                    {appointments.filter(apt => apt.date === '2024-01-20').map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-102">
                        <div className="flex items-center space-x-4">
                          <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                          <div>
                            <p className="font-medium text-gray-900">{appointment.patient}</p>
                            <p className="text-sm text-gray-600">{appointment.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-blue-600">{appointment.time}</p>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getAppointmentStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs remain the same but with enhanced styling */}
          {activeTab === 'patients' && (
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                  <div>
                    <h2 className="text-xl font-semibold">Patient Management</h2>
                    <p className="text-gray-600 text-sm">Manage and monitor your patients</p>
                  </div>
                  <div className="flex space-x-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search patients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105">
                      <UserPlus className="w-4 h-4" />
                      <span>Add Patient</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPatients.map((patient) => (
                      <tr key={patient.id} className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-green-50 transition-all duration-300 transform hover:scale-102">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-medium">{patient.name.charAt(0)}</span>
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{patient.name}</div>
                              <div className="text-sm text-gray-500">Age: {patient.age}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{patient.email}</div>
                          <div className="text-sm text-gray-500">{patient.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                          {new Date(patient.lastVisit).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {patient.condition}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(patient.status)}`}>
                            {patient.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button className="text-green-600 hover:text-green-900 transition-colors duration-200">
                            View
                          </button>
                          <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">
                            Edit
                          </button>
                          <button className="text-purple-600 hover:text-purple-900 transition-colors duration-200">
                            Schedule
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Continue with other tabs with similar enhanced styling... */}
          {activeTab === 'appointments' && (
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Appointment Schedule</h2>
                  <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105">
                    <Calendar className="w-4 h-4" />
                    <span>New Appointment</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <h3 className="text-lg font-medium mb-4">Today's Schedule</h3>
                    <div className="space-y-4">
                      {appointments.map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-green-50 rounded-lg hover:from-green-50 hover:to-emerald-50 transition-all duration-300 transform hover:scale-102">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                              <Clock className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{appointment.patient}</p>
                              <p className="text-sm text-gray-600">{appointment.type}</p>
                              <p className="text-xs text-gray-500">{new Date(appointment.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-green-600">{appointment.time}</p>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getAppointmentStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200">
                        <div className="font-medium text-blue-900">Schedule Follow-up</div>
                        <div className="text-sm text-blue-600">Book next appointment</div>
                      </button>
                      <button className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200">
                        <div className="font-medium text-green-900">Emergency Slot</div>
                        <div className="text-sm text-green-600">Add urgent appointment</div>
                      </button>
                      <button className="w-full p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200">
                        <div className="font-medium text-purple-900">Reschedule</div>
                        <div className="text-sm text-purple-600">Modify existing appointment</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'records' && (
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold mb-4">Medical Records Management</h2>
              <p className="text-gray-600 mb-6">Access and manage patient medical records, prescriptions, and treatment histories.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 cursor-pointer transform hover:scale-105">
                  <FileText className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-medium text-blue-900">Patient Records</h3>
                  <p className="text-sm text-blue-600">View complete medical histories</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 cursor-pointer transform hover:scale-105">
                  <Activity className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-medium text-green-900">Lab Results</h3>
                  <p className="text-sm text-green-600">Access test results and reports</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg hover:from-pink-50 hover:to-red-50 transition-all duration-300 cursor-pointer transform hover:scale-105">
                  <Users className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-medium text-purple-900">Prescriptions</h3>
                  <p className="text-sm text-purple-600">Manage medications and dosages</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
                <h2 className="text-xl font-semibold mb-6">Practice Analytics</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="text-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white transform hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl font-bold">156</div>
                    <div className="text-blue-100">Total Consultations</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white transform hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl font-bold">92%</div>
                    <div className="text-green-100">Patient Satisfaction</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg text-white transform hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl font-bold">24</div>
                    <div className="text-purple-100">Avg. Weekly Patients</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-white transform hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl font-bold">4.8</div>
                    <div className="text-orange-100">Average Rating</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-8 text-center">
                  <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Detailed Analytics Coming Soon</h3>
                  <p className="text-gray-600">Advanced charts and insights will be available in the next update.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold mb-6">Messages & Communication</h2>
              
              <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-lg p-8 text-center">
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Secure Messaging System</h3>
                <p className="text-gray-600 mb-4">Communicate securely with patients and colleagues.</p>
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 transform hover:scale-105">
                  Enable Messaging
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;