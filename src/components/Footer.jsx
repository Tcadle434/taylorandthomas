import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <span className={styles.names}>Taylor & Thomas</span>
            <span className={styles.date}>May 29, 2026</span>
          </div>

          <nav className={styles.nav}>
            <Link to="/schedule" className={styles.link}>Schedule</Link>
            <Link to="/travel" className={styles.link}>Travel</Link>
            <Link to="/gallery" className={styles.link}>Gallery</Link>
            <Link to="/faqs" className={styles.link}>FAQs</Link>
            <Link to="/rsvp" className={styles.link}>RSVP</Link>
          </nav>

          <div className={styles.bottom}>
            <p className={styles.tagline}>
              Made with <Heart size={14} className={styles.heart} /> by Thomas
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
