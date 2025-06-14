import React, { useState } from 'react';
import { Save, Download, User, Phone, MapPin, Droplet, Calendar } from 'lucide-react';
import jsPDF from 'jspdf';

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

interface HealthCardProps {
  patientData: PatientData;
  onSave: (data: PatientData) => void;
}

const HealthCard: React.FC<HealthCardProps> = ({ patientData, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(patientData);
  const [newAllergy, setNewAllergy] = useState('');
  const [newCondition, setNewCondition] = useState('');

  const handleSave = () => {
    onSave(formData);
    setIsEditing(false);
  };

  const addAllergy = () => {
    if (newAllergy.trim()) {
      setFormData({
        ...formData,
        medicalInfo: {
          ...formData.medicalInfo,
          allergies: [...formData.medicalInfo.allergies, newAllergy.trim()]
        }
      });
      setNewAllergy('');
    }
  };

  const addCondition = () => {
    if (newCondition.trim()) {
      setFormData({
        ...formData,
        medicalInfo: {
          ...formData.medicalInfo,
          conditions: [...formData.medicalInfo.conditions, newCondition.trim()]
        }
      });
      setNewCondition('');
    }
  };

  const removeAllergy = (index: number) => {
    setFormData({
      ...formData,
      medicalInfo: {
        ...formData.medicalInfo,
        allergies: formData.medicalInfo.allergies.filter((_, i) => i !== index)
      }
    });
  };

  const removeCondition = (index: number) => {
    setFormData({
      ...formData,
      medicalInfo: {
        ...formData.medicalInfo,
        conditions: formData.medicalInfo.conditions.filter((_, i) => i !== index)
      }
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text('Digital Health Card', 20, 20);
    
    // Personal Information
    doc.setFontSize(14);
    doc.text('Personal Information', 20, 40);
    doc.setFontSize(12);
    doc.text(`Name: ${patientData.personalInfo.name}`, 20, 55);
    doc.text(`Date of Birth: ${patientData.personalInfo.dateOfBirth}`, 20, 65);
    doc.text(`Blood Group: ${patientData.personalInfo.bloodGroup}`, 20, 75);
    doc.text(`Gender: ${patientData.personalInfo.gender}`, 20, 85);
    doc.text(`Phone: ${patientData.personalInfo.phone}`, 20, 95);
    
    // Medical Information
    doc.setFontSize(14);
    doc.text('Medical Information', 20, 115);
    doc.setFontSize(12);
    
    if (patientData.medicalInfo.allergies.length > 0) {
      doc.text(`Allergies: ${patientData.medicalInfo.allergies.join(', ')}`, 20, 130);
    }
    
    if (patientData.medicalInfo.conditions.length > 0) {
      doc.text(`Conditions: ${patientData.medicalInfo.conditions.join(', ')}`, 20, 145);
    }
    
    // Emergency Contact
    doc.setFontSize(14);
    doc.text('Emergency Contact', 20, 165);
    doc.setFontSize(12);
    doc.text(`Name: ${patientData.medicalInfo.emergencyContact.name}`, 20, 180);
    doc.text(`Phone: ${patientData.medicalInfo.emergencyContact.phone}`, 20, 190);
    doc.text(`Relation: ${patientData.medicalInfo.emergencyContact.relation}`, 20, 200);
    
    doc.save('health-card.pdf');
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Health Card</h2>
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setFormData(patientData);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                Edit
              </button>
              <button
                onClick={generatePDF}
                className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                <Download className="w-4 h-4" />
                <span>Export PDF</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Health Card Preview */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 text-white shadow-2xl transform hover:scale-102 transition-transform duration-300">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">{patientData.personalInfo.name || 'Your Name'}</h3>
            <p className="text-blue-200">Digital Health Identity</p>
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
            </div>
          </div>
        </div>

        {(patientData.medicalInfo.allergies.length > 0 || patientData.medicalInfo.conditions.length > 0) && (
          <div className="mt-6 p-4 bg-white bg-opacity-20 rounded-lg">
            <p className="font-semibold mb-2">Medical Alerts:</p>
            <div className="flex flex-wrap gap-2">
              {patientData.medicalInfo.allergies.map((allergy, index) => (
                <span key={index} className="bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                  Allergy: {allergy}
                </span>
              ))}
              {patientData.medicalInfo.conditions.map((condition, index) => (
                <span key={index} className="bg-orange-500 text-white px-2 py-1 rounded-full text-sm">
                  {condition}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.personalInfo.name}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, name: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={formData.personalInfo.dateOfBirth}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, dateOfBirth: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                <select
                  value={formData.personalInfo.bloodGroup}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, bloodGroup: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  value={formData.personalInfo.gender}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, gender: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formData.personalInfo.phone}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, phone: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  value={formData.personalInfo.address}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, address: e.target.value }
                  })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Medical Information</h3>
            
            {/* Allergies */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  placeholder="Add allergy"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={addAllergy}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.medicalInfo.allergies.map((allergy, index) => (
                  <span
                    key={index}
                    className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                  >
                    <span>{allergy}</span>
                    <button
                      onClick={() => removeAllergy(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Medical Conditions */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Medical Conditions</label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value)}
                  placeholder="Add condition"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={addCondition}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors duration-300"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.medicalInfo.conditions.map((condition, index) => (
                  <span
                    key={index}
                    className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                  >
                    <span>{condition}</span>
                    <button
                      onClick={() => removeCondition(index)}
                      className="text-orange-600 hover:text-orange-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div>
              <h4 className="text-md font-medium mb-3">Emergency Contact</h4>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Contact Name"
                  value={formData.medicalInfo.emergencyContact.name}
                  onChange={(e) => setFormData({
                    ...formData,
                    medicalInfo: {
                      ...formData.medicalInfo,
                      emergencyContact: {
                        ...formData.medicalInfo.emergencyContact,
                        name: e.target.value
                      }
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="Contact Phone"
                  value={formData.medicalInfo.emergencyContact.phone}
                  onChange={(e) => setFormData({
                    ...formData,
                    medicalInfo: {
                      ...formData.medicalInfo,
                      emergencyContact: {
                        ...formData.medicalInfo.emergencyContact,
                        phone: e.target.value
                      }
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Relationship"
                  value={formData.medicalInfo.emergencyContact.relation}
                  onChange={(e) => setFormData({
                    ...formData,
                    medicalInfo: {
                      ...formData.medicalInfo,
                      emergencyContact: {
                        ...formData.medicalInfo.emergencyContact,
                        relation: e.target.value
                      }
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthCard;