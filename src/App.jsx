import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Quiz from './pages/Quiz/Quiz'
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions/TermsConditions'
import CookiePolicy from './pages/CookiePolicy/CookiePolicy'
import AnonymousFeedback from './pages/AnonymousFeedback/AnonymousFeedback'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Screen: The new landing page */}
        <Route path="/" element={<Home />} />

        {/* Quiz Page */}
        <Route path="/quiz" element={<Quiz />} />

        {/* Privacy Policy Page */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* Terms & Conditions Page */}
        <Route path="/terms-and-conditions" element={<TermsConditions />} />

        {/* Cookie Policy Page */}
        <Route path="/cookie-policy" element={<CookiePolicy />} />

        {/* Anonymous Feedback Policy Page */}
        <Route path="/anonymous-feedback" element={<AnonymousFeedback />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
