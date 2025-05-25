import {
  HStack,
  VStack,
  Button,
  Text,
  Heading,
  Stack,
  Box,
  Image,
  Container,
} from "@chakra-ui/react";
import { BiPlus } from "react-icons/bi";

import { bannerData } from "../data";
import Apartment1Lg from "../assets/images/apartments/a1lg.png";
import Apartment6Lg from "../assets/images/apartments/a6lg.png";
import LightThemeColors from "../../src/assets/Colors";

const Banner = () => {
  return (
    <Box w="100vw" position="relative" left="50%" right="50%" marginLeft="-50vw" marginRight="-50vw" bg="light.background">
      <Container maxW="container.lg" px="6">
        <Stack direction="row" my='6' overflow='hidden'>
          <VStack
            flexGrow='1'
            px={{ sm: "6", md: "10" }}
            py={{ sm: '8',  md: "16" }}
            justify="center"
            align="left"
            borderRadius="xl"
          >
            <Heading fontSize={{ base: "xl", sm: "2xl", md: "3xl" }} color="light.darkText">
              Find Real Estate That Suits You.
            </Heading>
            <Text fontSize="sm" color="light.darkText">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
              fugit illo? Delectus, voluptas unde quae cupiditate at amet beatae
              totam!
            </Text>
            <Box pt="3" pb="8">
              <Button colorScheme="brand">Get Started</Button>
            </Box>

            <HStack spacing="3">
              {bannerData.map((item, index) => (
                <VStack
                  key={index}
                  bg="light.cardBackground"
                  p="4"
                  borderRadius="md"
                  align="left"
                  pr="3"
                  boxShadow="md"
                >
                  <HStack>
                    <Text fontSize={{sm: '14px', md: 'md'}} fontWeight="extrabold" mr="-2" color="light.darkText">
                      {Object.keys(item)}
                    </Text>{" "}
                    <BiPlus style={{ color: LightThemeColors.brandPrimary }} />
                  </HStack>
                  <Text fontSize={{sm: '12px', md: 'sm'}} color="light.darkText">{Object.values(item)}</Text>
                </VStack>
              ))}
            </HStack>
          </VStack>

          <VStack justify='center'>
            <Box h='100%' display={{ base: "none", lg: "block", xl:'none' }} >
              <Image
                src={Apartment1Lg}
                alt="house"
                h='100%'
                objectFit='cover'
              />
            </Box>
            <Box h='50%' display={{ base: "none", xl: "block" }}>
              <Image
                src={Apartment1Lg}
                alt="house"
                style={{height: '100%', width: '100%', objectFit: 'contain'}}
              />
            </Box>
            <Box h='50%' display={{ base: "none", xl: "block" }}>
              <Image
                src={Apartment6Lg}
                alt="house"
                style={{height: '100%', width: '100%', objectFit: 'contain'}}
              />
            </Box>
          </VStack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Banner;
