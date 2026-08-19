import React, { useEffect } from 'react';
import './CookiePolicy.css';

const CookiePolicy = () => {
  // Scroll to top of the page on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cookies-container">
      {/* Main Document Content */}
      <main className="cookies-document">
        <article className="document-sheet">
          <h1 className="document-title">M8ZEE Cookie Policy</h1>
          
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
            <h2 className="section-title">Purpose of this Policy</h2>
            <p>
              This Cookie Policy explains how M8ZEE uses cookies and similar technologies when users access our website, applications and related services.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on a device when visiting a website or using certain online services. They help websites function, remember preferences and improve user experiences.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Types of Cookies We May Use</h2>
            <p>
              M8ZEE may use essential cookies, authentication cookies, security cookies, performance cookies, analytics cookies and functionality cookies.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Essential Cookies</h2>
            <p>
              These cookies are necessary for the operation of the Services. They help users sign in, maintain sessions, access secure areas and use core functionality.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Security Cookies</h2>
            <p>
              Security-related cookies may be used to help detect fraudulent activity, prevent misuse and protect user accounts.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Analytics and Performance</h2>
            <p>
              We may use analytics tools and cookies to understand how users interact with M8ZEE, improve functionality, monitor performance and enhance the user experience.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Third-Party Services</h2>
            <p>
              Some third-party providers, including analytics, hosting, payment and support services, may place cookies or use similar technologies in connection with the Services.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Managing Cookies</h2>
            <p>
              Users can usually control, restrict or delete cookies through browser settings. Disabling certain cookies may affect functionality and performance.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Do Not Track</h2>
            <p>
              M8ZEE may not respond to all browser-based Do Not Track signals. Users should review browser settings to manage privacy preferences.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Changes to this Policy</h2>
            <p>
              M8ZEE may update this Cookie Policy from time to time. Updated versions will be published through the Services and website.
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
      <footer className="cookies-footer">
        <p className="footer-copyright">&copy; {new Date().getFullYear()} M8ZEE. All rights reserved.</p>
        <button className="back-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to Top
        </button>
      </footer>
    </div>
  );
};

export default CookiePolicy;
