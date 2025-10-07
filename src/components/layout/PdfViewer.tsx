// components/common/PdfViewer.tsx
import React, { useState, useMemo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import type { PDF } from '../../types';
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css" 
import workerSrc from 'pdfjs-dist/build/pdf.worker.mjs?url'; // add ?url for Vite
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;




interface PdfViewerProps {
  pdfFile: PDF | null;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfFile }) => {
  const [numPages, setNumPages] = useState<number>(0);

  const options = useMemo(() => ({
  cMapUrl: 'cmaps/',
  cMapPacked: true,
}), []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  if (!pdfFile) return <div className="text-gray-500">No PDF selected</div>;

  return (
    <div className="border rounded h-full overflow-auto p-2 bg-white">
    <Document file={pdfFile.url || pdfFile.file} options={options} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from({ length: numPages }, (_, index) => (
          <div key={index} className="mb-4">
            <Page pageNumber={index + 1} width={400} />
          </div>
        ))}
      </Document>
    </div>
  );
};

export default PdfViewer;