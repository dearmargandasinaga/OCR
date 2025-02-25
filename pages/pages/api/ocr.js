import { processOCR } from '../../lib/ocrProcessing';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { image } = req.body;
      const ocrResult = await processOCR(image);
      res.status(200).json(ocrResult);
    } catch (error) {
      res.status(500).json({ error: 'OCR processing failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}