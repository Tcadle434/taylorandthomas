import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import styles from './HeroSection.module.css'

function HeroSection() {
  const sectionRef = useRef(null)
  const [particles, setParticles] = useState([])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const leftRingX = useTransform(scrollYProgress, [0, 0.5], [0, -150])
  const rightRingX = useTransform(scrollYProgress, [0, 0.5], [0, 150])
  const ringsOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 200])

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 3 + 4,
      delay: Math.random() * 2,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <section ref={sectionRef} className={styles.hero}>
      <motion.div className={styles.background} style={{ y: backgroundY }}>
        <div className={styles.palmSilhouette} />
        <div className={styles.oceanHorizon} />
      </motion.div>

      <div className={styles.particles}>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={styles.particle}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className={styles.content}>
        <motion.div className={styles.ringsContainer} style={{ opacity: ringsOpacity }}>
          <motion.div className={styles.ringWrapper} style={{ x: leftRingX }}>
            <div className={styles.ring} />
          </motion.div>
          <motion.div className={styles.ringWrapper} style={{ x: rightRingX }}>
            <div className={styles.ring} />
          </motion.div>
        </motion.div>

        <motion.div className={styles.textContent} style={{ opacity: textOpacity }}>
          <h1 className={styles.names}>Taylor & Thomas</h1>
          <p className={styles.subtitle}>Scroll to begin our story</p>
          <motion.div
            className={styles.scrollIndicator}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
