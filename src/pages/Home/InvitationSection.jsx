import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Calendar, MapPin, PartyPopper } from 'lucide-react'
import styles from './InvitationSection.module.css'

function InvitationSection() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.3], [80, 0])

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.imageBackground}>
        <div className={styles.imagePlaceholder}>
          <span>Your Photo Here</span>
        </div>
        <div className={styles.imageOverlay} />
      </div>

      <motion.div className={styles.content} style={{ opacity, y }}>
        <div className={styles.card}>
          <div className={styles.header}>
            <PartyPopper className={styles.icon} size={32} />
            <h2 className={styles.title}>Join Us for a Celebration</h2>
          </div>

          <div className={styles.details}>
            <div className={styles.detailItem}>
              <Calendar className={styles.detailIcon} size={20} />
              <div>
                <span className={styles.detailLabel}>Date</span>
                <span className={styles.detailValue}>May 29, 2026</span>
              </div>
            </div>

            <div className={styles.detailItem}>
              <MapPin className={styles.detailIcon} size={20} />
              <div>
                <span className={styles.detailLabel}>Location</span>
                <span className={styles.detailValue}>Pittsburgh, PA</span>
              </div>
            </div>
          </div>

          <p className={styles.description}>
            We tied the knot in Maui, and now we want to celebrate with all of you!
            Join us for an evening of food, drinks, and dancing.
          </p>

          <div className={styles.actions}>
            <Link to="/rsvp" className={`btn btn-primary ${styles.btnPrimary}`}>
              RSVP Now
            </Link>
            <Link to="/schedule" className={`btn btn-outline-gold ${styles.btnSecondary}`}>
              View Details
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default InvitationSection
