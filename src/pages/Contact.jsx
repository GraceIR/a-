import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import contactHeroBg from '../assets/subjects/physics.jpg';

/**
 * Contact page.
 *
 * Includes:
 *  - A validated contact form (name, email, phone, subject, message)
 *  - Contact channel cards (email, phone, WhatsApp)
 *  - Business hours
 *  - A short FAQ block
 *
 * The form currently simulates submission. When the Django API is live,
 * replace `submitForm` with:
 *
 *   await api.post('/contact/', values);
 *
 * The rest of the component — validation, error states, success screen —
 * works unchanged.
 */

const CONTACT_CHANNELS = [
  {
    icon: '✉️',
    title: 'Email us',
    value: 'ajikep@yahoo.com',
    href: 'mailto:ajikep@yahoo.com',
    note: 'We reply within 24 hours on weekdays.',
  },
  {
    icon: '📞',
    title: 'Call us',
    value: '+234 8030 700 143 ', 
    href: 'tel:+2340000000000',
    note: 'Mon–Fri, 9:00–18:00 WAT.',
  },
  {
    icon: '💬',
    title: 'WhatsApp',
    value: 'Chat with us',
    href: 'https://wa.me/2348030700143',
    note: 'Fastest response during business hours.',
  },
];

const BUSINESS_HOURS = [
  { day: 'Monday – Friday', hours: '9:00 – 18:00 WAT' },
  { day: 'Saturday',        hours: '10:00 – 15:00 WAT' },
  { day: 'Sunday',          hours: 'Closed' },
];

const TOPIC_OPTIONS = [
  { value: '', label: 'Select a topic…' },
  { value: 'booking', label: 'Booking a session' },
  { value: 'pricing', label: 'Pricing & plans' },
  { value: 'subjects', label: 'Subjects & availability' },
  { value: 'existing', label: 'Existing booking' },
  { value: 'other', label: 'Something else' },
];

const SHORT_FAQ = [
  {
    q: 'How quickly will you reply?',
    a: 'Most messages are answered within a few hours during business days. If you contact us on the weekend, expect a reply on Monday morning.',
  },
  {
    q: 'Can I schedule a call?',
    a: 'Yes — mention a preferred time in your message and we\'ll send you a calendar invitation.',
  },
  {
    q: 'Do you offer trial sessions?',
    a: 'Yes. Your first session is treated as a trial: if it isn\'t the right fit, there\'s no charge and no obligation to continue.',
  },
];

// ---- Validation helpers ----

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = 'Please enter your name.';
  } else if (values.name.trim().length < 2) {
    errors.name = 'Name is too short.';
  }

  if (!values.email.trim()) {
    errors.email = 'Please enter your email.';
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = 'That doesn\'t look like a valid email.';
  }

  if (values.phone && values.phone.replace(/\D/g, '').length < 6) {
    errors.phone = 'Phone number looks too short.';
  }

  if (!values.topic) {
    errors.topic = 'Please choose a topic.';
  }

  if (!values.message.trim()) {
    errors.message = 'Please write a short message.';
  } else if (values.message.trim().length < 10) {
    errors.message = 'Message is too short please add a bit more detail.';
  }

  return errors;
}

const INITIAL_VALUES = {
  name: '',
  email: '',
  phone: '',
  topic: '',
  message: '',
};

// ---- Component ----

