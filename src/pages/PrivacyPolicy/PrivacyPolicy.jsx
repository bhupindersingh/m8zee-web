import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  // Scroll to top of the page on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="privacy-container">
      {/* Navigation Header */}
      <header className="privacy-header">
        <button className="back-home-btn" onClick={() => navigate('/')} aria-label="Go back to Home">
          <FaArrowLeft className="back-icon" />
          <span>Back to Home</span>
        </button>
        <span className="brand-logo">M8ZEE</span>
      </header>

      {/* Main Document Content */}
      <main className="privacy-document">
        <article className="document-sheet">
          <h1 className="document-title">M8ZEE Privacy Policy</h1>
          
          <div className="last-updated-section">
            <h2 className="updated-label">Last Updated</h2>
            <p className="updated-date">June 2, 2026</p>
          </div>

          <hr className="title-divider" />

          <section className="policy-section">
            <h2 className="section-title">Company Information</h2>
            <p>
              M8ZEE is owned and operated by ADC Environment Limited (Company No. 06212667).
            </p>
            <p className="address-details">
              <strong>Registered Office:</strong> 5 Chesnut Grove, Hayes Country Park, Battlesbridge, Wickford, Essex, UK, SS11 7GJ.<br />
              <strong>Contact:</strong> <a href="mailto:andym8zee@gmail.com">andym8zee@gmail.com</a>.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Introduction</h2>
            <p>
              This Privacy Policy explains how ADC Environment Limited trading as M8ZEE collects, uses, stores and protects personal information when users access the M8ZEE website, mobile applications and related services.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Data We Collect</h2>
            <p>
              We may collect account information, email addresses, profile information, questionnaire responses, self-assessments, friend feedback, communications, technical device data, analytics information and payment-related metadata.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Friend Feedback Data</h2>
            <p>
              Friends invited to participate may submit ratings, questionnaire responses and observations. Such information is processed to generate aggregated reports. Individual responses are not disclosed to the report recipient.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">How Reports Work</h2>
            <p>
              M8ZEE reports compare self-assessment responses with aggregated responses submitted by participating friends.
            </p>
            <p className="highlight-text-block">
              M8ZEE reports are intended to provide insight, reflection and discussion based on aggregated responses submitted by users and their friends. They are not designed to provide definitive statements about personality, character, mental health, friendship quality, suitability, trustworthiness or future behaviour. Different individuals may interpret experiences differently. Report outcomes should be viewed as indicative insights rather than objective facts.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Report Accuracy Disclaimer</h2>
            <p>
              M8ZEE does not guarantee the accuracy, completeness or reliability of any report, score, archetype, comparison, insight or recommendation. Results may be influenced by participant selection, response rates, personal perspectives and other factors beyond M8ZEE's control.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Lawful Bases for Processing</h2>
            <p>
              Where applicable under UK GDPR, processing may be based upon consent, contractual necessity, legitimate interests and compliance with legal obligations.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">How We Use Information</h2>
            <p>
              To generate reports, process purchases, provide customer support, improve services, prevent fraud, maintain security, analyse usage and comply with legal obligations.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Sharing Information</h2>
            <p>
              We do not sell personal information. Information may be shared with payment providers, hosting providers, analytics services, support providers and legal authorities where required by law.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Anonymous Feedback</h2>
            <p>
              M8ZEE is designed so that individual responses are not disclosed and feedback is presented in aggregated form. While we take reasonable steps to protect anonymity, complete anonymity cannot be guaranteed in every circumstance.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Data Retention</h2>
            <p>
              Information is retained only for as long as reasonably necessary to provide services, maintain accounts, comply with legal obligations, resolve disputes and improve the platform.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">International Transfers</h2>
            <p>
              Information may be processed outside the UK. Appropriate safeguards will be implemented where required by law.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Security</h2>
            <p>
              Reasonable technical and organisational measures are used to protect personal information. No online system can guarantee absolute security.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Your Rights</h2>
            <p>
              Depending on applicable law, users may have rights to access, correct, delete, restrict processing, object to processing, request portability and withdraw consent.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Children</h2>
            <p>
              M8ZEE is not intended for individuals under 16 years of age and does not knowingly collect information from children.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Complaints</h2>
            <p>
              Users may contact us at <a href="mailto:andym8zee@gmail.com">andym8zee@gmail.com</a>. UK users may also contact the Information Commissioner's Office (ICO).
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Changes to this Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Updated versions will be published through the Services and website.
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

      {/* Footer Navigation */}
      <footer className="privacy-footer">
        <p className="footer-copyright">&copy; {new Date().getFullYear()} M8ZEE. All rights reserved.</p>
        <button className="back-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to Top
        </button>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
