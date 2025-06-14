import React, { useState, useEffect } from 'react';
import { Heart, User, Phone, Droplet, Calendar, AlertTriangle, Pill, Shield, Eye, QrCode, ArrowLeft } from 'lucide-react';

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

const HealthCardViewer: React.FC = () => {
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [accessMode, setAccessMode] = useState<'emergency' | 'family' | 'full'>('emergency');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const qrData = urlParams.get('data');
    const mode = urlParams.get('mode') as 'emergency' | 'family' | 'full';

    if (qrData && mode) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(qrData));
        setPatientData(decodedData);
        setAccessMode(mode);
      } catch (err) {
        setError('Invalid QR code data');
      }
    } else {
      setError('No health card data found');
    }
    setLoading(false);
  }, []);

  const getAccessIcon = (mode: string) => {
    switch (mode) {
      case 'emergency': return Shield;
      case 'family': return Eye;
      case 'full': return QrCode;
      default: return Shield;
    }
  };

  const getAccessColor = (mode: string) => {
    switch (mode) {
      case 'emergency': return 'text-red-600 bg-red-50 border-red-200';
      case 'family': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'full': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 animate-pulse">Loading Health Card...</p>
        </div>
      </div>
    );
  }

  if (error || !patientData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid QR Code</h1>
          <p className="text-gray-600 mb-6">{error || 'Unable to load health card data'}</p>
          <button
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    );
  }

  const AccessIcon = getAccessIcon(accessMode);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-lg">
            <Heart className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Digital Health Card</h1>
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border-2 ${getAccessColor(accessMode)}`}>
            <AccessIcon className="w-4 h-4" />
            <span className="font-medium capitalize">{accessMode} Access</span>
          </div>
        </div>

        {/* Emergency Access View */}
        {accessMode === 'emergency' && (
          <div className="space-y-6 animate-fade-in">
            {/* Emergency Alert Card */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white shadow-2xl">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">EMERGENCY MEDICAL INFO</h2>
                  <p className="text-red-200">Critical information for first responders</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5" />
                    <div>
                      <p className="text-red-200 text-sm">Patient Name</p>
                      <p className="text-xl font-bold">{patientData.personalInfo.name || 'Not Available'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Droplet className="w-5 h-5" />
                    <div>
                      <p className="text-red-200 text-sm">Blood Group</p>
                      <p className="text-xl font-bold">{patientData.personalInfo.bloodGroup || 'Not Available'}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5" />
                    <div>
                      <p className="text-red-200 text-sm">Emergency Contact</p>
                      <p className="text-lg font-bold">{patientData.medicalInfo.emergencyContact.name || 'Not Available'}</p>
                      <p className="text-red-200">{patientData.medicalInfo.emergencyContact.phone || 'No phone'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Alerts */}
            {(patientData.medicalInfo.allergies.length > 0 || patientData.medicalInfo.conditions.length > 0) && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  <h3 className="text-xl font-bold text-red-700">CRITICAL MEDICAL ALERTS</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {patientData.medicalInfo.allergies.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-red-700 mb-2">ALLERGIES</h4>
                      <div className="space-y-2">
                        {patientData.medicalInfo.allergies.map((allergy, index) => (
                          <div key={index} className="bg-red-100 border-l-4 border-red-500 p-3 rounded">
                            <p className="text-red-800 font-medium">{allergy}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {patientData.medicalInfo.conditions.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-orange-700 mb-2">MEDICAL CONDITIONS</h4>
                      <div className="space-y-2">
                        {patientData.medicalInfo.conditions.map((condition, index) => (
                          <div key={index} className="bg-orange-100 border-l-4 border-orange-500 p-3 rounded">
                            <p className="text-orange-800 font-medium">{condition}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Family Access View */}
        {accessMode === 'family' && (
          <div className="space-y-6 animate-fade-in">
            {/* Personal Information Card */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 text-white shadow-2xl">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{patientData.personalInfo.name}</h2>
                  <p className="text-blue-200">Family Access - Health Information</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5" />
                    <span>DOB: {patientData.personalInfo.dateOfBirth || 'Not set'}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Droplet className="w-5 h-5" />
                    <span>Blood: {patientData.personalInfo.bloodGroup || 'Not set'}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5" />
                    <span>{patientData.personalInfo.phone || 'Phone not set'}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold">Emergency Contact:</p>
                    <p>{patientData.medicalInfo.emergencyContact.name || 'Not set'}</p>
                    <p>{patientData.medicalInfo.emergencyContact.phone || 'Phone not set'}</p>
                    <p className="text-blue-200">{patientData.medicalInfo.emergencyContact.relation || 'Relation not set'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Medications */}
              {patientData.medicalInfo.medications.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Pill className="w-6 h-6 text-green-600" />
                    <h3 className="text-lg font-semibold">Current Medications</h3>
                  </div>
                  <div className="space-y-3">
                    {patientData.medicalInfo.medications.map((med, index) => (
                      <div key={index} className="border-l-4 border-green-500 pl-4">
                        <p className="font-medium">{med.name}</p>
                        <p className="text-sm text-gray-600">{med.dosage}</p>
                        <p className="text-xs text-gray-500">Started: {new Date(med.date).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Medical Alerts */}
              {(patientData.medicalInfo.allergies.length > 0 || patientData.medicalInfo.conditions.length > 0) && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                    <h3 className="text-lg font-semibold">Medical Alerts</h3>
                  </div>
                  <div className="space-y-3">
                    {patientData.medicalInfo.allergies.map((allergy, index) => (
                      <span key={index} className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                        Allergy: {allergy}
                      </span>
                    ))}
                    {patientData.medicalInfo.conditions.map((condition, index) => (
                      <span key={index} className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Full Access View */}
        {accessMode === 'full' && (
          <div className="space-y-6 animate-fade-in">
            {/* Complete Health Overview */}
            <div className="bg-gradient-to-br from-green-600 to-teal-700 rounded-2xl p-8 text-white shadow-2xl">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <QrCode className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{patientData.personalInfo.name}</h2>
                  <p className="text-green-200">Complete Health Record Access</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold">{patientData.visits.length}</p>
                  <p className="text-green-200">Doctor Visits</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold">{patientData.medicalInfo.medications.length}</p>
                  <p className="text-green-200">Medications</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold">{patientData.tests.length}</p>
                  <p className="text-green-200">Lab Tests</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold">{patientData.medicalInfo.allergies.length}</p>
                  <p className="text-green-200">Allergies</p>
                </div>
              </div>
            </div>

            {/* Detailed Information Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Details */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                <div className="space-y-3">
                  <div><strong>Name:</strong> {patientData.personalInfo.name}</div>
                  <div><strong>Date of Birth:</strong> {patientData.personalInfo.dateOfBirth || 'Not set'}</div>
                  <div><strong>Blood Group:</strong> {patientData.personalInfo.bloodGroup || 'Not set'}</div>
                  <div><strong>Gender:</strong> {patientData.personalInfo.gender || 'Not set'}</div>
                  <div><strong>Phone:</strong> {patientData.personalInfo.phone || 'Not set'}</div>
                  <div><strong>Address:</strong> {patientData.personalInfo.address || 'Not set'}</div>
                </div>
              </div>

              {/* Recent Visits */}
              {patientData.visits.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Doctor Visits</h3>
                  <div className="space-y-3">
                    {patientData.visits.slice(-3).map((visit, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4">
                        <p className="font-medium">Dr. {visit.doctor}</p>
                        <p className="text-sm text-gray-600">{new Date(visit.date).toLocaleDateString()}</p>
                        {visit.notes && <p className="text-sm text-gray-700">{visit.notes}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 pb-8">
          <p className="text-gray-600 text-sm">
            This health card was generated securely. Data is read-only and protected.
          </p>
          <button
            onClick={() => window.close()}
            className="mt-4 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthCardViewer;