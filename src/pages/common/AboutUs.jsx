import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Image,
  VStack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";

const stats = [
  { number: "10K+", label: "Properties Listed" },
  { number: "5K+", label: "Happy Clients" },
  { number: "100+", label: "Cities Covered" },
  { number: "24/7", label: "Support" },
];

const AboutUs = () => {
  const bgColor = useColorModeValue("var(--lightBackground)", "gray.800");
  const cardBg = useColorModeValue("var(--lightCardBackground)", "gray.700");
  const textColor = useColorModeValue("var(--lightDarkText)", "white");
  const primaryColor = useColorModeValue("var(--lightPrimary)", "blue.400");

  return (
    <Box bg={bgColor}>
      <Container maxW="container.lg" px="6" py="16">
        <VStack spacing={16} align="stretch">
          {/* Hero Section */}
          <VStack spacing={8} textAlign="center">
            <Heading color={textColor} fontSize={{ base: "2xl", md: "4xl" }}>
              About Inhabit Realties
            </Heading>
            <Text color={textColor} fontSize={{ base: "md", md: "lg" }} maxW="3xl">
              We are dedicated to making your real estate journey seamless and successful. 
              Our platform connects buyers, sellers, and agents in a trusted environment.
            </Text>
          </VStack>

          {/* Stats Section */}
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8}>
            {stats.map((stat, index) => (
              <Box
                key={index}
                bg={cardBg}
                p={6}
                borderRadius="xl"
                textAlign="center"
                boxShadow="md"
              >
                <Text color={primaryColor} fontSize="3xl" fontWeight="bold">
                  {stat.number}
                </Text>
                <Text color={textColor} fontSize="sm">
                  {stat.label}
                </Text>
              </Box>
            ))}
          </SimpleGrid>

          {/* Mission Section */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} alignItems="center">
            <VStack spacing={6} align="start">
              <Heading color={textColor} size="lg">
                Our Mission
              </Heading>
              <Text color={textColor}>
                To revolutionize the real estate industry by providing a transparent, 
                efficient, and user-friendly platform that empowers people to make 
                informed decisions about their property investments.
              </Text>
              <Text color={textColor}>
                We believe in creating lasting relationships with our clients and 
                partners, ensuring that every real estate transaction is a success story.
              </Text>
            </VStack>
            <Box
              bg={cardBg}
              p={4}
              borderRadius="xl"
              boxShadow="md"
              overflow="hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3"
                alt="Real Estate"
                borderRadius="lg"
                objectFit="cover"
                w="100%"
                h="300px"
              />
            </Box>
          </SimpleGrid>

          {/* Values Section */}
          <VStack spacing={8} align="stretch">
            <Heading color={textColor} textAlign="center" size="lg">
              Our Values
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              {[
                {
                  title: "Integrity",
                  description: "We conduct our business with honesty and transparency."
                },
                {
                  title: "Innovation",
                  description: "We continuously improve our platform with cutting-edge technology."
                },
                {
                  title: "Customer Focus",
                  description: "We put our clients' needs at the heart of everything we do."
                }
              ].map((value, index) => (
                <Box
                  key={index}
                  bg={cardBg}
                  p={6}
                  borderRadius="xl"
                  boxShadow="md"
                >
                  <VStack spacing={4} align="start">
                    <Heading color={primaryColor} size="md">
                      {value.title}
                    </Heading>
                    <Text color={textColor}>
                      {value.description}
                    </Text>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default AboutUs; 