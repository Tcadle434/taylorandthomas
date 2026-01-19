import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import styles from './HeroSection.module.css'

// Separate component for explosion particles to handle hooks properly
function ExplosionParticle({ particle, explosionProgress }) {
  const x = useTransform(explosionProgress, [0, 1], [particle.startX, particle.endX])
  const y = useTransform(explosionProgress, [0, 1], [particle.startY, particle.endY])
  const rotate = useTransform(explosionProgress, [0, 1], [0, particle.rotation])
  // Start at full size (they ARE the ring), then shrink as they fly away
  const scale = useTransform(explosionProgress, [0, 0.1, 0.7, 1], [1, 1.1, 0.8, 0.4])

  return (
    <motion.div
      className={styles.particle}
      style={{
        backgroundColor: particle.color,
        width: particle.size,
        height: particle.size,
        x,
        y,
        rotate,
        scale,
      }}
    />
  )
}

// Separate component for mini sparkles
function MiniSparkle({ index, clinkSparkleOpacity, clinkSparkleScale }) {
  const scale = useTransform(clinkSparkleScale, [0.3, 1.5, 2], [0, 1, 0.5])
  const angle = index * Math.PI / 4

  return (
    <motion.div
      className={styles.miniSparkle}
      style={{
        left: `calc(50% + ${Math.cos(angle) * 40}px)`,
        top: `calc(30% + ${Math.sin(angle) * 40}px)`,
        opacity: clinkSparkleOpacity,
        scale,
      }}
    />
  )
}

