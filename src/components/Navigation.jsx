import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import styles from './Navigation.module.css'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/schedule', label: 'Schedule' },
  { path: '/travel', label: 'Travel' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/faqs', label: 'FAQs' },
  { path: '/rsvp', label: 'RSVP' },
]

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const navClasses = [
    styles.nav,
    isScrolled ? styles.scrolled : '',
    isHome && !isScrolled ? styles.transparent : '',
  ].filter(Boolean).join(' ')

  return (
    <>
      <nav className={navClasses}>
        <div className={styles.container}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoText}>T & T</span>
          </Link>

          <div className={styles.desktopNav}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${styles.navLink} ${
                  location.pathname === link.path ? styles.active : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            className={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.mobileMenuContent}>
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={`${styles.mobileNavLink} ${
                      location.pathname === link.path ? styles.active : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation
