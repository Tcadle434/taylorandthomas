import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home/Home'
import Schedule from './pages/Schedule/Schedule'
import Travel from './pages/Travel/Travel'
import Gallery from './pages/Gallery/Gallery'
import FAQs from './pages/FAQs/FAQs'
import RSVP from './pages/RSVP/RSVP'
import Registry from './pages/Registry/Registry'
import './App.css'

function App() {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="app">
      <Navigation />
      <main className="main">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/travel" element={<Travel />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/rsvp" element={<RSVP />} />
            <Route path="/registry" element={<Registry />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default App
