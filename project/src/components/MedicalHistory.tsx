import React, { useState } from 'react';
import { Plus, Calendar, Pill, FileText, Trash2 } from 'lucide-react';

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

interface MedicalHistoryProps {
  patientData: PatientData;
  onSave: (data: PatientData) => void;
}

const MedicalHistory: React.FC<MedicalHistoryProps> = ({ patientData, onSave }) => {
  const [activeTab, setActiveTab] = useState('visits');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    doctor: '',
    date: '',
    notes: '',
    medicationName: '',
    dosage: '',
    medicationDate: '',
    testName: '',
    testDate: ''
  });

  const addVisit = () => {
    if (formData.doctor && formData.date) {
      const newVisit = {
        doctor: formData.doctor,
        date: formData.date,
        notes: formData.notes
      };

      const updatedData = {
        ...patientData,
        visits: [...patientData.visits, newVisit]
      };

      onSave(updatedData);
      setFormData({ ...formData, doctor: '', date: '', notes: '' });
      setShowAddForm(false);
    }
  };

  const addMedication = () => {
    if (formData.medicationName && formData.dosage && formData.medicationDate) {
      const newMedication = {
        name: formData.medicationName,
        dosage: formData.dosage,
        date: formData.medicationDate
      };

      const updatedData = {
        ...patientData,
        medicalInfo: {
          ...patientData.medicalInfo,
          medications: [...patientData.medicalInfo.medications, newMedication]
        }
      };

      onSave(updatedData);
      setFormData({ ...formData, medicationName: '', dosage: '', medicationDate: '' });
      setShowAddForm(false);
    }
  };

  const addTest = () => {
    if (formData.testName && formData.testDate) {
      const newTest = {
        name: formData.testName,
        date: formData.testDate
      };

      const updatedData = {
        ...patientData,
        tests: [...patientData.tests, newTest]
      };

      onSave(updatedData);
      setFormData({ ...formData, testName: '', testDate: '' });
      setShowAddForm(false);
    }
  };

  const removeVisit = (index: number) => {
    const updatedData = {
      ...patientData,
      visits: patientData.visits.filter((_, i) => i !== index)
    };
    onSave(updatedData);
  };

  const removeMedication = (index: number) => {
    const updatedData = {
      ...patientData,
      medicalInfo: {
        ...patientData.medicalInfo,
        medications: patientData.medicalInfo.medications.filter((_, i) => i !== index)
      }
    };
    onSave(updatedData);
  };

  const removeTest = (index: number) => {
    const updatedData = {
      ...patientData,
      tests: patientData.tests.filter((_, i) => i !== index)
    };
    onSave(updatedData);
  };

  const tabs = [
    { id: 'visits', label: 'Doctor Visits', icon: Calendar },
    { id: 'medications', label: 'Medications', icon: Pill },
    { id: 'tests', label: 'Lab Tests', icon: FileText }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Medical History</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Add Record</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg p-1">
        <nav className="flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Add Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4 transform animate-scale-in">
            <h3 className="text-lg font-semibold mb-4">
              Add {activeTab === 'visits' ? 'Doctor Visit' : activeTab === 'medications' ? 'Medication' : 'Lab Test'}
            </h3>

            {activeTab === 'visits' && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Doctor Name"
                  value={formData.doctor}
                  onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Visit Notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            {activeTab === 'medications' && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Medication Name"
                  value={formData.medicationName}
                  onChange={(e) => setFormData({ ...formData, medicationName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Dosage (e.g., 10mg twice daily)"
                  value={formData.dosage}
                  onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="date"
                  value={formData.medicationDate}
                  onChange={(e) => setFormData({ ...formData, medicationDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            {activeTab === 'tests' && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Test Name"
                  value={formData.testName}
                  onChange={(e) => setFormData({ ...formData, testName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="date"
                  value={formData.testDate}
                  onChange={(e) => setFormData({ ...formData, testDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (activeTab === 'visits') addVisit();
                  else if (activeTab === 'medications') addMedication();
                  else addTest();
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
        {activeTab === 'visits' && (
          <div className="space-y-4">
            {patientData.visits.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No doctor visits recorded yet</p>
            ) : (
              patientData.visits.map((visit, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">Dr. {visit.doctor}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-600">{new Date(visit.date).toLocaleDateString()}</span>
                      </div>
                      {visit.notes && (
                        <p className="text-gray-700 mt-2">{visit.notes}</p>
                      )}
                    </div>
                    <button
                      onClick={() => removeVisit(index)}
                      className="text-red-600 hover:text-red-800 p-1 transition-colors duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'medications' && (
          <div className="space-y-4">
            {patientData.medicalInfo.medications.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No medications recorded yet</p>
            ) : (
              patientData.medicalInfo.medications.map((medication, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Pill className="w-4 h-4 text-green-600" />
                        <span className="font-medium">{medication.name}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-600">{medication.dosage}</span>
                      </div>
                      <p className="text-sm text-gray-600">Started: {new Date(medication.date).toLocaleDateString()}</p>
                    </div>
                    <button
                      onClick={() => removeMedication(index)}
                      className="text-red-600 hover:text-red-800 p-1 transition-colors duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'tests' && (
          <div className="space-y-4">
            {patientData.tests.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No lab tests recorded yet</p>
            ) : (
              patientData.tests.map((test, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <FileText className="w-4 h-4 text-purple-600" />
                        <span className="font-medium">{test.name}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-600">{new Date(test.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeTest(index)}
                      className="text-red-600 hover:text-red-800 p-1 transition-colors duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalHistory;