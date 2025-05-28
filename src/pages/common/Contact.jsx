import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Input,
  Textarea,
  Button,
  useColorModeValue,
  Icon,
  Image,
  Flex,
  Link,
} from "@chakra-ui/react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaMapMarkedAlt } from "react-icons/fa";

const Contact = () => {
  const bgColor = useColorModeValue("light.background", "light.background");
  const cardBg = useColorModeValue("light.cardBackground", "light.cardBackground");
  const textColor = useColorModeValue("light.darkText", "light.darkText");
  const primaryColor = useColorModeValue("brand.primary", "brand.primary");
  const inputBg = useColorModeValue("white", "gray.700");

  const locations = [
    {
      name: "New York Office",
      address: "123 Real Estate St, New York, NY 10001",
      coordinates: "40.7128,-74.0060",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3"
    },
    {
      name: "Los Angeles Branch",
      address: "456 Property Ave, Los Angeles, CA 90001",
      coordinates: "34.0522,-118.2437",
      image: "https://images.unsplash.com/photo-1515896769750-31548aa180ed?ixlib=rb-4.0.3"
    }
  ];

  return (
    <Box w="100vw" position="relative" left="50%" right="50%" marginLeft="-50vw" marginRight="-50vw" bg={bgColor}>
      <Container maxW="container.lg" px="6" py="16">
        <VStack spacing={16} align="stretch">
          {/* Header Section */}
          <VStack spacing={4} textAlign="center">
            <Heading color={textColor} fontSize={{ base: "2xl", md: "4xl" }}>
              Get in Touch
            </Heading>
            <Text color={textColor} fontSize={{ base: "md", md: "lg" }} maxW="2xl">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
            {/* Left Side - Contact Form */}
            <Box 
              bg={cardBg} 
              p={8} 
              borderRadius="xl" 
              boxShadow="lg"
              border="1px solid"
              borderColor="gray.200"
              _hover={{
                boxShadow: "2xl",
                transform: "translateY(-5px)",
                transition: "all 0.3s ease"
              }}
            >
              <VStack spacing={6} align="stretch">
                <Heading color={textColor} size="lg" borderBottom="2px solid" borderColor={primaryColor} pb={2}>
                  Send us a Message
                </Heading>
                <VStack spacing={4} align="stretch">
                  <Input
                    placeholder="Your Name"
                    bg={inputBg}
                    color={textColor}
                    _placeholder={{ color: "gray.500" }}
                    size="lg"
                    borderRadius="md"
                    border="1px solid"
                    borderColor="gray.300"
                    _focus={{
                      borderColor: primaryColor,
                      boxShadow: `0 0 0 1px ${primaryColor}`,
                    }}
                  />
                  <Input
                    placeholder="Your Email"
                    bg={inputBg}
                    color={textColor}
                    _placeholder={{ color: "gray.500" }}
                    size="lg"
                    borderRadius="md"
                    border="1px solid"
                    borderColor="gray.300"
                    _focus={{
                      borderColor: primaryColor,
                      boxShadow: `0 0 0 1px ${primaryColor}`,
                    }}
                  />
                  <Textarea
                    placeholder="Your Message"
                    bg={inputBg}
                    color={textColor}
                    _placeholder={{ color: "gray.500" }}
                    rows={6}
                    borderRadius="md"
                    border="1px solid"
                    borderColor="gray.300"
                    _focus={{
                      borderColor: primaryColor,
                      boxShadow: `0 0 0 1px ${primaryColor}`,
                    }}
                  />
                  <Button
                    bg={bgColor}
                    color="var(--lightDarkText);"
                    _hover={{
                      bg: bgColor,
                      transform: "translateY(-2px)",
                      boxShadow: "lg"
                    }}
                    _active={{
                      bg: bgColor,
                      transform: "translateY(0)"
                    }}
                    size="lg"
                    borderRadius="md"
                    fontSize="lg"
                    fontWeight="bold"
                    py={6}
                    mt={80}
                    transition="all 0.2s"
                    
                  >
                    Send Message
                  </Button>
                </VStack>
              </VStack>
            </Box>

            {/* Right Side - Contact Info & Map */}
            <VStack spacing={8} align="stretch">
              {/* Contact Info Cards */}
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                {[
                  {
                    icon: FaPhone,
                    title: "Phone",
                    content: "+1 (555) 123-4567",
                    description: "Mon-Fri from 8am to 6pm"
                  },
                  {
                    icon: FaEnvelope,
                    title: "Email",
                    content: "support@.com",
                    description: "We'll respond within 24 hours"
                  },
                  {
                    icon: FaMapMarkerAlt,
                    title: "Office",
                    content: "123 Real Estate St",
                    description: "New York, NY 10001"
                  },
                  {
                    icon: FaMapMarkerAlt,
                    title: "Branch",
                    content: "456 Property Ave",
                    description: "Los Angeles, CA 90001"
                  }
                ].map((item, index) => (
                  <Box
                    key={index}
                    bg={cardBg}
                    p={6}
                    borderRadius="xl"
                    boxShadow="md"
                    border="1px solid"
                    borderColor="gray.200"
                    transition="all 0.3s"
                    _hover={{
                      transform: "translateY(-5px)",
                      boxShadow: "lg",
                      borderColor: primaryColor
                    }}
                  >
                    <VStack spacing={3} align="start">
                      <Icon as={item.icon} w={6} h={6} color={primaryColor} />
                      <Heading size="sm" color={textColor}>
                        {item.title}
                      </Heading>
                      <Text color={primaryColor} fontWeight="bold">
                        {item.content}
                      </Text>
                      <Text color={textColor} fontSize="sm">
                        {item.description}
                      </Text>
                    </VStack>
                  </Box>
                ))}
              </SimpleGrid>

              {/* Interactive Maps */}
              <VStack spacing={6}>
                {locations.map((location, index) => (
                  <Link
                    key={index}
                    href={`https://www.google.com/maps?q=${location.coordinates}`}
                    isExternal
                    _hover={{ textDecoration: 'none' }}
                  >
                    <Box
                      bg={cardBg}
                      p={4}
                      borderRadius="xl"
                      boxShadow="md"
                      overflow="hidden"
                      h="200px"
                      border="1px solid"
                      borderColor="gray.200"
                      position="relative"
                      _hover={{
                        boxShadow: "lg",
                        transform: "translateY(-5px)",
                        transition: "all 0.3s ease",
                        "& .map-overlay": {
                          opacity: 1
                        }
                      }}
                    >
                      <Image
                        src={location.image}
                        alt={location.name}
                        objectFit="cover"
                        w="100%"
                        h="100%"
                        borderRadius="lg"
                      />
                      <Box
                        className="map-overlay"
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        bg="rgba(0,0,0,0.5)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        opacity={0}
                        transition="opacity 0.3s ease"
                      >
                        <VStack spacing={2}>
                          <Icon as={FaMapMarkedAlt} w={8} h={8} color="white" />
                          <Text color="white" fontWeight="bold">
                            View on Google Maps
                          </Text>
                        </VStack>
                      </Box>
                      <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        p={4}
                        bg="rgba(0,0,0,0.7)"
                      >
                        <Text color="white" fontWeight="bold">
                          {location.name}
                        </Text>
                        <Text color="white" fontSize="sm">
                          {location.address}
                        </Text>
                      </Box>
                    </Box>
                  </Link>
                ))}
              </VStack>

              {/* Social Media Links */}
              <HStack spacing={4} justify="center">
                {[FaFacebook, FaTwitter, FaLinkedin, FaInstagram].map((Icon, index) => (
                  <Button
                    key={index}
                    as="a"
                    href="#"
                    size="lg"
                    variant="ghost"
                    color={primaryColor}
                    _hover={{ 
                      bg: "rgba(255, 56, 92, 0.1)",
                      transform: "translateY(-2px)",
                      boxShadow: "md"
                    }}
                    transition="all 0.2s"
                  >
                    <Icon size={20} />
                  </Button>
                ))}
              </HStack>
            </VStack>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Contact; 