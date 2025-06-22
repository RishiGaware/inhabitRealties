import React, { useState } from 'react';
import {
  Box,
  Text,
  Grid,
  VStack,
  HStack,
  Icon,
  Badge,
  Flex
} from '@chakra-ui/react';
import { FaStar, FaPlusCircle, FaMinusCircle, FaQuestionCircle } from 'react-icons/fa';
import TableContainer from '../../components/common/Table/TableContainer';
import CommonTable from '../../components/common/Table/CommonTable';

const pointsHistory = [
  { id: 'TXN-001', date: '2024-07-20', description: 'Referred Vikram Singh', amount: 500, type: 'earned' },
  { id: 'TXN-002', date: '2024-07-15', description: 'Claimed ₹500 Gift Card', amount: -500, type: 'spent' },
  { id: 'TXN-003', date: '2024-07-10', description: 'On-time payment bonus', amount: 100, type: 'earned' },
  { id: 'TXN-004', date: '2024-06-25', description: 'Anniversary bonus', amount: 250, type: 'earned' },
];

const waysToEarn = [
    { title: 'Refer a Friend', description: 'Earn 500 points for every successful referral.' },
    { title: 'On-Time Payments', description: 'Earn 100 points for every payment made on or before the due date.' },
    { title: 'Write a Testimonial', description: 'Share your experience and earn 200 points.' },
];

const Points = () => {
  const [userPoints] = useState(7500);

  const columns = [
    { Header: 'Date', accessor: 'date', Cell: ({ value }) => new Date(value).toLocaleDateString() },
    { Header: 'Description', accessor: 'description' },
    { 
      Header: 'Points', 
      accessor: 'amount', 
      Cell: ({ value }) => (
        <HStack>
          <Icon as={value > 0 ? FaPlusCircle : FaMinusCircle} color={value > 0 ? 'green.500' : 'red.500'} />
          <Text color={value > 0 ? 'green.500' : 'red.500'}>{value.toLocaleString()}</Text>
        </HStack>
      )
    },
  ];

  return (
    <Box p={6}>
        <Flex direction={{base: "column", md: "row"}} justify="space-between" align="center" mb={6} bg="purple.600" p={6} borderRadius="lg" color="white">
            <Box>
                <Text fontSize="lg">Your Points Balance</Text>
                <Text fontSize="4xl" fontWeight="bold">{userPoints.toLocaleString()}</Text>
            </Box>
            <Icon as={FaStar} boxSize="16" opacity={0.2}/>
        </Flex>

      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
        <TableContainer title="Points History">
          <CommonTable columns={columns} data={pointsHistory} />
        </TableContainer>

        <VStack spacing={4} align="stretch">
            <Box p={5} bg="white" borderRadius="lg" boxShadow="sm">
                <HStack mb={4}>
                    <Icon as={FaQuestionCircle} color="purple.500" />
                    <Text fontSize="lg" fontWeight="semibold">How to Earn Points</Text>
                </HStack>
                <VStack align="stretch" spacing={3}>
                    {waysToEarn.map(way => (
                        <Box key={way.title} p={3} bg="purple.50" borderRadius="md">
                            <Text fontWeight="bold">{way.title}</Text>
                            <Text fontSize="sm" color="gray.700">{way.description}</Text>
                        </Box>
                    ))}
                </VStack>
            </Box>
        </VStack>
      </Grid>
    </Box>
  );
};

export default Points; 