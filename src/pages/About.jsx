import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import aboutHeroBg from '../assets/about-hero.jpg';

import imgGlobal from '../assets/about/global.jpg';
import imgStudent from '../assets/about/student.avif'
import imgProgress from '../assets/about/progress.avif';
import imgHonesty from '../assets/about/honesty.webp';

/* ============================================================
   CONTENT
   ============================================================ */

const VALUES = [
  {
    image: imgStudent,
    title: 'Student-led, not syllabus-led',
    text: 'Every lesson starts with the student their level, their pace, their goals. The syllabus is a guide, not a script.',
  },
  {
    image: imgGlobal,
    title: 'Global by default',
    text: 'We teach across time zones, curricula and cultures. Our tutors are comfortable adapting to any exam board or education system.',
  },
  {
    image: imgProgress,
    title: 'Progress you can measure',
    text: 'We track outcomes, not just hours. Every family gets regular, written feedback on what\'s improving and what\'s next.',
  },
  {
    image: imgHonesty,
    title: 'Honest and transparent',
    text: 'Clear pricing, no lock-in contracts, and no upselling. If a tutor isn\'t the right fit, we\'ll change them at no cost.',
  },
];

const STATS = [
  { value: '200+', label: 'Students taught' },
  { value: '12+',  label: 'Countries served' },
  { value: '4.9★', label: 'Average rating' },
  { value: '95%',  label: 'Would recommend' },
];

{/*const TEAM = [
  {
    name: 'Adeola Adeyemi',
    role: 'Founder & Lead Tutor',
    subject: 'Mathematics · Physics',
    bio: 'B.Ed Mathematics, 10+ years teaching. Adeola founded the academy after years of seeing how much difference the right tutor can make.',
    image: teamAdeola,
  },
  {
    name: 'Chidi Okonkwo',
    role: 'Senior Tutor',
    subject: 'English · Literature',
    bio: 'BA English, PGDE. Chidi specialises in essay writing, comprehension and preparing students for IGCSE and WAEC English.',
    image: teamChidi,
  },
  {
    name: 'Fatima Bello',
    role: 'Sciences Tutor',
    subject: 'Biology · Chemistry',
    bio: 'BSc Biology, MSc Public Health. Fatima brings lab experience and a gift for explaining complex ideas simply.',
    image: teamFatima,
  },
  {
    name: 'James Whitfield',
    role: 'Exam Prep Specialist',
    subject: 'SAT · 11+ · IGCSE',
    bio: 'Former secondary school head of year. James has helped hundreds of students hit their target exam grades.',
    image: teamJames,
  },
];*/}

const MILESTONES = [
  {
    year: '2018',
    title: 'The first student',
    text: 'Started as a solo tutoring practice with one student and a shared whiteboard.',
  },
  {
    year: '2020',
    title: 'Went fully online',
    text: 'Moved all lessons online, opening the door to families beyond our local area.',
  },
  {
    year: '2022',
    title: 'Built a team',
    text: 'Brought on our first specialist tutors, each vetted and hand-picked for their subject expertise.',
  },
  {
    year: '2024',
    title: 'Worldwide reach',
    text: 'Now teaching students across 12+ countries, spanning five major curricula.',
  },
];

/* ============================================================
   COMPONENT
   ============================================================ */

