import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    birthdate: '',
    phone: '',
    gender: '',
    address: '',
    libraryCard: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      const res = await axios.post('http://localhost:5001/users/register', formData);
      setMessage('✅ Registration successful!');
      console.log(res.data);
      navigate('/login'); 
    } catch (error) {
      console.error(error);
      setMessage(`❌ ${error.response?.data?.message || 'Registration failed'}`);
    }
  };

  return (
    <div className="register-container">
      <h2>Create Your Account</h2>
      {message && <p>{message}</p>}
      <form className="register-form" onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="date" name="birthdate" onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <select name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
        <input type="text" name="libraryCard" placeholder="Library Card (Optional)" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
