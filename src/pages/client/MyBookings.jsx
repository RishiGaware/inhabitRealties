import React, { useState } from 'react';
import {
  Box,
  Text,
  Grid,
  VStack,
  HStack,
  Icon,
  Badge,
  Button,
  Flex,
  Image
} from '@chakra-ui/react';
import { FaBuilding, FaCalendarAlt, FaMoneyBillWave, FaClock } from 'react-icons/fa';

const dummyBookings = [
  { 
    id: 'B-001', 
    propertyName: 'Sunrise Apartments, Unit 502', 
    image: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bookingDate: '2024-05-20', 
    moveInDate: '2024-08-01',
    price: 7500000, 
    status: 'Confirmed' 
  },
  { 
    id: 'B-002', 
    propertyName: 'Oceanview Villa', 
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bookingDate: '2023-11-10', 
    moveInDate: '2024-01-15',
    price: 12500000, 
    status: 'Completed' 
  },
  { 
    id: 'B-003', 
    propertyName: 'Downtown Studio', 
    image: 'https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bookingDate: '2024-07-22', 
    moveInDate: null,
    price: 4500000, 
    status: 'Pending' 
  },
];

const BookingCard = ({ booking }) => {
    const getStatusColorScheme = (status) => {
        if (status === 'Confirmed') return 'green';
        if (status === 'Completed') return 'blue';
        if (status === 'Pending') return 'yellow';
        return 'gray';
    };

  return (
    <Box bg="white" borderRadius="lg" boxShadow="sm" overflow="hidden">
      <Image src={booking.image} alt={booking.propertyName} h="200px" w="100%" objectFit="cover" />
      <VStack p={5} align="stretch" spacing={3}>
        <HStack justify="space-between">
            <Text fontWeight="bold" fontSize="lg">{booking.propertyName}</Text>
            <Badge colorScheme={getStatusColorScheme(booking.status)}>{booking.status}</Badge>
        </HStack>
        
        <HStack>
            <Icon as={FaMoneyBillWave} color="gray.500" />
            <Text>₹{booking.price.toLocaleString()}</Text>
        </HStack>
        <HStack>
            <Icon as={FaCalendarAlt} color="gray.500" />
            <Text>Booked on {new Date(booking.bookingDate).toLocaleDateString()}</Text>
        </HStack>
        {booking.moveInDate && (
            <HStack>
                <Icon as={FaClock} color="gray.500" />
                <Text>Move-in on {new Date(booking.moveInDate).toLocaleDateString()}</Text>
            </HStack>
        )}
        <Button mt={2} colorScheme="purple" variant="outline" size="sm">View Details</Button>
      </VStack>
    </Box>
  );
};


const MyBookings = () => {
  const [bookings] = useState(dummyBookings);

  return (
    <Box p={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>My Bookings</Text>
      
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
        {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </Grid>
    </Box>
  );
};

export default MyBookings; 