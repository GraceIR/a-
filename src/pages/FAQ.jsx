import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

/**
 * FAQ page.
 *
 * Category-filtered list of common questions, with search.
 * Uses native <details>/<summary> for the accordion — no JS needed
 * for the expand/collapse behaviour, keyboard-accessible by default.
 */

// ---- Content ----

const CATEGORIES = [
  { id: 'all',        label: 'All questions' },
  { id: 'getting-started', label: 'Getting started' },
  { id: 'lessons',    label: 'Lessons' },
  { id: 'pricing',    label: 'Pricing & payments' },
  { id: 'tutors',     label: 'Tutors' },
  { id: 'tech',       label: 'Technical' },
];

const FAQS = [
  {
    category: 'getting-started',
    q: 'How do I book my first lesson?',
    a: 'Click "Book a Consultation" anywhere on the site and fill in the short form. We\'ll reply within 24 hours to arrange a free 15-minute consultation, where we\'ll discuss your child\'s goals and recommend the right next step. If you\'re happy to proceed, we\'ll match a tutor and schedule the first lesson.',
  },
  {
    category: 'getting-started',
    q: 'How quickly can my child start lessons?',
    a: 'Most students start within 3–5 days of their first enquiry. In busy periods it can take a little longer, but we\'ll always give you a realistic timeline when you get in touch.',
  },
  {
    category: 'getting-started',
    q: 'What ages and levels do you teach?',
    a: 'We teach primary, secondary and pre-university students — roughly ages 5 to 18. We also take on adult learners for specific subjects or exam preparation. If you\'re unsure whether we\'re a good fit, just ask during the consultation.',
  },
  {
    category: 'getting-started',
    q: 'Do you offer a free trial or consultation?',
    a: 'Yes. Every family starts with a free 15-minute consultation to discuss goals and answer questions. You\'re not committed to anything until you decide to proceed.',
  },

  {
    category: 'lessons',
    q: 'How long is each lesson?',
    a: 'Standard lessons are 60 minutes. Shorter 45-minute sessions are available for younger students, and we can extend to 90 minutes for intensive exam preparation — just mention your preference when booking.',
  },
  {
    category: 'lessons',
    q: 'How often should my child have lessons?',
    a: 'Most students take 1–2 lessons per week. For exam season or catching up on missed material, 2–3 per week is common. We\'ll recommend a frequency based on your child\'s goals during the consultation.',
  },
  {
    category: 'lessons',
    q: 'What happens if we need to cancel or reschedule?',
    a: 'Lessons cancelled with at least 24 hours\' notice are rescheduled at no cost. Short-notice cancellations are counted against your monthly allocation. If your tutor has to cancel for any reason, we\'ll reschedule at no cost.',
  },
  {
    category: 'lessons',
    q: 'Can we pause lessons during the holidays?',
    a: 'Yes. You can pause your plan for up to 8 weeks per year without losing your tutor or your plan terms. Just let us know in advance so we can adjust the schedule.',
  },
  {
    category: 'lessons',
    q: 'How many students are in a "small group" lesson?',
    a: 'Small-group lessons are limited to 2–4 students at a similar level. This keeps the session interactive while reducing the cost per student.',
  },

  {
    category: 'pricing',
    q: 'How much do lessons cost?',
    a: 'Pricing depends on your country, the format (one-to-one or small group) and how many lessons you take per month. Our Prices page has a plan builder that shows you the exact monthly cost for your situation — no hidden fees.',
  },
  {
    category: 'pricing',
    q: 'Are there any sign-up or cancellation fees?',
    a: 'No. There are no sign-up fees, no cancellation fees, and no long-term contracts. You pay month-to-month and can pause or cancel at the end of any billing period.',
  },
  {
    category: 'pricing',
    q: 'What payment methods do you accept?',
    a: 'Card and bank transfer are both supported. Payment is due at the start of each month. If a payment fails, we\'ll notify you and pause lessons until it\'s resolved — you won\'t lose your tutor.',
  },
  {
    category: 'pricing',
    q: 'Do you offer sibling or group discounts?',
    a: 'Yes. Small-group lessons cost less per student than private lessons. If you\'re booking for two or more siblings, contact us and we\'ll put together a combined plan.',
  },
  {
    category: 'pricing',
    q: 'Can I get a refund if we stop partway through a month?',
    a: 'Unused lessons in the current month are credited to your account and can be used any time within the next 3 months. We don\'t offer cash refunds for partial months, but the credits don\'t expire quickly.',
  },

  {
    category: 'tutors',
    q: 'How are tutors selected?',
    a: 'Every tutor holds a relevant degree or teaching qualification in the subject they teach and has prior tutoring or classroom experience. They also go through a background check and a trial lesson before being matched with students.',
  },
  {
    category: 'tutors',
    q: 'Will my child have the same tutor every time?',
    a: 'Yes. We don\'t rotate tutors. Students work with the same person week after week, which builds trust and continuity. If a tutor is unwell or unavailable, we\'ll arrange a substitute for that lesson and let you know in advance.',
  },
  {
    category: 'tutors',
    q: 'What if the tutor isn\'t the right fit?',
    a: 'Just let us know. We\'ll match you with a different tutor at no cost and no questions asked. It\'s common for the first match to not be perfect, and we\'d rather you switch than stick with someone who isn\'t working.',
  },
  {
    category: 'tutors',
    q: 'Can I request a specific tutor?',
    a: 'Yes. If you\'ve worked with one of our tutors before, or heard about someone specific, mention it in your consultation request and we\'ll check their availability.',
  },

  {
    category: 'tech',
    q: 'What do we need for lessons?',
    a: 'A computer, tablet or laptop with a working camera and microphone, a stable internet connection, and a quiet space. We provide the video platform, the interactive whiteboard and the lesson materials — no software to install.',
  },
  {
    category: 'tech',
    q: 'What if we have technical problems during a lesson?',
    a: 'Let your tutor know immediately and we\'ll work through it together — most issues are solved in a couple of minutes. If we can\'t resolve the problem, the lesson is rescheduled at no cost.',
  },
  {
    category: 'tech',
    q: 'Are lessons recorded?',
    a: 'Recordings are available on request and are stored securely. They\'re useful for revision or for parents who want to see what was covered. You can opt out at any time.',
  },
  {
    category: 'tech',
    q: 'Do you support time zones outside West Africa?',
    a: 'Yes. We teach students across 12+ countries and schedule lessons around your local time zone. When you book a consultation, indicate your time zone and we\'ll confirm a slot that works for you.',
  },
];

