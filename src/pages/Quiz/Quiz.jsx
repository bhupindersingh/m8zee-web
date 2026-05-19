import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { db } from '../../config/firebase'
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'
import { PropagateLoader } from "react-spinners"
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine'
import { CheckIcon } from '../../assets/icons/CheckIcon'
import { HeartIcon } from '../../assets/icons/HeartIcon'
import { calculateResults } from '../../utils/scoring'
import Certificate from '../Certificate/Certificate'
import PreparingCertificate from '../../components/PreparingCertificate'
import '../../App.css'

function Quiz() {
  const location = useLocation()
  const navigate = useNavigate()

  // Get user info from navigation state
  const { userName, userEmail, inviteId, userId } = location.state || {}

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

        setTimeout(() => {
          setShowCertificate(true)
          setIsPreparing(false)
        }, 3000)
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
    return <Certificate results={results} questions={data.questions} userName={userName} />
  }

  if (isPreparing) {
    return <PreparingCertificate />
  }

  if (!data) return <div className="quiz-wrapper"><h1>Error loading data</h1></div>

  const currentQ = data.questions[currentIndex]
  const progressWidth = ((currentIndex + 1) / 9) * 100

  return (
    <div className="quiz-wrapper">
      <div className="sticky-header">
        <div className="top-nav">
          {currentIndex > 0 ? (
            <button
              className="back-btn"
              onClick={() => setCurrentIndex(currentIndex - 1)}
            >
              <ArrowLeftLineIcon />
            </button>
          ) : (
            <div /> // Placeholder to keep the grid column balance
          )}
          <div className="nav-title">Rate Yourself</div>
          <div className="nav-count">{currentIndex + 1}/9</div>
        </div>

        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressWidth}%` }}
          ></div>
        </div>
      </div>

      <div className="content">
        <div className="trait-tag">
          <HeartIcon /> {currentQ.title}
        </div>

        <h2 className="question-heading">
          “{currentQ.question}”
        </h2>

        <div className="options-stack">
          {currentQ.answers.map((ans) => (
            <div
              key={ans.score}
              className={`option-card ${answers[currentQ.id] === ans.score ? 'active' : ''}`}
              onClick={() => handleOptionClick(ans.score)}
            >
              <span>{ans.text}</span>
              <div className="circle-check">
                {answers[currentQ.id] === ans.score && <CheckIcon />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Quiz
