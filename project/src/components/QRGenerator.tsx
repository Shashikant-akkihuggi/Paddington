import React, { useState, useEffect } from 'react';
import { QrCode, Share2, Eye, Shield } from 'lucide-react';
import QRCode from 'qrcode';

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

interface QRGeneratorProps {
  patientData: PatientData;
}

const QRGenerator: React.FC<QRGeneratorProps> = ({ patientData }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [viewMode, setViewMode] = useState<'emergency' | 'family' | 'full'>('emergency');

  const emergencyData = {
    name: patientData.personalInfo.name,
    bloodGroup: patientData.personalInfo.bloodGroup,
    allergies: patientData.medicalInfo.allergies,
    conditions: patientData.medicalInfo.conditions,
    emergencyContact: patientData.medicalInfo.emergencyContact
  };

  const familyData = {
    ...emergencyData,
    dateOfBirth: patientData.personalInfo.dateOfBirth,
    phone: patientData.personalInfo.phone,
    medications: patientData.medicalInfo.medications
  };

  const fullData = patientData;

  useEffect(() => {
    generateQRCode();
  }, [viewMode, patientData]);

  const generateQRCode = async () => {
    let dataToEncode;
    
    switch (viewMode) {
      case 'emergency':
        dataToEncode = emergencyData;
        break;
      case 'family':
        dataToEncode = familyData;
        break;
      case 'full':
        dataToEncode = fullData;
        break;
      default:
        dataToEncode = emergencyData;
    }

    // Create a shareable URL with the data
    const shareableUrl = `${window.location.origin}/health-card?data=${encodeURIComponent(JSON.stringify(dataToEncode))}&mode=${viewMode}`;
    
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(shareableUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: '#1f2937',
          light: '#ffffff'
        }
      });
      setQrCodeUrl(qrCodeDataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const copyToClipboard = () => {
    let dataToEncode;
    
    switch (viewMode) {
      case 'emergency':
        dataToEncode = emergencyData;
        break;
      case 'family':
        dataToEncode = familyData;
        break;
      case 'full':
        dataToEncode = fullData;
        break;
      default:
        dataToEncode = emergencyData;
    }

    const shareableUrl = `${window.location.origin}/health-card?data=${encodeURIComponent(JSON.stringify(dataToEncode))}&mode=${viewMode}`;
    navigator.clipboard.writeText(shareableUrl);
  };

  const getAccessDescription = (mode: string) => {
    switch (mode) {
      case 'emergency':
        return 'Emergency responders can access basic medical information including blood group, allergies, conditions, and emergency contact.';
      case 'family':
        return 'Family members can view personal details, medical conditions, current medications, and emergency contact information.';
      case 'full':
        return 'Full access includes complete medical history, all visits, tests, and detailed personal information.';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">QR Code Generator</h2>
        <p className="text-gray-600">Generate QR codes for different access levels to your health information</p>
      </div>

      {/* Access Level Selection */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Select Access Level</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setViewMode('emergency')}
            className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              viewMode === 'emergency'
                ? 'border-red-500 bg-red-50 text-red-700 transform scale-105'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Shield className="w-8 h-8 mx-auto mb-2 text-red-600" />
            <div className="font-medium">Emergency Access</div>
            <div className="text-sm text-gray-600 mt-1">Critical medical info only</div>
          </button>

          <button
            onClick={() => setViewMode('family')}
            className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              viewMode === 'family'
                ? 'border-blue-500 bg-blue-50 text-blue-700 transform scale-105'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Eye className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <div className="font-medium">Family Access</div>
            <div className="text-sm text-gray-600 mt-1">Extended medical information</div>
          </button>

          <button
            onClick={() => setViewMode('full')}
            className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              viewMode === 'full'
                ? 'border-green-500 bg-green-50 text-green-700 transform scale-105'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <QrCode className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <div className="font-medium">Full Access</div>
            <div className="text-sm text-gray-600 mt-1">Complete health record</div>
          </button>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Access Level:</strong> {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {getAccessDescription(viewMode)}
          </p>
        </div>
      </div>

      {/* QR Code Display */}
      <div className="bg-white rounded-xl shadow-lg p-6 text-center">
        <h3 className="text-lg font-semibold mb-4">Your QR Code</h3>
        
        {qrCodeUrl && (
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg inline-block">
              <img 
                src={qrCodeUrl} 
                alt="Health Card QR Code" 
                className="mx-auto transition-transform duration-300 hover:scale-105"
              />
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Scan this code to access health information
              </p>
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 mx-auto"
              >
                <Share2 className="w-4 h-4" />
                <span>Copy Shareable Link</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Preview */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Preview - What others will see</h3>
        
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-6">
          {viewMode === 'emergency' && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-red-600" />
                <span className="font-semibold text-red-700">Emergency Medical Information</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Name:</strong> {patientData.personalInfo.name || 'Not set'}</p>
                  <p><strong>Blood Group:</strong> {patientData.personalInfo.bloodGroup || 'Not set'}</p>
                </div>
                <div>
                  <p><strong>Emergency Contact:</strong> {patientData.medicalInfo.emergencyContact.name || 'Not set'}</p>
                  <p><strong>Phone:</strong> {patientData.medicalInfo.emergencyContact.phone || 'Not set'}</p>
                </div>
              </div>
              {(patientData.medicalInfo.allergies.length > 0 || patientData.medicalInfo.conditions.length > 0) && (
                <div className="mt-4">
                  <p className="font-semibold text-red-700 mb-2">Medical Alerts:</p>
                  <div className="flex flex-wrap gap-2">
                    {patientData.medicalInfo.allergies.map((allergy, index) => (
                      <span key={index} className="bg-red-200 text-red-800 px-2 py-1 rounded-full text-xs">
                        Allergy: {allergy}
                      </span>
                    ))}
                    {patientData.medicalInfo.conditions.map((condition, index) => (
                      <span key={index} className="bg-orange-200 text-orange-800 px-2 py-1 rounded-full text-xs">
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {viewMode === 'family' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-700">Family Access - Health Information</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Name:</strong> {patientData.personalInfo.name || 'Not set'}</p>
                  <p><strong>Date of Birth:</strong> {patientData.personalInfo.dateOfBirth || 'Not set'}</p>
                  <p><strong>Blood Group:</strong> {patientData.personalInfo.bloodGroup || 'Not set'}</p>
                  <p><strong>Phone:</strong> {patientData.personalInfo.phone || 'Not set'}</p>
                </div>
                <div>
                  <p><strong>Emergency Contact:</strong> {patientData.medicalInfo.emergencyContact.name || 'Not set'}</p>
                  <p><strong>Contact Phone:</strong> {patientData.medicalInfo.emergencyContact.phone || 'Not set'}</p>
                  <p><strong>Relationship:</strong> {patientData.medicalInfo.emergencyContact.relation || 'Not set'}</p>
                </div>
              </div>
              {patientData.medicalInfo.medications.length > 0 && (
                <div>
                  <p className="font-semibold mb-2">Current Medications:</p>
                  <div className="space-y-1">
                    {patientData.medicalInfo.medications.map((med, index) => (
                      <p key={index} className="text-sm">{med.name} - {med.dosage}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {viewMode === 'full' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <QrCode className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-700">Complete Health Record</span>
              </div>
              <p className="text-sm text-gray-600">
                Full access includes all personal information, complete medical history, 
                doctor visits, medications, lab tests, and emergency contacts.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <p className="font-semibold text-blue-600">{patientData.visits.length}</p>
                  <p className="text-gray-600">Doctor Visits</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-green-600">{patientData.medicalInfo.medications.length}</p>
                  <p className="text-gray-600">Medications</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-purple-600">{patientData.tests.length}</p>
                  <p className="text-gray-600">Lab Tests</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-red-600">{patientData.medicalInfo.allergies.length}</p>
                  <p className="text-gray-600">Allergies</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;