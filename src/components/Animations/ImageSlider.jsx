import { Box, Image, useColorModeValue } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const MotionBox = motion(Box);

const images = [
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3",
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const bgColor = useColorModeValue("light.background", "gray.800");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 4 seconds

    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.1
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + images.length) % images.length);
  };

  return (
    <Box
      position="relative"
      height="400px"
      width="100%"
      overflow="hidden"
      bg={bgColor}
      borderRadius="xl"
      boxShadow="2xl"
    >
      <AnimatePresence initial={false} custom={currentIndex}>
        <MotionBox
          key={currentIndex}
          custom={currentIndex}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            scale: { duration: 0.4 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          position="absolute"
          width="100%"
          height="100%"
        >
          <Image
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            width="100%"
            height="100%"
            objectFit="cover"
            borderRadius="xl"
          />
          <Box
            position="absolute"
            bottom="0"
            left="0"
            right="0"
            bg="rgba(0,0,0,0.5)"
            color="white"
            p={4}
            textAlign="center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Discover Your Dream Home
            </motion.div>
          </Box>
        </MotionBox>
      </AnimatePresence>

      {/* Navigation Dots */}
      <Box
        position="absolute"
        bottom="20px"
        left="50%"
        transform="translateX(-50%)"
        display="flex"
        gap={2}
        zIndex={2}
      >
        {images.map((_, index) => (
          <MotionBox
            key={index}
            w={2}
            h={2}
            borderRadius="full"
            bg={index === currentIndex ? "brand.primary" : "white"}
            cursor="pointer"
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ImageSlider; 