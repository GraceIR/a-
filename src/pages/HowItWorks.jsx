import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import howitwoksHeroBg from '../assets/subjects/study-skills.jpg';
/**
 * HowItWorks
 *
 * Explains the tutoring journey from first enquiry through to
 * measurable progress. Timeline-driven layout with alternating
 * steps, a session breakdown, a technology section, and process FAQs.
 */

const STEPS = [
  {
    n: '01',
    title: 'Book a session',
    summary:
      'Choose a subject, pick a preferred date and time in your time zone, and tell us what you want to achieve.',
    details: [
      'Fill in the booking form with your subject, level and goals',
      'Select a date and time that works for your family',
      'Add any context current grades, exam dates, specific worries',
    ],
    cta: { label: 'Book a Session', to: '/booking' },
  },
  {
    n: '02',
    title: 'Free consultation',
    summary:
      'A short, no-commitment call to understand your child\'s needs and match them with the right tutor.',
    details: [
      '15-minute call with a coordinator (or the tutor directly)',
      'We discuss goals, current level and any past tutoring experience',
      'We recommend a plan frequency, focus areas and starting point',
    ],
  },
  {
    n: '03',
    title: 'Meet your tutor',
    summary:
      'You\'re introduced to the tutor who best fits your child\'s subject, level and learning style.',
    details: [
      'Tutor profile shared before the first lesson',
      'First lesson includes a short diagnostic to confirm the starting point',
      'You can request a different match at any time no questions asked',
    ],
  },
  {
    n: '04',
    title: 'Start learning',
    summary:
      'Regular one-to-one lessons online, live, and built around your child\'s pace and goals.',
    details: [
      'Sessions run 45–60 minutes, typically 1–3 times per week',
      'Interactive whiteboard, shared materials and lesson recordings',
      'Practice tasks between sessions to lock in what\'s been learned',
    ],
  },
  {
    n: '05',
    title: 'Track progress',
    summary:
      'Regular check-ins so you always know how your child is improving and what\'s coming next.',
    details: [
      'Short progress note after each lesson block',
      'Milestone reports tied to specific learning outcomes',
      'Reassess and adjust the plan every 6–8 weeks',
    ],
  },
];

const SESSION_BREAKDOWN = [
  {
    icon: '🔥',
    title: 'Warm-up',
    time: '5 min',
    text: 'A quick recap of the last lesson and one warm-up problem to activate prior knowledge.',
  },
  {
    icon: '🎯',
    title: 'Focus topic',
    time: '15 min',
    text: 'Introduction of the new concept or skill, explained in the student\'s own terms with worked examples.',
  },
  {
    icon: '✏️',
    title: 'Guided practice',
    time: '20 min',
    text: 'The student works through problems with the tutor\'s support — building confidence before independence.',
  },
  {
    icon: '🚀',
    title: 'Independent work',
    time: '10 min',
    text: 'Real exam-style questions solved alone, so the tutor can see what\'s actually stuck.',
  },
  {
    icon: '📌',
    title: 'Wrap-up',
    time: '5 min',
    text: 'Summary of what was learned, plus a short practice task to complete before the next session.',
  },
];

const TECH_FEATURES = [
  {
    icon: '🎥',
    title: 'Live video sessions',
    text: 'Reliable, low-latency video with screen sharing no third-party installs needed.',
  },
  {
    icon: '🖊️',
    title: 'Interactive whiteboard',
    text: 'Both tutor and student can write, annotate and solve problems together in real time.',
  },
  {
    icon: '📁',
    title: 'Shared materials',
    text: 'Every lesson\'s notes, exercises and past papers are saved to a shared folder.',
  },
  {
    icon: '🔔',
    title: 'Reminders & scheduling',
    text: 'Automatic reminders before each session, plus easy rescheduling if plans change.',
  },
];

