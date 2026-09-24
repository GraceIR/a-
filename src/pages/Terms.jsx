import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';


const LAST_UPDATED = 'September 2025';

export default function Terms() {
  return (
    <>
      {/*<SEO
        title="Terms of Service"
        description="The terms that govern your use of a+ Academy — bookings, payments, cancellations and conduct."
        url="/terms"
      />*/}

      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        lead={`Last updated: ${LAST_UPDATED}`}
      />

      <section className="section legal-page">
        <div className="container">
          <div className="legal-content">

            <p className="legal-lead">
              These Terms of Service ("Terms") govern your access to and use of
              the a+ Academy website, lessons and related services
              (collectively, the "Service"). By creating an account, booking a
              session or otherwise using the Service, you agree to be bound by
              these Terms.
            </p>

            <nav className="legal-toc" aria-label="Table of contents">
              <h2 className="legal-toc-heading">On this page</h2>
              <ol>
                <li><a href="#who-we-are">1. Who we are</a></li>
                <li><a href="#eligibility">2. Eligibility</a></li>
                <li><a href="#account">3. Your account</a></li>
                <li><a href="#bookings">4. Bookings and lessons</a></li>
                <li><a href="#payments">5. Payments and pricing</a></li>
                <li><a href="#cancellations">6. Cancellations and rescheduling</a></li>
                <li><a href="#conduct">7. Code of conduct</a></li>
                <li><a href="#ip">8. Intellectual property</a></li>
                <li><a href="#liability">9. Limitation of liability</a></li>
                <li><a href="#termination">10. Termination</a></li>
                <li><a href="#changes">11. Changes to these Terms</a></li>
                <li><a href="#law">12. Governing law</a></li>
                <li><a href="#contact">13. Contact us</a></li>
              </ol>
            </nav>

            <section id="who-we-are" className="legal-section">
              <h2>1. Who we are</h2>
              <p>
                a+ Academy ("we", "us", "our") is an online tutoring service
                providing one-to-one and small-group lessons for primary,
                secondary and pre-university students. We connect students
                with qualified tutors via live video sessions and a shared
                digital learning platform.
              </p>
              <p>
                You can contact us any time at{' '}
                <a href="mailto:hello@example.com">hello@example.com</a>.
              </p>
            </section>

            <section id="eligibility" className="legal-section">
              <h2>2. Eligibility</h2>
              <p>
                You must be at least 18 years old to create an account and
                book lessons. Students under 18 may use the Service only
                through a parent or legal guardian who holds the account and
                accepts these Terms on their behalf.
              </p>
              <p>
                By creating an account, you confirm that the information you
                provide is accurate and that you have the legal capacity to
                enter into a binding agreement.
              </p>
            </section>

            <section id="account" className="legal-section">
              <h2>3. Your account</h2>
              <p>
                You are responsible for maintaining the confidentiality of
                your login credentials and for all activity that occurs under
                your account. Please notify us immediately at{' '}
                <a href="mailto:ajikep@yahoo.com">ajikep@yahoo.com</a> if
                you believe your account has been compromised.
              </p>
              <p>
                You agree not to share your account with anyone else or to
                create multiple accounts for the purpose of circumventing
                restrictions.
              </p>
            </section>

            <section id="bookings" className="legal-section">
              <h2>4. Bookings and lessons</h2>
              <p>
                Lessons are booked through our website. When you submit a
                booking, it is reviewed and confirmed by our team, typically
                within 24 hours. A booking is not confirmed until you receive
                a confirmation email.
              </p>
              <p>
                All lessons are delivered online via live video. You are
                responsible for ensuring you have a reliable internet
                connection, a working camera and microphone, and a suitable
                quiet space for the lesson.
              </p>
              <p>
                We may, at our discretion, reassign a lesson to a different
                tutor where necessary — for example, if the original tutor is
                unwell. We will notify you in advance whenever possible.
              </p>
            </section>

            <section id="payments" className="legal-section">
              <h2>5. Payments and pricing</h2>
              <p>
                Prices are shown on our{' '}
                <Link to="/prices">Pricing page</Link> and are quoted in the
                currency selected based on your country of residence. Prices
                may change from time to time; we will notify you at least 30
                days in advance of any change affecting your existing plan.
              </p>
              <p>
                Payment is due at the start of each billing period. We accept
                card and bank transfer. If payment fails or is declined, we
                may suspend lessons until payment is completed.
              </p>
              <p>
                All fees are inclusive of any applicable taxes unless stated
                otherwise.
              </p>
            </section>

            <section id="cancellations" className="legal-section">
              <h2>6. Cancellations and rescheduling</h2>
              <ul>
                <li>
                  <strong>Student cancellation (24+ hours' notice):</strong>{' '}
                  Lessons may be rescheduled at no cost.
                </li>
                <li>
                  <strong>Student cancellation (under 24 hours):</strong>{' '}
                  The lesson is counted against your monthly allocation.
                </li>
                <li>
                  <strong>Tutor cancellation:</strong> Any lesson cancelled by
                  us is rescheduled at no cost or credited to your account.
                </li>
                <li>
                  <strong>Ending your plan:</strong> You may pause or cancel
                  your plan at any time. Cancellation takes effect at the end
                  of the current billing period.
                </li>
              </ul>
            </section>

            <section id="conduct" className="legal-section">
              <h2>7. Code of conduct</h2>
              <p>
                We ask all users to treat tutors, students and staff with
                courtesy. In particular, you agree not to:
              </p>
              <ul>
                <li>Harass, threaten or abuse any tutor, student or staff member;</li>
                <li>Record lessons without the express permission of everyone involved;</li>
                <li>Share lesson materials, recordings or platform access with third parties;</li>
                <li>Solicit or arrange lessons directly with tutors outside the platform;</li>
                <li>Use the Service for any unlawful purpose or in a way that infringes the rights of others.</li>
              </ul>
              <p>
                We reserve the right to suspend or terminate accounts that
                violate this code.
              </p>
            </section>

            <section id="ip" className="legal-section">
              <h2>8. Intellectual property</h2>
              <p>
                All materials provided through the Service — including lesson
                plans, worksheets, diagrams, recordings, branding and the
                platform itself — are owned by a+ Academy or its licensors and
                are protected by copyright and other intellectual property
                laws.
              </p>
              <p>
                You may use lesson materials for your own personal, non-commercial
                learning or teaching purposes only. You may not reproduce,
                distribute, sell or make them available to third parties
                without our written permission.
              </p>
            </section>

            <section id="liability" className="legal-section">
              <h2>9. Limitation of liability</h2>
              <p>
                The Service is provided on an "as is" and "as available" basis.
                While we take tutoring seriously and work hard to help every
                student make progress, we cannot guarantee specific academic
                outcomes, exam results, grades or admission decisions.
              </p>
              <p>
                To the fullest extent permitted by law, our total liability to
                you for any claim arising out of or relating to the Service
                will not exceed the total fees you have paid us in the 3
                months immediately preceding the event giving rise to the
                claim.
              </p>
              <p>
                Nothing in these Terms excludes or limits liability that cannot
                lawfully be excluded or limited.
              </p>
            </section>

            <section id="termination" className="legal-section">
              <h2>10. Termination</h2>
              <p>
                You may stop using the Service and close your account at any
                time by contacting us. We may suspend or terminate your access
                to the Service if you materially breach these Terms, if
                required by law, or if we discontinue the Service (in which
                case we will provide reasonable notice and a pro-rata refund
                of any unused prepaid fees).
              </p>
            </section>

            <section id="changes" className="legal-section">
              <h2>11. Changes to these Terms</h2>
              <p>
                We may update these Terms from time to time. When we do, we
                will revise the "Last updated" date at the top of this page
                and, for material changes, notify you by email or in-app.
                Continued use of the Service after the effective date of a
                change constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section id="law" className="legal-section">
              <h2>12. Governing law</h2>
              <p>
                These Terms are governed by the laws of the Federal Republic of
                Nigeria, without regard to its conflict of law principles. Any
                dispute arising out of or relating to these Terms or the
                Service will be subject to the exclusive jurisdiction of the
                courts of that jurisdiction.
              </p>
              {/* 
                ⚠️  UPDATE THIS SECTION WITH A LAWYER. 
                The correct governing-law clause depends on where a+ Academy
                is legally registered. If you register in Nigeria, "Federal
                Republic of Nigeria" is correct. If you register elsewhere,
                change both the law and the courts mentioned here.
              */}
            </section>

            <section id="contact" className="legal-section">
              <h2>13. Contact us</h2>
              <p>
                Questions about these Terms? Write to us at{' '}
                <a href="mailto:ajikep@yahoo.com">ajikep@yahoo.com</a> or
                use our <Link to="/contact">contact form</Link>.
              </p>
            </section>

            <p className="legal-footer-note">
              This document is provided as a starting point and should be
              reviewed by a qualified legal professional before you rely on
              it.
            </p>

          </div>
        </div>
      </section>
    </>
  );
}