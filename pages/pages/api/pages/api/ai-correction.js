import { correctText } from '../../lib/aiCorrection';
import { generateManifest } from '../../lib/manifestGenerator';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { text } = req.body;
      const correctedText = await correctText(text);
      const manifest = generateManifest(correctedText);
      const designExamples = generateDesignExamples(manifest);
      res.status(200).json({ 
        text: correctedText, 
        manifest, 
        designExamples 
      });
    } catch (error) {
      res.status(500).json({ error: 'AI correction failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

function generateDesignExamples(manifest) {
  // Simulasi pembuatan desain contoh
  return [
    { imageUrl: 'https://example.com/design1.jpg' },
    { imageUrl: 'https://example.com/design2.jpg' }
  ];
}