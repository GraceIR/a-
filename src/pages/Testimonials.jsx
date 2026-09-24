import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';



// ---- Content ----

const CATEGORIES = [
  { id: 'all',      label: 'All testimonials' },
  { id: 'parent',   label: 'From parents' },
  { id: 'student',  label: 'From students' },
  { id: 'maths',    label: 'Maths' },
  { id: 'english',  label: 'English' },
  { id: 'science',  label: 'Sciences' },
  { id: 'exams',    label: 'Exam prep' },
];

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      'My daughter went from dreading maths homework to asking for extra practice. Her confidence has completely changed she actually believes she can do it now.',
    name: 'Mrs. Adeyemi',
    role: 'Parent · Lagos, Nigeria',
    tags: ['parent', 'maths'],
    rating: 5,
  },
  {
    id: 2,
    quote:
      'The tutor took time to understand where I was struggling instead of just rushing through the syllabus. I went from a C to an A in my IGCSE English.',
    name: 'Chidera O.',
    role: 'Student · London, UK',
    tags: ['student', 'english', 'exams'],
    rating: 5,
  },
  {
    id: 3,
    quote:
      'We moved countries mid-year and were worried about our son falling behind. His tutor adapted to the new curriculum seamlessly and he barely missed a step.',
    name: 'Mr. Okonkwo',
    role: 'Parent · Toronto, Canada',
    tags: ['parent'],
    rating: 5,
  },
  {
    id: 4,
    quote:
      'Chemistry finally made sense. The way concepts were broken down real-world examples, then practice is completely different from school.',
    name: 'Amaka B.',
    role: 'Student · Abuja, Nigeria',
    tags: ['student', 'science', 'exams'],
    rating: 5,
  },
  {
    id: 5,
    quote:
      'The progress reports are what sold us. Every 6 weeks we get a clear, honest update not vague reassurance. It\'s the most transparent tutoring we\'ve used.',
    name: 'Mrs. Okafor',
    role: 'Parent · Dubai, UAE',
    tags: ['parent'],
    rating: 5,
  },
  {
    id: 6,
    quote:
      'My son needed help with A-Level Physics, which we struggled to find locally. His tutor was brilliant patient, structured, and genuinely invested in his results.',
    name: 'Dr. Whitfield',
    role: 'Parent · Sydney, Australia',
    tags: ['parent', 'science'],
    rating: 5,
  },
  {
    id: 7,
    quote:
      'The exam prep sessions were intense but exactly what I needed. Mock papers, technique coaching, and honest feedback on where I was losing marks. Passed with a 7 in IB Maths.',
    name: 'Tobi A.',
    role: 'Student · Lagos, Nigeria',
    tags: ['student', 'maths', 'exams'],
    rating: 5,
  },
  {
    id: 8,
    quote:
      'What I appreciate most is the consistency. Same tutor, every week. No rotating through different people. My daughter has built a real relationship with her teacher.',
    name: 'Mrs. Salami',
    role: 'Parent · Manchester, UK',
    tags: ['parent'],
    rating: 5,
  },
  {
    id: 9,
    quote:
      'I was skeptical about online tutoring, but the interactive whiteboard and shared materials made it feel just as personal as being in the same room.',
    name: 'Mr. Adeleke',
    role: 'Parent · Houston, USA',
    tags: ['parent'],
    rating: 5,
  },
  {
    id: 10,
    quote:
      'The consultation alone was worth it. They asked all the right questions before recommending anything. No hard sell just genuinely helpful advice.',
    name: 'Mrs. Nwosu',
    role: 'Parent · Nairobi, Kenya',
    tags: ['parent'],
    rating: 5,
  },
  {
    id: 11,
    quote:
      'Biology was my worst subject. Within three months I went from avoiding it to actually enjoying it. My tutor made complex topics feel accessible.',
    name: 'Ifeoma C.',
    role: 'Student · Port Harcourt, Nigeria',
    tags: ['student', 'science'],
    rating: 5,
  },
  {
    id: 12,
    quote:
      'My son passed his 11+ with a place at his first-choice school. We honestly don\'t think he would have without the structured prep and the tutor\'s steady encouragement.',
    name: 'Mrs. Bello',
    role: 'Parent · Birmingham, UK',
    tags: ['parent', 'exams'],
    rating: 5,
  },
];

