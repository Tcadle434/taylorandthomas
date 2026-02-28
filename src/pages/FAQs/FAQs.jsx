import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import styles from './FAQs.module.css'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

const faqs = [
  {
    id: 1,
    question: 'Is this a wedding?',
    answer:
      "Nope! We already got married with just our immediate families in Maui. This is a celebration and an excuse to get all our friends and relatives together.",
  },
  {
    id: 2,
    question: 'What should I wear?',
    answer:
      'Cocktail attire - dress to celebrate!',
  },
  {
    id: 3,
    question: 'Can I bring a plus one?',
    answer:
      "Please reach out to Thomas and Taylor if they haven't reached out to you already. We have a list of people who may bring plus ones.",
  },
  {
    id: 4,
    question: 'Will there be food and drinks?',
    answer:
      "Absolutely! We'll have an open bar and food.",
  },
  ]

function AccordionItem({ faq, isOpen, onToggle }) {
  return (
    <div className={styles.accordionItem}>
      <button
        className={`${styles.accordionHeader} ${isOpen ? styles.open : ''}`}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className={styles.question}>{faq.question}</span>
        <ChevronDown
          size={20}
          className={`${styles.chevron} ${isOpen ? styles.rotated : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.accordionContent}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className={styles.answer}>{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FAQs() {
  const [openId, setOpenId] = useState(null)

  const toggleItem = (id) => {
    setOpenId(openId === id ? null : id)
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
          <HelpCircle className={styles.headerIcon} size={40} />
          <h1 className={styles.title}>Questions & Answers</h1>
          <p className={styles.subtitle}>Everything you need to know</p>
        </header>

        <motion.div
          className={styles.accordion}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => toggleItem(faq.id)}
            />
          ))}
        </motion.div>

        <motion.div
          className={styles.moreQuestions}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className={styles.moreTitle}>Still have questions?</h3>
          <p className={styles.moreText}>
            Feel free to reach out to us directly. We're happy to help!
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default FAQs
