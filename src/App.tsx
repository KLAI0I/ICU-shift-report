import React, { useState } from 'react';
import { Heart, FileText, Clock, Users, Activity } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({
    date: '01/08/2025',
    shift: '',
    // Staff data
    endorsedFromCN: '',
    shiftCN: '',
    nextCN: '',
    // Patient data
    patientName: '',
    mrn: '',
    icuRoom: '',
    age: '',
    gender: '',
    nationality: '',
    doa: '',
    toa: '',
    finCategory: '',
    consultant: '',
    // Vital signs
    bp: '',
    hr: '',
    rr: '',
    temp: '',
    spo2: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm mb-6 p-6 border-l-4 border-blue-600">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">ICU Shift Report</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Care Medical</p>
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Activity className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Date and Shift Section */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="bg-blue-900 text-white px-6 py-3 rounded-t-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Date</label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Shift</label>
                <select
                  value={formData.shift}
                  onChange={(e) => handleInputChange('shift', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black"
                >
                  <option value="">Select Shift</option>
                  <option value="Day">Day</option>
                  <option value="Night">Night</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Staff Section */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="bg-blue-800 text-white px-6 py-3 rounded-t-lg">
            <h2 className="text-lg font-semibold flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Staff Information
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Endorsed from CN</label>
                <input
                  type="text"
                  value={formData.endorsedFromCN}
                  onChange={(e) => handleInputChange('endorsedFromCN', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Shift CN</label>
                <input
                  type="text"
                  value={formData.shiftCN}
                  onChange={(e) => handleInputChange('shiftCN', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Next CN</label>
                <input
                  type="text"
                  value={formData.nextCN}
                  onChange={(e) => handleInputChange('nextCN', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Staff Status Table */}
            <div className="mt-6">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">No.Staff</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Orientee</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Pull out staff</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">RC ICU Staff</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Float to ICU staff</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">On Call</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      <input type="text" className="w-full border-0 focus:outline-none" />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input type="text" className="w-full border-0 focus:outline-none" />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input type="text" className="w-full border-0 focus:outline-none" />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input type="text" className="w-full border-0 focus:outline-none" />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input type="text" className="w-full border-0 focus:outline-none" />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input type="text" className="w-full border-0 focus:outline-none" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Cases Section */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="bg-blue-800 text-white px-6 py-3">
            <h2 className="text-lg font-semibold">Cases</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-6 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">No.Active Cases</label>
                <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Admission</label>
                <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Discharge</label>
                <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Transfer out</label>
                <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">DAMA</label>
                <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Death</label>
                <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" />
              </div>
            </div>
          </div>
        </div>

        {/* ICU Unit Handover */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="bg-blue-900 text-white px-6 py-3">
            <h2 className="text-lg font-semibold text-center">ICU Unit Handover</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-4">
              {[
                'Narcotic (No.Empty only)',
                'Biomedical Maintenance Issue',
                'General Maintenance Isssue',
                'Stock issue',
                'IT issue',
                'Others'
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-md">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <label className="text-sm font-medium text-gray-700">{item}</label>
                  <input type="text" className="flex-1 ml-4 rounded-md border border-gray-300 px-3 py-1" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Patient Information */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="bg-blue-900 text-white px-6 py-3">
            <h2 className="text-lg font-semibold text-center">Handover Case 1</h2>
          </div>
          
          {/* Identification */}
          <div className="bg-blue-200 px-6 py-2">
            <h3 className="font-semibold">Identification</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                <input
                  type="text"
                  value={formData.patientName}
                  onChange={(e) => handleInputChange('patientName', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">MRN</label>
                <input
                  type="text"
                  value={formData.mrn}
                  onChange={(e) => handleInputChange('mrn', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ICU Room</label>
                <input
                  type="text"
                  value={formData.icuRoom}
                  onChange={(e) => handleInputChange('icuRoom', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="text"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                <input
                  type="text"
                  value={formData.nationality}
                  onChange={(e) => handleInputChange('nationality', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">DOA</label>
                <input
                  type="date"
                  value={formData.doa}
                  onChange={(e) => handleInputChange('doa', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">TOA</label>
                <input
                  type="time"
                  value={formData.toa}
                  onChange={(e) => handleInputChange('toa', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fin. Category</label>
                <input
                  type="text"
                  value={formData.finCategory}
                  onChange={(e) => handleInputChange('finCategory', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
            </div>
          </div>

          {/* Situation */}
          <div className="bg-blue-200 px-6 py-2">
            <h3 className="font-semibold">Situation</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">C/O</label>
                <textarea className="w-full rounded-md border border-gray-300 px-3 py-2 h-24"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
                <textarea className="w-full rounded-md border border-gray-300 px-3 py-2 h-24"></textarea>
              </div>
            </div>
          </div>

          {/* Assessment - Vital Signs */}
          <div className="bg-blue-200 px-6 py-2">
            <h3 className="font-semibold">Assessment</h3>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <h4 className="font-medium text-gray-800 mb-3">Vital signs on Admission</h4>
              <div className="grid grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">BP</label>
                  <input
                    type="text"
                    value={formData.bp}
                    onChange={(e) => handleInputChange('bp', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                    placeholder="mmHg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">HR</label>
                  <input
                    type="text"
                    value={formData.hr}
                    onChange={(e) => handleInputChange('hr', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                    placeholder="bpm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">RR</label>
                  <input
                    type="text"
                    value={formData.rr}
                    onChange={(e) => handleInputChange('rr', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                    placeholder="/min"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Temp</label>
                  <input
                    type="text"
                    value={formData.temp}
                    onChange={(e) => handleInputChange('temp', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                    placeholder="°C"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SpO2</label>
                  <input
                    type="text"
                    value={formData.spo2}
                    onChange={(e) => handleInputChange('spo2', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                    placeholder="%"
                  />
                </div>
              </div>
            </div>

            {/* Additional Assessment Sections */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Invasive Line</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" placeholder="Insertion date" className="rounded-md border border-gray-300 px-3 py-2" />
                    <input type="text" placeholder="Insertion Site" className="rounded-md border border-gray-300 px-3 py-2" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <input type="text" placeholder="Size" className="rounded-md border border-gray-300 px-3 py-2" />
                    <input type="text" placeholder="Removal date" className="rounded-md border border-gray-300 px-3 py-2" />
                    <input type="text" placeholder="Inserted By" className="rounded-md border border-gray-300 px-3 py-2" />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Infusion</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    <input type="text" placeholder="Medication/Solution Name" className="rounded-md border border-gray-300 px-3 py-2" />
                    <input type="text" placeholder="Dose + Dilution" className="rounded-md border border-gray-300 px-3 py-2" />
                    <input type="text" placeholder="Rate" className="rounded-md border border-gray-300 px-3 py-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-50 px-6 py-4 flex justify-between items-center rounded-b-lg">
            <div className="flex space-x-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Save Report
              </button>
              <button className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors">
                Print
              </button>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              Last saved: Never
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;