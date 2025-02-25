import axios from 'axios';

export async function processOCR(imageData) {
  const apiKey = process.env.OCR_SPACE_API_KEY;
  const apiUrl = 'https://api.ocr.space/parse/image';

  const formData = new FormData();
  formData.append('apikey', apiKey);
  formData.append('base64Image', imageData);
  formData.append('language', 'eng');
  formData.append('isOverlayRequired', 'true');

  try {
    const response = await axios.post(apiUrl, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    console.error('OCR API Error:', error);
    throw new Error('OCR processing failed');
  }
}