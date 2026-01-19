import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Send, Check, AlertCircle } from 'lucide-react'
import styles from './RSVP.module.css'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

// Replace this with your Google Apps Script Web App URL after deployment
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwf1B4K01TzyIn6L2nCKuBhi8A2H5t98gLGgvnToGI7TeNsWLfBMbIS8IrfPgm1mKyQ/exec'

function RSVP() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      })

      // With no-cors mode, we can't read the response, so we assume success
      setStatus('success')
      setFormData({
        name: '',
        email: '',
        attending: '',
        message: '',
      })
    } catch (error) {
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again or contact us directly.')
    }
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
          <Heart className={styles.headerIcon} size={40} />
          <h1 className={styles.title}>RSVP</h1>
          <p className={styles.subtitle}>We can't wait to celebrate with you!</p>
        </header>

        <motion.div
          className={styles.formContainer}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                className={styles.successMessage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className={styles.successIcon}>
                  <Check size={48} />
                </div>
                <h2 className={styles.successTitle}>Thank You!</h2>
                <p className={styles.successText}>
                  Your RSVP has been received. We're so excited to celebrate with you!
                </p>
                <button
                  type="button"
                  className="btn btn-outline-gold"
                  onClick={() => setStatus('idle')}
                >
                  Submit Another Response
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className={styles.form}
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Your Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Email Address <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Will you be attending? <span className={styles.required}>*</span>
                  </label>
                  <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="attending"
                        value="yes"
                        checked={formData.attending === 'yes'}
                        onChange={handleChange}
                        className={styles.radioInput}
                        required
                      />
                      <span className={styles.radioCustom}></span>
                      <span className={styles.radioText}>Yes</span>
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="attending"
                        value="no"
                        checked={formData.attending === 'no'}
                        onChange={handleChange}
                        className={styles.radioInput}
                      />
                      <span className={styles.radioCustom}></span>
                      <span className={styles.radioText}>No</span>
                    </label>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>
                    Message for the Couple
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={styles.textarea}
                    placeholder="Share your well wishes or let us know anything else!"
                    rows={4}
                  />
                </div>

                {status === 'error' && (
                  <motion.div
                    className={styles.errorMessage}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle size={18} />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  className={`btn btn-primary ${styles.submitBtn}`}
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? (
                    <>
                      <span className={styles.spinner}></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send RSVP
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className={styles.deadline}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span className={styles.deadlineLabel}>Please RSVP by</span>
          <span className={styles.deadlineDate}>May 1, 2026</span>
        </motion.div>

        <motion.div
          className={styles.note}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className={styles.noteTitle}>Questions?</h3>
          <p className={styles.noteText}>
            If you have any questions about your RSVP or need to make changes,
            please don't hesitate to reach out to us directly.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default RSVP
