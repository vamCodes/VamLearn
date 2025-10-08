import * as pdfjsLib from 'pdfjs-dist';


// Ensure PDF.js worker is properly configured
import workerSrc from 'pdfjs-dist/build/pdf.worker.mjs?url';
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

export const extractPdfText = async (file: File | string): Promise<string> => {
  const loadingTask = pdfjsLib.getDocument(
    typeof file === 'string' ? file : { data: await file.arrayBuffer() }
  );
  const pdf = await loadingTask.promise;

  let fullText = '';
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    const pageText = content.items.map((item: any) => item.str).join(' ');
    fullText += pageText + '\n';
  }

  return fullText.trim();
};