// ---- Component ----

export default function Testimonials() {
  const [category, setCategory] = useState('all');

  const filtered = useMemo(() => {
    if (category === 'all') return TESTIMONIALS;
    return TESTIMONIALS.filter((t) => t.tags.includes(category));
  }, [category]);

  // First item rendered as a "featured" testimonial
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      {/* ============ HERO ============ */}
      <PageHero
        eyebrow="Real families, real results"
        title="Testimonials"
        lead="Feedback from parents and students we've worked with around the world in their own words."
      />

      {/* ============ STATS STRIP ============ */}
      <section className="testimonials-stats-section">
        <div className="container">
          <div className="testimonials-stats">
            <div className="testimonials-stat">
              <p className="testimonials-stat-value">200+</p>
              <p className="testimonials-stat-label">Students taught</p>
            </div>
            <div className="testimonials-stat">
              <p className="testimonials-stat-value">12+</p>
              <p className="testimonials-stat-label">Countries served</p>
            </div>
            <div className="testimonials-stat">
              <p className="testimonials-stat-value">4.9★</p>
              <p className="testimonials-stat-label">Average rating</p>
            </div>
            <div className="testimonials-stat">
              <p className="testimonials-stat-value">95%</p>
              <p className="testimonials-stat-label">Would recommend</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FILTER PILLS ============ */}
      <section className="testimonials-toolbar">
        <div className="container">
          <div
            className="testimonials-filters"
            role="group"
            aria-label="Filter testimonials by category"
          >
            {CATEGORIES.map((c) => {
              const isActive = c.id === category;
              return (
                <button
                  key={c.id}
                  type="button"
                  className={
                    'testimonials-filter' +
                    (isActive ? ' testimonials-filter--active' : '')
                  }
                  aria-pressed={isActive}
                  onClick={() => setCategory(c.id)}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          <p className="testimonials-count" aria-live="polite">
            {filtered.length > 0
              ? `Showing ${filtered.length} ${filtered.length === 1 ? 'testimonial' : 'testimonials'}`
              : 'No testimonials in this category'}
          </p>
        </div>
      </section>

      {/* ============ FEATURED TESTIMONIAL ============ */}
      {featured && (
        <section className="section testimonials-featured-section">
          <div className="container">
            <figure className="testimonial-featured">
              <div className="testimonial-featured-stars" aria-label={`${featured.rating} out of 5 stars`}>
                {'★'.repeat(featured.rating)}
              </div>
              <blockquote className="testimonial-featured-quote">
                &ldquo;{featured.quote}&rdquo;
              </blockquote>
              <figcaption className="testimonial-featured-meta">
                <strong>{featured.name}</strong>
                <span>{featured.role}</span>
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      {/* ============ TESTIMONIAL GRID ============ */}
      <section className="section testimonials-grid-section">
        <div className="container">
          {rest.length === 0 ? (
            <p className="text-center text-muted py-4">
              No more testimonials in this category.
            </p>
          ) : (
            <div className="testimonials-grid">
              {rest.map((t) => (
                <article key={t.id} className="testimonial-tile">
                  <div
                    className="testimonial-tile-stars"
                    aria-label={`${t.rating} out of 5 stars`}
                  >
                    {'★'.repeat(t.rating)}
                  </div>
                  <blockquote className="testimonial-tile-quote">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <footer className="testimonial-tile-meta">
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </footer>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============ LEAVE A REVIEW CTA ============ */}
      <section className="section section-alt testimonials-review-section">
        <div className="container">
          <div className="testimonials-review">
            <div className="testimonials-review-content">
              <p className="section-eyebrow">Your turn</p>
              <h2 className="section-title">
                Already worked with us?
              </h2>
              <p className="section-lead">
                We&apos;d love to hear how lessons went. Leave a review it
                helps other families find the right fit, and it helps us keep
                improving.
              </p>
            </div>
            <div className="testimonials-review-actions">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Share your story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="section section-cta">
        <div className="container">
          <div className="cta-box text-center">
            <h2 className="cta-title">Ready to see the same results?</h2>
            <p className="cta-lead">
              Book a free consultation and we&apos;ll match you with the right
              tutor for your child.
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