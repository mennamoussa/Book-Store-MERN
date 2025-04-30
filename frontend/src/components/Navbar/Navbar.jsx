import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('user');

  const handleProfileClick = () => {
    navigate(isLoggedIn ? '/profile' : '/login');
  };

  return (
    <nav className="navbar">
      <ul>
        <li><a href="#browse">Browse Books</a></li>
        <li><a href="#request">Request Library Card</a></li>
        <li><a href="#borrowed">Borrowed Books</a></li>
      </ul>
      <span className="profile-link" onClick={handleProfileClick}>
        Profile
      </span>
    </nav>
  );
};

export default Navbar;
