import React from 'react';
import { usePdfExtractor } from '../hooks/usePdfExtractor';
import type { PDF } from '../types';

interface HomeProps {
  activeTab: string;
  pdfs: PDF[];
  selectedPdf: PDF | null;
}

const Home: React.FC<HomeProps> = ({ selectedPdf }) => {
  const { text, loading, error } = usePdfExtractor(selectedPdf);

  if (!selectedPdf) return <p>No PDF selected</p>;
  if (loading) return <p>Extracting text...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="font-bold mb-2">{selectedPdf.name}</h2>
      <div className="max-h-[500px] overflow-y-auto bg-gray-50 p-4 rounded">
        {text ? text.slice(0, 1000) + '...' : 'No text found'}
      </div>
    </div>
  );
};

export default Home;