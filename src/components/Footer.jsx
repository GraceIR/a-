import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

/* ---------- Social icons (inline SVG, no dependency) ---------- */
const SOCIALS = [
  {
    name: "Facebook",
    href: "https://facebook.com/yourpage",
    path: "M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.25 10.44 22v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.77l-.44 2.91h-2.33V22C18.34 21.25 22 17.08 22 12.06Z",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/yourhandle",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z",
  },
  {
    name: "X",
    href: "https://x.com/yourhandle",
    path: "M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.82-5.97 6.82H1.66l7.73-8.84L1.25 2.25H8.1l4.71 6.23 5.43-6.23Zm-1.16 17.52h1.83L7.02 4.13H5.05l12.03 15.64Z",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/2348030700143",
    path: "M19.11 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.94 9.94 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.85-7.02ZM12.05 20.13h-.01a8.23 8.23 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.21 8.21 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c.01 4.54-3.68 8.21-8.22 8.21Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42l-.48-.01c-.16 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.16 1.74 2.66 4.22 3.73.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z",
  },
];

function SocialIcon({ name, href, path }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="footer-social-icon"
      aria-label={name}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={path} />
      </svg>
    </a>
  );
}

/* ---------- Footer ---------- */
export default function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: POST /api/newsletter/ later
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer 
        className="site-footer"
    
    >
      <div className="container py-5">
        <div className="row g-4">
          {/* Brand */}
          <div className="col-lg-3">
            <Link to="/" className="footer-brand-link">
              <img src={logo} alt="Tutor Connect" className="footer-logo" />
            </Link>
            <p className="text-muted mb-0">
              Personalised tutoring that meets you where you are.
            </p>
          </div>

          {/* Explore */}
          <div className="col-6 col-lg-2">
            <h6 className="footer-heading">Explore</h6>
            <ul className="list-unstyled footer-links">
              <li><Link to="/subjects">Subjects</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/testimonial">Testimonial</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div className="col-6 col-lg-2">
            <h6 className="footer-heading">Account</h6>
            <ul className="list-unstyled footer-links">
              <li><Link to="/login">Log In</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
              <li><Link to="/booking">Book a Session</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
          </div>

          {/* Get in touch */}
          <div className="col-12 col-md-6 col-lg-2">
            <h6 className="footer-heading">Get in touch</h6>
            <ul className="list-unstyled footer-links">
              <li><a href="mailto:ajikep@yahoo.com">ajikep@yahoo.com</a></li>
              <li><a href="tel:+2340000000000">+234 8030 700 143 +234 7089 567 197</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-12 col-md-6 col-lg-3">
            <h6 className="footer-heading">Newsletter</h6>
            <p className="text-muted small mb-2">
              Study tips and new class announcements. No spam.
            </p>

            {subscribed ? (
              <p className="footer-newsletter-success small mb-0">
                ✓ You're subscribed. Thank you!
              </p>
            ) : (
              <form className="footer-newsletter" onSubmit={handleSubscribe} noValidate>
                <label htmlFor="footer-newsletter-email" className="visually-hidden">
                  Email address
                </label>
                <div className="footer-newsletter-group">
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    className="form-control form-control-sm footer-newsletter-input"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn btn-sm footer-newsletter-btn">
                    Subscribe
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom row: copyright + socials */}
        <hr className="mt-4" />
        <div className="footer-bottom d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
          <p className="text-muted small mb-0">
            © {year} <b>a+</b> Academy. All rights reserved.
          </p>

          <ul className="list-unstyled footer-socials d-flex mb-0">
            {SOCIALS.map((s) => (
              <li key={s.name}>
                <SocialIcon {...s} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}