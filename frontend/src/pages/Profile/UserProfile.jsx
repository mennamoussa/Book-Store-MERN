import { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProfile.css';
import Navbar from '../../components/Navbar/Navbar';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const localUser = JSON.parse(localStorage.getItem('user'));
        const id = localUser._id;

        const res = await axios.get(`http://localhost:5001/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };
    fetchCurrentUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  if (!user) return <p className="loading-msg">Loading profile...</p>;

  return (
    <>
    <Navbar />
     <div className="profile-container">
      <div className="profile-card">
        <h2>Hello, {user.firstName} 👋</h2>
        <div className="profile-info">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
          <p><strong>Gender:</strong> {user.gender || 'N/A'}</p>
          <p><strong>Birthday:</strong> {user.birthdate?.slice(0, 10) || 'N/A'}</p>
          <p><strong>Library Card:</strong> {user.libraryCard || 'Not requested yet'}</p>
        </div>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div></>
   
  );
};

export default UserProfile;
