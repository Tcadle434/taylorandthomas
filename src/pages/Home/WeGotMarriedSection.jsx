import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import styles from './WeGotMarriedSection.module.css'

function WeGotMarriedSection() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.9], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.9], [0.8, 1, 1, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.9], [100, 0, 0, -50])

  const mauiOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0])
  const mauiY = useTransform(scrollYProgress, [0.2, 0.4], [30, 0])

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.background}>
        <div className={styles.gradientOverlay} />
      </div>

      <div className={styles.content}>
        <motion.div
          className={styles.mainText}
          style={{ opacity, scale, y }}
        >
          <span className={styles.we}>We</span>
          <span className={styles.got}>Got</span>
          <span className={styles.married}>Married</span>
        </motion.div>

        <motion.div
          className={styles.locationText}
          style={{ opacity: mauiOpacity, y: mauiY }}
        >
          <span className={styles.inMaui}>in Maui...</span>
          <div className={styles.mauiImage}>
            <div className={styles.imagePlaceholder}>
              <span>Maui Memory</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WeGotMarriedSection