export default function About() {
  return (
    <>
      
      {/*<SEO
        title="About Us"
        description="a+ Academy is a team of qualified educators teaching primary, secondary and pre-university students across multiple curricula — online, worldwide."
        url="/about"
      />*/}

      {/* ============ HERO ============ */}
      <PageHero
        eyebrow="Who we are"
        title="A tutoring team built around every student"
        lead="We're a hand-picked team of qualified educators teaching primary, secondary and pre-university students across multiple curricula Nigerian, British, American, Cambridge and IB."
        backgroundImage={aboutHeroBg}
      />

      {/* ============ MISSION ============ */}
      <section className="section about-mission-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <p className="section-eyebrow">Our mission</p>
              <h2 className="section-title">
                Great tutoring shouldn&apos;t depend on where you live
              </h2>
              <p className="section-lead">
                For decades, access to excellent tutoring has been shaped by
                postcode, budget and luck. We think that&apos;s wrong.
              </p>
              <p className="section-lead">
                a+ Academy exists to give families everywhere from Lagos to
                London, Toronto to Dubai access to the same calibre of
                one-to-one teaching. Our tutors are qualified, vetted and
                matched carefully to each student. Our lessons are structured,
                measurable and genuinely enjoyable.
              </p>
              <p className="section-lead">
                The result: students who don&apos;t just pass exams, but build
                real understanding and lasting confidence.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="about-mission-visual">
                <div className="about-mission-quote">
                  <p className="about-mission-quote-text">
                    &ldquo;Every student deserves a tutor who believes they can
                    do it and the skill to help them get there.&rdquo;
                  </p>
                  <p className="about-mission-quote-sign">
                    — Ajike Ajike Prince, Founder
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS (sliding marquee) ============ */}
        <section className="section about-stats-section" aria-label="Key facts">
          <div className="container">
            <div className="about-marquee">
              <div className="about-marquee-track">
                {/* Rendered twice for a seamless loop — the second copy is invisible
                    to screen readers to avoid duplicate announcements */}
                {[0, 1].map((copy) => (
                  <div
                    className="about-marquee-group"
                    key={copy}
                    aria-hidden={copy === 1}
                  >
                    {STATS.map((s) => (
                      <div
                        className="about-stat"
                        key={`${copy}-${s.label}`}
                      >
                        <p className="about-stat-value">{s.value}</p>
                        <p className="about-stat-label">{s.label}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      {/* ============ OUR STORY / TIMELINE ============ */}
      <section className="section section-alt about-story-section">
        <div className="container">
          <div className="section-head text-center">
            <p className="section-eyebrow">Our story</p>
            <h2 className="section-title">How we got here</h2>
            <p className="section-lead section-lead-center">
              From a single student in 2018 to a global tutoring team
              a few milestones along the way.
            </p>
          </div>

          <div className="about-timeline">
            {MILESTONES.map((m) => (
              <div className="about-timeline-item" key={m.year}>
                <div className="about-timeline-year">{m.year}</div>
                <div className="about-timeline-card">
                  <h3 className="about-timeline-title">{m.title}</h3>
                  <p className="about-timeline-text">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VALUES ============ */}
      <section className="section about-values-section">
        <div className="container">
          <div className="section-head text-center">
            <p className="section-eyebrow">What we stand for</p>
            <h2 className="section-title">Our core values</h2>
            <p className="section-lead section-lead-center">
              Four principles that shape every lesson, every match and every
              decision we make.
            </p>
          </div>

           <div className="row g-4">
                  {VALUES.map((v) => (
                  <div className="col-sm-6 col-lg-3" key={v.title}>
                    <div className="about-value-card">
                      {v.image ? (
                        <div className="about-value-image-wrap" aria-hidden="true">
                          <img
                            src={v.image}
                            alt=""
                            className="about-value-image"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <span className="about-value-icon" aria-hidden="true">
                          {v.icon}
                        </span>
                      )}

                      <h3 className="about-value-title">{v.title}</h3>
                      <p className="about-value-text">{v.text}</p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* ============ MEET THE TEAM ============ */}
      {/*<section className="section section-alt about-team-section">
        <div className="container">
          <div className="section-head text-center">
            <p className="section-eyebrow">Meet the team</p>
            <h2 className="section-title">The tutors behind a+ Academy</h2>
            <p className="section-lead section-lead-center">
              Qualified educators, subject specialists and — most importantly
              — people who genuinely enjoy teaching.
            </p>
          </div>

          <div className="row g-4">
            {TEAM.map((member) => (
              <div className="col-sm-6 col-lg-3" key={member.name}>
                <article className="about-team-card">
                  <div className="about-team-photo">
                    <img
                      src={member.image}
                      alt={`${member.name}, ${member.role}`}
                      loading="lazy"
                      className="about-team-img"
                    />
                  </div>
                  <h3 className="about-team-name">{member.name}</h3>
                  <p className="about-team-role">{member.role}</p>
                  <p className="about-team-subject">{member.subject}</p>
                  <p className="about-team-bio">{member.bio}</p>
                </article>
              </div>
            ))}
          </div>

          <p className="text-center mt-5">
            <Link to="/contact" className="btn btn-outline-primary">
              Interested in joining the team?
            </Link>
          </p>
        </div>
      </section>*/}

      {/* ============ WHY FAMILIES CHOOSE US ============ */}
      <section className="section about-why-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-5">
              <p className="section-eyebrow">Why families choose us</p>
              <h2 className="section-title">
                What makes a+ Academy different
              </h2>
              <p className="section-lead">
                Plenty of tutoring services exist. Here&apos;s what we do
                differently and why families come back.
              </p>
            </div>
            <div className="col-lg-7">
              <ul className="about-why-list">
                <li>
                  <strong>Carefully matched tutors.</strong> Students are
                  paired based on subject, level, learning style and, where
                  possible personality fit.
                </li>
                <li>
                  <strong>Consistent tutors over time.</strong> We don&apos;t
                  rotate tutors. Students work with the same person week after
                  week, which builds trust and momentum.
                </li>
                <li>
                  <strong>Written progress reports.</strong> Every family gets
                  clear, structured feedback every 6–8 weeks not vague
                  reassurance.
                </li>
                <li>
                  <strong>No long-term contracts.</strong> Plans are monthly.
                  Pause, upgrade or step away any time, without penalties.
                </li>
                <li>
                  <strong>Genuine subject expertise.</strong> Every tutor holds
                  a relevant degree or teaching qualification in the subject
                  they teach.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="section section-cta">
        <div className="container">
          <div className="cta-box text-center">
            <h2 className="cta-title">Ready to meet your tutor?</h2>
            <p className="cta-lead">
              Book a free consultation and we&apos;ll match you with the right
              tutor for your child&apos;s needs.
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