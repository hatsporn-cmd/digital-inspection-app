import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  ClipboardCheck, 
  FileText, 
  FolderTree, 
  Bot, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  Upload, 
  Mic, 
  Building2, 
  FileCheck, 
  Bell,
  ChevronRight,
  ShieldAlert,
  Sparkles,
  Search,
  User,
  Radio
} from 'lucide-react';

export default function App() {
  // --- STATE MANAGEMENT ---
  const [lang, setLang] = useState('EN'); // 'TH' | 'EN'
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard | floors | inspections | records | documents | ai | handover
  const [selectedFloor, setSelectedFloor] = useState('8');
  const [selectedRoom, setSelectedRoom] = useState('801');
  const [selectedZone, setSelectedZone] = useState('Bathroom');

  // Form State for Inspection Submission
  const [formFloor, setFormFloor] = useState('8');
  const [formRoom, setFormRoom] = useState('801');
  const [formCategory, setFormCategory] = useState('Architecture');
  const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0]);
  const [formInspector, setFormInspector] = useState('Tanachock C. (Site Engineer)');
  const [formStatus, setFormStatus] = useState('Ready For Inspection');
  const [formComments, setFormComments] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [aiValidationResult, setAiValidationResult] = useState(null);

  // AI Assistant States
  const [isRecording, setIsRecording] = useState(false);

  // --- DICTIONARY FOR BILINGUAL SUPPORT ---
  const t = {
    TH: {
      platformTitle: "DIP Platform",
      subTitle: "Digital Inspection",
      projectName: "Boutique Bangkok Sukhumvit 5",
      liveSync: "Live Sync | Last updated: Just now",
      menu: {
        dashboard: "Dashboard",
        floors: "Floor Status",
        inspections: "Room Inspection...",
        records: "Inspection Records",
        documents: "Documents",
        ai: "AI Assistant",
        handover: "Handover Dashboard"
      },
      status: {
        passed: "Passed",
        failed: "Failed",
        ready: "Ready For Inspection",
        gray: "Not Submitted"
      },
      common: {
        totalRooms: "Total Rooms",
        passedRooms: "Passed Rooms",
        failedRooms: "Failed Rooms",
        readyForInspection: "Ready For Inspection",
        notSubmitted: "Not Submitted"
      }
    },
    EN: {
      platformTitle: "DIP Platform",
      subTitle: "Digital Inspection",
      projectName: "Boutique Bangkok Sukhumvit 5",
      liveSync: "Live Sync | Last updated: Just now",
      menu: {
        dashboard: "Dashboard",
        floors: "Floor Status",
        inspections: "Room Inspection...",
        records: "Inspection Records",
        documents: "Documents",
        ai: "AI Assistant",
        handover: "Handover Dashboard"
      },
      status: {
        passed: "Passed",
        failed: "Failed",
        ready: "Ready For Inspection",
        gray: "Not Submitted"
      },
      common: {
        totalRooms: "Total Rooms",
        passedRooms: "Passed Rooms",
        failedRooms: "Failed Rooms",
        readyForInspection: "Ready For Inspection",
        notSubmitted: "Not Submitted"
      }
    }
  };

  // --- MOCK ROOM INVENTORY DATABASE ---
  const roomDatabase = {
    8: [
      { id: '801', type: 'E', status: 'Failed', issue: 'Missing Mix Valve', inspector: 'Tanachock C.', date: '2026-10-24' },
      { id: '802', type: 'E', status: 'Passed', issue: null, inspector: 'Hatsaporn K.', date: '2026-10-23' },
      { id: '803', type: 'E', status: 'Passed', issue: null, inspector: 'Tanachock C.', date: '2026-10-23' },
      { id: '804', type: 'E', status: 'Ready', issue: null, inspector: '-', date: '-' },
      { id: '805', type: 'E', status: 'Not Submitted', issue: null, inspector: '-', date: '-' },
    ],
    7: [ { id: '701', type: 'E', status: 'Passed', issue: null, inspector: 'Tanachock C.', date: '2026-10-16' } ],
    6: [ { id: '601', type: 'E', status: 'Passed', issue: null, inspector: 'Tanachock C.', date: '2026-10-12' } ],
    5: [ { id: '501', type: 'E', status: 'Passed', issue: null, inspector: 'Tanachock C.', date: '2026-10-10' } ],
    4: [ { id: '401', type: 'E', status: 'Ready', issue: null, inspector: '-', date: '-' } ],
    3: [ { id: '301', type: 'E', status: 'Passed', issue: null, inspector: 'Tanachock C.', date: '2026-10-08' } ],
    2: [ { id: '217', type: 'A', status: 'Passed', issue: null, inspector: 'Tanachock C.', date: '2026-10-02' } ],
    1: [ { id: '121', type: 'D', status: 'Ready', issue: null, inspector: '-', date: '-' } ]
  };

  // Handle Simulated File Upload with AI Photo Validation
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setUploadedFiles(prev => [...prev, ...files]);
      setAiValidationResult({
        status: 'success',
        message: 'AI Validated: Evidence is clear & high quality',
        detectedWork: 'Mix Valve / Plumbing Installation',
        confidence: '96.4%'
      });
    }
  };

  const isFormValid = formFloor && formRoom && formCategory && formDate && formInspector && formStatus && uploadedFiles.length > 0;

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans text-slate-800 flex">
      
      {/* LEFT SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-[#0B132B] text-slate-300 flex flex-col justify-between flex-shrink-0 min-h-screen">
        <div>
          {/* Logo & Title Header */}
          <div className="p-4 flex items-center gap-3 border-b border-slate-800">
            <div className="bg-blue-600 p-2 rounded-xl text-white">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-white text-sm tracking-wide">DIP Platform</h1>
              <p className="text-[11px] text-slate-400">Digital Inspection</p>
            </div>
          </div>

          {/* Active Project Box */}
          <div className="p-3 mx-3 my-4 bg-[#1C2541] rounded-xl border border-slate-700/50">
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Active Project</p>
            <p className="text-xs font-bold text-white mt-0.5 truncate">Boutique BKK Sukhumvit 5</p>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1 text-xs font-medium">
            {[
              { id: 'dashboard', label: t[lang].menu.dashboard, icon: LayoutDashboard },
              { id: 'floors', label: t[lang].menu.floors, icon: Layers },
              { id: 'inspections', label: t[lang].menu.inspections, icon: ClipboardCheck, isMain: true },
              { id: 'records', label: t[lang].menu.records, icon: FileCheck },
              { id: 'documents', label: t[lang].menu.documents, icon: FolderTree },
              { id: 'ai', label: t[lang].menu.ai, icon: Bot },
              { id: 'handover', label: t[lang].menu.handover, icon: CheckCircle2 }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${
                    tab.isMain && !isActive
                      ? 'bg-blue-950/60 text-blue-300 border border-blue-800/60 hover:bg-blue-900/60'
                      : isActive
                        ? 'bg-blue-600 text-white font-semibold shadow-md'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{tab.label}</span>
                  </div>
                  {tab.isMain && (
                    <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Main</span>
                  )}
                  {isActive && !tab.isMain && (
                    <ChevronRight className="w-3.5 h-3.5" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Profile Footer */}
        <div className="p-3 border-t border-slate-800 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs flex-shrink-0">
            <User className="w-4 h-4" />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">Tanachock C.</p>
            <p className="text-[10px] text-slate-400 truncate">Site Engineer</p>
          </div>
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP HEADER BAR */}
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center sticky top-0 z-40">
          
          {/* Breadcrumb Path */}
          <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <span>Boutique Bangkok Sukhumvit 5</span>
            <span>/</span>
            <span className="text-slate-900 font-bold capitalize">{activeTab}</span>
          </div>

          {/* Right Header Tools */}
          <div className="flex items-center gap-3">
            
            {/* Language Switcher */}
            <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs font-bold border border-slate-200">
              <button 
                onClick={() => setLang('TH')}
                className={`px-2.5 py-1 rounded-md transition ${lang === 'TH' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                TH
              </button>
              <button 
                onClick={() => setLang('EN')}
                className={`px-2.5 py-1 rounded-md transition ${lang === 'EN' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                EN
              </button>
            </div>

            {/* Notification Bell */}
            <div className="relative cursor-pointer p-1.5 hover:bg-slate-100 rounded-full transition">
              <Bell className="w-4 h-4 text-slate-600" />
              <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </div>

            {/* User Avatar Circle */}
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center cursor-pointer shadow-sm">
              SP
            </div>

          </div>
        </header>

        {/* MAIN BODY CONTENT */}
        <main className="p-6 space-y-6 flex-1 overflow-y-auto">
          
          {/* --- PAGE 1: DASHBOARD --- */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              
              {/* Page Title & Live Sync Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Dashboard</h2>
                  <p className="text-xs text-slate-500 font-medium">Boutique Bangkok Sukhumvit 5 · Hotel Project</p>
                </div>

                {/* Live Sync Badge */}
                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-700 w-max">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>((o)) Live Sync | Last updated: Just now</span>
                </div>
              </div>

              {/* Top 5 Metric KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                
                {/* Total Rooms */}
                <div className="bg-white rounded-xl p-4 border border-slate-200 border-l-4 border-l-slate-400 shadow-sm flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Total Rooms</p>
                    <p className="text-3xl font-black text-slate-800 mt-1">174</p>
                  </div>
                  <div className="bg-slate-100 p-2.5 rounded-xl text-slate-600">
                    <Building2 className="w-5 h-5" />
                  </div>
                </div>

                {/* Passed Rooms */}
                <div className="bg-white rounded-xl p-4 border border-slate-200 border-l-4 border-l-emerald-500 shadow-sm flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Passed Rooms</p>
                    <p className="text-3xl font-black text-emerald-600 mt-1">75</p>
                  </div>
                  <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>

                {/* Failed Rooms */}
                <div className="bg-white rounded-xl p-4 border border-slate-200 border-l-4 border-l-rose-500 shadow-sm flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Failed Rooms</p>
                    <p className="text-3xl font-black text-rose-600 mt-1">6</p>
                  </div>
                  <div className="bg-rose-50 p-2.5 rounded-xl text-rose-600">
                    <XCircle className="w-5 h-5" />
                  </div>
                </div>

                {/* Ready For Inspection */}
                <div className="bg-white rounded-xl p-4 border border-slate-200 border-l-4 border-l-blue-500 shadow-sm flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Ready For Inspection</p>
                    <p className="text-3xl font-black text-blue-600 mt-1">44</p>
                  </div>
                  <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>

                {/* Not Submitted */}
                <div className="bg-white rounded-xl p-4 border border-slate-200 border-l-4 border-l-slate-400 shadow-sm flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Not Submitted</p>
                    <p className="text-3xl font-black text-slate-700 mt-1">49</p>
                  </div>
                  <div className="bg-slate-100 p-2.5 rounded-xl text-slate-500">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                </div>

              </div>

              {/* CHARTS GRID */}
              <div className="grid lg:grid-cols-12 gap-6">
                
                {/* Left Chart: Inspection Status by Floor */}
                <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm mb-4">Inspection Status by Floor</h3>
                    
                    {/* Simulated Stacked Bar Chart */}
                    <div className="h-64 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-l border-slate-200 px-2 relative">
                      
                      {/* Y-Axis scale marks */}
                      <div className="absolute left-[-24px] top-0 bottom-0 flex flex-col justify-between text-[10px] text-slate-400 font-semibold">
                        <span>28</span>
                        <span>21</span>
                        <span>14</span>
                        <span>7</span>
                        <span>0</span>
                      </div>

                      {/* Floor Bars F1 to F8 */}
                      {[
                        { floor: 'F1', passed: 3, ready: 2, failed: 0, gray: 2 },
                        { floor: 'F2', passed: 5, ready: 3, failed: 0, gray: 3 },
                        { floor: 'F3', passed: 12, ready: 3, failed: 1, gray: 10 },
                        { floor: 'F4', passed: 11, ready: 8, failed: 1, gray: 6 },
                        { floor: 'F5', passed: 11, ready: 10, failed: 1, gray: 4 },
                        { floor: 'F6', passed: 11, ready: 8, failed: 1, gray: 6 },
                        { floor: 'F7', passed: 12, ready: 6, failed: 1, gray: 7 },
                        { floor: 'F8', passed: 10, ready: 7, failed: 1, gray: 4 },
                      ].map((item, idx) => (
                        <div key={idx} className="flex-1 flex flex-col justify-end items-center h-full max-w-[36px]">
                          <div className="w-full flex flex-col-reverse rounded-t overflow-hidden">
                            <div style={{ height: `${item.passed * 7}px` }} className="bg-emerald-500 w-full"></div>
                            <div style={{ height: `${item.failed * 7}px` }} className="bg-rose-500 w-full"></div>
                            <div style={{ height: `${item.ready * 7}px` }} className="bg-blue-500 w-full"></div>
                            <div style={{ height: `${item.gray * 7}px` }} className="bg-slate-400 w-full"></div>
                          </div>
                          <span className="text-[11px] text-slate-500 font-bold mt-2">{item.floor}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chart Legend */}
                  <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold text-slate-600 mt-4 pt-2">
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-rose-500 rounded-sm"></span> Failed</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-slate-400 rounded-sm"></span> Not Submitted</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-emerald-500 rounded-sm"></span> Passed</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-blue-500 rounded-sm"></span> Ready For Inspection</span>
                  </div>
                </div>

                {/* Right Chart: Inspection Result Summary (Donut Chart) */}
                <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm mb-4">Inspection Result Summary</h3>
                    
                    {/* Simulated SVG Donut Chart */}
                    <div className="relative w-44 h-44 mx-auto my-2 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path strokeDasharray="43, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10B981" strokeWidth="4.5" />
                        <path strokeDasharray="25, 100" strokeDashoffset="-43" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3B82F6" strokeWidth="4.5" />
                        <path strokeDasharray="28, 100" strokeDashoffset="-68" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#9CA3AF" strokeWidth="4.5" />
                        <path strokeDasharray="4, 100" strokeDashoffset="-96" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#EF4444" strokeWidth="4.5" />
                      </svg>
                    </div>
                  </div>

                  {/* Donut Legend List with values */}
                  <div className="space-y-2 text-xs font-semibold text-slate-700 pt-2 border-t border-slate-100">
                    <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span> Passed</span><span className="font-bold">75</span></div>
                    <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-rose-500 rounded-full"></span> Failed</span><span className="font-bold">6</span></div>
                    <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span> Ready For Inspection</span><span className="font-bold">44</span></div>
                    <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-slate-400 rounded-full"></span> Not Submitted</span><span className="font-bold">49</span></div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* --- PAGE 2: FLOOR STATUS VIEW --- */}
          {activeTab === 'floors' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900">Floor Status View</h2>
                <div className="flex bg-white p-1 rounded-lg border text-xs font-bold">
                  {['8','7','6','5','4','3','2','1'].map(f => (
                    <button key={f} onClick={() => setSelectedFloor(f)} className={`px-3 py-1.5 rounded ${selectedFloor === f ? 'bg-blue-600 text-white' : 'text-slate-600'}`}>
                      Floor {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="font-bold mb-4 text-slate-800">Floor {selectedFloor} Room Layout Grid</h3>
                <div className="grid grid-cols-5 gap-3">
                  {(roomDatabase[selectedFloor] || []).map(r => (
                    <button key={r.id} onClick={() => { setSelectedRoom(r.id); setActiveTab('records'); }} className="p-4 border rounded-xl bg-slate-50 hover:bg-blue-50 transition text-left">
                      <span className="font-black text-lg block text-slate-800">{r.id}</span>
                      <span className="text-xs text-slate-500 block">Type {r.type}</span>
                      <span className="inline-block mt-2 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">{r.status}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* --- OTHER PAGES PLACEHOLDERS --- */}
          {['inspections', 'records', 'documents', 'ai', 'handover'].includes(activeTab) && (
            <div className="bg-white p-8 rounded-xl border text-center space-y-3 max-w-2xl mx-auto my-12">
              <Sparkles className="w-10 h-10 text-blue-600 mx-auto" />
              <h3 className="font-bold text-lg capitalize">{activeTab} Module Active</h3>
              <p className="text-xs text-slate-500">Connected and ready on digital inspection platform backend.</p>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}