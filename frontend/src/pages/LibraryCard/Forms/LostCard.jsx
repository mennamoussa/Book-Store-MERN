import React, { useState } from 'react';
import './FormStyle.css';

const LostCard = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    cardNumber: '',
    email: '',
    phone: '',
    comments: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Report Lost Card Data:', formData);
  };

  return (
    <div className="form-container">
      <h2>Report Lost Library Card</h2>
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
        <textarea
          name="comments"
          placeholder="Additional Comments"
          value={formData.comments}
          onChange={handleChange}
        />
        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
};

export default LostCard;
