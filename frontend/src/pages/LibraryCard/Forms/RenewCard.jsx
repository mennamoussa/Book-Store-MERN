import React, { useState } from 'react';
import './FormStyle.css';

const RenewCard = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    cardNumber: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Renew Card Data:', formData);
  };

  return (
    <div className="form-container">
      <h2>Renew Library Card</h2>
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
          type="text"
          name="cardNumber"
          placeholder="Library Card Number"
          value={formData.cardNumber}
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
        <button type="submit">Submit Renewal Request</button>
      </form>
    </div>
  );
};

export default RenewCard;
