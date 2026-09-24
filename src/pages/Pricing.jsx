import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import pricingHeroBg from '../assets/subjects/languages.jpg';

/**
 * Prices page — interactive plan builder.
 *
 * Mirrors the structure of the reference site (country → format →
 * number of classes → monthly cost) but adapted to this brand.
 *
 * Pricing model:
 *   Monthly cost = hourly rate × session length × classes per month
 *
 * Rates are per-country, per-format. When the API is live these can be
 * fetched from `/api/pricing/` — the calculation logic stays the same.
 */

// ---- Configuration ----

const COUNTRIES = [
  { code: 'NG', name: 'Nigeria',           currency: 'NGN', symbol: '₦',  ratePrivate: 6000,  rateGroup: 3500 },
  { code: 'GB', name: 'United Kingdom',    currency: 'GBP', symbol: '£',  ratePrivate: 18,    rateGroup: 11 },
  { code: 'US', name: 'United States',     currency: 'USD', symbol: '$',  ratePrivate: 22,    rateGroup: 13 },
  { code: 'CA', name: 'Canada',            currency: 'CAD', symbol: 'C$', ratePrivate: 28,    rateGroup: 17 },
  { code: 'AE', name: 'United Arab Emirates', currency: 'AED', symbol: 'AED', ratePrivate: 75, rateGroup: 45 },
  { code: 'ZA', name: 'South Africa',      currency: 'ZAR', symbol: 'R',  ratePrivate: 320,   rateGroup: 190 },
  { code: 'OTHER', name: 'Other / not listed', currency: 'USD', symbol: '$', ratePrivate: 22, rateGroup: 13 },
];

const FORMATS = [
  {
    id: 'private',
    name: '1-on-1 Private',
    description: 'Personalised online lessons with an expert tutor.',
    rateKey: 'ratePrivate',
  },
  {
    id: 'group',
    name: 'Small Group',
    description: 'Learn alongside 2–4 peers at the same level.',
    rateKey: 'rateGroup',
  },
];

const CLASS_COUNTS = [2, 4, 8, 12];
const SESSION_MINUTES = 60;

// ---- Plan tiers (marketing cards below the builder) ----

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Try tutoring, no long-term commitment.',
    classes: 2,
    features: [
      '2 private classes per month',
      '60-minute sessions',
      'Personalised lesson plan',
      'Progress summary after each block',
      'Cancel or pause any time',
    ],
    cta: 'Start with 2 classes',
    featured: false,
  },
  {
    id: 'standard',
    name: 'Standard',
    tagline: 'Steady weekly progress — our most popular plan.',
    classes: 4,
    features: [
      '4 private classes per month',
      '60-minute sessions',
      'Personalised lesson plan',
      'Weekly progress notes for parents',
      'Priority scheduling',
      'Cancel or pause any time',
    ],
    cta: 'Choose Standard',
    featured: true,
    badge: 'Most popular',
  },
  {
    id: 'intensive',
    name: 'Intensive',
    tagline: 'For exam season and fast catch-up.',
    classes: 8,
    features: [
      '8 private classes per month',
      '60-minute sessions',
      'Personalised lesson plan',
      'Weekly progress notes for parents',
      'Priority scheduling',
      'Past-paper practice + mock exams',
      'Direct tutor messaging between lessons',
    ],
    cta: 'Choose Intensive',
    featured: false,
  },
];

// ---- Pricing FAQ ----

