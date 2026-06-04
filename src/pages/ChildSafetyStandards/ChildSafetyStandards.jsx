import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './ChildSafetyStandards.css';

const ChildSafetyStandards = () => {
  const navigate = useNavigate();

  // Scroll to top of the page on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="safety-container">
      {/* Navigation Header */}
      <header className="safety-header">
        <button className="back-home-btn" onClick={() => navigate('/')} aria-label="Go back to Home">
          <FaArrowLeft className="back-icon" />
          <span>Back to Home</span>
        </button>
        <span className="brand-logo">M8ZEE</span>
      </header>

      {/* Main Document Content */}
      <main className="safety-document">
        <article className="document-sheet">
          <h1 className="document-title">Child Safety & CSAE Prevention Standards</h1>

          <div className="last-updated-section">
            <h2 className="updated-label">Effective Date</h2>
            <p className="updated-date">June 3, 2026</p>
          </div>

          <hr className="title-divider" />

          <section className="policy-section">
            <p className="intro-text">
              At m8zee, the safety and protection of children is our highest priority. We maintain a strict zero-tolerance policy against any form of Child Sexual Abuse Material (CSAM) and Child Sexual Abuse and Exploitation (CSAE).
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">1. Zero-Tolerance Policy</h2>
            <p>
              Any account found to be sharing, promoting, requesting, or distributing content that exploits or abuses children will be immediately and permanently banned. We do not tolerate any actions that threaten child safety.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">2. Reporting Mechanisms</h2>
            <p>
              m8zee provides multiple reporting mechanisms to report child safety concerns:
            </p>
            <ul className="bullet-list">
              <li>
                <strong>In-App Reporting:</strong> Users can flag or report safety concerns directly within the app interface using the report/block options on profiles or rating interactions.
              </li>
              <li>
                <strong>Email Reporting:</strong> You can report child safety concerns directly to our designated point of contact via email at <a href="mailto:andym8zee@gmail.com">andym8zee@gmail.com</a>.
              </li>
            </ul>
          </section>

          <section className="policy-section">
            <h2 className="section-title">3. Content Moderation & Enforcement</h2>
            <p>
              All reported content is reviewed immediately by our moderation team. If a violation of our child safety standards is confirmed:
            </p>
            <ul className="bullet-list">
              <li>The offending content is removed immediately (within 24 hours of report receipt).</li>
              <li>The offending user account is permanently terminated.</li>
              <li>The offending user is banned from accessing the platform.</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2 className="section-title">4. Legal Compliance & Reporting to Authorities</h2>
            <p>
              m8zee complies with all regional, national, and international child safety laws. We actively report any known instances of CSAM/CSAE to the appropriate law enforcement and national authorities, including the <strong>National Center for Missing & Exploited Children (NCMEC)</strong> and regional cybercrime divisions.
            </p>
          </section>

          <section className="policy-section contact-section">
            <h2 className="section-title">5. Point of Contact</h2>
            <div className="contact-card">
              <p className="contact-company">M8zee Safety Representative</p>
              <p>For inquiries regarding our CSAM/CSAE prevention compliance, contact our designated representative at:</p>
              <p className="contact-email">
                <strong>Email:</strong> <a href="mailto:andym8zee@gmail.com">andym8zee@gmail.com</a>
              </p>
            </div>
          </section>
        </article>
      </main>

      {/* Footer Section */}
      <footer className="safety-footer">
        <p className="footer-copyright">&copy; {new Date().getFullYear()} M8ZEE. All rights reserved.</p>
        <button className="back-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to Top
        </button>
      </footer>
    </div>
  );
};

export default ChildSafetyStandards;
