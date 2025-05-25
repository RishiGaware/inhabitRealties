import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Icon,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaHome, FaSearch, FaHandshake, FaChartLine } from "react-icons/fa";

const MotionBox = motion(Box);
const MotionIcon = motion(Icon);

const features = [
  {
    icon: FaHome,
    title: "Wide Range of Properties",
    description: "Browse through thousands of verified properties across different locations and price ranges."
  },
  {
    icon: FaSearch,
    title: "Smart Search",
    description: "Find your perfect home with our advanced search filters and location-based recommendations."
  },
  {
    icon: FaHandshake,
    title: "Trusted Partners",
    description: "Work with verified real estate agents and property owners for a secure transaction."
  },
  {
    icon: FaChartLine,
    title: "Market Insights",
    description: "Get real-time market trends and property value insights to make informed decisions."
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.2,
      type: "spring",
      stiffness: 120,
      damping: 14
    }
  })
};

const iconVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 200, damping: 20 } },
  hover: { scale: 1.2, rotate: 360, transition: { duration: 0.5 } }
};

const Features = () => {
  const bgColor = useColorModeValue("var(--lightBackground)", "gray.800");
  const cardBg = useColorModeValue("var(--lightCardBackground)", "gray.700");
  const textColor = useColorModeValue("var(--lightDarkText)", "white");
  const primaryColor = useColorModeValue("var(--lightPrimary)", "blue.400");

  return (
    <Box 
      bg={bgColor}
      minH="60vh"
      display="flex"
      flexDirection="column"
      py={{ base: 8, md: 16 }}
    >
      <Container maxW="container.lg" px="6" flex="1">
        <VStack spacing={12} align="stretch">
          <VStack spacing={4} textAlign="center">
            <Heading color={textColor} fontSize={{ base: "2xl", md: "4xl" }}>
              Our Features
            </Heading>
            <Text color={textColor} fontSize={{ base: "md", md: "lg" }} maxW="2xl">
              Discover why thousands of people trust us for their real estate needs
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
            {features.map((feature, index) => (
              <MotionBox
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={cardVariants}
                whileHover={{ scale: 1.04, boxShadow: "2xl", y: -8 }}
                transition={{ type: "spring", stiffness: 120 }}
                bg={cardBg}
                p={8}
                borderRadius="xl"
                boxShadow="md"
              >
                <VStack spacing={4} align="start">
                  <MotionIcon
                    as={feature.icon}
                    w={10}
                    h={10}
                    color={primaryColor}
                    variants={iconVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                  />
                  <Heading size="md" color={textColor}>
                    {feature.title}
                  </Heading>
                  <Text color={textColor} fontSize="sm">
                    {feature.description}
                  </Text>
                </VStack>
              </MotionBox>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Features; 