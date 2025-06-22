import React from 'react';
import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const StatCard = ({ title, value, icon, change, changeType }) => {
  const isIncrease = changeType === 'increase';

  return (
    <Box p={5} bg="white" borderRadius="lg" boxShadow="sm">
      <Flex align="center">
        <Flex
          w={12}
          h={12}
          align="center"
          justify="center"
          borderRadius="full"
          bg={isIncrease ? 'green.100' : 'red.100'}
          mr={4}
        >
          <Icon as={icon} w={6} h={6} color={isIncrease ? 'green.500' : 'red.500'} />
        </Flex>
        <Box>
          <Text color="gray.500" fontSize="sm">
            {title}
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            {value}
          </Text>
        </Box>
      </Flex>
      <Flex align="center" mt={4}>
        <Icon
          as={isIncrease ? FaArrowUp : FaArrowDown}
          w={3}
          h={3}
          color={isIncrease ? 'green.500' : 'red.500'}
        />
        <Text ml={1} color={isIncrease ? 'green.500' : 'red.500'} fontSize="sm">
          {change}
        </Text>
        <Text ml={1} color="gray.500" fontSize="sm">
          from last month
        </Text>
      </Flex>
    </Box>
  );
};

export default StatCard; 