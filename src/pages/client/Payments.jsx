import React from 'react';
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
  Divider
} from '@chakra-ui/react';
import { FaMoneyBillWave, FaClock, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import TableContainer from '../../components/common/Table/TableContainer';
import CommonTable from '../../components/common/Table/CommonTable';
import StatCard from '../../components/common/StatCard';

const upcomingPayments = [
    { id: 'UP-001', propertyName: 'Sunrise Apartments, Unit 502', amount: 50000, dueDate: '2024-08-01', status: 'Upcoming' },
];

const paymentHistory = [
    { id: 'HIST-001', propertyName: 'Sunrise Apartments, Unit 502', amount: 50000, date: '2024-07-01', status: 'Paid' },
    { id: 'HIST-002', propertyName: 'Sunrise Apartments, Unit 502', amount: 50000, date: '2024-06-01', status: 'Paid' },
    { id: 'HIST-003', propertyName: 'Sunrise Apartments, Unit 502', amount: 25000, date: '2024-05-20', status: 'Paid' },
];

const Payments = () => {

  const totalPaid = paymentHistory.reduce((sum, p) => sum + p.amount, 0);
  const totalDue = upcomingPayments.reduce((sum, p) => sum + p.amount, 0);

  const stats = [
      { title: 'Total Paid', value: `₹${totalPaid.toLocaleString()}`, icon: FaCheckCircle, changeType: 'increase' },
      { title: 'Total Due', value: `₹${totalDue.toLocaleString()}`, icon: FaExclamationTriangle, changeType: 'decrease' },
  ];
  
  const upcomingColumns = [
    { Header: 'Property', accessor: 'propertyName' },
    { Header: 'Amount', accessor: 'amount', Cell: ({ value }) => `₹${value.toLocaleString()}`},
    { Header: 'Due Date', accessor: 'dueDate', Cell: ({ value }) => new Date(value).toLocaleDateString() },
    { Header: 'Actions', accessor: 'actions', Cell: () => <Button colorScheme="purple" size="sm">Pay Now</Button> }
  ];
  
  const historyColumns = [
      { Header: 'Date', accessor: 'date', Cell: ({ value }) => new Date(value).toLocaleDateString() },
      { Header: 'Property', accessor: 'propertyName' },
      { Header: 'Amount', accessor: 'amount', Cell: ({ value }) => `₹${value.toLocaleString()}`},
      { Header: 'Status', accessor: 'status', Cell: ({ value }) => <Badge colorScheme="green">{value}</Badge> },
  ];

  return (
    <Box p={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>My Payments</Text>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)'}} gap={6} mb={8}>
          {stats.map(stat => <StatCard {...stat} change="" />)}
      </Grid>

      <Box bg="white" p={6} borderRadius="lg" boxShadow="sm" mb={8}>
        <HStack mb={4}>
            <Icon as={FaClock} color="purple.500" />
            <Text fontSize="lg" fontWeight="semibold">Upcoming Payments</Text>
        </HStack>
        <CommonTable columns={upcomingColumns} data={upcomingPayments} />
      </Box>

      <TableContainer title="Payment History">
          <CommonTable columns={historyColumns} data={paymentHistory} />
      </TableContainer>
    </Box>
  );
};

export default Payments; 