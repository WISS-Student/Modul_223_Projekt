import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Navigation.css';

export default function Navbar({ onSearch }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <Link to="/" className="logo">
          <span className="logo-text">The PokeForum</span>
        </Link>
        <nav className="main-nav">
          <Link to="/">Dashboard</Link>
          <Link to="/about">About</Link>
          <Link to="/rules">Rules</Link>
        </nav>
      </div>

      <div className="header-center">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search posts..." 
            onChange={(e) => onSearch(e.target.value)} 
          />
        </div>
      </div>

      <div className="header-right">
        {user ? (
          <div className="user-section">
            <Link to="/create-post" className="btn-create">
              + New Post
            </Link>
            <div className="user-menu">
              <span className="user-name">{user.username}</span>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="btn-login">Login</Link>
            <Link to="/signup" className="btn-signup">Sign Up</Link>
          </div>
        )}
      </div>
    </header>
  );
}
