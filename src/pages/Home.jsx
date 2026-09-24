import { Link } from 'react-router-dom';
import heroBg from '../assets/hero-bg.jpg';
import heroTutor from '../assets/hero-tutor.jpg';
import tutorPortrait from '../assets/tutor-portrait.jpg';

import testimonialsBg from '../assets/homepage/drop.avif';

import imgProgress from '../assets/homepage/progress.webp';
import imgCurriculum from '../assets/homepage/curriculum.webp';
import imgTimezones from '../assets/homepage/timezones.gif';
import imgPersonalised from '../assets/homepage/personalised.jpg';



/* ---------- Section data ---------- */

const BENEFITS = [
  {
    image: imgPersonalised,
    title: 'Personalised lesson plans',
    text: 'Every student gets a plan built around their current level, goals and learning pace never a one-size-fits-all approach.',
  },
  {
    image: imgCurriculum,
    title: 'Tutors for any curriculum',
    text: 'Nigerian, British, American, IB, Cambridge and more matched to the syllabus your child actually studies.',
  },
  {
    image: imgTimezones,
    title: 'Online, any timezone',
    text: 'Live interactive lessons scheduled around your family’s time zone, wherever in the world you are.',
  },
  {
    image: imgProgress,
    title: 'Progress you can see',
    text: 'Regular check-ins, practice tasks and parent updates so you always know how your child is improving.',
  },
];

const FEATURED_SUBJECTS = [
  {
    id: 1,
    name: 'Mathematics',
    level: 'Primary · Secondary · Exam Prep',
    blurb: 'From number sense to advanced calculus build confidence step by step.',
    accent: 'brand',
  },
  {
    id: 2,
    name: 'English Language',
    level: 'Primary · Secondary · Exam Prep',
    blurb: 'Reading, writing, comprehension and confident communication.',
    accent: 'accent',
  },
  {
    id: 3,
    name: 'Science',
    level: 'Primary · Secondary',
    blurb: 'Biology, Chemistry and Physics taught with real-world examples.',
    accent: 'brand',
  },
  {
    id: 4,
    name: 'Exam Preparation',
    level: 'WAEC · JAMB · SAT · IGCSE · 11+',
    blurb: 'Targeted revision, past questions and exam technique coaching.',
    accent: 'accent',
  },
];

const STEPS = [
  {
    n: '01',
    title: 'Book a session',
    text: 'Choose a subject, pick a preferred date and time in your time zone, and tell us what you want to achieve.',
  },
  {
    n: '02',
    title: 'Free consultation',
    text: 'We discuss goals, assess current level and match your child with the right tutor.',
  },
  {
    n: '03',
    title: 'Start learning',
    text: 'Lessons begin online with a clear plan, shared materials and regular practice tasks.',
  },
  {
    n: '04',
    title: 'Track progress',
    text: 'See improvement through progress reports, test scores and tutor feedback.',
  },
];

const TESTIMONIALS = [
  {
    quote:
      'My daughter went from dreading maths to actually looking forward to her lessons. Her confidence has completely changed.',
    name: 'Mrs. Adeyemi',
    role: 'Parent · Lagos, Nigeria',
  },
  {
    quote:
      'The tutor took time to understand where I was struggling instead of just rushing through the syllabus. I passed my IGCSE with an A.',
    name: 'Chidera O.',
    role: 'Secondary student · London, UK',
  },
  {
    quote:
      'Flexible scheduling made it possible to keep up with lessons across three different time zones. Highly recommended.',
    name: 'Mr. Okonkwo',
    role: 'Parent · Toronto, Canada',
  },
];

/* ---------- Component ---------- */

