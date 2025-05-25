import {
  VStack,
  Divider,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { BiBed, BiBath, BiArea } from "react-icons/bi";
import LightThemeColors from "../../assets/Colors";const HouseItem = ({ house }) => {
  return (
    <Flex justify='center' align='center'>
        <Stack justify='center' width="300px" bg="light.cardBackground" boxShadow="xl" borderRadius="xl">
        <Image src={house.imageLg} h='170' alt='houses' />

        <VStack p='4' align='left'>
            <Text mt="-1" fontWeight="extrabold" fontSize="18px" color="brand.primary">
            Rs.{house.price}
            <span style={{ fontSize: 12, color: "grey", fontWeight: "normal" }}>
                /month
            </span>
            </Text>

            <Heading fontSize="24px" letterSpacing="tight" color="light.darkText">
            {house.name}
            </Heading>

            <Text fontSize="13px" color="light.darkText">
             {house.address}
            </Text>

            <Divider my="2.5" />

            <HStack spacing="5">
            <HStack>
                <BiBed style={{ color: LightThemeColors.brandPrimary }} />
                <Text fontSize="12px" color="light.darkText">{house.bedrooms}</Text>
            </HStack>

            <HStack>
                <BiBath style={{ color: LightThemeColors.brandPrimary }} />
                <Text fontSize="12px" color="light.darkText">{house.bathrooms}</Text>
            </HStack>

            <HStack>
                <BiArea style={{ color: LightThemeColors.brandPrimary }} />
                <Text fontSize="12px" color="light.darkText">{house.surface}</Text>
            </HStack>
            </HStack>

        </VStack>
        </Stack>
    </Flex>
  );
};

export default HouseItem;
