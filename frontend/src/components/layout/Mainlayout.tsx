import React from 'react';
import Sidebar from './Sidebar';
import type { PDF, TabType } from '../../types';

interface MainLayoutProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  pdfs: PDF[];
  selectedPdf: PDF | null;
  onSelectPdf: (pdf: PDF) => void;
  onUploadPdf: (file: File) => void;
  onLoadSamples: () => void;
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ activeTab, onTabChange, pdfs, selectedPdf, onSelectPdf, onUploadPdf, onLoadSamples, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={()=>setIsSidebarOpen(false)}
        activeTab={activeTab}
        onTabChange={onTabChange}
        pdfs={pdfs}
        selectedPdf={selectedPdf}
        onSelectPdf={onSelectPdf}
        onUploadPdf={onUploadPdf}
        onLoadSamples={onLoadSamples}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 ">
          <button onClick={()=>setIsSidebarOpen(true)} className="p-2 rounded-md hover:bg-gray-100 transition">
            <span className="font-bold">☰</span>
          </button>
          <h1 className="text-lg font-semibold">RevisionHub</h1>
        </header>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;