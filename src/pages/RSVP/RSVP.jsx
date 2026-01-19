import { motion } from 'framer-motion'
import { Heart, ExternalLink } from 'lucide-react'
import styles from './RSVP.module.css'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true'
const GOOGLE_FORM_DIRECT_URL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform'

function RSVP() {
  return (
    <motion.div
      className={styles.page}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <Heart className={styles.headerIcon} size={40} />
          <h1 className={styles.title}>RSVP</h1>
          <p className={styles.subtitle}>We can't wait to celebrate with you!</p>
        </header>

        <motion.div
          className={styles.intro}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className={styles.introText}>
            Please let us know if you'll be joining us for our celebration in Pittsburgh.
            We're so excited to see you there!
          </p>
          <div className={styles.deadline}>
            <span className={styles.deadlineLabel}>Please RSVP by</span>
            <span className={styles.deadlineDate}>May 1, 2026</span>
          </div>
        </motion.div>

        <motion.div
          className={styles.formContainer}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className={styles.formWrapper}>
            <iframe
              src={GOOGLE_FORM_URL}
              className={styles.formIframe}
              title="RSVP Form"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
            >
              Loading form...
            </iframe>
          </div>

          <div className={styles.fallback}>
            <p className={styles.fallbackText}>
              Having trouble with the form?
            </p>
            <a
              href={GOOGLE_FORM_DIRECT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-gold"
            >
              <ExternalLink size={16} />
              Open Form in New Tab
            </a>
          </div>
        </motion.div>

        <motion.div
          className={styles.note}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className={styles.noteTitle}>Questions?</h3>
          <p className={styles.noteText}>
            If you have any questions about your RSVP or need to make changes,
            please don't hesitate to reach out to us directly.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default RSVP
