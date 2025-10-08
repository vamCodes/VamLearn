import { useState, useEffect } from 'react';
import { extractPdfText } from '../utils/helperfunctions';
import type { PDF } from '../types';

export const usePdfExtractor = (selectedPdf: PDF | null) => {
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedPdf) return;

    const loadText = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await extractPdfText(selectedPdf.file || selectedPdf.url);
        console.log('Extracted text:', result); // to see the extracted pdf 
        setText(result);
      } catch (err) {
        setError('Failed to extract PDF text.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadText();
  }, [selectedPdf]);

  return { text, loading, error };
};