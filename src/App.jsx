import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Quiz from './pages/Quiz/Quiz'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Screen: The new landing page */}
        <Route path="/" element={<Home />} />

        {/* Quiz Page */}
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
