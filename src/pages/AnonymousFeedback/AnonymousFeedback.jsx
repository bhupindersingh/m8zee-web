import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AnonymousFeedback.css';

const AnonymousFeedback = () => {
  // Scroll to top of the page on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="feedback-policy-container">
      {/* Main Document Content */}
      <main className="feedback-policy-document">
        <article className="document-sheet">
          <h1 className="document-title">M8ZEE Anonymous Feedback Policy</h1>
          
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
              This policy explains how anonymous feedback is collected, processed and presented within M8ZEE. It is intended to help users and participants understand how anonymity operates and the limitations that apply.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">How M8ZEE Uses Friend Feedback</h2>
            <p>
              M8ZEE generates friendship insight reports by comparing a user's self-assessment responses with feedback submitted by participating friends. Feedback may be used to create scores, comparisons, archetypes, insights, strengths, perception gaps and growth suggestions.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Participation by Friends</h2>
            <p>
              Users may invite multiple friends to participate. Participants are encouraged to provide honest and thoughtful responses based on their own experiences of the friendship.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Aggregation of Responses</h2>
            <p>
              Feedback is designed to be aggregated before being shown to the user. Reports present themes, averages, scores, observations and comparisons rather than individual responses wherever reasonably possible.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">No Individual Disclosure</h2>
            <p className="highlight-text-block">
              M8ZEE is designed so that individual responses are not disclosed to the report recipient. Users do not receive participant names, individual answer sheets or direct attribution of responses.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Anonymity Disclaimer</h2>
            <p>
              While M8ZEE takes reasonable steps to preserve anonymity, complete anonymity cannot be guaranteed in every circumstance. Users may independently form assumptions regarding contributor identities. M8ZEE accepts no responsibility for conclusions drawn by users regarding who may have submitted particular responses.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">No Guarantee of Participant Knowledge</h2>
            <p>
              M8ZEE does not verify whether participants know the user well enough to provide meaningful feedback. Users are solely responsible for deciding whom they invite to participate.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Subjective Nature of Feedback</h2>
            <p>
              All feedback is inherently subjective. Different participants may experience the same friendship differently. Responses reflect personal opinions and perceptions rather than objective facts.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Report Interpretation</h2>
            <p>
              M8ZEE reports are intended to provide insight, reflection and discussion based on aggregated responses submitted by users and their friends. They are not designed to provide definitive statements about personality, character, mental health, friendship quality, suitability, trustworthiness or future behaviour.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Accuracy Disclaimer</h2>
            <p>
              M8ZEE does not guarantee the accuracy, completeness or reliability of any report, score, comparison, archetype, insight or recommendation generated from participant feedback.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Prohibited Conduct</h2>
            <p>
              Users agree not to pressure participants, attempt to identify contributors, harass respondents, misuse report information or use reports to intimidate, embarrass or harm others.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Participant Privacy</h2>
            <p>
              Information provided by participants may be processed in accordance with the <Link to="/privacy-policy">M8ZEE Privacy Policy</Link>. Individual responses are protected and are not intended to be disclosed to the report recipient.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Removal Requests</h2>
            <p>
              Where permitted by law and technically feasible, participants may contact M8ZEE regarding concerns relating to their personal information.
            </p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">Changes to this Policy</h2>
            <p>
              M8ZEE may update this Anonymous Feedback Policy from time to time. Updated versions will be published through the Services and website.
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
      <footer className="feedback-policy-footer">
        <p className="footer-copyright">&copy; {new Date().getFullYear()} M8ZEE. All rights reserved.</p>
        <button className="back-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to Top
        </button>
      </footer>
    </div>
  );
};

export default AnonymousFeedback;
