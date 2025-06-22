import React from 'react';
import { Box, Flex, Text, Avatar, Icon } from '@chakra-ui/react';
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBirthdayCake } from 'react-icons/fa';

const CustomerDetailsCard = ({ customer }) => {
  const { name, dob, phone, email, avatarUrl, address } = customer.personalDetails;

  const DetailItem = ({ icon, text }) => (
    <Flex align="center" mt={3}>
      <Icon as={icon} color="purple.600" mr={3} />
      <Text fontSize="sm" color="gray.700">
        {text}
      </Text>
    </Flex>
  );

  return (
    <Box p={6} bg="white" borderRadius="lg" boxShadow="sm">
      <Flex direction="column" align="center" mb={6}>
        <Avatar size="xl" name={name} src={avatarUrl} mb={4} />
        <Text fontSize="xl" fontWeight="bold" color="gray.800">
          {name}
        </Text>
        <Text fontSize="md" color="gray.500">
          Customer ID: {customer.customerId}
        </Text>
      </Flex>

      <Box>
        <DetailItem icon={FaEnvelope} text={email} />
        <DetailItem icon={FaPhone} text={phone} />
        <DetailItem icon={FaBirthdayCake} text={`Born on ${new Date(dob).toLocaleDateString()}`} />
        <DetailItem icon={FaMapMarkerAlt} text={address} />
      </Box>
    </Box>
  );
};

export default CustomerDetailsCard; 