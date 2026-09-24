import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from "../assets/logo.jpeg";

const NAV_LINKS = [
  { to: '/',             label: 'Home',         end: true },
  { to: '/about',        label: 'About' },
  { to: '/subjects',     label: 'Subjects' },
  { to: '/pricing',     label: 'Prices' },
  { to: '/how-it-works', label: 'How It Works' },
  /*{ to: '/faq',          label: 'FAQ' },*/
  { to: '/contact',      label: 'Contact' },
];

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const close = () => setOpen(false);

  const handleLogout = async () => {
    close();
    await logout();
    navigate('/');
  };

  const linkClass = ({ isActive }) =>
    'nav-link' + (isActive ? ' active fw-semibold' : '');

  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg container">
        <Link className="navbar-brand brand" to="/" onClick={close}>
         <img src={logo} alt="Tutor Connect" className="brand-logo brand-logo--wordmark" />
       </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse${open ? ' show' : ''}`}>
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {NAV_LINKS.map(({ to, label, end }) => (
              <li className="nav-item" key={to}>
                <NavLink to={to} end={end} className={linkClass} onClick={close}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-2">
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/dashboard"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={close}
                >
                  Dashboard
                </NavLink>

                <div className="dropdown">
                  <button
                    className="btn btn-link nav-user dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    type="button"
                  >
                    {user?.avatar
                      ? <img src={user.avatar} alt="" className="nav-avatar" />
                      : <span className="nav-avatar-fallback">
                          {(user?.name || user?.email || '?').charAt(0).toUpperCase()}
                        </span>}
                    <span className="ms-2">{user?.name || user?.email}</span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to="/dashboard" onClick={close}>
                        My Bookings
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        Log Out
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <NavLink to="/login" className="btn btn-link nav-auth-link" onClick={close}>
                  Log In
                </NavLink>
                <NavLink to="/signup" className="btn btn-outline-primary btn-sm" onClick={close}>
                  Sign Up
                </NavLink>
              </>
            )}

            <NavLink to="/booking" className="btn btn-primary btn-sm btn-book" onClick={close}>
              Book a Session
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}