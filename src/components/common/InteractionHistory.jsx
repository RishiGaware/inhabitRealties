import React from 'react';
import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import { FaPhone, FaEnvelope, FaHandshake } from 'react-icons/fa';

const InteractionHistory = ({ interactions }) => {
  const getIconForType = (type) => {
    switch (type.toLowerCase()) {
      case 'call':
        return FaPhone;
      case 'email':
        return FaEnvelope;
      case 'meeting':
        return FaHandshake;
      default:
        return FaHandshake;
    }
  };

  return (
    <Box>
      {interactions.map((interaction, index) => (
        <Flex key={index} align="start" mb={4}>
          <Icon
            as={getIconForType(interaction.type)}
            w={5}
            h={5}
            color="purple.500"
            mt={1}
            mr={4}
          />
          <Box>
            <Text fontWeight="bold" color="gray.800" textTransform="capitalize">
              {interaction.type}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {new Date(interaction.date).toLocaleDateString()}
            </Text>
            <Text fontSize="sm" color="gray.700" mt={1}>
              {interaction.notes}
            </Text>
          </Box>
        </Flex>
      ))}
    </Box>
  );
};

export default InteractionHistory; 