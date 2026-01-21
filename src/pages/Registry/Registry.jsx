import { motion } from 'framer-motion'
import { Gift, ExternalLink } from 'lucide-react'
import styles from './Registry.module.css'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

// Replace this with your actual Joy registry URL
const JOY_REGISTRY_URL = 'https://withjoy.com/thomas-cadle-and-taylor/registry'

function Registry() {
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
          <Gift className={styles.headerIcon} size={40} />
          <h1 className={styles.title}>Registry</h1>
          <p className={styles.subtitle}>We've set up a registry on Joy if you'd like to browse.</p>
        </header>

        <motion.div
          className={styles.ctaCard}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className={styles.ctaTitle}>View Our Registry</h2>
          <p className={styles.ctaText}>
            Browse our wishlist and contribute to our funds on Joy
          </p>
          <a
            href={JOY_REGISTRY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-primary ${styles.ctaButton}`}
          >
            <ExternalLink size={18} />
            Go to Registry
          </a>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Registry
