import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';


const LAST_UPDATED = 'September 2025';

export default function Privacy() {
  return (
    <>
      {/*<SEO
        title="Privacy Policy"
        description="How a+ Academy collects, uses and protects your personal data."
        url="/privacy"
      />*/}

      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        lead={`Last updated: ${LAST_UPDATED}`}
      />

      <section className="section legal-page">
        <div className="container">
          <div className="legal-content">

            <p className="legal-lead">
              This Privacy Policy explains how a+ Academy ("we", "us", "our")
              collects, uses, shares and protects your personal data when you
              use our website, book lessons or otherwise interact with us. We
              are committed to handling your data responsibly, and to being
              transparent about how we do it.
            </p>

            <nav className="legal-toc" aria-label="Table of contents">
              <h2 className="legal-toc-heading">On this page</h2>
              <ol>
                <li><a href="#controller">1. Who is responsible for your data</a></li>
                <li><a href="#what">2. What data we collect</a></li>
                <li><a href="#why">3. How we use your data</a></li>
                <li><a href="#legal-basis">4. Legal bases for processing</a></li>
                <li><a href="#children">5. Children's data</a></li>
                <li><a href="#sharing">6. Who we share data with</a></li>
                <li><a href="#international">7. International transfers</a></li>
                <li><a href="#retention">8. How long we keep data</a></li>
                <li><a href="#security">9. How we protect data</a></li>
                <li><a href="#rights">10. Your rights</a></li>
                <li><a href="#cookies">11. Cookies</a></li>
                <li><a href="#changes">12. Changes to this Policy</a></li>
                <li><a href="#contact">13. How to contact us</a></li>
              </ol>
            </nav>

            <section id="controller" className="legal-section">
              <h2>1. Who is responsible for your data</h2>
              <p>
                a+ Academy is the data controller responsible for your personal
                data. Our contact details are:
              </p>
              <p>
                Email:{' '}
                <a href="mailto:ajikep@yahoo.com">ajikep@yahoo.com</a>
                <br />
                Postal address: [Add your registered business address]
              </p>
            </section>

            <section id="what" className="legal-section">
              <h2>2. What data we collect</h2>
              <p>
                We collect personal data in three main ways: information you
                give us, information we collect automatically, and information
                we receive from third parties.
              </p>

              <h3>Information you provide</h3>
              <ul>
                <li>Name, email address and password when you create an account</li>
                <li>Phone number (optional) and country of residence</li>
                <li>Information about the student — name, year group, subjects and learning goals</li>
                <li>Messages you send us via the contact form or by email</li>
                <li>Booking details — subject, preferred date, time and any notes you provide</li>
                <li>Payment information (processed by our payment provider; we do not store card numbers)</li>
              </ul>

              <h3>Information we collect automatically</h3>
              <ul>
                <li>IP address and approximate location</li>
                <li>Browser type and version, device type and operating system</li>
                <li>Pages you visit on our site, and how you arrived at them</li>
                <li>Referrer information and interactions with our emails</li>
              </ul>

              <h3>Information from third parties</h3>
              <ul>
                <li>If you sign in with Google or another provider, the basic profile information that provider shares</li>
                <li>Payment confirmation and status from our payment processor</li>
              </ul>
            </section>

            <section id="why" className="legal-section">
              <h2>3. How we use your data</h2>
              <p>We use your personal data to:</p>
              <ul>
                <li>Create and manage your account</li>
                <li>Provide tutoring lessons and deliver lesson materials</li>
                <li>Process bookings and payments</li>
                <li>Communicate with you about lessons, bookings, schedules and updates</li>
                <li>Match students with appropriate tutors</li>
                <li>Send administrative messages such as confirmation emails, receipts and reminders</li>
                <li>Respond to enquiries and provide customer support</li>
                <li>Improve our website, lessons and services</li>
                <li>Comply with legal obligations and enforce our{' '}
                  <Link to="/terms">Terms of Service</Link>
                </li>
                <li>Send marketing communications about new services, offers and updates but only with your consent, and only if you have opted in</li>
              </ul>
            </section>

            <section id="legal-basis" className="legal-section">
              <h2>4. Legal bases for processing</h2>
              <p>
                Where required by law (for example, if you are in the UK, EU or
                Nigeria), we rely on one or more of the following legal bases
                to process your personal data:
              </p>
              <ul>
                <li>
                  <strong>Contract:</strong> to perform our contract with you 
                  providing lessons and services you have booked
                </li>
                <li>
                  <strong>Legitimate interests:</strong> to run and improve our
                  business, prevent fraud, and keep our services secure
                </li>
                <li>
                  <strong>Consent:</strong> for marketing emails and any
                  optional features you opt into
                </li>
                <li>
                  <strong>Legal obligation:</strong> to comply with tax,
                  accounting and other legal requirements
                </li>
              </ul>
            </section>

            <section id="children" className="legal-section">
              <h2>5. Children's data</h2>
              <p>
                Our service is used by students under 18, always through a
                parent or legal guardian who holds the account. We collect only
                the minimum information needed to teach effectively
                typically the student's first name, year group and learning
                needs. We do not market to children and do not knowingly
                collect more than necessary.
              </p>
              <p>
                If you believe a child has provided us with personal data
                without appropriate consent, please contact us and we will
                delete it promptly.
              </p>
            </section>

            <section id="sharing" className="legal-section">
              <h2>6. Who we share data with</h2>
              <p>
                We share personal data only with the following categories of
                recipients, and only as necessary:
              </p>
              <ul>
                <li>
                  <strong>Tutors</strong> — the specific tutor assigned to a
                  student's lessons receives the information needed to teach:
                  student first name, year group, subject, learning goals and
                  past lesson notes.
                </li>
                <li>
                  <strong>Service providers</strong> — including hosting,
                  email delivery, payment processing and video-conferencing
                  providers. These providers process data on our behalf under
                  written agreements.
                </li>
                <li>
                  <strong>Professional advisers</strong> — lawyers, accountants
                  and insurers, where necessary.
                </li>
                <li>
                  <strong>Authorities</strong> — where we are legally required
                  to disclose information, or to protect the rights, property
                  or safety of our users.
                </li>
              </ul>
              <p>
                We do not sell your personal data.
              </p>
            </section>

            <section id="international" className="legal-section">
              <h2>7. International transfers</h2>
              <p>
                Because we teach students worldwide, your data may be
                transferred to, stored and processed in countries other than
                your own including where our service providers operate.
                Where we transfer data internationally, we take appropriate
                safeguards to ensure it receives an adequate level of
                protection.
              </p>
            </section>

            <section id="retention" className="legal-section">
              <h2>8. How long we keep data</h2>
              <p>
                We keep personal data only for as long as necessary for the
                purposes described in this Policy:
              </p>
              <ul>
                <li>
                  <strong>Account data</strong> — while your account is active,
                  and for up to 12 months after closure (in case you decide to
                  return).
                </li>
                <li>
                  <strong>Booking and lesson records</strong> — for up to 3
                  years, to resolve disputes and track student progress.
                </li>
                <li>
                  <strong>Payment records</strong> — for the period required by
                  tax and accounting law, typically 6–7 years.
                </li>
                <li>
                  <strong>Marketing preferences</strong> — until you withdraw
                  consent.
                </li>
              </ul>
            </section>

            <section id="security" className="legal-section">
              <h2>9. How we protect data</h2>
              <p>
                We use appropriate technical and organisational measures to
                protect personal data against unauthorised access, loss,
                misuse or alteration. These include:
              </p>
              <ul>
                <li>Encrypted connections (HTTPS) between your browser and our servers</li>
                <li>Hashed and salted password storage</li>
                <li>Access controls limiting who on our team can see personal data</li>
                <li>Regular backups and monitoring for unusual activity</li>
              </ul>
              <p>
                No system is perfectly secure. If we become aware of a breach
                affecting your data, we will notify you and the relevant
                authorities as required by law.
              </p>
            </section>

            <section id="rights" className="legal-section">
              <h2>10. Your rights</h2>
              <p>
                Depending on where you live, you may have the following rights
                regarding your personal data:
              </p>
              <ul>
                <li><strong>Access</strong> — to request a copy of the data we hold about you</li>
                <li><strong>Correction</strong> — to have inaccurate data corrected</li>
                <li><strong>Deletion</strong> — to request that your data be deleted, subject to legal retention requirements</li>
                <li><strong>Restriction</strong> — to limit how we use your data in certain circumstances</li>
                <li><strong>Portability</strong> — to receive your data in a structured, machine-readable format</li>
                <li><strong>Objection</strong> — to object to processing based on legitimate interests</li>
                <li><strong>Withdraw consent</strong> — to withdraw any consent you have given (e.g. for marketing)</li>
              </ul>
              <p>
                To exercise any of these rights, contact us at{' '}
                <a href="mailto:privacy@example.com">privacy@example.com</a>.
                We will respond within the time required by applicable law
                (typically 30 days). You may also have the right to complain
                to your local data protection authority.
              </p>
            </section>

            <section id="cookies" className="legal-section">
              <h2>11. Cookies</h2>
              <p>
                We use cookies and similar technologies to keep you signed in,
                remember your preferences, and understand how our site is used.
                You can control cookies through your browser settings. Some
                cookies are essential for the Service to work for example,
                authentication cookies that keep you logged in.
              </p>
            </section>

            <section id="changes" className="legal-section">
              <h2>12. Changes to this Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. When we
                do, we will update the "Last updated" date at the top of this
                page. For material changes, we will notify you by email or
                in-app before the change takes effect.
              </p>
            </section>

            <section id="contact" className="legal-section">
              <h2>13. How to contact us</h2>
              <p>
                Questions about this Privacy Policy or how we handle your data?
                Contact our privacy team at{' '}
                <a href="mailto:ajikep@yahoo.com">ajikep@yahoo.com</a>,
                or use our <Link to="/contact">contact form</Link>.
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