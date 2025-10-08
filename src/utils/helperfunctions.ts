import * as pdfjsLib from 'pdfjs-dist';

// Worker setup
import workerSrc from 'pdfjs-dist/build/pdf.worker.mjs?url';
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

// Utility: Split into chunks (~3000 words each)
function chunkText(text: string, maxWords = 3000): string[] {
  const words = text.split(/\s+/);
  const chunks = [];
  for (let i = 0; i < words.length; i += maxWords) {
    chunks.push(words.slice(i, i + maxWords).join(' '));
  }
  return chunks;
}

export const extractPdfText = async (file: File | string): Promise<string[]> => {
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

  // Split into chunks to avoid token overload
  const chunks = chunkText(fullText.trim());
  console.log(`Extracted ${chunks.length} chunks from PDF.`);
  return chunks;
};