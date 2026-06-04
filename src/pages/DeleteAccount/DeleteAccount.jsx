import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { db, functions } from '../../config/firebase';
import { httpsCallable } from 'firebase/functions';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './DeleteAccount.css';

const DeleteAccount = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('request'); // 'request' | 'verify' | 'success'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Scroll to top of the page on mount or step change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleRequestDeletion = async (e) => {
    e.preventDefault();
    if (!email || !confirm) return;

    setLoading(true);
    setError('');

    try {
      const sendEmailOTP = httpsCallable(functions, 'sendEmailOTP');
      await sendEmailOTP({ email: email.toLowerCase().trim() });
      setStep('verify');
    } catch (err) {
      console.error('Error calling sendEmailOTP:', err);
      setError(err.message || 'Failed to send OTP email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndConfirmDeletion = async (e) => {
    e.preventDefault();
    if (!otp) return;

    setLoading(true);
    setError('');

    try {
      const emailClean = email.toLowerCase().trim();

      // 1. Verify the OTP code (V1 callable function)
      const verifyEmailOTP = httpsCallable(functions, 'verifyEmailOTP');
      await verifyEmailOTP({ 
        email: emailClean, 
        otp: otp.trim() 
      });

      // 2. Fetch the user's ID from the 'users' collection before calling deletion
      let userId = null;
      const usersRef = collection(db, 'users');
      const qUser = query(usersRef, where('email', '==', emailClean));
      const userSnapshot = await getDocs(qUser);
      
      let userDocIdToDelete = null;
      userSnapshot.forEach((document) => {
        userId = document.id; // Document ID is the userId (Auth UID)
        userDocIdToDelete = document.id;
      });

      // 3. Delete the user account (standard callable - deletes from Firebase Auth)
      const deleteUserAccount = httpsCallable(functions, 'deleteUserAccount');
      await deleteUserAccount({ 
        email: emailClean 
      });

      // 4. Perform database cleanup for this user
      const deletePromises = [];

      // A. Delete user profile document from 'users'
      if (userDocIdToDelete) {
        deletePromises.push(deleteDoc(doc(db, 'users', userDocIdToDelete)));
      }

      // B. Query and delete all documents in other collections associated with the userId
      if (userId) {
        const collectionsToClean = [
          'self_ratings', 
          'certificates', 
          'invites', 
          'invitations', 
          'ratings', 
          'notifications', 
          'friend_ratings'
        ];
        
        for (const colName of collectionsToClean) {
          const colRef = collection(db, colName);
          
          // Query both 'userId' and 'user_id' fields to be 100% sure we catch all casing styles
          const queries = [
            query(colRef, where('userId', '==', userId)),
            query(colRef, where('user_id', '==', userId))
          ];
          
          for (const q of queries) {
            try {
              const snapshot = await getDocs(q);
              snapshot.forEach((document) => {
                deletePromises.push(deleteDoc(doc(db, colName, document.id)));
              });
            } catch (colErr) {
              console.warn(`Could not read or query collection '${colName}':`, colErr);
            }
          }
        }
      }

      // Wait for all deletions to complete
      await Promise.all(deletePromises);

      setStep('success');
    } catch (err) {
      console.error('Error during verification/deletion:', err);
      setError(err.message || 'OTP verification or account deletion failed. Please check the code and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToRequest = () => {
    setStep('request');
    setOtp('');
    setError('');
  };

  return (
    <div className="delete-account-container">
      {/* Navigation Header */}
      <header className="delete-account-header">
        <button className="back-home-btn" onClick={() => navigate('/')} aria-label="Go back to Home">
          <FaArrowLeft className="back-icon" />
          <span>Back to Home</span>
        </button>
        <span className="brand-logo">M8ZEE</span>
      </header>

      {/* Main Content */}
      <main className="delete-account-document">
        <article className="document-sheet">
          <h1 className="document-title">Delete Account & Associated Data</h1>
          
          <div className="last-updated-section">
            <h2 className="updated-label">Compliance & Privacy</h2>
            <p className="updated-date">Google Play Store Policy Compliant</p>
          </div>

          <hr className="title-divider" />

          {step === 'request' && (
            <>
              <p className="intro-text">
                In compliance with Google Play Store policies, this page allows you to request the permanent deletion of your <strong>M8zee</strong> account and all associated personal data.
              </p>

              <section className="info-section">
                <h2 className="section-title">What data will be permanently deleted?</h2>
                <ul className="deleted-data-list">
                  <li><strong>Profile Information:</strong> Your name, email address, profile picture, and account credentials.</li>
                  <li><strong>Friendship Blueprint Data:</strong> All self-rating answers, scores, and generated friendship archetype blueprints.</li>
                  <li><strong>Friend Connections & Ratings:</strong> Rating lists, invites generated by you, and ratings submitted to your friends.</li>
                  <li><strong>Device Data:</strong> Saved push notification tokens (FCM tokens).</li>
                </ul>
              </section>

              <section className="form-section">
                <h2 className="section-title">Submit Deletion Request</h2>
                {error && <div className="error-badge">{error}</div>}
                <form onSubmit={handleRequestDeletion} className="deletion-form">
                  <div className="form-group">
                    <label htmlFor="email">Account Email Address:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter the email used for M8zee"
                      disabled={loading}
                    />
                  </div>
                  
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="confirm"
                      name="confirm"
                      checked={confirm}
                      onChange={(e) => setConfirm(e.target.checked)}
                      required
                      disabled={loading}
                    />
                    <label htmlFor="confirm" className="checkbox-label">
                      I understand that this action is permanent. Deleting my account will completely wipe my data and it cannot be restored.
                    </label>
                  </div>

                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Sending OTP...' : 'Request Account Deletion'}
                  </button>
                </form>
              </section>
            </>
          )}

          {step === 'verify' && (
            <div className="verification-card">
              <h2 className="section-title">Verify Deletion Request</h2>
              <p className="verify-description">
                A verification code (OTP) has been sent to your email address: <strong>{email}</strong>.
              </p>
              <p className="verify-instructions">
                Please enter the 4-digit code below to confirm and permanently delete your account.
              </p>

              {error && <div className="error-badge">{error}</div>}

              <form onSubmit={handleVerifyAndConfirmDeletion} className="otp-form">
                <div className="form-group">
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    placeholder="Enter 4-digit OTP code"
                    maxLength={10}
                    className="otp-input-field"
                    disabled={loading}
                  />
                </div>

                <div className="otp-actions">
                  <button type="button" className="change-email-btn" onClick={handleBackToRequest} disabled={loading}>
                    Change Email
                  </button>
                  <button type="submit" className="submit-btn confirm-delete-btn" disabled={loading || !otp}>
                    {loading ? 'Verifying & Deleting...' : 'Confirm Permanent Deletion'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 'success' && (
            <div className="success-card">
              <div className="success-icon-wrapper">
                <svg className="success-check" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="success-title">Account Deleted Successfully</h2>
              <p className="success-message">
                Your permanent account deletion request has been processed for <strong>{email}</strong>.
              </p>
              <p className="success-details-text">
                Your credentials, profile data, friendship blueprints, ratings, and FCM tokens have been permanently removed from our databases.
              </p>
              <button className="reset-btn" onClick={() => { setStep('request'); setEmail(''); setConfirm(false); setOtp(''); setError(''); }}>
                Go Back
              </button>
            </div>
          )}

          <div className="footer-notice">
            <p>If you have any questions, please contact support at <a href="mailto:support@m8zee.com">support@m8zee.com</a>.</p>
            <p>© {new Date().getFullYear()} M8zee. All rights reserved.</p>
          </div>
        </article>
      </main>

      {/* Footer Navigation */}
      <footer className="delete-account-footer">
        <p className="footer-copyright">&copy; {new Date().getFullYear()} M8ZEE. All rights reserved.</p>
        <button className="back-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to Top
        </button>
      </footer>
    </div>
  );
};

export default DeleteAccount;

