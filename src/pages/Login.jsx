import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

/**
 * Login page.
 *
 * Flow (guide §9, §10):
 *   - User submits email + password
 *   - POST /api/auth/login/ via AuthContext.login()
 *   - On success: token stored, user state set, redirect to `from` or /dashboard
 *   - On failure: field-level or form-level error
 *
 * Redirect behaviour:
 *   - If the user was bounced here from a protected route, `location.state.from`
 *     holds the original destination. After login we send them back there.
 *   - Otherwise we send them to /dashboard.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Where to go after successful login
  const from = location.state?.from?.pathname || '/dashboard';
  const justRegistered = location.state?.registered === true;

  const [values, setValues] = useState({
    email: '',
    password: '',
    remember: true,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // If already logged in, bounce to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, from, navigate]);

  // ---- Validation ----

  const validateField = (name, value) => {
    if (name === 'email') {
      if (!value.trim()) return 'Please enter your email.';
      if (!EMAIL_RE.test(value.trim())) return 'That doesn\'t look like a valid email.';
    }
    if (name === 'password') {
      if (!value) return 'Please enter your password.';
      if (value.length < 6) return 'Password must be at least 6 characters.';
    }
    return '';
  };

  const validateAll = () => {
    const next = {};
    const emailErr = validateField('email', values.email);
    const passErr = validateField('password', values.password);
    if (emailErr) next.email = emailErr;
    if (passErr) next.password = passErr;
    return next;
  };

  // ---- Handlers ----

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const nextValue = type === 'checkbox' ? checked : value;
    setValues((prev) => ({ ...prev, [name]: nextValue }));

    // Clear this field's error once the user starts fixing it
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
    if (formError) setFormError('');
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    if (err) {
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = validateAll();
    setErrors(nextErrors);
    setTouched({ email: true, password: true });
    setFormError('');

    if (Object.keys(nextErrors).length > 0) {
      const firstField = Object.keys(nextErrors)[0];
      document.getElementById(firstField)?.focus();
      return;
    }

    setSubmitting(true);
    try {
      await login(values.email.trim(), values.password);
      navigate(from, { replace: true });
    } catch (err) {
      // Try to surface a useful message from the API
      const apiMessage =
        err?.response?.data?.detail ||
        err?.response?.data?.non_field_errors?.[0] ||
        err?.response?.data?.message;
      setFormError(
        apiMessage ||
          'We couldn\'t sign you in. Please check your email and password and try again.'
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
              Welcome back.
            </h1>
            <p className="auth-panel-lead">
              Sign in to manage your bookings, view your schedule and message
              your tutor.
            </p>

            <ul className="auth-panel-list">
              <li>Track upcoming and past sessions</li>
              <li>Message your tutor between lessons</li>
              <li>Access lesson notes and materials</li>
              <li>Manage your plan and billing</li>
            </ul>

            <blockquote className="auth-panel-quote">
              <p>
                &ldquo;My daughter has gone from avoiding maths homework to
                asking for extra practice. The difference is night and day.&rdquo;
              </p>
              <footer>— Mrs. Adeyemi, parent</footer>
            </blockquote>

          </div>
        </aside>

        {/* ============ RIGHT: FORM ============ */}
        <main className="auth-form-side">
          <div className="auth-form-inner">

            <header className="auth-form-header">
              <h2 className="auth-form-title">Log in</h2>
              <p className="auth-form-subtitle">
                Don&apos;t have an account?{' '}
                <Link to="/signup" className="auth-inline-link">
                  Create one
                </Link>
              </p>
            </header>

            {justRegistered && (
              <div className="auth-banner auth-banner--success" role="status">
                <span className="auth-banner-icon" aria-hidden="true">✓</span>
                <p>Account created — sign in to continue.</p>
              </div>
            )}

            {formError && (
              <div className="auth-banner auth-banner--error" role="alert">
                <span className="auth-banner-icon" aria-hidden="true">!</span>
                <p>{formError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>

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
                  autoFocus
                  aria-invalid={Boolean(touched.email && errors.email)}
                  aria-describedby={
                    touched.email && errors.email ? 'email-error' : undefined
                  }
                />
                {fieldError('email')}
              </div>

              {/* Password */}
              <div className="auth-field">
                <div className="auth-label-row">
                  <label htmlFor="password" className="auth-label">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="auth-inline-link auth-inline-link--small"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="auth-input-wrap">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    className={fieldClass('password')}
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="current-password"
                    aria-invalid={Boolean(touched.password && errors.password)}
                    aria-describedby={
                      touched.password && errors.password
                        ? 'password-error'
                        : undefined
                    }
                  />
                  <button
                    type="button"
                    className="auth-input-toggle"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? '🙈' : '👁'}
                  </button>
                </div>
                {fieldError('password')}
              </div>

              {/* Remember me */}
              <label className="auth-checkbox">
                <input
                  type="checkbox"
                  name="remember"
                  checked={values.remember}
                  onChange={handleChange}
                />
                <span>Keep me signed in on this device</span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary btn-lg auth-submit"
                disabled={submitting}
              >
                {submitting ? 'Signing in…' : 'Log in'}
              </button>

            </form>

            <div className="auth-divider">
              <span>or continue with</span>
            </div>

            <div className="auth-social">
              <button
                type="button"
                className="auth-social-btn"
                aria-label="Continue with Google"
                disabled
              >
                <span aria-hidden="true">G</span>
                <span className="auth-social-label">Google</span>
              </button>
              <button
                type="button"
                className="auth-social-btn"
                aria-label="Continue with Apple"
                disabled
              >
                <span aria-hidden="true"></span>
                <span className="auth-social-label">Apple</span>
              </button>
            </div>
            <p className="auth-social-note">
              Social sign-in is coming soon.
            </p>

            <p className="auth-footer-note">
              By logging in, you agree to our{' '}
              <Link to="/terms" className="auth-inline-link">Terms</Link>{' '}
              and{' '}
              <Link to="/privacy" className="auth-inline-link">Privacy Policy</Link>.
            </p>

          </div>
        </main>

      </div>
    </div>
  );
}