function HeroSection() {
  const sectionRef = useRef(null)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [explosionParticles, setExplosionParticles] = useState([])

  // 5x viewport for more scroll room and better pacing
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // === PHASE 1: RINGS (0 - 0.2) ===
  // Rings fade out exactly as particles appear - seamless transition
  const ringsOpacity = useTransform(scrollYProgress, [0, 0.16, 0.20], [1, 1, 0])
  const ringsScale = useTransform(scrollYProgress, [0, 0.14, 0.19], [1, 1.08, 1.2])
  const leftRingX = useTransform(scrollYProgress, [0, 0.14, 0.2], [0, 0, -20])
  const rightRingX = useTransform(scrollYProgress, [0, 0.14, 0.2], [0, 0, 20])
  const ringGlow = useTransform(scrollYProgress, [0.14, 0.18], [0, 1])

  // === PHASE 2: EXPLOSION (0.18 - 0.4) ===
  // Particles hidden until explosion starts, then burst outward as rings disappear
  const explosionProgress = useTransform(scrollYProgress, [0.18, 0.38], [0, 1])
  // Start at 0, quickly appear as rings fade, stay visible, then fade out
  const explosionOpacity = useTransform(scrollYProgress, [0, 0.17, 0.19, 0.35, 0.42], [0, 0, 1, 1, 0])
  const burstScale = useTransform(explosionProgress, [0, 0.15, 0.4], [0, 2, 0])
  const burstOpacity = useTransform(explosionProgress, [0, 0.1, 0.3], [0, 1, 0])

  // === PHASE 3: GLASSES FORM (0.38 - 0.6) ===
  const glassesOpacity = useTransform(scrollYProgress, [0.4, 0.48, 0.72, 0.80], [0, 1, 1, 0])
  const glassesScale = useTransform(scrollYProgress, [0.4, 0.5], [0.8, 1])
  const leftGlassX = useTransform(scrollYProgress, [0.4, 0.52, 0.62, 0.68], [-180, -70, -25, 8])
  const rightGlassX = useTransform(scrollYProgress, [0.4, 0.52, 0.62, 0.68], [180, 70, 25, -8])
  const leftGlassRotate = useTransform(scrollYProgress, [0.52, 0.62, 0.68], [-25, -12, 18])
  const rightGlassRotate = useTransform(scrollYProgress, [0.52, 0.62, 0.68], [25, 12, -18])

  // === PHASE 4: CLINK (0.65 - 0.75) ===
  const clinkBounce = useTransform(scrollYProgress, [0.66, 0.69, 0.72], [0, -8, 0])
  const clinkSparkleOpacity = useTransform(scrollYProgress, [0.67, 0.70, 0.76], [0, 1, 0])
  const clinkSparkleScale = useTransform(scrollYProgress, [0.67, 0.72, 0.76], [0.3, 1.5, 2])
  const clinkRingScale = useTransform(scrollYProgress, [0.68, 0.73, 0.77], [0, 1, 1.5])
  const clinkRingOpacity = useTransform(scrollYProgress, [0.68, 0.73, 0.77], [0.8, 0.5, 0])

  // === PHASE 5: TEXT REVEAL (0.75 - 1.0) ===
  // Smooth fade in as glasses fade out
  const textOpacity = useTransform(scrollYProgress, [0.74, 0.85], [0, 1])
  const textY = useTransform(scrollYProgress, [0.74, 0.88], [30, 0])
  const textScale = useTransform(scrollYProgress, [0.74, 0.88, 1], [0.95, 1, 1])

  // Staggered text animations - gentle fade in
  const weOpacity = useTransform(scrollYProgress, [0.76, 0.84], [0, 1])
  const weY = useTransform(scrollYProgress, [0.76, 0.84], [15, 0])
  const gotOpacity = useTransform(scrollYProgress, [0.79, 0.87], [0, 1])
  const gotY = useTransform(scrollYProgress, [0.79, 0.87], [15, 0])
  const marriedOpacity = useTransform(scrollYProgress, [0.82, 0.90], [0, 1])
  const marriedY = useTransform(scrollYProgress, [0.82, 0.90], [15, 0])

  // Scroll hint
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0])

  // Track completion
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setAnimationComplete(latest >= 0.98)
  })

  // Generate particles on mount
  useEffect(() => {
    // Ring explosion particles - start ON the ring circumference
    const ringRadius = 55 // Visual radius of ring in pixels
    const leftRingCenter = -35 // Center of left ring
    const rightRingCenter = 35 // Center of right ring

    const ringParticles = Array.from({ length: 80 }, (_, i) => {
      const isFromLeftRing = i < 40
      const ringCenter = isFromLeftRing ? leftRingCenter : rightRingCenter

      // Start angle - position on the ring circumference
      const startAngle = ((i % 40) / 40) * Math.PI * 2 + (Math.random() - 0.5) * 0.2

      // Start position is ON the ring
      const startX = ringCenter + Math.cos(startAngle) * ringRadius
      const startY = Math.sin(startAngle) * ringRadius

      // End position - explode outward from start position
      const explodeDistance = 180 + Math.random() * 220
      const explodeAngle = startAngle + (Math.random() - 0.5) * 0.8 // Mostly outward with some spread

      return {
        id: i,
        startX,
        startY,
        endX: startX + Math.cos(explodeAngle) * explodeDistance * (isFromLeftRing ? 1 : 1),
        endY: startY + Math.sin(explodeAngle) * explodeDistance,
        size: Math.random() * 12 + 6,
        color: ['#C9A86C', '#D4B87A', '#B89555', '#E8D5A3', '#FFFFFF'][Math.floor(Math.random() * 5)],
        rotation: Math.random() * 720,
      }
    })
    setExplosionParticles(ringParticles)
  }, [])

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={styles.stickyContainer}>
        <div className={styles.background} />

        {/* ========== WEDDING RINGS ========== */}
        <motion.div
          className={styles.ringsContainer}
          style={{ opacity: ringsOpacity, scale: ringsScale }}
        >
          {/* Glow effect */}
          <motion.div
            className={styles.ringGlow}
            style={{ opacity: ringGlow, scale: ringGlow }}
          />

          {/* Left Ring */}
          <motion.div className={styles.ringWrapper} style={{ x: leftRingX }}>
            <svg className={styles.ringSvg} viewBox="0 0 100 100">
              <defs>
                <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E8D5A3" />
                  <stop offset="30%" stopColor="#C9A86C" />
                  <stop offset="50%" stopColor="#D4B87A" />
                  <stop offset="70%" stopColor="#C9A86C" />
                  <stop offset="100%" stopColor="#B89555" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="38" fill="none" stroke="url(#ringGradient)" strokeWidth="8" />
            </svg>
          </motion.div>

          {/* Right Ring */}
          <motion.div className={styles.ringWrapper} style={{ x: rightRingX }}>
            <svg className={styles.ringSvg} viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="38" fill="none" stroke="url(#ringGradient)" strokeWidth="8" />
            </svg>
          </motion.div>
        </motion.div>

        {/* ========== EXPLOSION PARTICLES ========== */}
        <motion.div
          className={styles.explosionContainer}
          style={{ opacity: explosionOpacity }}
        >
          {explosionParticles.map((particle) => (
            <ExplosionParticle
              key={particle.id}
              particle={particle}
              explosionProgress={explosionProgress}
            />
          ))}
          {/* Central flash */}
          <motion.div
            className={styles.burstCenter}
            style={{ scale: burstScale, opacity: burstOpacity }}
          />
        </motion.div>

        {/* ========== CHAMPAGNE GLASSES ========== */}
        <motion.div
          className={styles.glassesContainer}
          style={{ opacity: glassesOpacity, scale: glassesScale }}
        >
          {/* Left Glass */}
          <motion.div
            className={styles.glassWrapper}
            style={{ x: leftGlassX, rotate: leftGlassRotate, y: clinkBounce }}
          >
            <svg className={styles.glass} viewBox="0 0 80 160" fill="none">
              <defs>
                <linearGradient id="champagneGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#E8D5A3" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#F5E6C8" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <path d="M20 8 C20 8 18 55 22 75 C26 95 32 105 40 105 C48 105 54 95 58 75 C62 55 60 8 60 8 Z" fill="url(#champagneGradient)" />
              <path d="M20 8 C20 8 18 55 22 75 C26 95 32 105 40 105 C48 105 54 95 58 75 C62 55 60 8 60 8" fill="none" stroke="#C9A86C" strokeWidth="2" />
              <ellipse cx="40" cy="8" rx="20" ry="5" fill="none" stroke="#C9A86C" strokeWidth="2" />
              <ellipse cx="40" cy="8" rx="18" ry="4" fill="rgba(255,255,255,0.3)" />
              <line x1="40" y1="105" x2="40" y2="140" stroke="#C9A86C" strokeWidth="3" />
              <ellipse cx="40" cy="145" rx="18" ry="6" fill="none" stroke="#C9A86C" strokeWidth="2" />
              <ellipse cx="40" cy="145" rx="15" ry="4" fill="rgba(201,168,108,0.2)" />
              <circle cx="32" cy="35" r="2.5" fill="white" fillOpacity="0.7">
                <animate attributeName="cy" values="35;20;35" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="45" cy="50" r="2" fill="white" fillOpacity="0.6">
                <animate attributeName="cy" values="50;30;50" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="38" cy="65" r="1.5" fill="white" fillOpacity="0.5">
                <animate attributeName="cy" values="65;40;65" dur="3s" repeatCount="indefinite" />
              </circle>
            </svg>
          </motion.div>

          {/* Right Glass */}
          <motion.div
            className={styles.glassWrapper}
            style={{ x: rightGlassX, rotate: rightGlassRotate, y: clinkBounce }}
          >
            <svg className={styles.glass} viewBox="0 0 80 160" fill="none">
              <path d="M20 8 C20 8 18 55 22 75 C26 95 32 105 40 105 C48 105 54 95 58 75 C62 55 60 8 60 8 Z" fill="url(#champagneGradient)" />
              <path d="M20 8 C20 8 18 55 22 75 C26 95 32 105 40 105 C48 105 54 95 58 75 C62 55 60 8 60 8" fill="none" stroke="#C9A86C" strokeWidth="2" />
              <ellipse cx="40" cy="8" rx="20" ry="5" fill="none" stroke="#C9A86C" strokeWidth="2" />
              <ellipse cx="40" cy="8" rx="18" ry="4" fill="rgba(255,255,255,0.3)" />
              <line x1="40" y1="105" x2="40" y2="140" stroke="#C9A86C" strokeWidth="3" />
              <ellipse cx="40" cy="145" rx="18" ry="6" fill="none" stroke="#C9A86C" strokeWidth="2" />
              <ellipse cx="40" cy="145" rx="15" ry="4" fill="rgba(201,168,108,0.2)" />
              <circle cx="35" cy="40" r="2" fill="white" fillOpacity="0.6">
                <animate attributeName="cy" values="40;22;40" dur="2.3s" repeatCount="indefinite" />
              </circle>
              <circle cx="46" cy="55" r="2.5" fill="white" fillOpacity="0.7">
                <animate attributeName="cy" values="55;28;55" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
          </motion.div>

          {/* Clink Effects */}
          <motion.div
            className={styles.clinkSparkle}
            style={{ opacity: clinkSparkleOpacity, scale: clinkSparkleScale }}
          >
            <svg viewBox="0 0 120 120" className={styles.sparkleSvg}>
              <path d="M60 0L66 54L120 60L66 66L60 120L54 66L0 60L54 54L60 0Z" fill="#FFFFFF" />
              <path d="M60 20L63 54L97 60L63 66L60 100L57 66L23 60L57 54L60 20Z" fill="#FFF8E7" />
            </svg>
          </motion.div>

          <motion.div
            className={styles.clinkRing}
            style={{ scale: clinkRingScale, opacity: clinkRingOpacity }}
          />

          {[...Array(8)].map((_, i) => (
            <MiniSparkle
              key={i}
              index={i}
              clinkSparkleOpacity={clinkSparkleOpacity}
              clinkSparkleScale={clinkSparkleScale}
            />
          ))}
        </motion.div>

        {/* ========== "WE GOT MARRIED" TEXT ========== */}
        <motion.div
          className={styles.marriedText}
          style={{ opacity: textOpacity, y: textY, scale: textScale }}
        >
          <motion.span className={styles.we} style={{ opacity: weOpacity, y: weY }}>
            WE
          </motion.span>
          <motion.span className={styles.got} style={{ opacity: gotOpacity, y: gotY }}>
            GOT
          </motion.span>
          <motion.span className={styles.married} style={{ opacity: marriedOpacity, y: marriedY }}>
            MARRIED
          </motion.span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div className={styles.scrollHint} style={{ opacity: scrollHintOpacity }}>
          <span>Scroll to celebrate</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
