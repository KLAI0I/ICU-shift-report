import React, { useState } from 'react';
import { Heart, FileText, Clock, Users, Activity, Plus, Trash2 } from 'lucide-react';

interface InvasiveLine {
  id: string;
  invasiveLine: string;
  insertionDate: string;
  insertionSite: string;
  size: string;
  removalDate: string;
  insertedBy: string;
}

interface Infusion {
  id: string;
  medicationName: string;
  doseDilution: string;
  rate: string;
}

interface Antibiotic {
  id: string;
  antibioticName: string;
  doseFrequency: string;
  startAt: string;
  endAt: string;
}

interface CultureSensitivity {
  id: string;
  dateCollected: string;
  type: string;
  isolationPrecaution: string;
  dateResultReceived: string;
  results: string;
  actionTaken: string;
}

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
    // Anticoagulant
    anticoagulantType: '',
    medicationName: '',
    dose: '',
    frequency: '',
    route: '',
    nonPharmacological: '',
    // MV
    mvConnected: false,
    mvMode: '',
    mvVT: '',
    mvFiO2: '',
    mvPS: '',
    mvPeep: '',
    mvO2Support: '',
    // Text areas
    lastUpdates: '',
    plans: ''
  });

  // Dynamic arrays for sections
  const [invasiveLines, setInvasiveLines] = useState<InvasiveLine[]>([
    { id: '1', invasiveLine: '', insertionDate: '', insertionSite: '', size: '', removalDate: '', insertedBy: '' }
  ]);

  const [infusions, setInfusions] = useState<Infusion[]>([
    { id: '1', medicationName: '', doseDilution: '', rate: '' }
  ]);

  const [antibiotics, setAntibiotics] = useState<Antibiotic[]>([
    { id: '1', antibioticName: '', doseFrequency: '', startAt: '', endAt: '' }
  ]);

  const [cultureSensitivities, setCultureSensitivities] = useState<CultureSensitivity[]>([
    { id: '1', dateCollected: '', type: '', isolationPrecaution: '', dateResultReceived: '', results: '', actionTaken: '' }
  ]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTextAreaChange = (field: string, value: string) => {
    // Add bullet points automatically
    const lines = value.split('\n');
    const formattedLines = lines.map(line => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('•')) {
        return '• ' + trimmedLine;
      }
      return line;
    });
    const formattedValue = formattedLines.join('\n');
    setFormData(prev => ({ ...prev, [field]: formattedValue }));
  };

  // Invasive Lines functions
  const addInvasiveLine = () => {
    const newId = (invasiveLines.length + 1).toString();
    setInvasiveLines([...invasiveLines, { 
      id: newId, invasiveLine: '', insertionDate: '', insertionSite: '', size: '', removalDate: '', insertedBy: '' 
    }]);
  };

  const removeInvasiveLine = (id: string) => {
    if (invasiveLines.length > 1) {
      setInvasiveLines(invasiveLines.filter(line => line.id !== id));
    }
  };

  const updateInvasiveLine = (id: string, field: keyof InvasiveLine, value: string) => {
    setInvasiveLines(invasiveLines.map(line => 
      line.id === id ? { ...line, [field]: value } : line
    ));
  };

  // Infusion functions
  const addInfusion = () => {
    const newId = (infusions.length + 1).toString();
    setInfusions([...infusions, { id: newId, medicationName: '', doseDilution: '', rate: '' }]);
  };

  const removeInfusion = (id: string) => {
    if (infusions.length > 1) {
      setInfusions(infusions.filter(infusion => infusion.id !== id));
    }
  };

  const updateInfusion = (id: string, field: keyof Infusion, value: string) => {
    setInfusions(infusions.map(infusion => 
      infusion.id === id ? { ...infusion, [field]: value } : infusion
    ));
  };

  // Antibiotic functions
  const addAntibiotic = () => {
    const newId = (antibiotics.length + 1).toString();
    setAntibiotics([...antibiotics, { id: newId, antibioticName: '', doseFrequency: '', startAt: '', endAt: '' }]);
  };

  const removeAntibiotic = (id: string) => {
    if (antibiotics.length > 1) {
      setAntibiotics(antibiotics.filter(antibiotic => antibiotic.id !== id));
    }
  };

  const updateAntibiotic = (id: string, field: keyof Antibiotic, value: string) => {
    setAntibiotics(antibiotics.map(antibiotic => 
      antibiotic.id === id ? { ...antibiotic, [field]: value } : antibiotic
    ));
  };

  // Culture & Sensitivity functions
  const addCultureSensitivity = () => {
    const newId = (cultureSensitivities.length + 1).toString();
    setCultureSensitivities([...cultureSensitivities, { 
      id: newId, dateCollected: '', type: '', isolationPrecaution: '', dateResultReceived: '', results: '', actionTaken: '' 
    }]);
  };

  const removeCultureSensitivity = (id: string) => {
    if (cultureSensitivities.length > 1) {
      setCultureSensitivities(cultureSensitivities.filter(cs => cs.id !== id));
    }
  };

  const updateCultureSensitivity = (id: string, field: keyof CultureSensitivity, value: string) => {
    setCultureSensitivities(cultureSensitivities.map(cs => 
      cs.id === id ? { ...cs, [field]: value } : cs
    ));
  };

  const generatePDF = () => {
    // This would integrate with a PDF generation library
    alert('PDF generation feature will be implemented with a proper PDF library');
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
          </div>

          {/* Attached Line Section */}
          <div className="bg-blue-200 px-6 py-2">
            <h3 className="font-semibold">Attached Line</h3>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">Invasive Line</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Insertion date</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Insertion Site</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Size</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Removal date</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Inserted By</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {invasiveLines.map((line) => (
                    <tr key={line.id}>
                      <td className="border border-gray-300 px-4 py-2">
                        <input 
                          type="text" 
                          value={line.invasiveLine}
                          onChange={(e) => updateInvasiveLine(line.id, 'invasiveLine', e.target.value)}
                          className="w-full border-0 focus:outline-none" 
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input 
                          type="date" 
                          value={line.insertionDate}
                          onChange={(e) => updateInvasiveLine(line.id, 'insertionDate', e.target.value)}
                          className="w-full border-0 focus:outline-none" 
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input 
                          type="text" 
                          value={line.insertionSite}
                          onChange={(e) => updateInvasiveLine(line.id, 'insertionSite', e.target.value)}
                          className="w-full border-0 focus:outline-none" 
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input 
                          type="text" 
                          value={line.size}
                          onChange={(e) => updateInvasiveLine(line.id, 'size', e.target.value)}
                          className="w-full border-0 focus:outline-none" 
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input 
                          type="date" 
                          value={line.removalDate}
                          onChange={(e) => updateInvasiveLine(line.id, 'removalDate', e.target.value)}
                          className="w-full border-0 focus:outline-none" 
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input 
                          type="text" 
                          value={line.insertedBy}
                          onChange={(e) => updateInvasiveLine(line.id, 'insertedBy', e.target.value)}
                          className="w-full border-0 focus:outline-none" 
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {invasiveLines.length > 1 && (
                          <button
                            onClick={() => removeInvasiveLine(line.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <button
                onClick={addInvasiveLine}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Invasive Line</span>
              </button>
            </div>
          </div>

          {/* Infusion Section */}
          <div className="bg-blue-200 px-6 py-2">
            <h3 className="font-semibold">Infusion</h3>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm">Medication / Solution Name</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm">Dose + Dilution</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm">Rate</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {infusions.map((infusion) => (
                    <tr key={infusion.id}>
                      <td className="border border-gray-300 px-3 py-2">
                        <input 
                          type="text" 
                          value={infusion.medicationName}
                          onChange={(e) => updateInfusion(infusion.id, 'medicationName', e.target.value)}
                          className="w-full border-0 focus:outline-none text-sm" 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input 
                          type="text" 
                          value={infusion.doseDilution}
                          onChange={(e) => updateInfusion(infusion.id, 'doseDilution', e.target.value)}
                          className="w-full border-0 focus:outline-none text-sm" 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input 
                          type="text" 
                          value={infusion.rate}
                          onChange={(e) => updateInfusion(infusion.id, 'rate', e.target.value)}
                          className="w-full border-0 focus:outline-none text-sm" 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        {infusions.length > 1 && (
                          <button
                            onClick={() => removeInfusion(infusion.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <button
                onClick={addInfusion}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Infusion</span>
              </button>
            </div>
          </div>

          {/* Antibiotics Section */}
          <div className="bg-blue-200 px-6 py-2">
            <h3 className="font-semibold">Antibiotics</h3>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm">Antibiotic Name</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm">Dose & frequency</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm">Start at</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm">End at</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {antibiotics.map((antibiotic) => (
                    <tr key={antibiotic.id}>
                      <td className="border border-gray-300 px-3 py-2">
                        <input 
                          type="text" 
                          value={antibiotic.antibioticName}
                          onChange={(e) => updateAntibiotic(antibiotic.id, 'antibioticName', e.target.value)}
                          className="w-full border-0 focus:outline-none text-sm" 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input 
                          type="text" 
                          value={antibiotic.doseFrequency}
                          onChange={(e) => updateAntibiotic(antibiotic.id, 'doseFrequency', e.target.value)}
                          className="w-full border-0 focus:outline-none text-sm" 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input 
                          type="date" 
                          value={antibiotic.startAt}
                          onChange={(e) => updateAntibiotic(antibiotic.id, 'startAt', e.target.value)}
                          className="w-full border-0 focus:outline-none text-sm" 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input 
                          type="date" 
                          value={antibiotic.endAt}
                          onChange={(e) => updateAntibiotic(antibiotic.id, 'endAt', e.target.value)}
                          className="w-full border-0 focus:outline-none text-sm" 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        {antibiotics.length > 1 && (
                          <button
                            onClick={() => removeAntibiotic(antibiotic.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <button
                onClick={addAntibiotic}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Antibiotic</span>
              </button>
            </div>
          </div>

          {/* Scheduled Tasks and Diet Section */}
          <div className="grid grid-cols-2 gap-0">
            {/* Scheduled Tasks */}
            <div>
              <div className="bg-blue-200 px-6 py-2">
                <h3 className="font-semibold">Scheduled Tasks</h3>
              </div>
              <div className="p-6 border-r border-gray-300">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">RBS</label>
                    <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">VBG</label>
                    <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ECG</label>
                    <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Diet */}
            <div>
              <div className="bg-blue-200 px-6 py-2">
                <h3 className="font-semibold">Diet</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Bowel Motion</label>
                    <input type="date" className="w-full rounded-md border border-gray-300 px-3 py-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Culture & Sensitivity Section */}
          <div className="bg-blue-200 px-6 py-2">
            <h3 className="font-semibold">Culture & Sensitivity</h3>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">Date of C/S Collected</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Isolation Precaution taken</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Date of C/S result received</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">C/S Results</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Action Taken</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cultureSensitivities.map((cs) => (
                    <tr key={cs.id}>
                      <td className="border border-gray-300 px-4 py-2">
                        <input 
                          type="date" 
                          value={cs.dateCollected}
                          onChange={(e) => updateCultureSensitivity(cs.id, 'dateCollected', e.target.value)}
                          className="w-full border-0 focus:outline-none" 
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input 
                          type="text" 
                          value={cs.type}
                          onChange={(e) => updateCultureSensitivity(cs.id, 'type', e.target.value)}
                          className="w-full border-0 focus:outline-none" 
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input 
                          type="text" 
                          value={cs.isolationPrecaution}
                          onChange={(e) => updateCultureSensitivity(cs.id, 'isolationPrecaution', e.target.value)}
                          className="w-full border-0 focus:outline-none" 
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input 
                          type="date" 
                          value={cs.dateResultReceived}
                          onChange={(e) => updateCultureSensitivity(cs.id, 'dateResultReceived', e.target.value)}
                          className="w-full border-0 focus:outline-none" 
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input 
                          type="text" 
                          value={cs.results}
                          onChange={(e) => updateCultureSensitivity(cs.id, 'results', e.target.value)}
                          className="w-full border-0 focus:outline-none" 
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input 
                          type="text" 
                          value={cs.actionTaken}
                          onChange={(e) => updateCultureSensitivity(cs.id, 'actionTaken', e.target.value)}
                          className="w-full border-0 focus:outline-none" 
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {cultureSensitivities.length > 1 && (
                          <button
                            onClick={() => removeCultureSensitivity(cs.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <button
                onClick={addCultureSensitivity}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Culture & Sensitivity</span>
              </button>
            </div>
          </div>

          {/* Anticoagulant Section */}
          <div className="bg-blue-200 px-6 py-2">
            <h3 className="font-semibold">Anticoagulant</h3>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Anticoagulant Type</label>
              <select
                value={formData.anticoagulantType}
                onChange={(e) => handleInputChange('anticoagulantType', e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="">Select Type</option>
                <option value="pharmacological">Pharmacological</option>
                <option value="non-pharmacological">Non Pharmacological</option>
              </select>
            </div>

            {formData.anticoagulantType === 'pharmacological' && (
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Medication Name</label>
                  <input
                    type="text"
                    value={formData.medicationName}
                    onChange={(e) => handleInputChange('medicationName', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dose</label>
                  <input
                    type="text"
                    value={formData.dose}
                    onChange={(e) => handleInputChange('dose', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                  <input
                    type="text"
                    value={formData.frequency}
                    onChange={(e) => handleInputChange('frequency', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Route</label>
                  <input
                    type="text"
                    value={formData.route}
                    onChange={(e) => handleInputChange('route', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
              </div>
            )}

            {formData.anticoagulantType === 'non-pharmacological' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Non Pharmacological Method</label>
                <select
                  value={formData.nonPharmacological}
                  onChange={(e) => handleInputChange('nonPharmacological', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="">Select Method</option>
                  <option value="DVT device">DVT device</option>
                  <option value="Elastic Stocking">Elastic Stocking</option>
                </select>
              </div>
            )}
          </div>

          {/* MV Section */}
          <div className="bg-blue-200 px-6 py-2">
            <h3 className="font-semibold">MV (Mechanical Ventilation)</h3>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.mvConnected}
                  onChange={(e) => handleInputChange('mvConnected', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700">Patient connected to MV</span>
              </label>
            </div>

            {formData.mvConnected && (
              <div className="grid grid-cols-6 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mode</label>
                  <input
                    type="text"
                    value={formData.mvMode}
                    onChange={(e) => handleInputChange('mvMode', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">VT</label>
                  <input
                    type="text"
                    value={formData.mvVT}
                    onChange={(e) => handleInputChange('mvVT', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">FiO2</label>
                  <input
                    type="text"
                    value={formData.mvFiO2}
                    onChange={(e) => handleInputChange('mvFiO2', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PS</label>
                  <input
                    type="text"
                    value={formData.mvPS}
                    onChange={(e) => handleInputChange('mvPS', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Peep</label>
                  <input
                    type="text"
                    value={formData.mvPeep}
                    onChange={(e) => handleInputChange('mvPeep', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">O2 Support</label>
                  <input
                    type="text"
                    value={formData.mvO2Support}
                    onChange={(e) => handleInputChange('mvO2Support', e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Last Updates Section */}
          <div className="bg-blue-200 px-6 py-2">
            <h3 className="font-semibold">Last Updates</h3>
          </div>
          <div className="p-6">
            <textarea 
              value={formData.lastUpdates}
              onChange={(e) => handleTextAreaChange('lastUpdates', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 h-24 resize-none"
              placeholder="Enter last updates and important notes..."
            ></textarea>
          </div>

          {/* Plans Section */}
          <div className="bg-blue-200 px-6 py-2">
            <h3 className="font-semibold">Plans</h3>
          </div>
          <div className="p-6">
            <textarea 
              value={formData.plans}
              onChange={(e) => handleTextAreaChange('plans', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 h-32 resize-none"
              placeholder="Enter treatment plans and future care instructions..."
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-50 px-6 py-4 flex justify-between items-center rounded-b-lg">
            <div className="flex space-x-4">
              <button 
                onClick={generatePDF}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Save Report as PDF
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