export default function Home() {
  return (
    <>
      {/* ============ 1. HERO (background + side image) ============ */}
     
        <section
        className="hero hero-bg"
        style={{ '--hero-bg': `url(${heroBg})` }}
        >
        <div className="hero-overlay" aria-hidden="true" />

        <div className="container hero-inner py-5">
            <div className="row align-items-center g-5">

            {/* -------- LEFT COLUMN: copy + trust stats -------- */}
            <div className="col-lg-6">
                <div className="hero-copy">

                {/* Top-left stat */}
                <div className="hero-stat hero-stat--tl">
                    <strong className="hero-stat-strong">200+</strong>
                    <span className="hero-stat-label">students taught</span>
                </div>

                {/* Top-right stat */}
                <div className="hero-stat hero-stat--tr">
                    <span className="hero-stat-star" aria-hidden="true">★</span>
                    <strong className="hero-stat-strong">4.9</strong>
                    <span className="hero-stat-label">average rating</span>
                </div>

                {/* Middle: main copy */}
                <p className="hero-eyebrow">Private tutoring, built around you</p>

                <h1 className="hero-title">
                    Learn with a tutor who actually gets it.
                </h1>

                <p className="hero-lead">
                    One-on-one lessons, exam prep and guided study online, for
                    students anywhere in the world. Personalised plans that meet
                    your child where they are and take them further.
                </p>

                <div className="d-flex gap-3 flex-wrap">
                    <Link to="/booking" className="btn btn-primary btn-lg">
                    Book a Session
                    </Link>
                    <Link to="/subjects" className="btn btn-outline-light btn-lg">
                    Browse Subjects
                    </Link>
                </div>

                {/* Bottom stat */}
                <div className="hero-stat hero-stat--bottom-right">
                    <strong className="hero-stat-strong">12+</strong>
                    <span className="hero-stat-label">countries served</span>
                </div>

                </div>
            </div>

            {/* -------- RIGHT COLUMN: photo card -------- */}
            <div className="col-lg-6">
                <div className="hero-photo-card">
                <img
                    src={heroTutor}
                    alt="Tutor guiding a student through an online lesson"
                    className="hero-photo-img"
                    loading="eager"
                />
                <div className="hero-photo-badge">
                    <span className="hero-photo-badge-dot" aria-hidden="true" />
                    Live online lessons
                </div>
                </div>
            </div>

            </div>
        </div>
        </section>

      {/* ============ 2. ABOUT THE ACADEMY ============ */}
        <section className="section section-intro">
        <div className="container">
            <div className="row align-items-center g-5">
            <div className="col-lg-5">
                <div className="intro-photo">
                <img
                    src={tutorPortrait}
                    alt="A tutor guiding a student through a lesson"
                    className="intro-photo-img"
                    loading="lazy"
                />
                </div>
            </div>
            <div className="col-lg-7">
                <p className="section-eyebrow">Who we are</p>
                <h2 className="section-title">
                A tutoring team built around every student&apos;s success
                </h2>
                
                <p className="section-lead">
                We&apos;re a hand-picked team of qualified educators teaching primary,
                secondary and pre-university students across multiple curricula —
                Nigerian, British, American, Cambridge and IB. Our approach is
                simple: understand the student first, then match them with the tutor
                who&apos;s the right fit for how they learn.
                </p>

                 {/*<p className="section-lead">
                Whether your child is catching up, keeping up or getting ahead, our
                tutors deliver structured, encouraging lessons that build both
                competence and confidence online, from anywhere in the world.
                </p>*/}

                <ul className="intro-list">
                <li>Qualified educators across multiple curricula and subjects</li>
                <li>Experience with WAEC, JAMB, IGCSE, SAT and 11+ preparation</li>
                <li>Students matched to tutors based on needs, level and learning style</li>
                <li>Consistent progress reports and regular parent check-ins</li>
                </ul>
                <Link to="/about" className="btn btn-outline-primary mt-3">
                Learn more about us →
                </Link>
            </div>
            </div>
        </div>
        </section>

      {/* ============ 3. BENEFITS ============ */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head text-center">
            <p className="section-eyebrow">Why families choose us</p>
            <h2 className="section-title">
              Tutoring that actually makes a difference
            </h2>
            <p className="section-lead section-lead-center">
              Not just extra lessons a structured learning partnership built
              around your child&apos;s needs, no matter where you are.
            </p>
          </div>
          <div className="row g-4">
            {BENEFITS.map((b) => (
                <div className="col-sm-6 col-lg-3" key={b.title}>
                  <div className="benefit-card">
                    {b.image ? (
                      <div className="benefit-image-wrap" aria-hidden="true">
                        <img
                          src={b.image}
                          alt=""
                          className="benefit-image"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="benefit-icon" aria-hidden="true">
                        {b.icon}
                      </div>
                    )}
                    <h3 className="benefit-title">{b.title}</h3>
                    <p className="benefit-text">{b.text}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ============ 4. FEATURED SUBJECTS ============ */}
      <section className="section">
        <div className="container">
          <div className="section-head text-center">
            <p className="section-eyebrow">What we teach</p>
            <h2 className="section-title">Popular subjects</h2>
            <p className="section-lead section-lead-center">
              Core academic subjects and exam preparation for primary,
              secondary and pre-university students worldwide.
            </p>
          </div>
          <div className="row g-4">
            {FEATURED_SUBJECTS.map((s) => (
              <div className="col-sm-6 col-lg-3" key={s.id}>
                <div className={`subject-card subject-card-${s.accent}`}>
                  <h3 className="subject-card-name">{s.name}</h3>
                  <p className="subject-card-level">{s.level}</p>
                  <p className="subject-card-blurb">{s.blurb}</p>
                  <Link to={`/subjects/${s.id}`} className="subject-card-link">
                    View subject →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/subjects" className="btn btn-outline-primary">
              See all subjects
            </Link>
          </div>
        </div>
      </section>

      {/* ============ 5. HOW IT WORKS ============ */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head text-center">
            <p className="section-eyebrow">Simple process</p>
            <h2 className="section-title">How it works</h2>
            <p className="section-lead section-lead-center">
              From first enquiry to visible progress in four straightforward
              steps wherever you are in the world.
            </p>
          </div>
          <div className="row g-4">
            {STEPS.map((step) => (
              <div className="col-sm-6 col-lg-3" key={step.n}>
                <div className="step-card">
                  <span className="step-number">{step.n}</span>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-text">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/how-it-works" className="btn btn-outline-primary">
              Learn more about the process
            </Link>
          </div>
        </div>
      </section>

      {/* ============ 6. TESTIMONIALS ============ */}
        <section
          className="section section-testimonials"
          style={{ '--testimonials-bg': `url(${testimonialsBg})` }}
        >
          <div className="testimonials-overlay" aria-hidden="true" />
          <div className="container section-testimonials-inner">

            <div className="section-head text-center">
              <p className="section-eyebrow section-eyebrow--light">What families say</p>
              <h2 className="section-title section-title--light">
                Real results, real feedback
              </h2>
              <p className="section-lead section-lead--light section-lead-center">
                Hear from parents and students we&rsquo;ve worked with around the world.
              </p>
            </div>

            <div className="row g-4">
              {TESTIMONIALS.map((t) => (
                <div className="col-md-4" key={t.name}>
                  <div className="testimonial-card">
                    <div className="testimonial-stars" aria-label="5 out of 5 stars">
                      ★★★★★
                    </div>
                    <blockquote className="testimonial-quote">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <div className="testimonial-meta">
                      <strong>{t.name}</strong>
                      <span>{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-5">
              <Link to="/testimonials" className="btn btn-outline-light">
                Read more testimonials
              </Link>
            </div>
          </div>
        </section>

      {/* ============ 7. FINAL CTA ============ */}
      <section className="section section-cta">
        <div className="container">
          <div className="cta-box text-center">
            <h2 className="cta-title">Ready to help your child excel?</h2>
            <p className="cta-lead">
              Book a session today — no commitment required. We&apos;ll discuss
              goals, answer your questions and match you with the right plan.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link to="/booking" className="btn btn-primary btn-lg">
                Book a Session
              </Link>
              <Link to="/contact" className="btn btn-outline-light btn-lg">
                Ask a question
              </Link>
            </div>
            <p className="cta-note">
              Prefer to chat first? Reach out at{' '}
              <a href="mailto:ajikep@yahoo.com">ajikep@yahoo.com</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}