// ---- Component ----

export default function FAQ() {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    return FAQS.filter((f) => {
      const matchesCategory = category === 'all' || f.category === category;
      if (!matchesCategory) return false;

      if (!term) return true;

      return (
        f.q.toLowerCase().includes(term) ||
        f.a.toLowerCase().includes(term)
      );
    });
  }, [category, search]);

  const grouped = useMemo(() => {
    if (category !== 'all') {
      return [{ id: category, label: CATEGORIES.find((c) => c.id === category)?.label, items: filtered }];
    }

    // Group by category when viewing all
    const map = new Map();
    filtered.forEach((f) => {
      if (!map.has(f.category)) map.set(f.category, []);
      map.get(f.category).push(f);
    });

    return Array.from(map.entries()).map(([id, items]) => ({
      id,
      label: CATEGORIES.find((c) => c.id === id)?.label || id,
      items,
    }));
  }, [filtered, category]);

  return (
    <>
      {/* ============ HERO ============ */}
      <PageHero
        eyebrow="Help centre"
        title="Frequently Asked Questions"
        lead="Answers to the questions we hear most often about lessons, tutors, pricing and scheduling. Can't find what you need? Just get in touch."
      />

      {/* ============ SEARCH + FILTERS ============ */}
      <section className="faq-toolbar">
        <div className="container">
          <div className="faq-toolbar-row">
            <label className="faq-search" htmlFor="faq-search">
              <span className="faq-search-icon" aria-hidden="true">🔍</span>
              <span className="visually-hidden">Search FAQs</span>
              <input
                id="faq-search"
                type="search"
                placeholder="Search questions…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoComplete="off"
              />
            </label>

            <div className="faq-filters" role="group" aria-label="Filter by category">
              {CATEGORIES.map((c) => {
                const isActive = c.id === category;
                return (
                  <button
                    key={c.id}
                    type="button"
                    className={
                      'faq-filter' + (isActive ? ' faq-filter--active' : '')
                    }
                    aria-pressed={isActive}
                    onClick={() => setCategory(c.id)}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="faq-count" aria-live="polite">
            {filtered.length > 0
              ? `Showing ${filtered.length} ${filtered.length === 1 ? 'question' : 'questions'}`
              : 'No questions match your search'}
          </p>
        </div>
      </section>

      {/* ============ FAQ LIST ============ */}
      <section className="section faq-section">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="faq-empty">
              <span className="faq-empty-icon" aria-hidden="true">🔍</span>
              <h2 className="faq-empty-title">No questions found</h2>
              <p className="faq-empty-text">
                We couldn&apos;t find anything matching your search. Try a
                different term, or ask us directly.
              </p>
              <div className="faq-empty-actions">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => {
                    setSearch('');
                    setCategory('all');
                  }}
                >
                  Clear filters
                </button>
                <Link to="/contact" className="btn btn-primary">
                  Ask us directly
                </Link>
              </div>
            </div>
          ) : (
            <div className="faq-groups">
              {grouped.map((group) => (
                <div key={group.id} className="faq-group">
                  {category === 'all' && (
                    <h2 className="faq-group-title">{group.label}</h2>
                  )}

                  <div className="faq-list">
                    {group.items.map((item) => (
                      <details key={item.q} className="faq-item">
                        <summary className="faq-question">
                          <span>{item.q}</span>
                          <span className="faq-toggle" aria-hidden="true">+</span>
                        </summary>
                        <div className="faq-answer">
                          <p>{item.a}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============ CONTACT CTA ============ */}
      <section className="section section-alt faq-cta-section">
        <div className="container">
          <div className="faq-cta">
            <h2 className="faq-cta-title">Still have a question?</h2>
            <p className="faq-cta-text">
              If you can&apos;t find the answer here, drop us a message and
              we&apos;ll get back to you within 24 hours.
            </p>
            <div className="faq-cta-actions">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Contact us
              </Link>
              <Link to="/booking" className="btn btn-outline-primary btn-lg">
                Book a free consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}