import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const isLoginPage = location.pathname === '/';
  const isSignupPage = location.pathname === '/signup';

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1 style={{ color: 'red' }}>Admin Botit Dashboard</h1>
        </Link>

        <div className="nav-buttons">
          <Link
            to="/products"
            className={`nav-button ${isLoginPage || isSignupPage ? 'disabled' : ''}`}
          >
            Products
          </Link>
          <Link
            to="/home"
            className={`nav-button ${isLoginPage || isSignupPage ? 'disabled' : ''}`}
          >
            Orders
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
