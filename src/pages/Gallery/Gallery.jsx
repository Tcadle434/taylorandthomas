import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Camera } from 'lucide-react'
import styles from './Gallery.module.css'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

const placeholderImages = [
  { id: 1, aspectRatio: 'portrait', label: 'Maui Sunset' },
  { id: 2, aspectRatio: 'landscape', label: 'Beach Walk' },
  { id: 3, aspectRatio: 'square', label: 'The Ceremony' },
  { id: 4, aspectRatio: 'landscape', label: 'Ocean View' },
  { id: 5, aspectRatio: 'portrait', label: 'Together' },
  { id: 6, aspectRatio: 'square', label: 'Celebration' },
  { id: 7, aspectRatio: 'landscape', label: 'Palm Trees' },
  { id: 8, aspectRatio: 'portrait', label: 'The Moment' },
  { id: 9, aspectRatio: 'square', label: 'Memories' },
]

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)

  const openLightbox = (image) => {
    setSelectedImage(image)
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
          <p className={styles.subtitle}>Photos from Maui coming soon...</p>
        </header>

        <div className={styles.grid}>
          {placeholderImages.map((image, index) => (
            <motion.div
              key={image.id}
              className={`${styles.gridItem} ${styles[image.aspectRatio]}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => openLightbox(image)}
            >
              <div className={styles.imagePlaceholder}>
                <Camera size={24} />
                <span>{image.label}</span>
              </div>
              <div className={styles.imageOverlay}>
                <span className={styles.viewText}>View Photo</span>
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
              <div className={styles.lightboxPlaceholder}>
                <Camera size={48} />
                <span className={styles.lightboxLabel}>{selectedImage.label}</span>
                <span className={styles.lightboxHint}>Photo coming soon</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Gallery
