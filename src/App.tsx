import React, { useState } from 'react';
import MainLayout from './components/layout/Mainlayout';
import ChatTab from './components/layout/ChatTab';
import Home from './pages/Home';
import type { TabType, PDF } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('quiz');
  const [pdfs, setPdfs] = useState<PDF[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<PDF | null>(null);

  const handleSelectPdf = (pdf: PDF) => setSelectedPdf(pdf);

const handleUploadPdf = (file: File) => {
  const blobUrl = URL.createObjectURL(file);
  const newPdf = { id: Date.now().toString(), name: file.name, url: blobUrl, file };
  setPdfs(prev => [...prev, newPdf]);
  setSelectedPdf(newPdf);
};

  const loadSamples = () => {
    const samples: PDF[] = [
      { id: '1', name: 'NCERT Class XI Physics - Chapter 1', url: '/pdfs/Chapter1.pdf' },
      { id: '2', name: 'NCERT Class XI Physics - Chapter 2', url: '/pdfs/Chapter2.pdf' },
    ];
    setPdfs(samples);
  };

  return (
    <MainLayout
      pdfs={pdfs}
      selectedPdf={selectedPdf}
      onSelectPdf={handleSelectPdf}
      onUploadPdf={handleUploadPdf}
      onLoadSamples={loadSamples}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {activeTab === 'chat' && <ChatTab selectedPdf={selectedPdf} />}
      {activeTab === 'quiz' && <Home activeTab="quiz" pdfs={pdfs} selectedPdf={selectedPdf} />}
    </MainLayout>
  );
};

export default App;