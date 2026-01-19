import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import styles from './WeGotMarriedSection.module.css'

function WeGotMarriedSection() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 0.9], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.3], [60, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 0.9], [0.9, 1, 1, 0.95])

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.background}>
        <div className={styles.gradientOverlay} />
      </div>

      <motion.div
        className={styles.content}
        style={{ opacity, y, scale }}
      >
        <span className={styles.inMaui}>...in Maui</span>

        <div className={styles.imageContainer}>
          <img
            src="/maui_wedding_1.jpeg"
            alt="Wedding in Maui"
            className={styles.image}
          />
        </div>
      </motion.div>
    </section>
  )
}

export default WeGotMarriedSection
