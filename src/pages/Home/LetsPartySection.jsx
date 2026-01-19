import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import styles from './LetsPartySection.module.css'

const CONFETTI_COLORS = ['#C9A86C', '#E8A598', '#F5E6E0', '#FFFFFF', '#D4B87A', '#F0BDB3']
const CONFETTI_SHAPES = ['square', 'rectangle', 'circle']

function LetsPartySection() {
  const sectionRef = useRef(null)
  const [confetti, setConfetti] = useState([])
  const [sparkles, setSparkles] = useState([])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1])
  const textY = useTransform(scrollYProgress, [0, 0.3], [50, 0])

  useEffect(() => {
    // Generate confetti pieces
    const newConfetti = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      shape: CONFETTI_SHAPES[Math.floor(Math.random() * CONFETTI_SHAPES.length)],
      size: Math.random() * 12 + 6,
      duration: Math.random() * 4 + 4,
      delay: Math.random() * 5,
      rotation: Math.random() * 360,
      swayAmount: Math.random() * 100 + 50,
    }))
    setConfetti(newConfetti)

    // Generate sparkles/firework particles
    const newSparkles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 3,
    }))
    setSparkles(newSparkles)
  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Falling confetti */}
      <div className={styles.confettiField}>
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            className={`${styles.confettiPiece} ${styles[piece.shape]}`}
            style={{
              left: `${piece.x}%`,
              width: piece.shape === 'rectangle' ? piece.size * 0.4 : piece.size,
              height: piece.shape === 'rectangle' ? piece.size : piece.shape === 'square' ? piece.size * 0.8 : piece.size,
              backgroundColor: piece.color,
            }}
            animate={{
              y: ['-10vh', '110vh'],
              x: [0, piece.swayAmount, -piece.swayAmount, piece.swayAmount / 2, 0],
              rotate: [piece.rotation, piece.rotation + 720],
              opacity: [0, 1, 1, 1, 0],
            }}
            transition={{
              duration: piece.duration,
              delay: piece.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Sparkle/firework bursts */}
      <div className={styles.sparkleField}>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className={styles.sparkle}
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: sparkle.duration,
              delay: sparkle.delay,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          >
            <svg width={sparkle.size * 8} height={sparkle.size * 8} viewBox="0 0 24 24">
              <path
                d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z"
                fill="#FFFFFF"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Firework burst rings */}
      <div className={styles.burstField}>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.burstRing}
            style={{
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              scale: [0, 2, 2.5],
              opacity: [0.8, 0.3, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.8,
              repeat: Infinity,
              ease: 'easeOut',
            }}
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
          <motion.span
            className={styles.party}
            animate={{
              textShadow: [
                '0 0 20px rgba(201, 168, 108, 0.3)',
                '0 0 40px rgba(201, 168, 108, 0.5)',
                '0 0 20px rgba(201, 168, 108, 0.3)',
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            PARTY
          </motion.span>
        </motion.div>

      </motion.div>
    </section>
  )
}

export default LetsPartySection
