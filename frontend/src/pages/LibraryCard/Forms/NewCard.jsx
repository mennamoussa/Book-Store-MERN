import React, { useState } from 'react';
import './FormStyle.css';

const NewCard = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    address: '',
    email: '',
    phone: '',
    idProof: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'idProof') {
      setFormData((prev) => ({ ...prev, idProof: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Request New Card Data:', formData);
  };

  return (
    <div className="form-container">
      <h2>Request New Library Card</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dateOfBirth"
          placeholder="Date of Birth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Residential Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <label>
          Upload ID Proof:
          <input
            type="file"
            name="idProof"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default NewCard;
