import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { db } from '../../config/firebase'
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'
import { PropagateLoader } from "react-spinners"
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine'
import { CheckIcon } from '../../assets/icons/CheckIcon'
import { HeartIcon } from '../../assets/icons/HeartIcon'
import { calculateResults } from '../../utils/scoring'
import OfficialLogo from '../../assets/icons/m8zee_logo_official.png'
import Certificate from '../Certificate/Certificate'
import PreparingCertificate from '../../components/PreparingCertificate'
import '../../App.css'

// Top Brand Header
const BrandHeader = () => (
  <div className="final-brand-header">
    <img src={OfficialLogo} alt="m8zee" className="final-brand-logo" />
    <div className="final-brand-tagline">
      <span>SEE YOURSELF. </span>
      <span className="tagline-purple">GROW </span>
      <span>YOUR FRIENDSHIPS.</span>
    </div>
  </div>
);

function Quiz() {
  const location = useLocation()
  const navigate = useNavigate()

  // Get user info from navigation state
  const { userName, userEmail, inviteId, userId, senderName: stateSender } = location.state || {}
  const queryParams = new URLSearchParams(location.search)
  const senderName = stateSender || queryParams.get('sender') || 'your friend'

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isPreparing, setIsPreparing] = useState(false)
  const [showCertificate, setShowCertificate] = useState(false)
  const [results, setResults] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})

  // Security check: Redirect if no email (user skipped home page)
  useEffect(() => {
    if (!userEmail) {
      // Preserve the URL params (inviteId, userId) when redirecting to Home
      navigate('/' + location.search)
    }
  }, [userEmail, navigate, location.search])

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "game_question"))
        const questionsList = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }))

        // Sort q1, q2, q3... numerically
        const sortedQuestions = questionsList.sort((a, b) => {
          const numA = parseInt(a.id.replace(/\D/g, ''))
          const numB = parseInt(b.id.replace(/\D/g, ''))
          return numA - numB
        })

        console.log("Fetched Questions Data:", sortedQuestions);
        setData({ questions: sortedQuestions })
      } catch (err) {
        console.error("Fetch error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchQuizData()
  }, [])

  // Auto-scroll to top when moving to next/previous question
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [currentIndex])

  const handleOptionClick = (score) => {
    if (!data) return
    const currentQuestion = data.questions[currentIndex]

    const updatedAnswers = { ...answers, [currentQuestion.id]: score }
    setAnswers(updatedAnswers)

    setTimeout(async () => {
      if (currentIndex < data.questions.length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else {
        setIsPreparing(true)
        // Calculate results
        const res = calculateResults(updatedAnswers, data.questions)
        setResults(res)

        try {
          // 7. Save to friend_ratings (The Lock)
          await addDoc(collection(db, "friend_ratings"), {
            friendName: userName,
            friendEmail: userEmail,
            inviteId: inviteId || "",
            userId: userId || "", // The ID of the person who shared the link
            scores: updatedAnswers,
            results: {
              archetype: res.archetype,
              totalScore: res.totalScore,
              percentage: res.percentage
            },
            createdAt: serverTimestamp()
          });
          console.log("Quiz saved successfully!");
        } catch (error) {
          console.error("Error saving quiz results:", error);
          // We still show the certificate even if saving fails for UX, 
          // but in a production app, you might want to handle this differently.
        }

        // Quick 1-second subtle submission transition
        setIsPreparing(true)
        setTimeout(() => {
          setShowCertificate(true)
          setIsPreparing(false)
        }, 1000)
      }
    }, 300)
  }

  if (loading) {
    return (
      <div className="quiz-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <PropagateLoader color="#aa3bff" size={12} />
      </div>
    )
  }

  if (showCertificate && results) {
    return <Certificate results={results} questions={data.questions} userName={userName} senderName={senderName} />
  }

  if (isPreparing) {
    return <PreparingCertificate />
  }

  if (!data) return <div className="quiz-wrapper"><h1>Error loading data</h1></div>

  const currentQ = data.questions[currentIndex]
  const progressWidth = ((currentIndex + 1) / 9) * 100

  const displayName = senderName && senderName.toLowerCase() !== 'your friend' ? senderName : 'your friend';
  const capitalizedDisplayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

  const clientQuestions = {
    q1: `${capitalizedDisplayName} stands by their friends and offers encouragement through both highs and lows.`,
    q2: `${capitalizedDisplayName} makes people feel safe sharing things with them.`,
    q3: `${capitalizedDisplayName} is honest in a way that strengthens the friendship.`,
    q4: `${capitalizedDisplayName} gives their full attention and tries to truly understand.`,
    q5: `${capitalizedDisplayName} notices and cares about how their friends are feeling.`,
    q6: `${capitalizedDisplayName} respects their friends’ choices, values and personal space.`,
    q7: `${capitalizedDisplayName} makes their friends feel accepted as they are.`,
    q8: `${capitalizedDisplayName} shows up when it matters and follows through on what they say.`,
    q9: `${capitalizedDisplayName} brings enjoyment, lightness or warmth into the friendship.`
  };

  const clientTitles = {
    q1: "Steady Support",
    q2: "Trustworthy",
    q3: "Kindly Honest",
    q4: "Present Listener",
    q5: "Emotionally Aware",
    q6: "Respects Boundaries",
    q7: "Accepting",
    q8: "Shows Up",
    q9: "Positive Energy"
  };

  const shortOptions = {
    1: "Not at all",
    2: "Very rarely",
    3: "Rarely",
    4: "Sometimes",
    5: "Quite often",
    6: "Usually",
    7: "Very often",
    8: "Almost always",
    9: "Consistently",
    10: "Absolutely"
  };

  const questionTitle = clientTitles[currentQ.id] || currentQ.title;
  const questionText = clientQuestions[currentQ.id] || currentQ.question;

  return (
    <div className="quiz-wrapper">
      {/* 1. Brand Logo & Tagline Header */}
      <BrandHeader />
      <div className="final-top-border" />

      <div className="sticky-header">
        <div className="top-nav">
          {currentIndex > 0 && (
            <button
              className="back-btn"
              onClick={() => setCurrentIndex(currentIndex - 1)}
              aria-label="Previous question"
            >
              <ArrowLeftLineIcon />
            </button>
          )}
          <div className="nav-title">
            HOW DO YOU SEE <span className="highlight-purple-text">{displayName.toUpperCase()}</span>?
          </div>
          <div className="nav-count">{currentIndex + 1}/9</div>
        </div>

        <div className="progress-bar-wrapper">
          <div className="progress-bar-container">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressWidth}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="trait-tag">
          <HeartIcon /> {questionTitle}
        </div>

        <h2 className="question-heading">
          “{questionText}”
        </h2>

        <p className="question-subtext">
          How much does this sound like {displayName}?
        </p>

        <div className="options-stack" key={currentIndex}>
          {currentQ.answers.map((ans) => (
            <div
              key={ans.score}
              className={`option-card ${answers[currentQ.id] === ans.score ? 'active' : ''}`}
              onClick={() => handleOptionClick(ans.score)}
            >
              <div className="option-label-wrapper">
                <span className="option-number">{ans.score}.</span>
                <span className="option-text">{shortOptions[ans.score] || ans.text}</span>
              </div>
              <div className="circle-check">
                {answers[currentQ.id] === ans.score && <CheckIcon />}
              </div>
            </div>
          ))}
        </div>

        {/* 3. Anonymous Guarantee Footer Card */}
        <div className="quiz-anonymous-footer">
          <div className="quiz-lock-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="10" width="14" height="11" rx="3" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 10V6.5C8 4.567 9.567 3 11.5 3H12.5C14.433 3 16 4.567 16 6.5V10" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="14.5" r="1.2" fill="#FFFFFF" />
              <path d="M12 15.7V18" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
          <div className="quiz-anonymous-text">
            Your answer is anonymous.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quiz
