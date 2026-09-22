import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import { db } from '../../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import m8zeeLogo from '../../assets/icons/m8zee_logo_official.png';
import './Home.css';

// Exact Outline Padlock Icon from reference
const OutlineLockIcon = ({ size = 18, color = "currentColor", className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="5" y="10" width="14" height="11" rx="3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 10V6.5C8 4.567 9.567 3 11.5 3H12.5C14.433 3 16 4.567 16 6.5V10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="14.5" r="1.2" fill={color} />
    <path d="M12 15.7V18" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

// Exact Jolly/Organic Heart Icon from reference
const JollyHeartIcon = ({ size = 26, color = "#7c3aed", className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 28 26" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M14 24.2C14 24.2 2.5 16.8 2.5 8.6C2.5 4.5 5.5 2 9 2C11.5 2 13.2 3.3 14 4.5C14.8 3.3 16.5 2 19 2C22.5 2 25.5 4.5 25.5 8.6C25.5 16.8 14 24.2 14 24.2Z"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Circular Outline Checkmark Icon from reference
const CircleCheckIcon = ({ size = 18, color = "#7c3aed", className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 20 20" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="10" cy="10" r="8.5" stroke={color} strokeWidth="1.8" />
    <path d="M6 10.2L8.6 12.8L14 7.2" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Home = () => {
  // 1. Hook to read the URL (e.g., ?sender=Rajat)
  const [searchParams] = useSearchParams();
  const rawSender = searchParams.get('sender');
  const senderName = rawSender ? rawSender : 'your friend';

  // 2. Hook to navigate to the next page
  const navigate = useNavigate();

  // 3. State for the form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // 4. Function to handle the "Start Quiz" button
  const handleStart = async (e) => {
    e.preventDefault();
    
    // Dismiss mobile virtual keyboard immediately on form submission
    if (document.activeElement && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }
    
    if (name && email) {
      setLoading(true);
      try {
        const inviteId = searchParams.get('inviteId') || '';
        const userId = searchParams.get('userId') || '';

        // 5. Check if user already participated for this specific invite / friend
        if (inviteId || userId) {
          const conditions = [where("friendEmail", "==", email.toLowerCase().trim())];
          if (inviteId) {
            conditions.push(where("inviteId", "==", inviteId));
          } else if (userId) {
            conditions.push(where("userId", "==", userId));
          }

          const q = query(collection(db, "friend_ratings"), ...conditions);
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Connection timeout. Please check your internet or Firebase config.")), 5000)
          );
          
          try {
            const querySnapshot = await Promise.race([getDocs(q), timeoutPromise]);
            if (!querySnapshot.empty) {
              alert("You have already participated in this quiz for this friend!");
              setLoading(false);
              return;
            }
          } catch (queryErr) {
            console.warn("Participation check warning:", queryErr);
          }
        }

        // Clear any previous completion session for a fresh quiz attempt
        try {
          sessionStorage.removeItem('m8zee_quiz_completed');
        } catch (e) {
          console.warn("Could not clear session:", e);
        }

        // 6. Navigate to the quiz page, passing the user info and inviteId
        navigate('/quiz', { 
          state: { 
            userName: name, 
            userEmail: email.toLowerCase().trim(),
            inviteId: inviteId,
            userId: userId,
            senderName: senderName
          } 
        }); 
      } catch (error) {
        console.error("Error checking user:", error);
        alert(error.message || "Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please fill in both Name and Email!");
    }
  };

  return (
    <div className="home-container">
      <div className="home-card">
        
        {/* Top Logo & Tagline Header */}
        <div className="brand-header">
          <img src={m8zeeLogo} alt="m8zee logo" className="brand-logo" />
          <p className="brand-tagline">
            SEE YOURSELF. <span className="highlight-tagline">GROW</span> YOUR FRIENDSHIPS.
          </p>
        </div>

        {/* Main Hero Section */}
        <div className="hero-section">
          <h1 className="home-hero-title">
            How do you see{' '}
            <span className="highlight-purple">
              {rawSender ? `${rawSender}?` : 'your friend?'}
              <svg className="hero-underline-curve" viewBox="0 0 260 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M 2 16 C 80 3.5 175 3 258 11.5 C 175 7.5 80 9 2 16 Z"
                  fill="url(#heroUnderlineGrad)"
                />
                <defs>
                  <linearGradient id="heroUnderlineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity="1" />
                    <stop offset="65%" stopColor="#8b5cf6" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.75" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          <p className="hero-lead">
            {rawSender ? `${rawSender} has asked you because they value your perspective.` : 'They’ve asked you because they value your perspective.'}
          </p>

          <p className="hero-description">
            Answer 9 quick questions about how you experience them as a friend.<br />
            It takes around <span className="highlight-bold-purple">90 seconds.</span>
          </p>
        </div>

        {/* Anonymous Guarantee Card (Lavender Box) */}
        <div className="anonymous-card">
          <div className="anonymous-card-header">
            <div className="lock-badge">
              <OutlineLockIcon size={18} color="#ffffff" />
            </div>
            <h3>Your answers are completely <span className="highlight-underline">anonymous</span></h3>
          </div>
          <ul className="anonymous-list">
            <li>
              <CircleCheckIcon size={17} color="#7c3aed" className="check-icon" />
              <span>Your friend will never see your individual answers</span>
            </li>
            <li>
              <CircleCheckIcon size={17} color="#7c3aed" className="check-icon" />
              <span>Your answers are combined with feedback from other friends</span>
            </li>
            <li>
              <CircleCheckIcon size={17} color="#7c3aed" className="check-icon" />
              <span>Your name is never attached to any scores or insights</span>
            </li>
          </ul>
        </div>

        {/* Honesty Prompt Row */}
        <div className="honesty-prompt">
          <JollyHeartIcon size={26} color="#7c3aed" className="heart-prompt-icon" />
          <p>
            Please answer <span className="highlight-bold-purple">honestly</span> and <span className="highlight-bold-purple">instinctively</span> — that’s what makes their results meaningful.
          </p>
        </div>

        {/* Form Inputs & CTA */}
        <form className="home-form" onSubmit={handleStart}>
          
          {/* Name Input */}
          <div className="input-group">
            <label className="input-label-top">Your Name</label>
            <div className="input-field-wrapper">
              <FaUser className="field-icon" />
              <input 
                type="text" 
                placeholder="Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="input-group">
            <label className="input-label-top">Your Email</label>
            <div className="input-field-wrapper">
              <FaEnvelope className="field-icon" />
              <input 
                type="email" 
                placeholder="Email ID" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="start-btn-pill" disabled={loading}>
            <span>{loading ? "CHECKING..." : "START – 9 QUESTIONS"}</span>
            {!loading && <FaArrowRight className="btn-arrow-icon" />}
          </button>

          {/* Sub-button Disclaimer with Bigger Lock Icon */}
          <div className="sub-disclaimer">
            <OutlineLockIcon size={22} color="#7c3aed" className="disclaimer-lock-icon" />
            <span>Your details are never shown to the person who invited you and are not attached to your answers.</span>
          </div>
        </form>

        {/* Footer Links */}
        <div className="home-footer">
          <div className="footer-row">
            <Link to="/terms-and-conditions" className="footer-link">Terms &amp; Conditions</Link>
            <span className="footer-dot">•</span>
            <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
            <span className="footer-dot">•</span>
            <Link to="/cookie-policy" className="footer-link">Cookie Policy</Link>
          </div>
          <div className="footer-row">
            <Link to="/anonymous-feedback" className="footer-link">Anonymous Feedback Policy</Link>
            <span className="footer-dot">•</span>
            <Link to="/child-safety-standards" className="footer-link">Child Safety Standards</Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
