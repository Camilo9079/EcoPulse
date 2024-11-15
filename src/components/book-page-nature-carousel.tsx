'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

const images = [
  {
    src: "https://static.roadtrip.travel/media/roadtrips/pasadia-en-finca-ecoturistica-cerca-al-canon-del-combeima-en-ibague-1200-797192f.jpg",
    alt: "Sunlit Forest",
    title: "Riqueza Natural",
    description: "Rays of sunlight pierce through a lush, misty forest"
  },
  {
    src: "https://rtvc-assets-radionacional-v2.s3.amazonaws.com/s3fs-public/senalradio/articulo-noticia/galeriaimagen/101554636_1582408435243005_5022491172888776855_o.jpg",
    alt: "Tropical Beach",
    title: "El Cañón del Combeima",
    description: "Uno de los tesoros naturales del Tolima, ideal para caminatas y avistamiento de aves."
  },
  {
    src: "https://blog.redbus.co/wp-content/uploads/2024/07/Camaleon-Travel.jpg",
    alt: "Mountain Lake",
    title: "Experiencias Únicas",
    description: "Disfruta del ecoturismo en Tolima con opciones de alojamiento que permiten una inmersión en la naturaleza."
  },
  {
    src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/d8/eb/51/canon-del-combeima.jpg?w=600&h=500&s=1",
    alt: "Colorful Autumn",
    title: "Tolima Verde",
    description: "Descubre la abundante vegetación y serenidad que rodea los paisajes del Tolima."
  },
  {
    src: "https://glampingnatural.co/wp-content/uploads/2024/03/akaya3-1024x768.jpg",
    alt: "Flowing Waterfall",
    title: "Paisajes Inolvidables",
    description: "Tolima ofrece un paisaje de montañas y aguas tranquilas, perfecto para conectar con la naturaleza."
  }
]

export default function BookPageNatureCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const pageVariants = {
    enter: (direction: number) => ({
      transformOrigin: direction > 0 ? "left center" : "right center",
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      rotateY: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      transformOrigin: direction < 0 ? "left center" : "right center",
      rotateY: direction < 0 ? -90 : 90,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full max-w-screen-2xl mx-auto h-[600px] px-4 overflow-hidden rounded-xl shadow-2xl bg-[#f0e6d2]">
      <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-50 mix-blend-overlay pointer-events-none"></div>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            rotateY: { type: "spring", stiffness: 100, damping: 20 },
            opacity: { duration: 0.2 },
          }}
          className="absolute w-full h-full"
          style={{
            perspective: "1200px",
          }}
        >
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="absolute bottom-0 left-0 right-0 p-8 text-white"
          >
            <h2 className="text-4xl font-bold mb-2 font-serif">{images[currentIndex].title}</h2>
            <p className="text-xl font-serif">{images[currentIndex].description}</p>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 transition-colors duration-200"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Página anterior</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 transition-colors duration-200"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Página siguiente</span>
      </Button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            } transition-colors duration-200`}
            onClick={() => setCurrentIndex(index)}
          >
            <span className="sr-only">Ir a la imagen {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
