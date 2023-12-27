import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1 style={{ color: 'red' }}>Botit Dashboard</h1>
        </Link>

        <div className="nav-buttons">
          <Link to="/products" className="nav-button">
            Products
          </Link>
          <Link to="/" className="nav-button">
            Orders
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;