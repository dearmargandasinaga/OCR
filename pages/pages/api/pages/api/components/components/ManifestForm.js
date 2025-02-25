import { useState } from 'react';

export default function ManifestForm({ initialData, onSubmit }) {
  const [formData, setFormData] = useState(initialData || {});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="manifest-form">
      {Object.entries(formData).map(([key, value]) => (
        <div key={key}>
          <label htmlFor={key}>{key}</label>
          <input
            type="text"
            id={key}
            name={key}
            value={value}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit">Generate Manifest</button>
    </form>
  );
}