const PRICING_FAQ = [
  {
    q: 'How does the monthly price work?',
    a: 'Your monthly cost is calculated from your hourly rate, the length of each session, and how many classes you take in a month. There are no sign-up fees and no lock-in contracts — you can change plans or pause at any time.',
  },
  {
    q: 'Why do prices differ by country?',
    a: 'Tutor rates are set in local currency to keep pricing fair across regions. If your country isn\'t listed, pick "Other" and we\'ll quote you a rate in USD.',
  },
  {
    q: 'Do you offer sibling or group discounts?',
    a: 'Yes. Small-group lessons cost less per student than private lessons. If you\'re booking for two or more siblings, contact us and we\'ll put together a combined plan.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Card and bank transfer are both supported. You\'ll be invoiced at the start of each month, and you can cancel before the next billing cycle if you don\'t want to continue.',
  },
  {
    q: 'What if my child misses a lesson?',
    a: 'Lessons cancelled with at least 24 hours\' notice are rescheduled at no cost. Short-notice cancellations are counted against the monthly allocation.',
  },
];

// ---- Component ----

export default function Prices() {
  const [countryCode, setCountryCode] = useState('NG');
  const [formatId, setFormatId] = useState('private');
  const [classCount, setClassCount] = useState(4);

  const country = useMemo(
    () => COUNTRIES.find((c) => c.code === countryCode) ?? COUNTRIES[0],
    [countryCode]
  );
  const format = useMemo(
    () => FORMATS.find((f) => f.id === formatId) ?? FORMATS[0],
    [formatId]
  );

  // Monthly cost = hourly rate × (session length / 60) × classes
  const hourlyRate = country[format.rateKey];
  const monthlyCost = Math.round(
    hourlyRate * (SESSION_MINUTES / 60) * classCount
  );

  const formatPrice = (value) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: country.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <>
      {/* ============ HERO ============ */}
      <PageHero
        eyebrow="Monthly pricing"
        title="Find What Works for Your Family"
        lead="Flexible monthly pricing, tailored to your family's learning needs. No long-term contracts change or pause any time."
        backgroundImage={pricingHeroBg}
      />

      {/* ============ PLAN BUILDER ============ */}
      <section className="section prices-builder-section">
        <div className="container">
          <div className="section-head text-center">
            <p className="section-eyebrow">Build your plan</p>
            <h2 className="section-title">Choose what works for you and your family</h2>
            <p className="section-lead section-lead-center">
              Three quick steps. Your monthly cost updates as you go.
            </p>
          </div>

          <div className="prices-builder">
            {/* -------- Steps column -------- */}
            <div className="prices-steps">

              {/* Step 1: Country */}
              <div className="prices-step">
                <div className="prices-step-head">
                  <span className="prices-step-number">01</span>
                  <h3 className="prices-step-title">Choose your country</h3>
                </div>
                <div className="prices-step-body">
                  <label className="visually-hidden" htmlFor="pricing-country">
                    Select your country
                  </label>
                  <select
                    id="pricing-country"
                    className="prices-select"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Step 2: Format */}
              <div className="prices-step">
                <div className="prices-step-head">
                  <span className="prices-step-number">02</span>
                  <h3 className="prices-step-title">Choose learning format</h3>
                </div>
                <div className="prices-step-body">
                  <div
                    className="prices-format-options"
                    role="radiogroup"
                    aria-label="Learning format"
                  >
                    {FORMATS.map((f) => {
                      const isActive = f.id === formatId;
                      return (
                        <button
                          key={f.id}
                          type="button"
                          role="radio"
                          aria-checked={isActive}
                          className={
                            'prices-format-option' +
                            (isActive ? ' prices-format-option--active' : '')
                          }
                          onClick={() => setFormatId(f.id)}
                        >
                          <span className="prices-format-name">{f.name}</span>
                          <span className="prices-format-desc">
                            {f.description}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Step 3: Class count */}
              <div className="prices-step">
                <div className="prices-step-head">
                  <span className="prices-step-number">03</span>
                  <h3 className="prices-step-title">
                    Choose number of classes
                  </h3>
                </div>
                <div className="prices-step-body">
                  <div
                    className="prices-class-options"
                    role="radiogroup"
                    aria-label="Classes per month"
                  >
                    {CLASS_COUNTS.map((n) => {
                      const isActive = n === classCount;
                      return (
                        <button
                          key={n}
                          type="button"
                          role="radio"
                          aria-checked={isActive}
                          className={
                            'prices-class-option' +
                            (isActive ? ' prices-class-option--active' : '')
                          }
                          onClick={() => setClassCount(n)}
                        >
                          <strong>{n}</strong>
                          <span>per month</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>

            {/* -------- Summary column -------- */}
            <aside className="prices-summary" aria-live="polite">
              <p className="prices-summary-label">Your monthly cost</p>

              <p className="prices-summary-country">
                {country.name}
              </p>

              <p className="prices-summary-price">
                {formatPrice(monthlyCost)}
              </p>

              <p className="prices-summary-meta">
                {classCount} {format.name.toLowerCase()}{' '}
                {classCount === 1 ? 'class' : 'classes'} ·{' '}
                {formatPrice(hourlyRate)}/hr
              </p>

              <hr className="prices-summary-divider" />

              <ul className="prices-summary-breakdown">
                <li>
                  <span>Format</span>
                  <strong>{format.name}</strong>
                </li>
                <li>
                  <span>Session length</span>
                  <strong>{SESSION_MINUTES} min</strong>
                </li>
                <li>
                  <span>Classes / month</span>
                  <strong>{classCount}</strong>
                </li>
                <li>
                  <span>Effective hourly rate</span>
                  <strong>{formatPrice(hourlyRate)}</strong>
                </li>
              </ul>

              <Link
                to={`/booking?format=${formatId}&classes=${classCount}&country=${countryCode}`}
                className="btn btn-primary btn-lg w-100 mt-3"
              >
                Select this plan
              </Link>

              <p className="prices-summary-note">
                No sign-up fee. Cancel or pause any time.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* ============ PLAN CARDS ============ */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head text-center">
            <p className="section-eyebrow">Pick a starting point</p>
            <h2 className="section-title">Simple, transparent plans</h2>
            <p className="section-lead section-lead-center">
              All plans include a personalised lesson plan and progress
              updates. Upgrade or downgrade any month.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {PLANS.map((plan) => (
              <div className="col-md-6 col-lg-4" key={plan.id}>
                <div
                  className={
                    'pricing-card' +
                    (plan.featured ? ' pricing-card--featured' : '')
                  }
                >
                  {plan.badge && (
                    <span className="pricing-card-badge">{plan.badge}</span>
                  )}

                  <h3 className="pricing-card-name">{plan.name}</h3>
                  <p className="pricing-card-tagline">{plan.tagline}</p>

                  <div className="pricing-card-price">
                    <span className="pricing-card-from">from</span>
                    <strong>
                      {formatPrice(
                        country[
                          FORMATS.find((f) => f.id === 'private').rateKey
                        ] * plan.classes
                      )}
                    </strong>
                    <span className="pricing-card-period">/ month</span>
                  </div>

                  <ul className="pricing-card-features">
                    {plan.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>

                  <Link
                    to={`/booking?plan=${plan.id}`}
                    className={
                      plan.featured
                        ? 'btn btn-primary btn-lg w-100'
                        : 'btn btn-outline-primary btn-lg w-100'
                    }
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="pricing-cards-note text-center">
            Prices shown in {country.name} ({country.symbol}). Change your
            country above to see local rates.
          </p>
        </div>
      </section>

      {/* ============ PRICING FAQ ============ */}
      <section className="section">
        <div className="container">
          <div className="section-head text-center">
            <p className="section-eyebrow">Questions</p>
            <h2 className="section-title">Pricing FAQs</h2>
          </div>

          <div className="pricing-faq">
            {PRICING_FAQ.map((item) => (
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
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="section section-cta">
        <div className="container">
          <div className="cta-box text-center">
            <h2 className="cta-title">Not sure which plan to choose?</h2>
            <p className="cta-lead">
              Chat with us and we&apos;ll help you find the option that best
              fits your child&apos;s learning needs.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Talk to us
              </Link>
              <Link to="/booking" className="btn btn-outline-light btn-lg">
                Book a trial session
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}