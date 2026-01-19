import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react'
import styles from './Schedule.module.css'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

function Schedule() {
  const addToCalendar = () => {
    const event = {
      title: 'Taylor & Thomas Celebration',
      start: '2026-05-29T19:00:00',
      end: '2026-05-29T22:00:00',
      location: 'Kingfly Spirits, 2613 Smallman St, Pittsburgh, PA 15222',
      description: 'Join us for a celebration of our marriage!',
    }

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start.replace(/[-:]/g, '').replace('.000', '')}/${event.end.replace(/[-:]/g, '').replace('.000', '')}&location=${encodeURIComponent(event.location)}&details=${encodeURIComponent(event.description)}`

    window.open(googleCalendarUrl, '_blank')
  }

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
          <h1 className={styles.title}>The Schedule</h1>
          <p className={styles.subtitle}>An evening to remember</p>
        </header>

        <div className={styles.content}>
          <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className={styles.cardHeader}>
              <div className={styles.dateDisplay}>
                <span className={styles.day}>Friday</span>
                <span className={styles.date}>May 29</span>
                <span className={styles.year}>2026</span>
              </div>
            </div>

            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <div className={styles.eventTime}>
                    <Clock size={16} />
                    <span>7:00 PM - 10:00 PM</span>
                  </div>
                  <h3 className={styles.eventTitle}>Celebration Party</h3>
                  <p className={styles.eventDescription}>
                    Join us for an evening of cocktails, delicious food, and plenty of dancing
                    as we celebrate our marriage with the people who mean the most to us.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.venue}>
              <div className={styles.venueHeader}>
                <MapPin className={styles.venueIcon} size={24} />
                <h3 className={styles.venueName}>Kingfly Spirits</h3>
              </div>
              <address className={styles.venueAddress}>
                2613 Smallman St<br />
                Pittsburgh, PA 15222
              </address>
              <a
                href="https://maps.google.com/?q=Kingfly+Spirits+2613+Smallman+St+Pittsburgh+PA+15222"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.venueLink}
              >
                <ExternalLink size={14} />
                Get Directions
              </a>
            </div>

            <div className={styles.actions}>
              <button onClick={addToCalendar} className="btn btn-primary">
                <Calendar size={18} />
                Add to Calendar
              </button>
            </div>
          </motion.div>

          <motion.div
            className={styles.dresscode}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className={styles.dresscodeTitle}>Dress Code</h3>
            <p className={styles.dresscodeText}>Cocktail Attire</p>
            <p className={styles.dresscodeDescription}>
              Dress to celebrate! Think elegant and festive.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default Schedule
