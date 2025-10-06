import React from 'react';
import MainLayout from './components/layout/Mainlayout';
import Home from './pages/Home';
import type { PDF, TabType } from './types';

const seed: PDF[] = [
  { id: 'ncert1', name: 'NCERT XI Physics Ch1', url:'/samples/ncert-xi-physics-ch1.pdf', type: 'sample', uploadDate: new Date('2023-01-01') },
  { id: 'ncert2', name: 'NCERT XI Physics Ch2', url:'/samples/ncert-xi-physics-ch2.pdf', type: 'sample', uploadDate: new Date('2023-01-02') },
];

function App() {
  const [activeTab,setActiveTab] = React.useState<TabType>('quiz');
  const [pdfs,setPdfs] = React.useState<PDF[]>(seed);
  const [selectedPdf,setSelectedPdf] = React.useState<PDF | null>(seed[0]);

  const onUploadPdf = (file: File)=>{
    const pdf: PDF = { id:`local-${Date.now()}`, name:file.name, url:URL.createObjectURL(file) };
    setPdfs(prev=>[pdf,...prev]);
    setSelectedPdf(pdf);
  }

  const onLoadSamples = ()=>{ setPdfs(seed); setSelectedPdf(seed[0]); }

  return (
    <MainLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      pdfs={pdfs}
      selectedPdf={selectedPdf}
      onSelectPdf={setSelectedPdf}
      onUploadPdf={onUploadPdf}
      onLoadSamples={onLoadSamples}
    >
      <Home activeTab={activeTab} pdfs={pdfs} selectedPdf={selectedPdf} />
    </MainLayout>
  );
}

export default App;