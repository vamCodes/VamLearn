import React from 'react';
import type { TabType, PDF } from '../types';

interface HomeProps {
  activeTab: TabType;
  pdfs: PDF[];
  selectedPdf: PDF | null;
}

const Home: React.FC<HomeProps> = ({ activeTab, pdfs, selectedPdf }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Active Tab: {activeTab.toUpperCase()}</h2>
      
      {selectedPdf ? (
        <div>
          <h3 className="text-lg font-semibold mb-2">Selected PDF:</h3>
          <p>{selectedPdf.name}</p>
          {/* PDF viewer placeholder */}
          <div className="mt-4 border rounded p-4 bg-gray-100 h-64 flex items-center justify-center">
            PDF Viewer Placeholder
          </div>
        </div>
      ) : (
        <p>No PDF selected</p>
      )}
    </div>
  );
};

export default Home;