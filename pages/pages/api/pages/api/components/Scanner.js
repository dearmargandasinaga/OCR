import { useRef, useState } from 'react';

export default function Scanner({ onScanComplete }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);

  const startScanner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      videoRef.current.srcObject = stream;
      setIsScanning(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const imageData = canvas.toDataURL('image/jpeg');
    onScanComplete(imageData);
    setIsScanning(false);
    video.srcObject.getTracks().forEach(track => track.stop());
  };

  return (
    <div className="scanner">
      {!isScanning ? (
        <button onClick={startScanner}>Start Scanner</button>
      ) : (
        <>
          <video ref={videoRef} autoPlay playsInline />
          <button onClick={captureImage}>Capture Image</button>
        </>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}