import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import styles from './LetsPartySection.module.css'

// Single firework particle that shoots outward
function FireworkParticle({ particle, isActive }) {
  return (
    <motion.div
      className={styles.fireworkParticle}
      style={{
        backgroundColor: particle.color,
        width: particle.size,
        height: particle.size,
      }}
      initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
      animate={isActive ? {
        x: particle.endX,
        y: particle.endY,
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0.3],
      } : {}}
      transition={{
        duration: particle.duration,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    />
  )
}

// A single firework burst
function Firework({ firework, delay }) {
  const [isActive, setIsActive] = useState(false)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Generate particles for this firework
    const colors = ['#C9A86C', '#D4B87A', '#E8D5A3', '#FFFFFF', '#F5E6C8']
    const newParticles = Array.from({ length: 24 }, (_, i) => {
      const angle = (i / 24) * Math.PI * 2
      const distance = 60 + Math.random() * 40
      return {
        id: i,
        endX: Math.cos(angle) * distance,
        endY: Math.sin(angle) * distance,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: 0.8 + Math.random() * 0.4,
      }
    })
    setParticles(newParticles)

    // Trigger firework on interval
    const triggerFirework = () => {
      setIsActive(true)
      setTimeout(() => setIsActive(false), 1500)
    }

    const initialTimeout = setTimeout(triggerFirework, delay)
    const interval = setInterval(triggerFirework, firework.interval)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [delay, firework.interval])

  return (
    <div
      className={styles.firework}
      style={{
        left: `${firework.x}%`,
        top: `${firework.y}%`,
      }}
    >
      {/* Center flash */}
      <motion.div
        className={styles.fireworkCenter}
        animate={isActive ? {
          scale: [0, 1.5, 0],
          opacity: [0, 1, 0],
        } : {}}
        transition={{ duration: 0.3 }}
      />

      {/* Particles */}
      {particles.map((particle) => (
        <FireworkParticle
          key={particle.id}
          particle={particle}
          isActive={isActive}
        />
      ))}
    </div>
  )
}

function LetsPartySection() {
  const sectionRef = useRef(null)
  const [fireworks, setFireworks] = useState([])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1])
  const textY = useTransform(scrollYProgress, [0, 0.3], [30, 0])

  useEffect(() => {
    // Position fireworks around the edges
    const newFireworks = [
      { id: 0, x: 12, y: 20, interval: 2500 },
      { id: 1, x: 88, y: 18, interval: 2800 },
      { id: 2, x: 8, y: 65, interval: 3000 },
      { id: 3, x: 92, y: 70, interval: 2600 },
      { id: 4, x: 22, y: 12, interval: 3200 },
      { id: 5, x: 78, y: 82, interval: 2900 },
      { id: 6, x: 18, y: 85, interval: 3100 },
      { id: 7, x: 82, y: 35, interval: 2700 },
      { id: 8, x: 5, y: 40, interval: 3300 },
      { id: 9, x: 95, y: 50, interval: 2400 },
    ]
    setFireworks(newFireworks)
  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.background} />

      {/* Fireworks */}
      <div className={styles.fireworkField}>
        {fireworks.map((firework, i) => (
          <Firework
            key={firework.id}
            firework={firework}
            delay={i * 800}
          />
        ))}
      </div>

      <motion.div
        className={styles.content}
        style={{ opacity, scale }}
      >
        <motion.div className={styles.textContainer} style={{ y: textY }}>
          <span className={styles.now}>NOW</span>
          <span className={styles.lets}>LET'S</span>
          <span className={styles.party}>PARTY</span>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default LetsPartySection
