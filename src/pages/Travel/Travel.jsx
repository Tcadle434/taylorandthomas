import { motion } from 'framer-motion'
import { Plane, Hotel, ExternalLink, MapPin } from 'lucide-react'
import styles from './Travel.module.css'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
}

function Travel() {
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
          <h1 className={styles.title}>Getting There</h1>
          <p className={styles.subtitle}>Everything you need for your trip to Pittsburgh</p>
        </header>

        <div className={styles.grid}>
          <motion.div
            className={styles.card}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
          >
            <div className={styles.cardIcon}>
              <Plane size={28} />
            </div>
            <h2 className={styles.cardTitle}>Flights</h2>
            <div className={styles.cardContent}>
              <div className={styles.airportCode}>PIT</div>
              <p className={styles.airportName}>Pittsburgh International Airport</p>
              <p className={styles.cardDescription}>
                The venue is approximately 25 minutes from the airport, depending on traffic.
              </p>
            </div>
          </motion.div>

          <motion.div
            className={`${styles.card} ${styles.hotelCard}`}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.3 }}
          >
            <div className={styles.cardIcon}>
              <Hotel size={28} />
            </div>
            <h2 className={styles.cardTitle}>Nearby Hotel</h2>
            <div className={styles.cardContent}>
              <h3 className={styles.hotelName}>Hampton by Hilton</h3>
              <address className={styles.hotelAddress}>
                <MapPin size={14} />
                <span>1247 Smallman St<br />Pittsburgh, PA 15222</span>
              </address>
              <a
                href="https://www.hilton.com/en/hotels/pitdnhx-hampton-suites-pittsburgh-downtown/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-gold"
              >
                <ExternalLink size={16} />
                View Hotel
              </a>
            </div>
          </motion.div>

          <motion.div
            className={`${styles.card} ${styles.hotelCard}`}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.4 }}
          >
            <div className={styles.cardIcon}>
              <Hotel size={28} />
            </div>
            <h2 className={styles.cardTitle}>Nearby Hotel</h2>
            <div className={styles.cardContent}>
              <h3 className={styles.hotelName}>Homewood Suites by Hilton</h3>
              <address className={styles.hotelAddress}>
                <MapPin size={14} />
                <span>1410 Smallman St<br />Pittsburgh, PA 15222</span>
              </address>
              <a
                href="https://www.hilton.com/en/hotels/pitdohw-homewood-suites-pittsburgh-downtown/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-gold"
              >
                <ExternalLink size={16} />
                View Hotel
              </a>
            </div>
          </motion.div>
        </div>

      </div>
    </motion.div>
  )
}

export default Travel
