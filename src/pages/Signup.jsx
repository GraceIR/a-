import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';


const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD = 8;

// ---- Password strength ----

function scorePassword(password) {
  if (!password) return 0;
  let score = 0;
  if (password.length >= MIN_PASSWORD) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(score, 4); // 0–4
}

const STRENGTH_LABEL = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const STRENGTH_CLASS = ['', 'is-weak', 'is-fair', 'is-good', 'is-strong'];

// ---- Component ----

export default function Signup() {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const strength = scorePassword(values.password);

  // If already logged in, bounce to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, from, navigate]);

  // ---- Validation ----

  const validateField = (name, value, allValues) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Please enter your full name.';
        if (value.trim().length < 2) return 'Name is too short.';
        return '';
      case 'email':
        if (!value.trim()) return 'Please enter your email.';
        if (!EMAIL_RE.test(value.trim())) return 'That doesn\'t look like a valid email.';
        return '';
      case 'phone':
        if (value && value.replace(/\D/g, '').length < 6) {
          return 'Phone number looks too short.';
        }
        return '';
      case 'password':
        if (!value) return 'Please choose a password.';
        if (value.length < MIN_PASSWORD) {
          return `Password must be at least ${MIN_PASSWORD} characters.`;
        }
        if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) {
          return 'Include at least one letter and one number.';
        }
        return '';
      case 'confirmPassword':
        if (!value) return 'Please confirm your password.';
        if (value !== allValues.password) return 'Passwords do not match.';
        return '';
      case 'agree':
        if (!value) return 'Please accept the Terms and Privacy Policy.';
        return '';
      default:
        return '';
    }
  };

  const validateAll = () => {
    const fields = ['name', 'email', 'phone', 'password', 'confirmPassword', 'agree'];
    const next = {};
    fields.forEach((f) => {
      const err = validateField(f, values[f], values);
      if (err) next[f] = err;
    });
    return next;
  };

  // ---- Handlers ----

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const nextValue = type === 'checkbox' ? checked : value;
    const nextValues = { ...values, [name]: nextValue };
    setValues(nextValues);

    // Clear this field's error once user starts fixing it
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }

    // Special case: if password changes, re-validate confirmPassword
    if (name === 'password' && touched.confirmPassword) {
      const confirmErr = validateField('confirmPassword', nextValues.confirmPassword, nextValues);
      setErrors((prev) => ({
        ...prev,
        ...(confirmErr ? { confirmPassword: confirmErr } : {}),
      }));
      if (!confirmErr) {
        setErrors((prev) => {
          const copy = { ...prev };
          delete copy.confirmPassword;
          return copy;
        });
      }
    }

    if (formError) setFormError('');
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value, values);
    if (err) {
      setErrors((prev) => ({ ...prev, [name]: err }));
    } else {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = validateAll();
    setErrors(nextErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
      agree: true,
    });
    setFormError('');

    if (Object.keys(nextErrors).length > 0) {
      const firstField = Object.keys(nextErrors)[0];
      document.getElementById(firstField)?.focus();
      return;
    }

    setSubmitting(true);
    try {
      await register({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim() || undefined,
        password: values.password,
      });
      navigate(from, { replace: true });
    } catch (err) {
      const data = err?.response?.data;
      const apiMessage =
        data?.detail ||
        data?.email?.[0] ||
        data?.non_field_errors?.[0] ||
        data?.message;
      setFormError(
        apiMessage ||
          'We couldn\'t create your account. Please check your details and try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const fieldError = (name) =>
    touched[name] && errors[name] ? (
      <p className="auth-field-error" id={`${name}-error`} role="alert">
        {errors[name]}
      </p>
    ) : null;

  const fieldClass = (name) =>
    'auth-input' +
    (touched[name] && errors[name] ? ' auth-input--error' : '');

  return (
    <div className="auth-page">
      <div className="auth-split">

        {/* ============ LEFT: BRAND PANEL ============ */}
        <aside className="auth-panel">
          <div className="auth-panel-inner">

            <Link to="/" className="auth-panel-logo">
              <img src={logo} alt="a+ Academy" />
            </Link>

            <h1 className="auth-panel-title">
              Start learning today.
            </h1>
            <p className="auth-panel-lead">
              Create your account to book lessons, track progress and stay in
              touch with your tutor.
            </p>

            <ul className="auth-panel-list">
              <li>Free consultation — no commitment</li>
              <li>Qualified, vetted tutors worldwide</li>
              <li>Personalised lesson plans</li>
              <li>Cancel or pause any time</li>
            </ul>

            <blockquote className="auth-panel-quote">
              <p>
                &ldquo;The first session felt like a conversation, not a test.
                My son was actually excited about the next lesson.&rdquo;
              </p>
              <footer>— Mr. Okonkwo, parent</footer>
            </blockquote>

          </div>
        </aside>

        {/* ============ RIGHT: FORM ============ */}
        <main className="auth-form-side">
          <div className="auth-form-inner">

            <header className="auth-form-header">
              <h2 className="auth-form-title">Create your account</h2>
              <p className="auth-form-subtitle">
                Already have an account?{' '}
                <Link to="/login" className="auth-inline-link">
                  Log in
                </Link>
              </p>
            </header>

            {formError && (
              <div className="auth-banner auth-banner--error" role="alert">
                <span className="auth-banner-icon" aria-hidden="true">!</span>
                <p>{formError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>

              {/* Name */}
              <div className="auth-field">
                <label htmlFor="name" className="auth-label">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={fieldClass('name')}
                  placeholder="e.g. Amaka Obi"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="name"
                  autoFocus
                  aria-invalid={Boolean(touched.name && errors.name)}
                  aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
                />
                {fieldError('name')}
              </div>

              {/* Email */}
              <div className="auth-field">
                <label htmlFor="email" className="auth-label">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={fieldClass('email')}
                  placeholder="you@example.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="email"
                  aria-invalid={Boolean(touched.email && errors.email)}
                  aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                />
                {fieldError('email')}
              </div>

              {/* Phone (optional) */}
              <div className="auth-field">
                <label htmlFor="phone" className="auth-label">
                  Phone <span className="auth-optional">(optional)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className={fieldClass('phone')}
                  placeholder="+234 000 000 0000"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="tel"
                />
                {fieldError('phone')}
              </div>

              {/* Password */}
              <div className="auth-field">
                <label htmlFor="password" className="auth-label">
                  Password
                </label>
                <div className="auth-input-wrap">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    className={fieldClass('password')}
                    placeholder={`At least ${MIN_PASSWORD} characters`}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="new-password"
                    aria-invalid={Boolean(touched.password && errors.password)}
                    aria-describedby="password-strength password-error"
                  />
                  <button
                    type="button"
                    className="auth-input-toggle"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? '🙈' : '👁'}
                  </button>
                </div>

                {/* Strength meter */}
                {values.password && (
                  <div className="auth-strength" id="password-strength">
                    <div className="auth-strength-bars">
                      {[1, 2, 3, 4].map((n) => (
                        <span
                          key={n}
                          className={
                            'auth-strength-bar' +
                            (n <= strength ? ` ${STRENGTH_CLASS[strength]}` : '')
                          }
                        />
                      ))}
                    </div>
                    <p
                      className={`auth-strength-label ${STRENGTH_CLASS[strength]}`}
                      aria-live="polite"
                    >
                      {STRENGTH_LABEL[strength] || 'Too short'}
                    </p>
                  </div>
                )}

                <div id="password-error">{fieldError('password')}</div>
              </div>

              {/* Confirm Password */}
              <div className="auth-field">
                <label htmlFor="confirmPassword" className="auth-label">
                  Confirm password
                </label>
                <div className="auth-input-wrap">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirm ? 'text' : 'password'}
                    className={fieldClass('confirmPassword')}
                    placeholder="Re-enter your password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="new-password"
                    aria-invalid={Boolean(touched.confirmPassword && errors.confirmPassword)}
                    aria-describedby={
                      touched.confirmPassword && errors.confirmPassword
                        ? 'confirmPassword-error'
                        : undefined
                    }
                  />
                  <button
                    type="button"
                    className="auth-input-toggle"
                    onClick={() => setShowConfirm((s) => !s)}
                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  >
                    {showConfirm ? '🙈' : '👁'}
                  </button>
                </div>
                {fieldError('confirmPassword')}
              </div>

              {/* Terms */}
              <label className="auth-checkbox auth-checkbox--terms">
                <input
                  type="checkbox"
                  name="agree"
                  checked={values.agree}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(touched.agree && errors.agree)}
                />
                <span>
                  I agree to the{' '}
                  <Link to="/terms" className="auth-inline-link" target="_blank" rel="noreferrer">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="auth-inline-link" target="_blank" rel="noreferrer">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
              {fieldError('agree')}

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary btn-lg auth-submit mt-2"
                disabled={submitting}
              >
                {submitting ? 'Creating account…' : 'Create account'}
              </button>

            </form>

            <p className="auth-footer-note">
              We&apos;ll send you a confirmation email. You can unsubscribe
              from marketing messages at any time.
            </p>

          </div>
        </main>

      </div>
    </div>
  );
}