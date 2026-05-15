import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaHeart } from 'react-icons/fa';
import { db } from '../../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './Home.css';

const Home = () => {
  // 1. Hook to read the URL (e.g., ?sender=Rajat)
  const [searchParams] = useSearchParams();
  const senderName = searchParams.get('sender') || 'your friend'; // Default if no name found

  // 2. Hook to navigate to the next page
  const navigate = useNavigate();

  // 3. State for the form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // 4. Function to handle the "Start Quiz" button
  const handleStart = async (e) => {
    e.preventDefault();
    
    if (name && email) {
      setLoading(true);
      try {
        // 5. Check if the user has already participated
        const q = query(
          collection(db, "friend_ratings"), 
          where("friendEmail", "==", email.toLowerCase().trim())
        );
        
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          alert("You have already participated in this quiz with this email!");
          setLoading(false);
          return;
        }

        // 6. Navigate to the quiz page, passing the user info and inviteId
        const inviteId = searchParams.get('inviteId') || '';
        const userId = searchParams.get('userId') || '';
        
        navigate('/quiz', { 
          state: { 
            userName: name, 
            userEmail: email.toLowerCase().trim(),
            inviteId: inviteId,
            userId: userId
          } 
        }); 
      } catch (error) {
        console.error("Error checking user:", error);
        alert("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please fill in both Name and Email!");
    }
  };

  return (
    <div className="home-container">
      {/* Hidden SVG to define the gradient */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <linearGradient id="heart-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d8b4fe" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </svg>

      <div className="home-card">
        {/* Top Heart Icon */}
        <div className="heart-icon-wrapper">
          <FaHeart className="heart-icon" style={{ fill: 'url(#heart-gradient)' }} />
        </div>

        {/* Dynamic Heading */}
        <h1 className="home-title">
          How does <span className="highlight">{senderName}</span> show up for you?
        </h1>
        <p className="home-subtitle">
          Take a quick 2-minute quiz to help them discover their friendship archetype.
        </p>

        {/* The Form */}
        <form className="home-form" onSubmit={handleStart}>
          
          {/* Name Input */}
          <div className="input-group">
            <label className="input-label">Your Name</label>
            <div className="input-wrapper">
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
            <label className="input-label">Your Email</label>
            <div className="input-wrapper">
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
          <button type="submit" className="start-btn" disabled={loading}>
            {loading ? "Checking..." : "Start Quiz"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
