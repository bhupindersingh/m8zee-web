import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TermsConditions.css';

const TermsConditions = () => {
  // Scroll to top of the page on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="terms-container">
      {/* Main Document Content */}
      <main className="terms-document">
        <article className="document-sheet">
          <h1 className="document-title">M8ZEE Terms &amp; Conditions</h1>
          
          <div className="last-updated-section">
            <h2 className="updated-label">Last Updated</h2>
            <p className="updated-date">June 2, 2026</p>
          </div>

          <hr className="title-divider" />

          <section className="policy-section">
            <h2 className="section-title">Company Information</h2>
            <p>
              M8ZEE is owned and operated by ADC Environment Limited (Company No. 06212667), 5 Chesnut Grove, Hayes Country Park, Battlesbridge, Wickford, Essex, UK, SS11 7GJ. Contact: <a href="mailto:andym8zee@gmail.com">andym8zee@gmail.com</a>.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Acceptance of Terms</h2>
            <p>
              By creating an account, accessing or using M8ZEE, you agree to be bound by these Terms &amp; Conditions. If you do not agree, you must not use the Services.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Description of Service</h2>
            <p>
              M8ZEE provides friendship insight reports generated from user self-assessments and feedback submitted by participating friends. Reports may include scores, archetypes, comparisons, growth suggestions and behavioural observations.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">No Professional Advice</h2>
            <p className="highlight-text-block">
              M8ZEE reports are intended to provide insight, reflection and discussion based on aggregated responses submitted by users and their friends. They are not designed to provide definitive statements about personality, character, mental health, friendship quality, suitability, trustworthiness or future behaviour. M8ZEE does not provide therapy, counselling, psychological assessments, medical advice or professional advice.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">User Eligibility</h2>
            <p>
              Users must be at least 16 years old and capable of entering into legally binding agreements.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Accounts</h2>
            <p>
              Users are responsible for maintaining the security of their account credentials and for all activity occurring under their account.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Friend Invitations</h2>
            <p>
              Users may invite friends to participate in feedback exercises. Users should only invite individuals with whom they have a genuine relationship. M8ZEE does not verify the quality or nature of those relationships.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Anonymous Feedback</h2>
            <p>
              M8ZEE is designed so that individual responses are not disclosed and feedback is presented in aggregated form. Users agree not to attempt to identify contributors. Complete anonymity cannot be guaranteed in every circumstance.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Report Accuracy Disclaimer</h2>
            <p>
              M8ZEE does not guarantee the accuracy, completeness or reliability of any report, score, archetype, comparison, insight or recommendation. Results are based on subjective information voluntarily submitted by participants.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Acceptable Use</h2>
            <p>
              Users must not misuse the platform, harass others, upload unlawful content, impersonate another person, interfere with platform security or attempt to reverse engineer the Services.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Purchases and Payments</h2>
            <p>
              Certain reports and features require payment. Payments may be processed by Apple App Store, Google Play, Stripe or other authorised providers. Prices may change at any time.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Digital Content</h2>
            <p>
              Paid reports are digital content supplied immediately after purchase. Users acknowledge that access may begin immediately following payment.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Refunds</h2>
            <p>
              Refunds are subject to applicable law, platform rules and the M8ZEE Refund Policy.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Intellectual Property</h2>
            <p>
              All intellectual property rights in M8ZEE, including branding, software, content, reports, designs and graphics, remain the property of ADC Environment Limited unless otherwise stated.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, ADC Environment Limited shall not be liable for emotional reactions to reports, friendship disputes, relationship outcomes, loss of profits, indirect losses or consequential losses arising from use of the Services.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">User Decisions</h2>
            <p>
              Users agree not to make important personal, professional, educational, financial, employment or relationship decisions based solely on M8ZEE reports.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Suspension and Termination</h2>
            <p>
              We may suspend or terminate accounts where misuse, fraud, abuse, unlawful activity or breaches of these Terms are suspected.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Privacy</h2>
            <p>
              Use of M8ZEE is also governed by the <Link to="/privacy-policy">M8ZEE Privacy Policy</Link>.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Changes to Services</h2>
            <p>
              We reserve the right to modify, suspend or discontinue any aspect of the Services at any time.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Governing Law</h2>
            <p>
              These Terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          <section className="policy-section contact-section">
            <h2 className="section-title">Contact</h2>
            <div className="contact-card">
              <p className="contact-company">ADC Environment Limited (Company No. 06212667)</p>
              <p>5 Chesnut Grove, Hayes Country Park, Battlesbridge, Wickford, Essex, UK, SS11 7GJ</p>
              <p className="contact-email">
                <strong>Email:</strong> <a href="mailto:andym8zee@gmail.com">andym8zee@gmail.com</a>
              </p>
            </div>
          </section>
        </article>
      </main>

      {/* Footer Section */}
      <footer className="terms-footer">
        <p className="footer-copyright">&copy; {new Date().getFullYear()} M8ZEE. All rights reserved.</p>
        <button className="back-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to Top
        </button>
      </footer>
    </div>
  );
};

export default TermsConditions;
