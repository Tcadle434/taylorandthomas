import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import styles from './Gallery.module.css'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

// Photos with size hints for the masonry layout
// 'large' = spans 2 cols, 'tall' = extra height, 'normal' = standard
const allPhotos = [
  { src: '/maui_wedding_1.jpeg', size: 'large' },
  { src: '/maui_wedding_2.jpeg', size: 'normal' },
  { src: '/maui_wedding_3.jpeg', size: 'tall' },
  { src: '/maui_wedding_4.jpeg', size: 'normal' },
  { src: '/maui_wedding_5.jpeg', size: 'normal' },
  { src: '/maui_wedding_6.jpeg', size: 'large' },
  { src: '/maui_wedding_7.jpeg', size: 'tall' },
  { src: '/maui_wedding_8.jpeg', size: 'normal' },
  { src: '/maui_wedding_9.jpeg', size: 'normal' },
  { src: '/maui_wedding_10.jpeg', size: 'large' },
  { src: '/maui_wedding_11.jpeg', size: 'normal' },
  { src: '/maui_wedding_12.jpeg', size: 'tall' },
  { src: '/maui_wedding_13.jpeg', size: 'normal' },
  { src: '/maui_wedding_14.jpeg', size: 'normal' },
  { src: '/maui_wedding_15.jpeg', size: 'large' },
  { src: '/maui_wedding_16.jpeg', size: 'normal' },
  { src: '/maui_wedding_17.jpeg', size: 'tall' },
  { src: '/maui_wedding_18.jpeg', size: 'normal' },
  { src: '/maui_wedding_19.jpeg', size: 'normal' },
  { src: '/maui_wedding_20.jpeg', size: 'large' },
  { src: '/maui_wedding_21.jpeg', size: 'normal' },
  { src: '/maui_wedding_22.jpeg', size: 'normal' },
  { src: '/maui_wedding_23.jpeg', size: 'tall' },
  { src: '/maui_wedding_24.jpeg', size: 'normal' },
  { src: '/maui_wedding_25.jpeg', size: 'large' },
]

// Shuffle array function
function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)

  // Shuffle photos once on mount
  const photos = useMemo(() => shuffleArray(allPhotos), [])

  const openLightbox = (src) => {
    setSelectedImage(src)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'auto'
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
          <h1 className={styles.title}>Our Gallery</h1>
          <p className={styles.subtitle}>Memories from Maui</p>
        </header>

        <div className={styles.masonry}>
          {photos.map((photo, index) => (
            <motion.div
              key={photo.src}
              className={`${styles.masonryItem} ${styles[photo.size]}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => openLightbox(photo.src)}
            >
              <img
                src={photo.src}
                alt={`Wedding photo ${index + 1}`}
                className={styles.image}
                loading="lazy"
              />
              <div className={styles.imageOverlay}>
                <span className={styles.viewText}>View</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button
              className={styles.closeButton}
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>
            <motion.div
              className={styles.lightboxContent}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Wedding photo"
                className={styles.lightboxImage}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Gallery