const PROCESS_FAQ = [
  {
    q: 'How soon can my child start?',
    a: 'Most students start within 3–5 days of their first enquiry. Once we\'ve matched a tutor, the first session is usually scheduled in the same week.',
  },
  {
    q: 'What if the tutor isn\'t the right fit?',
    a: 'Just let us know. We\'ll match you with a different tutor at no cost, and there\'s no penalty for switching.',
  },
  {
    q: 'How long is each session?',
    a: 'Standard sessions are 60 minutes. Shorter 45-minute sessions are available for younger students, and we can extend to 90 minutes for intensive exam preparation.',
  },
  {
    q: 'Can I pause lessons over the holidays?',
    a: 'Yes. Plans can be paused for up to 8 weeks per year without losing your tutor or your plan terms.',
  },
  {
    q: 'Do you record lessons?',
    a: 'Recordings are available on request — useful for revision or for parents who want to catch up on what was covered. Students and parents can opt out at any time.',
  },
];

export default function HowItWorks() {
  return (
    <>
      {/* ============ HERO ============ */}
      <PageHero
        eyebrow="The process"
        title="How It Works"
        lead="A clear, five-step path from first enquiry to visible progress designed to keep students, tutors and parents aligned at every stage."
        backgroundImage={howitwoksHeroBg}
      />

      {/* ============ INTRO ============ */}
      <section className="section hiw-intro-section">
        <div className="container">
          <div className="hiw-intro">
            <p className="section-eyebrow">No guesswork</p>
            <h2 className="section-title">
              Everything is structured so nothing is left to chance
            </h2>
            <p className="section-lead">
              Tutoring works best when it&apos;s deliberate. Every student we
              take on follows the same clear process: understand the need,
              match the right tutor, teach consistently, and measure progress
              in a way you can actually see.
            </p>
          </div>
        </div>
      </section>

      {/* ============ TIMELINE STEPS ============ */}
      <section className="section section-alt hiw-timeline-section">
        <div className="container">
          <div className="section-head text-center">
            <p className="section-eyebrow">Step by step</p>
            <h2 className="section-title">The five-step journey</h2>
            <p className="section-lead section-lead-center">
              From enquiry to measurable results here&apos;s exactly what
              happens and when.
            </p>
          </div>

          <div className="hiw-timeline">
            {STEPS.map((step, i) => (
              <article
                key={step.n}
                className={`hiw-timeline-item${
                  i % 2 === 1 ? ' hiw-timeline-item--right' : ''
                }`}
              >
                <div className="hiw-timeline-marker" aria-hidden="true">
                  <span>{step.n}</span>
                </div>

                <div className="hiw-timeline-card">
                  <h3 className="hiw-timeline-title">{step.title}</h3>
                  <p className="hiw-timeline-summary">{step.summary}</p>

                  <ul className="hiw-timeline-details">
                    {step.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>

                  {step.cta && (
                    <Link
                      to={step.cta.to}
                      className="btn btn-primary mt-3"
                    >
                      {step.cta.label}
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHAT HAPPENS IN A SESSION ============ */}
      <section className="section hiw-session-section">
        <div className="container">
          <div className="section-head text-center">
            <p className="section-eyebrow">Inside a lesson</p>
            <h2 className="section-title">What happens in a session</h2>
            <p className="section-lead section-lead-center">
              Every 60-minute lesson follows a structured rhythm enough
              variety to stay engaged, enough consistency to build real
              progress.
            </p>
          </div>

          <div className="hiw-session-timeline">
            {SESSION_BREAKDOWN.map((item) => (
              <div className="hiw-session-item" key={item.title}>
                <div className="hiw-session-time">{item.time}</div>
                <div className="hiw-session-dot" aria-hidden="true" />
                <div className="hiw-session-card">
                  <span className="hiw-session-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <div>
                    <h3 className="hiw-session-title">{item.title}</h3>
                    <p className="hiw-session-text">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TECHNOLOGY ============ */}
      <section className="section section-alt hiw-tech-section">
        <div className="container">
          <div className="section-head text-center">
            <p className="section-eyebrow">Tools that make it work</p>
            <h2 className="section-title">Built on a solid learning platform</h2>
            <p className="section-lead section-lead-center">
              Everything your child needs to learn effectively online no
              downloads, no complexity.
            </p>
          </div>

          <div className="row g-4">
            {TECH_FEATURES.map((f) => (
              <div className="col-sm-6 col-lg-3" key={f.title}>
                <div className="hiw-tech-card">
                  <span className="hiw-tech-icon" aria-hidden="true">
                    {f.icon}
                  </span>
                  <h3 className="hiw-tech-title">{f.title}</h3>
                  <p className="hiw-tech-text">{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROGRESS / OUTCOMES ============ */}
      <section className="section hiw-progress-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <p className="section-eyebrow">You&apos;ll see the difference</p>
              <h2 className="section-title">
                Progress you can actually measure
              </h2>
              <p className="section-lead">
                We don&apos;t ask you to take progress on faith. Every student
                gets clear, ongoing feedback from the tutor, from the work
                itself, and from the numbers.
              </p>

              <ul className="hiw-progress-list">
                <li>
                  <strong>Session notes</strong> a short summary after each
                  lesson, so parents always know what was covered.
                </li>
                <li>
                  <strong>Milestone reports</strong> a written review every
                  6–8 weeks, tied to specific learning outcomes.
                </li>
                <li>
                  <strong>Practice scores</strong> tracking performance on
                  exam-style questions over time.
                </li>
                <li>
                  <strong>Plan adjustments</strong> the plan changes as the
                  student grows, not the other way around.
                </li>
              </ul>

              <Link to="/prices" className="btn btn-outline-primary mt-3">
                See pricing and plans →
              </Link>
            </div>

            <div className="col-lg-6">
              <div className="hiw-progress-visual" aria-hidden="true">
                <div className="hiw-progress-mock">
                  <div className="hiw-progress-mock-header">
                    <span>Progress snapshot</span>
                    <span className="hiw-progress-mock-badge">
                      Last 8 weeks
                    </span>
                  </div>

                  <div className="hiw-progress-mock-row">
                    <span>Algebra</span>
                    <div className="hiw-progress-mock-bar">
                      <span style={{ width: '85%' }} />
                    </div>
                    <strong>85%</strong>
                  </div>

                  <div className="hiw-progress-mock-row">
                    <span>Geometry</span>
                    <div className="hiw-progress-mock-bar">
                      <span style={{ width: '72%' }} />
                    </div>
                    <strong>72%</strong>
                  </div>

                  <div className="hiw-progress-mock-row">
                    <span>Statistics</span>
                    <div className="hiw-progress-mock-bar">
                      <span style={{ width: '60%' }} />
                    </div>
                    <strong>60%</strong>
                  </div>

                  <div className="hiw-progress-mock-row">
                    <span>Problem solving</span>
                    <div className="hiw-progress-mock-bar">
                      <span style={{ width: '78%' }} />
                    </div>
                    <strong>78%</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROCESS FAQ ============ */}
      <section className="section section-alt hiw-faq-section">
        <div className="container">
          <div className="section-head text-center">
            <p className="section-eyebrow">Common questions</p>
            <h2 className="section-title">About the process</h2>
          </div>

          <div className="pricing-faq">
            {PROCESS_FAQ.map((item) => (
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
              See all FAQs
            </Link>
          </p>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="section section-cta">
        <div className="container">
          <div className="cta-box text-center">
            <h2 className="cta-title">Ready to get started?</h2>
            <p className="cta-lead">
              Book a session or reach out with questions we&apos;ll take it
              from there.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link to="/booking" className="btn btn-primary btn-lg">
                Book a Session
              </Link>
              <Link to="/contact" className="btn btn-outline-light btn-lg">
                Ask a question
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}