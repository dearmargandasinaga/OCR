import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function ManifestOutgoing() {
  const [date, setDate] = useState(new Date());
  const [company, setCompany] = useState('Lion Parcel');
  const [isLoading, setIsLoading] = useState(false);
  const [manifestData, setManifestData] = useState([]);
  const [currentBarcode, setCurrentBarcode] = useState('');
  const barcodeInputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    // Load data from cookies if available
    const savedManifest = localStorage.getItem('outgoingManifest');
    if (savedManifest) {
      setManifestData(JSON.parse(savedManifest));
    }
  }, []);

  useEffect(() => {
    // Focus on barcode input when component mounts
    if (barcodeInputRef.current) {
      barcodeInputRef.current.focus();
    }
  }, []);

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      router.push('/manifest-form');
    }, 2000);
  };

  const handleBarcodeSubmit = async (e) => {
    e.preventDefault();
    if (!currentBarcode) return;

    const existingItem = manifestData.find(item => item.barcode === currentBarcode);
    if (existingItem) {
      playSound('error');
      alert('Kode sudah 2 kali scan!');
      setCurrentBarcode('');
      return;
    }

    // Simulate API call to validate barcode
    const isValid = await validateBarcode(currentBarcode);
    if (isValid) {
      playSound('success');
      setManifestData([...manifestData, { barcode: currentBarcode, timestamp: new Date() }]);
      setCurrentBarcode('');
    } else {
      playSound('error');
      alert('Kode tidak valid!');
    }
  };

  const validateBarcode = async (barcode) => {
    // Simulate API call to validate barcode
    return new Promise(resolve => {
      setTimeout(() => resolve(true), 500);
    });
  };

  const playSound = (type) => {
    const audio = new Audio(type === 'success' ? '/success.mp3' : '/error.mp3');
    audio.play();
  };

  const removeItem = (barcode) => {
    setManifestData(manifestData.filter(item => item.barcode !== barcode));
  };

  const saveManifest = (type) => {
    // Save to cookies
    localStorage.setItem('outgoingManifest', JSON.stringify(manifestData));

    if (type === 'print' || type === 'print-save') {
      window.print();
    }

    if (type === 'pdf-print') {
      // Generate PDF and print
      // You'll need to implement PDF generation here
      console.log('Generating PDF...');
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Manifest Out Going Final</h1>
      <form onSubmit={handleSubmit}>
        <DatePicker selected={date} onChange={handleDateChange} />
        <select value={company} onChange={handleCompanyChange}>
          <option value="Lion Parcel">Lion Parcel</option>
        </select>
        <button type="submit">Buat Manifest</button>
      </form>

      <div className="barcode-scanner">
        <h2>Scan Barcode</h2>
        <form onSubmit={handleBarcodeSubmit}>
          <input
            type="text"
            ref={barcodeInputRef}
            value={currentBarcode}
            onChange={(e) => setCurrentBarcode(e.target.value)}
            placeholder="Scan atau masukkan barcode"
          />
          <button type="submit">Tambah</button>
        </form>
      </div>

      <div className="manifest-list">
        <h2>Daftar Manifest</h2>
        <ul>
          {manifestData.map((item, index) => (
            <li key={index}>
              {item.barcode} - {item.timestamp.toLocaleString()}
              <button onClick={() => removeItem(item.barcode)}>Hapus</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="manifest-actions">
        <button onClick={() => saveManifest('print')}>Print Manifest</button>
        <button onClick={() => saveManifest('print-save')}>Print dan Simpan di Cookies</button>
        <button onClick={() => saveManifest('pdf-print')}>Simpan PDF & Print</button>
      </div>
    </div>
  );
}