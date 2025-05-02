import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    let user = null;
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        user = JSON.parse(storedUser);
      }
    } catch (err) {
      console.error('Error parsing user from localStorage:', err);
    }

    if (token && user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      localStorage.setItem('token', '');
      localStorage.setItem('user', '');
    }
  }, []);

  const handleProfileClick = () => {
    navigate(isLoggedIn ? '/profile' : '/login');
  };

  const handleLogout = () => {
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  const handleSectionClick = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <ul>
        <li><button className="nav-link-btn" onClick={() => handleSectionClick('browse')}>Browse Books</button></li>
        <li><button className="nav-link-btn" onClick={() => handleSectionClick('request')}>Library Card</button></li>
        <li><button className="nav-link-btn" onClick={() => handleSectionClick('borrowed')}>Borrowed Books</button></li>
      </ul>
      <div>
      {/* <ul>
       <li><button className="nav-link-btn" onClick={() => navigate('/login')}>Login</button></li>
      </ul> */}
      {!isLoggedIn && (
          <span className="profile-link" onClick={() => navigate('/login')}>
          Login
        </span>
        )}
        {isLoggedIn && (
          <span className="profile-link" onClick={handleProfileClick}>
          Profile
        </span>
          // <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
          //   Logout
          // </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