export default function Contact() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field once user starts fixing it
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
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

    // Mark every field as touched so errors show immediately
    setTouched({
      name: true,
      email: true,
      phone: true,
      topic: true,
      message: true,
    });

    if (Object.keys(nextErrors).length > 0) {
      // Focus the first errored field
      const firstField = Object.keys(nextErrors)[0];
      const el = document.getElementById(firstField);
      if (el) el.focus();
      return;
    }

    setStatus('submitting');

    try {
      // TODO: replace with real API call when backend is ready
      // await api.post('/contact/', values);
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus('success');
      setValues(INITIAL_VALUES);
      setTouched({});
    } catch {
      setStatus('error');
    }
  };

  const fieldError = (name) =>
    touched[name] && errors[name] ? (
      <p className="contact-field-error" role="alert">
        {errors[name]}
      </p>
    ) : null;

  const fieldClass = (name) =>
    'contact-input' +
    (touched[name] && errors[name] ? ' contact-input--error' : '');

  return (
    <>
      {/* ============ HERO ============ */}
      <PageHero
        eyebrow="Say hello"
        title="Contact"
        lead="Questions about lessons, pricing or availability? Send us a message we usually reply within 24 hours on business days."
        backgroundImage={contactHeroBg}
      />

      {/* ============ QUICK CHANNELS ============ */}
      <section className="section contact-channels-section">
        <div className="container">
          <div className="row g-4">
            {CONTACT_CHANNELS.map((c) => (
              <div className="col-md-4" key={c.title}>
                <a
                  href={c.href}
                  className="contact-channel-card"
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  <span className="contact-channel-icon" aria-hidden="true">
                    {c.icon}
                  </span>
                  <span className="contact-channel-title">{c.title}</span>
                  <span className="contact-channel-value">{c.value}</span>
                  <span className="contact-channel-note">{c.note}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FORM + SIDEBAR ============ */}
      <section className="section contact-main-section">
        <div className="container">
          <div className="row g-5">

            {/* -------- LEFT: form -------- */}
            <div className="col-lg-7">
              <div className="contact-form-wrap">
                <p className="section-eyebrow">Send us a message</p>
                <h2 className="section-title">
                  Tell us how we can help
                </h2>
                <p className="section-lead mb-4">
                  Share a few details below and we&apos;ll get back to you
                  with the next steps no obligation to book.
                </p>

                {status === 'success' ? (
                  <div className="contact-success" role="status">
                    <span className="contact-success-icon" aria-hidden="true">
                      ✓
                    </span>
                    <h3 className="contact-success-title">
                      Thanks, your message is on its way
                    </h3>
                    <p className="contact-success-text">
                      We&apos;ll reply to your email within 24 hours on
                      business days. If it&apos;s urgent, feel free to reach
                      out via WhatsApp.
                    </p>
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => setStatus('idle')}
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form
                    className="contact-form"
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    <div className="row g-3">

                      {/* Name */}
                      <div className="col-md-6">
                        <label htmlFor="name" className="contact-label">
                          Your name <span aria-hidden="true">*</span>
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
                          aria-invalid={Boolean(touched.name && errors.name)}
                          aria-describedby={
                            touched.name && errors.name
                              ? 'name-error'
                              : undefined
                          }
                          autoComplete="name"
                        />
                        <div id="name-error">{fieldError('name')}</div>
                      </div>

                      {/* Email */}
                      <div className="col-md-6">
                        <label htmlFor="email" className="contact-label">
                          Email <span aria-hidden="true">*</span>
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
                          aria-invalid={Boolean(touched.email && errors.email)}
                          aria-describedby={
                            touched.email && errors.email
                              ? 'email-error'
                              : undefined
                          }
                          autoComplete="email"
                        />
                        <div id="email-error">{fieldError('email')}</div>
                      </div>

                      {/* Phone */}
                      <div className="col-md-6">
                        <label htmlFor="phone" className="contact-label">
                          Phone <span className="contact-optional">(optional)</span>
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
                        <div id="phone-error">{fieldError('phone')}</div>
                      </div>

                      {/* Topic */}
                      <div className="col-md-6">
                        <label htmlFor="topic" className="contact-label">
                          Topic <span aria-hidden="true">*</span>
                        </label>
                        <select
                          id="topic"
                          name="topic"
                          className={fieldClass('topic')}
                          value={values.topic}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          aria-invalid={Boolean(touched.topic && errors.topic)}
                        >
                          {TOPIC_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value} disabled={o.value === ''}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                        {fieldError('topic')}
                      </div>

                      {/* Message */}
                      <div className="col-12">
                        <label htmlFor="message" className="contact-label">
                          Message <span aria-hidden="true">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={6}
                          className={fieldClass('message')}
                          placeholder="Tell us a bit about your child, the subject, and what you'd like to achieve…"
                          value={values.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          aria-invalid={Boolean(touched.message && errors.message)}
                        />
                        {fieldError('message')}
                      </div>

                      {/* Submit */}
                      <div className="col-12 d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <p className="contact-consent">
                          By submitting this form you agree to be contacted
                          about your enquiry.
                        </p>
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                          disabled={status === 'submitting'}
                        >
                          {status === 'submitting' ? 'Sending…' : 'Send message'}
                        </button>
                      </div>

                      {status === 'error' && (
                        <div className="col-12">
                          <p className="contact-submit-error" role="alert">
                            Something went wrong. Please try again, or email us
                            directly.
                          </p>
                        </div>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* -------- RIGHT: sidebar -------- */}
            <aside className="col-lg-5">
              <div className="contact-sidebar">

                {/* Business hours */}
                <div className="contact-sidebar-card">
                  <h3 className="contact-sidebar-title">Business hours</h3>
                  <ul className="contact-hours">
                    {BUSINESS_HOURS.map((h) => (
                      <li key={h.day}>
                        <span>{h.day}</span>
                        <strong>{h.hours}</strong>
                      </li>
                    ))}
                  </ul>
                  <p className="contact-sidebar-note">
                    All times are West Africa Time (WAT, UTC+1). We also work
                    with families across other time zones by arrangement.
                  </p>
                </div>

                {/* Alternatives */}
                <div className="contact-sidebar-card contact-sidebar-card--soft">
                  <h3 className="contact-sidebar-title">
                    Prefer a different way?
                  </h3>
                  <ul className="contact-alt-list">
                    <li>
                      <Link to="/booking" className="contact-alt-link">
                        Book a session →
                      </Link>
                      <span>Start straight away with a booking.</span>
                    </li>
                    <li>
                      <Link to="/prices" className="contact-alt-link">
                        See pricing →
                      </Link>
                      <span>Transparent monthly plans by country.</span>
                    </li>
                    <li>
                      <Link to="/faq" className="contact-alt-link">
                        Read the FAQ →
                      </Link>
                      <span>Answers to common questions.</span>
                    </li>
                  </ul>
                </div>

                {/* Small note */}
                <div className="contact-sidebar-card contact-sidebar-card--quote">
                  <p className="contact-quote">
                    “The fastest way to reach us is WhatsApp during business
                    hours we reply within minutes.”
                  </p>
                  <p className="contact-quote-sign">— The tutoring team</p>
                </div>

              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ============ SHORT FAQ ============ */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head text-center">
            <p className="section-eyebrow">Before you write</p>
            <h2 className="section-title">A few quick answers</h2>
          </div>

          <div className="pricing-faq">
            {SHORT_FAQ.map((item) => (
              <details key={item.q} className="pricing-faq-item">
                <summary className="pricing-faq-question">
                  {item.q}
                  <span className="pricing-faq-icon" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="pricing-faq-answer">{item.a}</p>
              </details>
            ))}
          </div>

          <p className="text-center mt-4">
            <Link to="/faq" className="btn btn-outline-primary">
              See the full FAQ
            </Link>
          </p>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="section section-cta">
        <div className="container">
          <div className="cta-box text-center">
            <h2 className="cta-title">Ready to book a session?</h2>
            <p className="cta-lead">
              Skip the message — book directly and we&apos;ll confirm within a
              few hours.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link to="/booking" className="btn btn-primary btn-lg">
                Book a Session
              </Link>
              <Link to="/subjects" className="btn btn-outline-light btn-lg">
                Browse Subjects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}