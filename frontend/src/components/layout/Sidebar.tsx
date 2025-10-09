import React from 'react';
import type { PDF, TabType } from '../../types';
import Button from '../common/Button';
import { X } from 'lucide-react'; // You can use this or just ✕

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  pdfs: PDF[];
  selectedPdf: PDF | null;
  onSelectPdf: (pdf: PDF) => void;
  onUploadPdf: (file: File) => void;
  onLoadSamples: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen, onClose, activeTab, onTabChange,
  pdfs, selectedPdf, onSelectPdf, onUploadPdf, onLoadSamples
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file) onUploadPdf(file);
  };

  return (
    <aside
      className={`
        fixed z-20 top-0 left-0 h-full w-64 bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className="flex flex-col h-full p-4">
        {/* Header with title + close button */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">RevisionHub</h1>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-200 transition"
            title="Close Sidebar"
          >
            <X className="w-5 h-5 text-gray-700"/>
          </button>
        </div>
        
        {/* Tabs */}
        <div className="mb-6">
          {['quiz', 'chat', 'progress'].map(tab => (
            <button
              key={tab}
              onClick={() => onTabChange(tab as TabType)}
              className={`w-full text-left p-2 rounded ${activeTab===tab?'bg-blue-50 text-blue-600':'text-gray-700 hover:bg-gray-50'}`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* PDF List */}
        <div className="flex-1 mb-4">
          <h3 className="text-sm font-semibold mb-2">Your PDFs</h3>
          {pdfs.length===0 ? (
            <Button onClick={onLoadSamples} variant="primary">Load Sample PDFs</Button>
          ) : pdfs.map(pdf => (
            <button
              key={pdf.id}
              onClick={() => onSelectPdf(pdf)}
              className={`w-full text-left p-2 rounded ${selectedPdf?.id===pdf.id?'bg-blue-50 text-blue-600':'text-gray-600 hover:bg-gray-50'}`}
            >
              {pdf.name}
            </button>
          ))}
        </div>

        {/* Upload PDF */}
        <input ref={fileInputRef} type="file" accept=".pdf" className="hidden" onChange={handleFileChange}/>
        <Button onClick={()=>fileInputRef.current?.click()} variant="primary">Upload PDF</Button>
      </div>
    </aside>
  );
};

export default Sidebar;