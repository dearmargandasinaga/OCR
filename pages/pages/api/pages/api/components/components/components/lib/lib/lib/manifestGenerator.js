export function generateManifest(text) {
    // Implementasi sederhana, Anda perlu mengembangkan logika yang lebih canggih
    const lines = text.split('\n');
    const manifest = {
      recipientName: lines.find(l => l.includes('Recipient:'))?.split(':')[1]?.trim(),
      recipientAddress: lines.find(l => l.includes('Address:'))?.split(':')[1]?.trim(),
      trackingNumber: lines.find(l => l.includes('Tracking:'))?.split(':')[1]?.trim(),
      weight: lines.find(l => l.includes('Weight:'))?.split(':')[1]?.trim(),
    };
    return manifest;
  }