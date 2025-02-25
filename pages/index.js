import { useState } from 'react';
import Scanner from '../components/Scanner';
import ManifestForm from '../components/ManifestForm';
import LoadingAnimation from '../components/LoadingAnimation';

export default function Home() {
  const [scanResult, setScanResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [manifest, setManifest] = useState(null);
  const [designExamples, setDesignExamples] = useState(null);

  const handleScanComplete = async (imageData) => {
    setIsLoading(true);
    try {
      // Proses OCR
      const ocrResponse = await fetch('/api/ocr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageData }),
      });
      const ocrData = await ocrResponse.json();

      // Koreksi AI
      const aiResponse = await fetch('/api/ai-correction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: ocrData.text }),
      });
      const correctedData = await aiResponse.json();

      setScanResult(correctedData);
      setDesignExamples(correctedData.designExamples);
    } catch (error) {
      console.error('Error processing scan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManifestSubmit = (formData) => {
    setManifest(formData);
  };

  return (
    <div className="container">
      <h1>OCR EPS Scanner</h1>
      <Scanner onScanComplete={handleScanComplete} />
      {isLoading && <LoadingAnimation />}
      {scanResult && (
        <>
          <ManifestForm initialData={scanResult} onSubmit={handleManifestSubmit} />
          <div className="scan-result">
            <h2>Hasil Scan</h2>
            <img src={scanResult.imageUrl || "/placeholder.svg"} alt="Scanned Image" />
            <pre>{JSON.stringify(scanResult.text, null, 2)}</pre>
          </div>
          <div className="design-examples">
            <h2>Contoh Desain</h2>
            {designExamples.map((design, index) => (
              <div key={index} className="design-example">
                <h3>Desain {index + 1}</h3>
                <img src={design.imageUrl || "/placeholder.svg"} alt={`Design Example ${index + 1}`} />
              </div>
            ))}
          </div>
        </>
      )}
      {manifest && (
        <div className="manifest">
          <h2>Manifest Final</h2>
          <pre>{JSON.stringify(manifest, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}