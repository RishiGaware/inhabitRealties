import { Box, Button } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      py={8}
      position="relative"
      overflow="hidden"
    >
      {/* Animated background elements */}
      {/* ... (unchanged) */}

      {/* Main button */}
      <MotionBox
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animation={`${floatAnimation} 3s ease-in-out infinite`}
      >
        <Button
          size="lg"
          px={12}
          py={7}
          fontWeight="bold"
          fontSize="2xl"
          bgGradient="linear(to-r, brand.primary, brand.secondary)"
          color="white"
          boxShadow="2xl"
          borderRadius="full"
          _hover={{
            bgGradient: "linear(to-r, brand.secondary, brand.primary)",
            transform: "scale(1.07)",
            boxShadow: "3xl",
            _before: {
              left: "100%"
            }
          }}
          _active={{
            transform: "scale(0.98)"
          }}
          transition="all 0.3s"
          onClick={() => navigate('/login')}
          position="relative"
          overflow="hidden"
          _before={{
            content: '""',
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "100%",
            height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
            transition: "0.5s"
          }}
          rightIcon={<FiArrowRight size={24} />}
        >
          Get Started
        </Button>
      </MotionBox>
    </Box>
  );
};

export default GetStarted;