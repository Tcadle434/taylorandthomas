import { motion } from 'framer-motion'
import HeroSection from './HeroSection'
import WeGotMarriedSection from './WeGotMarriedSection'
import LetsPartySection from './LetsPartySection'
import InvitationSection from './InvitationSection'
import styles from './Home.module.css'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

function Home() {
  return (
    <motion.div
      className={styles.home}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <WeGotMarriedSection />
      <LetsPartySection />
      <InvitationSection />
    </motion.div>
  )
}

export default Home
