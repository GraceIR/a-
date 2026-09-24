import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


// ---- Options ----
const COUNTRIES = [
  'Nigeria', 'United Kingdom', 'United States', 'Canada', 'Australia',
  'United Arab Emirates', 'Saudi Arabia', 'Qatar', 'South Africa', 'Ghana',
  'Kenya', 'Ireland', 'France', 'Germany', 'Netherlands', 'Singapore',
  'Malaysia', 'India', 'Other',
];

const TIME_SLOTS = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
  '06:00 PM', '07:00 PM', '08:00 PM',
];

// ---- Helpers ----
function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};
  if (!values.firstName.trim()) errors.firstName = 'First name is required.';
  if (!values.lastName.trim()) errors.lastName = 'Last name is required.';
  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (values.phone.replace(/\D/g, '').length < 6) {
    errors.phone = 'Phone number looks too short.';
  }
  if (!values.country) errors.country = 'Please select a country.';
  if (!values.state.trim()) errors.state = 'State / province is required.';
  if (!values.date) {
    errors.date = 'Please choose a preferred date.';
  } else if (values.date < todayISO()) {
    errors.date = 'Please choose a future date.';
  }
  if (!values.time) errors.time = 'Please choose a preferred time.';
  return errors;
}

const INITIAL = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '',
  state: '',
  date: '',
  time: '',
  notes: '',
};

// ---- Component ----
export default function Booking() {
  const { user } = useAuth();
  const [values, setValues] = useState({
    ...INITIAL,
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const nextErrors = validate(values);
    if (nextErrors[name]) {
      setErrors((prev) => ({ ...prev, [name]: nextErrors[name] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({
      firstName: true, lastName: true, email: true, phone: true,
      country: true, state: true, date: true, time: true,
    });

    if (Object.keys(nextErrors).length > 0) {
      const firstField = Object.keys(nextErrors)[0];
      document.getElementById(firstField)?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const payload = { ...values };
      // TODO: replace with real API call
      console.log('Consultation request:', payload);
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  const fieldError = (name) =>
    touched[name] && errors[name] ? (
      <p className="booking-field-error" role="alert">
        {errors[name]}
      </p>
    ) : null;

  const fieldClass = (name) =>
    'booking-input' +
    (touched[name] && errors[name] ? ' booking-input--error' : '');

  if (status === 'success') {
    return (
      <div className="booking-page">
        <div className="booking-success">
          <span className="booking-success-icon" aria-hidden="true">✓</span>
          <h1 className="booking-success-title">Consultation request received</h1>
          <p className="booking-success-text">
            Thanks, {values.firstName || 'there'}. We&apos;ve sent a confirmation to <strong>{values.email}</strong>.
            Our team will reply within 24 hours.
          </p>
          <div className="booking-success-actions">
            <Link to="/" className="btn btn-primary btn-lg">Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="booking-form-container">
        <h1 className="booking-form-title">Book a Consultation</h1>
        <p className="booking-form-subtitle">
          Fill in your details below and we&apos;ll get back to you within 24 hours.
        </p>

        {status === 'error' && (
          <div className="booking-banner booking-banner--error" role="alert">
            <span aria-hidden="true">!</span>
            <p>Something went wrong. Please try again or email us directly.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="booking-form">
          <div className="booking-field">
            <label htmlFor="firstName" className="booking-label">First name <span aria-hidden="true">*</span></label>
            <input id="firstName" name="firstName" type="text" className={fieldClass('firstName')} value={values.firstName} onChange={handleChange} onBlur={handleBlur} placeholder="e.g. Amaka" />
            {fieldError('firstName')}
          </div>

          <div className="booking-field">
            <label htmlFor="lastName" className="booking-label">Last name <span aria-hidden="true">*</span></label>
            <input id="lastName" name="lastName" type="text" className={fieldClass('lastName')} value={values.lastName} onChange={handleChange} onBlur={handleBlur} placeholder="e.g. Obi" />
            {fieldError('lastName')}
          </div>

          <div className="booking-field">
            <label htmlFor="email" className="booking-label">Email address <span aria-hidden="true">*</span></label>
            <input id="email" name="email" type="email" className={fieldClass('email')} value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder="you@example.com" />
            {fieldError('email')}
          </div>

          <div className="booking-field">
            <label htmlFor="phone" className="booking-label">Phone number (WhatsApp preferred) <span aria-hidden="true">*</span></label>
            <input id="phone" name="phone" type="tel" className={fieldClass('phone')} value={values.phone} onChange={handleChange} onBlur={handleBlur} placeholder="+234 000 000 0000" />
            {fieldError('phone')}
          </div>

          <div className="booking-field">
            <label htmlFor="country" className="booking-label">Country <span aria-hidden="true">*</span></label>
            <select id="country" name="country" className={fieldClass('country')} value={values.country} onChange={handleChange} onBlur={handleBlur}>
              <option value="" disabled>Select country…</option>
              {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {fieldError('country')}
          </div>

          <div className="booking-field">
            <label htmlFor="state" className="booking-label">State / Region / Province <span aria-hidden="true">*</span></label>
            <input id="state" name="state" type="text" className={fieldClass('state')} value={values.state} onChange={handleChange} onBlur={handleBlur} placeholder="e.g. Lagos" />
            {fieldError('state')}
          </div>

          <div className="booking-field">
            <label htmlFor="date" className="booking-label">Preferred date <span aria-hidden="true">*</span></label>
            <input id="date" name="date" type="date" min={todayISO()} className={fieldClass('date')} value={values.date} onChange={handleChange} onBlur={handleBlur} />
            {fieldError('date')}
          </div>

          <div className="booking-field">
            <label htmlFor="time" className="booking-label">Preferred time <span aria-hidden="true">*</span></label>
            <select id="time" name="time" className={fieldClass('time')} value={values.time} onChange={handleChange} onBlur={handleBlur}>
              <option value="" disabled>Select a time…</option>
              {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            {fieldError('time')}
          </div>

          {/*<div className="booking-field">
            <label htmlFor="notes" className="booking-label">Anything else we should know? <span className="booking-optional">(optional)</span></label>
            <textarea id="notes" name="notes" rows={4} className="booking-input" value={values.notes} onChange={handleChange} placeholder="e.g. Struggling with algebra, preparing for exams…" />
          </div>*/}

          <button type="submit" className="btn btn-primary btn-lg booking-submit" disabled={submitting}>
            {submitting ? 'Sending…' : 'Book'}
          </button>
        </form>

        <p className="booking-consent">
          By submitting, you agree to our <Link to="/terms">Terms</Link> and <Link to="/privacy">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}