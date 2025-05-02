import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post('http://localhost:5001/users/login', formData);
      const data = res.data;
  
      // ✅ Save token and user to localStorage
      localStorage.setItem('token', data.accesstoken);
      localStorage.setItem('user', JSON.stringify(data.user));
  
      setMessage('✅ Login successful!');
      navigate('/'); 
    } catch (error) {
      console.error(error);
      setMessage(`❌ ${error.response?.data?.message || 'Login failed'}`);
    }
  };
  

  return (
    <div className="login-container">
      <h2>Login to Your Account</h2>
      {message && <p>{message}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
