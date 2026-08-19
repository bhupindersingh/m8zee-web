import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Agentation } from 'agentation'
import Home from './pages/Home/Home'
import Quiz from './pages/Quiz/Quiz'
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions/TermsConditions'
import CookiePolicy from './pages/CookiePolicy/CookiePolicy'
import AnonymousFeedback from './pages/AnonymousFeedback/AnonymousFeedback'
import DeleteAccount from './pages/DeleteAccount/DeleteAccount'
import ChildSafetyStandards from './pages/ChildSafetyStandards/ChildSafetyStandards'

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

        {/* Delete Account & Data Page */}
        <Route path="/delete-account" element={<DeleteAccount />} />

        {/* Child Safety Standards Page */}
        <Route path="/child-safety-standards" element={<ChildSafetyStandards />} />
      </Routes>
      {import.meta.env.DEV && <Agentation />}
    </BrowserRouter>
  )
}

export default App

