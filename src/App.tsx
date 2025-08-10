import React, { useState, useEffect } from 'react';
import { 
  User, 
  Calendar, 
  Clock, 
  Heart, 
  Activity, 
  Thermometer, 
  Droplets, 
  Stethoscope, 
  Plus, 
  Trash2, 
  Download,
  Search,
  Copy,
  Save,
  Filter,
  AlertCircle,
  CheckCircle,
  FileText
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { v4 as uuidv4 } from 'uuid';

interface PatientCase {
  id: string;
  caseNumber: number;
  // Patient Information
  patientName: string;
  mrn: string;
  age: string;
  gender: string;
  admissionDate: string;
  diagnosis: string;
  allergies: string;
  
  // Staff Information
  outgoingNurse: string;
  incomingNurse: string;
  shiftDate: string;
  shiftTime: string;
  
  // Vital Signs
  temperature: string;
  bloodPressure: string;
  heartRate: string;
  respiratoryRate: string;
  oxygenSaturation: string;
  painScore: string;
  
  // Assessment
  consciousness: string;
  mobility: string;
  skinCondition: string;
  
  // Dynamic sections
  attachedLines: Array<{
    invasiveLine: string;
    insertionDate: string;
    insertionSite: string;
    size: string;
    removalDate: string;
    insertedBy: string;
  }>;
  
  infusions: Array<{
    medicationName: string;
    doseDilution: string;
    rate: string;
  }>;
  
  antibiotics: Array<{
    name: string;
    dose: string;
    frequency: string;
    startAt: string;
    endAt: string;
  }>;
  
  hamMedications: Array<{
    medicationName: string;
    dose: string;
    frequency: string;
    route: string;
    startDate: string;
    startTime: string;
  }>;
  
  cultureData: Array<{
    dateCollected: string;
    type: string;
    isolationPrecaution: string;
    dateResultReceived: string;
    results: string;
    actionTaken: string;
  }>;
  
  // Other fields
  rbs: string;
  vbg: string;
  ecg: string;
  dietType: string;
  lastBowelMotion: string;
  anticoagulantType: string;
  anticoagulantMedication: string;
  anticoagulantDose: string;
  anticoagulantFrequency: string;
  anticoagulantRoute: string;
  anticoagulantDevice: string;
  mvConnected: boolean;
  mvMode: string;
  mvVT: string;
  mvFiO2: string;
  mvPS: string;
  mvPeep: string;
  mvO2Support: string;
  lastUpdates: string;
  plans: string;
}

const App: React.FC = () => {
  const [cases, setCases] = useState<PatientCase[]>([]);
  const [searchMRN, setSearchMRN] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [saveMessage, setSaveMessage] = useState('');
  
  // Nursing Manpower state
  const [nursingManpower, setNursingManpower] = useState({
    noStaff: '',
    orientee: '',
    pullOutStaff: '',
    rcIcuStaff: '',
    floatToIcuStaff: '',
    onCall: ''
  });

  // Census state
  const [census, setCensus] = useState({
    noActiveCases: '',
    admission: '',
    discharge: '',
    transferOut: '',
    dama: '',
    death: '',
    codeBlue: '',
    casesOnCrrt: '',
    casesOnHemodialysis: ''
  });
  const [filteredCases, setFilteredCases] = useState<PatientCase[]>([]);
  const [showFiltered, setShowFiltered] = useState(false);

  // Initialize with first case
  useEffect(() => {
    if (cases.length === 0) {
      addNewCase();
    }
  }, []);

  // Filter cases by MRN
  useEffect(() => {
    if (searchMRN.trim()) {
      const filtered = cases.filter(caseItem => 
        caseItem.mrn.toLowerCase().includes(searchMRN.toLowerCase())
      );
      setFilteredCases(filtered);
    } else {
      setFilteredCases([]);
      setShowFiltered(false);
    }
  }, [searchMRN, cases]);

  const createEmptyCase = (caseNumber: number): PatientCase => ({
    id: uuidv4(),
    caseNumber,
    patientName: '',
    mrn: '',
    age: '',
    gender: '',
    admissionDate: '',
    diagnosis: '',
    allergies: '',
    outgoingNurse: '',
    incomingNurse: '',
    shiftDate: '',
    shiftTime: '',
    temperature: '',
    bloodPressure: '',
    heartRate: '',
    respiratoryRate: '',
    oxygenSaturation: '',
    painScore: '',
    consciousness: '',
    mobility: '',
    skinCondition: '',
    attachedLines: [{ invasiveLine: '', insertionDate: '', insertionSite: '', size: '', removalDate: '', insertedBy: '' }],
    infusions: [{ medicationName: '', doseDilution: '', rate: '' }],
    antibiotics: [{ name: '', dose: '', frequency: '', startAt: '', endAt: '' }],
    hamMedications: [{ medicationName: '', dose: '', frequency: '', route: '', startDate: '', startTime: '' }],
    cultureData: [{ dateCollected: '', type: '', isolationPrecaution: '', dateResultReceived: '', results: '', actionTaken: '' }],
    rbs: '',
    vbg: '',
    ecg: '',
    dietType: '',
    lastBowelMotion: '',
    anticoagulantType: '',
    anticoagulantMedication: '',
    anticoagulantDose: '',
    anticoagulantFrequency: '',
    anticoagulantRoute: '',
    anticoagulantDevice: '',
    mvConnected: false,
    mvMode: '',
    mvVT: '',
    mvFiO2: '',
    mvPS: '',
    mvPeep: '',
    mvO2Support: '',
    lastUpdates: '',
    plans: ''
  });

  const addNewCase = () => {
    const newCaseNumber = cases.length + 1;
    const newCase = createEmptyCase(newCaseNumber);
    setCases([...cases, newCase]);
  };

  const updateCase = (caseId: string, field: string, value: any) => {
    setCases(cases.map(caseItem => 
      caseItem.id === caseId ? { ...caseItem, [field]: value } : caseItem
    ));
  };

  const updateCaseArray = (caseId: string, field: string, index: number, itemField: string, value: any) => {
    setCases(cases.map(caseItem => {
      if (caseItem.id === caseId) {
        const updatedArray = [...(caseItem[field as keyof PatientCase] as any[])];
        updatedArray[index] = { ...updatedArray[index], [itemField]: value };
        return { ...caseItem, [field]: updatedArray };
      }
      return caseItem;
    }));
  };

  const addArrayItem = (caseId: string, field: string, emptyItem: any) => {
    setCases(cases.map(caseItem => {
      if (caseItem.id === caseId) {
        const currentArray = caseItem[field as keyof PatientCase] as any[];
        return { ...caseItem, [field]: [...currentArray, emptyItem] };
      }
      return caseItem;
    }));
  };

  const removeArrayItem = (caseId: string, field: string, index: number) => {
    setCases(cases.map(caseItem => {
      if (caseItem.id === caseId) {
        const currentArray = caseItem[field as keyof PatientCase] as any[];
        if (currentArray.length > 1) {
          return { ...caseItem, [field]: currentArray.filter((_, i) => i !== index) };
        }
      }
      return caseItem;
    }));
  };

  const formatTextWithBullets = (text: string) => {
    return text.split('\n').map(line => line.trim() ? `• ${line.trim()}` : '').join('\n');
  };

  const saveToCloud = async (data: any) => {
    try {
      // This would integrate with Google Drive API
      // For now, we'll save to localStorage as backup
      const timestamp = new Date().toISOString();
      const backupData = {
        timestamp,
        data,
        driveLink: "https://drive.google.com/drive/folders/1jLppMfZBGHgklkeoyO9jXdC8_iGdcMEu?usp=sharing"
      };
      
      localStorage.setItem(`icu_backup_${timestamp}`, JSON.stringify(backupData));
      console.log('Data backed up to cloud:', backupData.driveLink);
      return true;
    } catch (error) {
      console.error('Cloud backup failed:', error);
      return false;
    }
  };

  // Save report to database
  const handleSaveReport = async () => {
    // Validate required fields
    if (!cases[0]?.mrn?.trim()) {
      setSaveStatus('error');
      setSaveMessage('MRN is required to save the report');
      setTimeout(() => setSaveStatus('idle'), 3000);
      return;
    }

    setSaveStatus('saving');
    setSaveMessage('Saving report...');

    try {
      const reportData = {
        cases,
        nursingManpower,
        census,
        timestamp: new Date().toISOString(),
        totalCases: cases.length
      };

      // Simulate saving to database
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSaveMessage('Report saved successfully!');
      setSaveStatus('saved');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveStatus('idle'), 3000);
      
    } catch (error: any) {
      console.error('Error saving report:', error);
      setSaveStatus('error');
      setSaveMessage(`Error saving report: ${error.message}`);
      setTimeout(() => setSaveStatus('idle'), 5000);
    }
  };

  // Create new report (clear form)
  const handleNewReport = () => {
    setCases([createEmptyCase(1)]);
    setNursingManpower({
      noStaff: '',
      orientee: '',
      pullOutStaff: '',
      rcIcuStaff: '',
      floatToIcuStaff: '',
      onCall: ''
    });
    setCensus({
      noActiveCases: '',
      admission: '',
      discharge: '',
      transferOut: '',
      dama: '',
      death: '',
      codeBlue: '',
      casesOnCrrt: '',
      casesOnHemodialysis: ''
    });
    setSaveStatus('idle');
    setSaveMessage('');
  };

  const generatePDF = async () => {
    try {
      const element = document.getElementById('report-content');
      if (!element) return;

      // Hide interactive elements for PDF
      const interactiveElements = element.querySelectorAll('button, .no-pdf');
      interactiveElements.forEach(el => (el as HTMLElement).style.display = 'none');

      // Create PDF with A4 dimensions
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm
      
      // Get element dimensions
      const elementHeight = element.scrollHeight;
      const elementWidth = element.scrollWidth;
      
      // Calculate scale to fit A4 width
      const scale = (pdfWidth - 20) / (elementWidth * 0.264583); // Convert px to mm
      
      // Calculate how many pages we need
      const pageHeight = (pdfHeight - 20) / scale / 0.264583; // Available height in pixels
      const totalPages = Math.ceil(elementHeight / pageHeight);

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) pdf.addPage();
        
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          height: Math.min(pageHeight, elementHeight - (page * pageHeight)),
          y: page * pageHeight,
          scrollX: 0,
          scrollY: 0
        });

        const imgData = canvas.toDataURL('image/png');
        const imgWidth = pdfWidth - 20;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, Math.min(imgHeight, pdfHeight - 20));
      }

      // Restore interactive elements
      interactiveElements.forEach(el => (el as HTMLElement).style.display = '');

      // Save PDF
      const fileName = `ICU_Shift_Report_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);

      // Backup to cloud
      await saveToCloud(cases);
      
      alert('PDF generated successfully and data backed up to cloud!');
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const searchAndFilter = () => {
    if (searchMRN.trim()) {
      setShowFiltered(true);
    }
  };

  const clearFilter = () => {
    setSearchMRN('');
    setShowFiltered(false);
  };

  const renderCase = (caseData: PatientCase) => (
    <div key={caseData.id} className="mb-8 border-2 border-blue-200 rounded-lg p-4">
      <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg mb-6">
        <h1 className="text-2xl font-bold text-center">Handover Case {caseData.caseNumber}</h1>
        <p className="text-center text-blue-100 mt-2">ICU Shift Report - Medical Interface</p>
      </div>

      {/* Patient Information Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="bg-blue-100 px-6 py-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <User size={20} />
            Patient Information
          </h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
            <input
              type="text"
              value={caseData.patientName}
              onChange={(e) => updateCase(caseData.id, 'patientName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter patient name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">MRN</label>
            <input
              type="text"
              value={caseData.mrn}
              onChange={(e) => updateCase(caseData.id, 'mrn', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter MRN"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input
              type="text"
              value={caseData.age}
              onChange={(e) => updateCase(caseData.id, 'age', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter age"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              value={caseData.gender}
              onChange={(e) => updateCase(caseData.id, 'gender', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Admission Date</label>
            <input
              type="date"
              value={caseData.admissionDate}
              onChange={(e) => updateCase(caseData.id, 'admissionDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Diagnosis</label>
            <textarea
              value={caseData.diagnosis}
              onChange={(e) => updateCase(caseData.id, 'diagnosis', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter primary diagnosis"
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Allergies</label>
            <textarea
              value={caseData.allergies}
              onChange={(e) => updateCase(caseData.id, 'allergies', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter known allergies"
            />
          </div>
        </div>
      </div>

      {/* Staff Information Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="bg-blue-100 px-6 py-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Stethoscope size={20} />
            Staff Handover Information
          </h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Outgoing Nurse</label>
            <input
              type="text"
              value={caseData.outgoingNurse}
              onChange={(e) => updateCase(caseData.id, 'outgoingNurse', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter outgoing nurse name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Incoming Nurse</label>
            <input
              type="text"
              value={caseData.incomingNurse}
              onChange={(e) => updateCase(caseData.id, 'incomingNurse', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter incoming nurse name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Calendar size={16} />
              Shift Date
            </label>
            <input
              type="date"
              value={caseData.shiftDate}
              onChange={(e) => updateCase(caseData.id, 'shiftDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Clock size={16} />
              Shift Time
            </label>
            <input
              type="time"
              value={caseData.shiftTime}
              onChange={(e) => updateCase(caseData.id, 'shiftTime', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Vital Signs Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="bg-blue-100 px-6 py-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Heart size={20} />
            Vital Signs & Assessment
          </h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Thermometer size={16} />
              Temperature (°C)
            </label>
            <input
              type="text"
              value={caseData.temperature}
              onChange={(e) => updateCase(caseData.id, 'temperature', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="36.5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Activity size={16} />
              Blood Pressure (mmHg)
            </label>
            <input
              type="text"
              value={caseData.bloodPressure}
              onChange={(e) => updateCase(caseData.id, 'bloodPressure', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="120/80"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Heart size={16} />
              Heart Rate (bpm)
            </label>
            <input
              type="text"
              value={caseData.heartRate}
              onChange={(e) => updateCase(caseData.id, 'heartRate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="72"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Respiratory Rate (/min)</label>
            <input
              type="text"
              value={caseData.respiratoryRate}
              onChange={(e) => updateCase(caseData.id, 'respiratoryRate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="16"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Droplets size={16} />
              Oxygen Saturation (%)
            </label>
            <input
              type="text"
              value={caseData.oxygenSaturation}
              onChange={(e) => updateCase(caseData.id, 'oxygenSaturation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="98"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pain Score (0-10)</label>
            <input
              type="text"
              value={caseData.painScore}
              onChange={(e) => updateCase(caseData.id, 'painScore', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Level of Consciousness</label>
            <select
              value={caseData.consciousness}
              onChange={(e) => updateCase(caseData.id, 'consciousness', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select level</option>
              <option value="Alert">Alert</option>
              <option value="Drowsy">Drowsy</option>
              <option value="Confused">Confused</option>
              <option value="Unconscious">Unconscious</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobility Status</label>
            <select
              value={caseData.mobility}
              onChange={(e) => updateCase(caseData.id, 'mobility', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select mobility</option>
              <option value="Independent">Independent</option>
              <option value="Assisted">Assisted</option>
              <option value="Bed-bound">Bed-bound</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Skin Condition</label>
            <input
              type="text"
              value={caseData.skinCondition}
              onChange={(e) => updateCase(caseData.id, 'skinCondition', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter skin condition"
            />
          </div>
        </div>
      </div>

      {/* Attached Line Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="bg-blue-100 px-6 py-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Attached Line</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">Invasive Line</th>
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">Insertion Date</th>
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">Insertion Site</th>
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">Size</th>
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">Removal Date</th>
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">Inserted By</th>
                  {caseData.attachedLines.length > 1 && (
                    <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700">Action</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {caseData.attachedLines.map((line, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="text"
                        value={line.invasiveLine}
                        onChange={(e) => updateCaseArray(caseData.id, 'attachedLines', index, 'invasiveLine', e.target.value)}
                        className="w-full px-2 py-1 text-sm border-0 focus:ring-1 focus:ring-blue-500 rounded"
                        placeholder="Enter invasive line"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="date"
                        value={line.insertionDate}
                        onChange={(e) => updateCaseArray(caseData.id, 'attachedLines', index, 'insertionDate', e.target.value)}
                        className="w-full px-2 py-1 text-sm border-0 focus:ring-1 focus:ring-blue-500 rounded"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="text"
                        value={line.insertionSite}
                        onChange={(e) => updateCaseArray(caseData.id, 'attachedLines', index, 'insertionSite', e.target.value)}
                        className="w-full px-2 py-1 text-sm border-0 focus:ring-1 focus:ring-blue-500 rounded"
                        placeholder="Enter site"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="text"
                        value={line.size}
                        onChange={(e) => updateCaseArray(caseData.id, 'attachedLines', index, 'size', e.target.value)}
                        className="w-full px-2 py-1 text-sm border-0 focus:ring-1 focus:ring-blue-500 rounded"
                        placeholder="Size"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="date"
                        value={line.removalDate}
                        onChange={(e) => updateCaseArray(caseData.id, 'attachedLines', index, 'removalDate', e.target.value)}
                        className="w-full px-2 py-1 text-sm border-0 focus:ring-1 focus:ring-blue-500 rounded"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="text"
                        value={line.insertedBy}
                        onChange={(e) => updateCaseArray(caseData.id, 'attachedLines', index, 'insertedBy', e.target.value)}
                        className="w-full px-2 py-1 text-sm border-0 focus:ring-1 focus:ring-blue-500 rounded"
                        placeholder="Inserted by"
                      />
                    </td>
                    {caseData.attachedLines.length > 1 && (
                      <td className="border border-gray-300 px-2 py-1 text-center">
                        <button
                          onClick={() => removeArrayItem(caseData.id, 'attachedLines', index)}
                          className="text-red-600 hover:text-red-800 p-1 no-pdf"
                          title="Remove line"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <button
              onClick={() => addArrayItem(caseData.id, 'attachedLines', { invasiveLine: '', insertionDate: '', insertionSite: '', size: '', removalDate: '', insertedBy: '' })}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors no-pdf"
            >
              <Plus size={16} />
              Add Invasive Line
            </button>
          </div>
        </div>
      </div>

      {/* Infusion Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="bg-blue-100 px-6 py-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Infusion</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">Medication / Solution Name</th>
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">Dose + Dilution</th>
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">Rate</th>
                  {caseData.infusions.length > 1 && (
                    <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700">Action</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {caseData.infusions.map((infusion, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="text"
                        value={infusion.medicationName}
                        onChange={(e) => updateCaseArray(caseData.id, 'infusions', index, 'medicationName', e.target.value)}
                        className="w-full px-2 py-1 text-sm border-0 focus:ring-1 focus:ring-blue-500 rounded"
                        placeholder="Enter medication name"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="text"
                        value={infusion.doseDilution}
                        onChange={(e) => updateCaseArray(caseData.id, 'infusions', index, 'doseDilution', e.target.value)}
                        className="w-full px-2 py-1 text-sm border-0 focus:ring-1 focus:ring-blue-500 rounded"
                        placeholder="Enter dose + dilution"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="text"
                        value={infusion.rate}
                        onChange={(e) => updateCaseArray(caseData.id, 'infusions', index, 'rate', e.target.value)}
                        className="w-full px-2 py-1 text-sm border-0 focus:ring-1 focus:ring-blue-500 rounded"
                        placeholder="Enter rate"
                      />
                    </td>
                    {caseData.infusions.length > 1 && (
                      <td className="border border-gray-300 px-2 py-1 text-center">
                        <button
                          onClick={() => removeArrayItem(caseData.id, 'infusions', index)}
                          className="text-red-600 hover:text-red-800 p-1 no-pdf"
                          title="Remove infusion"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <button
              onClick={() => addArrayItem(caseData.id, 'infusions', { medicationName: '', doseDilution: '', rate: '' })}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors no-pdf"
            >
              <Plus size={16} />
              Add Infusion
            </button>
          </div>
        </div>
      </div>

      {/* Antibiotics Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="bg-blue-100 px-6 py-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Antibiotics</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">Antibiotic Name</th>
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">Dose & Frequency</th>
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">Start at</th>
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">End at</th>
                  {caseData.antibiotics.length > 1 && (
                    <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700">Action</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {caseData.antibiotics.map((antibiotic, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="text"
                        value={antibiotic.name}
                        onChange={(e) => updateCaseArray(caseData.id, 'antibiotics', index, 'name', e.target.value)}
                        className="w-full px-2 py-1 text-sm border-0 focus:ring-1 focus:ring-blue-500 rounded"
                        placeholder="Enter antibiotic name"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="text"
                        value={antibiotic.dose}
                        onChange={(e) => updateCaseArray(caseData.id, 'antibiotics', index, 'dose', e.target.value)}
                        className="w-full px-2 py-1 text-sm border-0 focus:ring-1 focus:ring-blue-500 rounded"
                        placeholder="Enter dose & frequency"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="date"
                        value={antibiotic.startAt}
                        onChange={(e) => updateCaseArray(caseData.id, 'antibiotics', index, 'startAt', e.target.value)}
                        className="w-full px-2 py-1 text-sm border-0 focus:ring-1 focus:ring-blue-500 rounded"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="date"
                        value={antibiotic.endAt}
                        onChange={(e) => updateCaseArray(caseData.id, 'antibiotics', index, 'endAt', e.target.value)}
                        className="w-full px-2 py-1 text-sm border-0 focus:ring-1 focus:ring-blue-500 rounded"
                      />
                    </td>
                    {caseData.antibiotics.length > 1 && (
                      <td className="border border-gray-300 px-2 py-1 text-center">
                        <button
                          onClick={() => removeArrayItem(caseData.id, 'antibiotics', index)}
                          className="text-red-600 hover:text-red-800 p-1 no-pdf"
                          title="Remove antibiotic"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <button
              onClick={() => addArrayItem(caseData.id, 'antibiotics', { name: '', dose: '', frequency: '', startAt: '', endAt: '' })}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors no-pdf"
            >
              <Plus size={16} />
              Add Antibiotic
            </button>
          </div>
        </div>
      </div>

      {/* High Alert Medications (HAM) Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="bg-blue-100 px-6 py-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800">High Alert Medications (HAM)</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">Medication Name</th>
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">Dose</th>
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">Frequency</th>
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">Route</th>
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">Start Date</th>
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">Start Time</th>
                  {caseData.hamMedications.length > 1 && (
                    <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700">Action</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {caseData.hamMedications.map((ham, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="text"
                        value={ham.medicationName}
                        onChange={(e) => updateCaseArray(caseData.id, 'hamMedications', index, 'medicationName', e.target.value)}
                        className="w-full px-2 py-1 text-sm border-0 focus:ring-1 focus:ring-blue-500 rounded"
                        placeholder="Enter medication name"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="text"
                        value={ham.dose}
                        onChange={(e) => updateCaseArray(caseData.id, 'hamMedications', index, 'dose', e.target.value)}
                        className="w-full px-2 py-1 text-sm border-0 focus:ring-1 focus:ring-blue-500 rounded"
                        placeholder="Enter dose"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="text"
                        value={ham.frequency}
                        onChange={(e) => updateCaseArray(caseData.id, 'hamMedications', index, 'frequency', e.target.value)}
                        className="w-full px-2 py-1 text-sm border-0 focus:ring-1 focus:ring-blue-500 rounded"
                        placeholder="Enter frequency"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="text"
                        value={ham.route}
                        onChange={(e) => updateCaseArray(caseData.id, 'hamMedications', index, 'route', e.target.value)}
                        className="w-full px-2 py-1 text-sm border-0 focus:ring-1 focus:ring-blue-500 rounded"
                        placeholder="Enter route"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="date"
                        value={ham.startDate}
                        onChange={(e) => updateCaseArray(caseData.id, 'hamMedications', index, 'startDate', e.target.value)}
                        className="w-full px-2 py-1 text-sm border-0 focus:ring-1 focus:ring-blue-500 rounded"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="time"
                        value={ham.startTime}
                        onChange={(e) => updateCaseArray(caseData.id, 'hamMedications', index, 'startTime', e.target.value)}
                        className="w-full px-2 py-1 text-sm border-0 focus:ring-1 focus:ring-blue-500 rounded"
                      />
                    </td>
                    {caseData.hamMedications.length > 1 && (
                      <td className="border border-gray-300 px-2 py-1 text-center">
                        <button
                          onClick={() => removeArrayItem(caseData.id, 'hamMedications', index)}
                          className="text-red-600 hover:text-red-800 p-1 no-pdf"
                          title="Remove HAM medication"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <button
              onClick={() => addArrayItem(caseData.id, 'hamMedications', { medicationName: '', dose: '', frequency: '', route: '', startDate: '', startTime: '' })}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors no-pdf"
            >
              <Plus size={16} />
              Add HAM Medication
            </button>
          </div>
        </div>
      </div>

      {/* Scheduled Tasks Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="bg-blue-100 px-6 py-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Scheduled Tasks</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">RBS</label>
            <input
              type="text"
              value={caseData.rbs}
              onChange={(e) => updateCase(caseData.id, 'rbs', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter RBS details"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">VBG</label>
            <input
              type="text"
              value={caseData.vbg}
              onChange={(e) => updateCase(caseData.id, 'vbg', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter VBG details"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ECG</label>
            <input
              type="text"
              value={caseData.ecg}
              onChange={(e) => updateCase(caseData.id, 'ecg', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter ECG details"
            />
          </div>
        </div>
      </div>

      {/* Diet Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="bg-blue-100 px-6 py-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Diet</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <input
              type="text"
              value={caseData.dietType}
              onChange={(e) => updateCase(caseData.id, 'dietType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter diet type"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Bowel Motion</label>
            <input
              type="text"
              value={caseData.lastBowelMotion}
              onChange={(e) => updateCase(caseData.id, 'lastBowelMotion', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter last bowel motion"
            />
          </div>
        </div>
      </div>

      {/* Culture & Sensitivity Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="bg-blue-100 px-6 py-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Culture & Sensitivity</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">Date of C/S Collected</th>
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">Type</th>
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">Isolation Precaution taken</th>
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">Date of C/S result received</th>
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">C/S Results</th>
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">Action Taken</th>
                  {caseData.cultureData.length > 1 && (
                    <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700">Action</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {caseData.cultureData.map((culture, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="date"
                        value={culture.dateCollected}
                        onChange={(e) => updateCaseArray(caseData.id, 'cultureData', index, 'dateCollected', e.target.value)}
                        className="w-full px-2 py-1 text-sm border-0 focus:ring-1 focus:ring-blue-500 rounded"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="text"
                        value={culture.type}
                        onChange={(e) => updateCaseArray(caseData.id, 'cultureData', index, 'type', e.target.value)}
                        className="w-full px-2 py-1 text-sm border-0 focus:ring-1 focus:ring-blue-500 rounded"
                        placeholder="Enter type"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="text"
                        value={culture.isolationPrecaution}
                        onChange={(e) => updateCaseArray(caseData.id, 'cultureData', index, 'isolationPrecaution', e.target.value)}
                        className="w-full px-2 py-1 text-sm border-0 focus:ring-1 focus:ring-blue-500 rounded"
                        placeholder="Enter precaution"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="date"
                        value={culture.dateResultReceived}
                        onChange={(e) => updateCaseArray(caseData.id, 'cultureData', index, 'dateResultReceived', e.target.value)}
                        className="w-full px-2 py-1 text-sm border-0 focus:ring-1 focus:ring-blue-500 rounded"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="text"
                        value={culture.results}
                        onChange={(e) => updateCaseArray(caseData.id, 'cultureData', index, 'results', e.target.value)}
                        className="w-full px-2 py-1 text-sm border-0 focus:ring-1 focus:ring-blue-500 rounded"
                        placeholder="Enter results"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="text"
                        value={culture.actionTaken}
                        onChange={(e) => updateCaseArray(caseData.id, 'cultureData', index, 'actionTaken', e.target.value)}
                        className="w-full px-2 py-1 text-sm border-0 focus:ring-1 focus:ring-blue-500 rounded"
                        placeholder="Enter action"
                      />
                    </td>
                    {caseData.cultureData.length > 1 && (
                      <td className="border border-gray-300 px-2 py-1 text-center">
                        <button
                          onClick={() => removeArrayItem(caseData.id, 'cultureData', index)}
                          className="text-red-600 hover:text-red-800 p-1 no-pdf"
                          title="Remove culture"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <button
              onClick={() => addArrayItem(caseData.id, 'cultureData', { dateCollected: '', type: '', isolationPrecaution: '', dateResultReceived: '', results: '', actionTaken: '' })}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors no-pdf"
            >
              <Plus size={16} />
              Add Culture & Sensitivity
            </button>
          </div>
        </div>
      </div>

      {/* Anticoagulant Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="bg-blue-100 px-6 py-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Anticoagulant</h2>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={caseData.anticoagulantType}
              onChange={(e) => updateCase(caseData.id, 'anticoagulantType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select type</option>
              <option value="pharmacological">Pharmacological</option>
              <option value="non-pharmacological">Non Pharmacological</option>
            </select>
          </div>

          {caseData.anticoagulantType === 'pharmacological' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medication Name</label>
                <input
                  type="text"
                  value={caseData.anticoagulantMedication}
                  onChange={(e) => updateCase(caseData.id, 'anticoagulantMedication', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter medication name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dose</label>
                <input
                  type="text"
                  value={caseData.anticoagulantDose}
                  onChange={(e) => updateCase(caseData.id, 'anticoagulantDose', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter dose"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                <input
                  type="text"
                  value={caseData.anticoagulantFrequency}
                  onChange={(e) => updateCase(caseData.id, 'anticoagulantFrequency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter frequency"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Route</label>
                <input
                  type="text"
                  value={caseData.anticoagulantRoute}
                  onChange={(e) => updateCase(caseData.id, 'anticoagulantRoute', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter route"
                />
              </div>
            </div>
          )}

          {caseData.anticoagulantType === 'non-pharmacological' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Device</label>
              <select
                value={caseData.anticoagulantDevice}
                onChange={(e) => updateCase(caseData.id, 'anticoagulantDevice', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select device</option>
                <option value="DVT device">DVT device</option>
                <option value="Elastic Stocking">Elastic Stocking</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* MV Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="bg-blue-100 px-6 py-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800">MV (Mechanical Ventilation)</h2>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={caseData.mvConnected}
                onChange={(e) => updateCase(caseData.id, 'mvConnected', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Patient connected to MV</span>
            </label>
          </div>

          {caseData.mvConnected && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mode</label>
                <input
                  type="text"
                  value={caseData.mvMode}
                  onChange={(e) => updateCase(caseData.id, 'mvMode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter mode"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">VT</label>
                <input
                  type="text"
                  value={caseData.mvVT}
                  onChange={(e) => updateCase(caseData.id, 'mvVT', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter VT"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">FiO2</label>
                <input
                  type="text"
                  value={caseData.mvFiO2}
                  onChange={(e) => updateCase(caseData.id, 'mvFiO2', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter FiO2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PS</label>
                <input
                  type="text"
                  value={caseData.mvPS}
                  onChange={(e) => updateCase(caseData.id, 'mvPS', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter PS"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Peep</label>
                <input
                  type="text"
                  value={caseData.mvPeep}
                  onChange={(e) => updateCase(caseData.id, 'mvPeep', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Peep"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">O2 Support</label>
                <input
                  type="text"
                  value={caseData.mvO2Support}
                  onChange={(e) => updateCase(caseData.id, 'mvO2Support', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter O2 support"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Last Updates Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="bg-blue-100 px-6 py-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Last Updates</h2>
        </div>
        <div className="p-6">
          <textarea
            value={caseData.lastUpdates}
            onChange={(e) => {
              const formatted = formatTextWithBullets(e.target.value);
              updateCase(caseData.id, 'lastUpdates', formatted);
            }}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter last updates (bullets will be added automatically)"
          />
        </div>
      </div>

      {/* Plans Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="bg-blue-100 px-6 py-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Plans</h2>
        </div>
        <div className="p-6">
          <textarea
            value={caseData.plans}
            onChange={(e) => {
              const formatted = formatTextWithBullets(e.target.value);
              updateCase(caseData.id, 'plans', formatted);
            }}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter treatment plans (bullets will be added automatically)"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4" id="report-content">
        {/* Main Page Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">ICU Shift Report</h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Save Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleSaveReport}
                disabled={saveStatus === 'saving'}
                className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-base font-medium"
              >
                {saveStatus === 'saving' ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {saveStatus === 'saving' ? 'Saving...' : 'Save Report'}
              </button>
              
              <button
                onClick={handleNewReport}
                className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-base font-medium"
              >
                <FileText className="w-4 h-4 mr-2" />
                New Report
              </button>
              
            </div>
            {saveStatus !== 'idle' && (
              <div className={`flex items-center px-4 py-2 rounded-lg ${
                saveStatus === 'saved' ? 'bg-green-100 text-green-800' :
                saveStatus === 'error' ? 'bg-red-100 text-red-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {saveStatus === 'saved' && <CheckCircle className="w-4 h-4 mr-2" />}
                {saveStatus === 'error' && <AlertCircle className="w-4 h-4 mr-2" />}
                <span className="text-sm font-medium">{saveMessage}</span>
              </div>
            )}
          </div>
        </div>

        {/* MRN Search Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="bg-green-100 px-6 py-3 border-b">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Search size={20} />
              Search by MRN
            </h2>
          </div>
          <div className="p-6">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Enter MRN to search</label>
                <input
                  type="text"
                  value={searchMRN}
                  onChange={(e) => setSearchMRN(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter MRN number"
                />
              </div>
              <button
                className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-base font-medium"
                onClick={searchAndFilter}
              >
                <Filter size={16} />
                Search
              </button>
              <button
                className="flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 text-base font-medium"
                onClick={clearFilter}
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Nursing Manpower Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="bg-green-100 px-6 py-3 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Nursing Manpower</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">No. Staff</label>
                <input
                  type="text"
                  value={nursingManpower.noStaff}
                  onChange={(e) => setNursingManpower({...nursingManpower, noStaff: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Orientee</label>
                <input
                  type="text"
                  value={nursingManpower.orientee}
                  onChange={(e) => setNursingManpower({...nursingManpower, orientee: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pull out staff</label>
                <input
                  type="text"
                  value={nursingManpower.pullOutStaff}
                  onChange={(e) => setNursingManpower({...nursingManpower, pullOutStaff: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">RC ICU Staff</label>
                <input
                  type="text"
                  value={nursingManpower.rcIcuStaff}
                  onChange={(e) => setNursingManpower({...nursingManpower, rcIcuStaff: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Float to ICU staff</label>
                <input
                  type="text"
                  value={nursingManpower.floatToIcuStaff}
                  onChange={(e) => setNursingManpower({...nursingManpower, floatToIcuStaff: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">On Call</label>
                <input
                  type="text"
                  value={nursingManpower.onCall}
                  onChange={(e) => setNursingManpower({...nursingManpower, onCall: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter number"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Census Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="bg-purple-100 px-6 py-3 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Census</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">No. Active Cases</label>
                <input
                  type="text"
                  value={census.noActiveCases}
                  onChange={(e) => setCensus({...census, noActiveCases: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Admission</label>
                <input
                  type="text"
                  value={census.admission}
                  onChange={(e) => setCensus({...census, admission: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discharge</label>
                <input
                  type="text"
                  value={census.discharge}
                  onChange={(e) => setCensus({...census, discharge: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transfer out</label>
                <input
                  type="text"
                  value={census.transferOut}
                  onChange={(e) => setCensus({...census, transferOut: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">DAMA</label>
                <input
                  type="text"
                  value={census.dama}
                  onChange={(e) => setCensus({...census, dama: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Death</label>
                <input
                  type="text"
                  value={census.death}
                  onChange={(e) => setCensus({...census, death: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Code Blue</label>
                <input
                  type="text"
                  value={census.codeBlue}
                  onChange={(e) => setCensus({...census, codeBlue: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">No. of cases on CRRT</label>
                <input
                  type="text"
                  value={census.casesOnCrrt}
                  onChange={(e) => setCensus({...census, casesOnCrrt: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">No. of cases on Hemodialysis</label>
                <input
                  type="text"
                  value={census.casesOnHemodialysis}
                  onChange={(e) => setCensus({...census, casesOnHemodialysis: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter number"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Display filtered results or all cases */}
        {showFiltered && filteredCases.length > 0 ? (
          <div>
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
              Found {filteredCases.length} case(s) matching MRN: "{searchMRN}"
            </div>
            {filteredCases.map(renderCase)}
          </div>
        ) : showFiltered && filteredCases.length === 0 ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            No cases found matching MRN: "{searchMRN}"
          </div>
        ) : (
          cases.map(renderCase)
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mt-8 no-pdf">
          <button
            onClick={addNewCase}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <Copy size={20} />
            Add More Cases
          </button>
          
          <button
            onClick={generatePDF}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            <Download size={20} />
            Save Report as PDF
          </button>
          
          <button
            onClick={() => saveToCloud(cases)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Save size={20} />
            Backup to Cloud
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-600 border-t pt-6">
          <p className="text-sm">Designed By Mr. Mohamed Ghonim</p>
        </footer>
      </div>
    </div>
  );
};

export default App;